import { Op } from 'sequelize';
import Task from '../models/Task.js';
import Application from '../models/Application.js';
import Interview from '../models/Interview.js';
import Company from '../models/Company.js';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import { TASK_STATUS } from '../constants/task.constants.js';

const getFullInclude = () => [
  {
    model: Application,
    as: 'application',
    attributes: ['id', 'jobTitle', 'companyId'],
    include: [{
      model: Company,
      as: 'company',
      attributes: ['id', 'companyName', 'logoUrl'],
    }],
  },
  {
    model: Interview,
    as: 'interview',
    attributes: ['id', 'roundName', 'roundNumber', 'scheduledAt'],
  },
];

export const getAllTasks = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    applicationId,
    interviewId,
    taskType,
    priority,
    status,
    dateFrom,
    dateTo,
    sortBy = 'dueDate',
    sortOrder = 'ASC', // Generally want earliest due first
  } = queryParams;

  const offset = (page - 1) * limit;
  const where = { userId };

  if (search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { '$application.jobTitle$': { [Op.like]: `%${search}%` } },
      { '$application.company.companyName$': { [Op.like]: `%${search}%` } },
    ];
  }

  if (applicationId) where.applicationId = applicationId;
  if (interviewId) where.interviewId = interviewId;
  if (taskType) where.taskType = taskType;
  if (priority) where.priority = priority;
  if (status) where.status = status;

  if (dateFrom || dateTo) {
    where.dueDate = {};
    if (dateFrom) where.dueDate[Op.gte] = new Date(dateFrom);
    if (dateTo) where.dueDate[Op.lte] = new Date(dateTo + 'T23:59:59');
  }

  // Sorting
  let order = [];
  if (sortBy === 'newest') {
    order = [['createdAt', 'DESC']];
  } else if (sortBy === 'oldest') {
    order = [['createdAt', 'ASC']];
  } else {
    order = [[sortBy, sortOrder.toUpperCase()]];
  }

  const { count, rows } = await Task.findAndCountAll({
    where,
    include: getFullInclude(),
    order,
    limit: parseInt(limit),
    offset: parseInt(offset),
    subQuery: false,
  });

  return {
    data: rows,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

export const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({
    where: { id: taskId, userId },
    include: getFullInclude(),
  });

  if (!task) {
    throw new NotFoundError('Task not found');
  }
  return task;
};

const validateRelationships = async (userId, applicationId, interviewId) => {
  if (applicationId) {
    const app = await Application.findOne({ where: { id: applicationId, userId } });
    if (!app) throw new BadRequestError('Invalid application selected');
  }

  if (interviewId) {
    const interview = await Interview.findOne({ where: { id: interviewId, userId } });
    if (!interview) throw new BadRequestError('Invalid interview selected');

    // If both provided, interview must belong to application
    if (applicationId && interview.applicationId !== applicationId) {
      throw new BadRequestError('Selected interview does not belong to the selected application');
    }
  }
};

export const createTask = async (userId, data) => {
  await validateRelationships(userId, data.applicationId, data.interviewId);

  // If created as completed directly (rare but possible)
  if (data.status === TASK_STATUS.COMPLETED) {
    data.completedAt = new Date();
  }

  const task = await Task.create({
    ...data,
    userId,
  });

  return await getTaskById(userId, task.id);
};

export const updateTask = async (userId, taskId, data) => {
  const task = await getTaskById(userId, taskId);

  if (data.applicationId !== undefined || data.interviewId !== undefined) {
    const newAppId = data.applicationId !== undefined ? data.applicationId : task.applicationId;
    const newIntvId = data.interviewId !== undefined ? data.interviewId : task.interviewId;
    await validateRelationships(userId, newAppId, newIntvId);
  }

  if (data.status) {
    if (data.status === TASK_STATUS.COMPLETED && task.status !== TASK_STATUS.COMPLETED) {
      data.completedAt = new Date();
    } else if (data.status !== TASK_STATUS.COMPLETED) {
      data.completedAt = null;
    }
  }

  await task.update(data);
  return await getTaskById(userId, taskId);
};

export const updateTaskStatus = async (userId, taskId, status) => {
  const task = await getTaskById(userId, taskId);
  
  const updateFields = { status };
  if (status === TASK_STATUS.COMPLETED) {
    updateFields.completedAt = new Date();
  } else {
    updateFields.completedAt = null;
  }

  await task.update(updateFields);
  return await getTaskById(userId, taskId);
};

export const toggleTaskCompletion = async (userId, taskId) => {
  const task = await getTaskById(userId, taskId);
  
  if (task.status === TASK_STATUS.COMPLETED) {
    // Revert to pending
    await task.update({ status: TASK_STATUS.PENDING, completedAt: null });
  } else {
    // Complete it
    await task.update({ status: TASK_STATUS.COMPLETED, completedAt: new Date() });
  }
  
  return await getTaskById(userId, taskId);
};

export const deleteTask = async (userId, taskId) => {
  const task = await getTaskById(userId, taskId);
  await task.destroy();
  return true;
};
