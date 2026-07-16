import { Op } from 'sequelize';
import Interview from '../models/Interview.js';
import Application from '../models/Application.js';
import Company from '../models/Company.js';
import Recruiter from '../models/Recruiter.js';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';

// Shared include chain: Interview → Application → Company, Interview → Recruiter
const getFullInclude = () => [
  {
    model: Application,
    as: 'application',
    attributes: ['id', 'jobTitle', 'companyId', 'currentStage', 'applicationStatus'],
    include: [{
      model: Company,
      as: 'company',
      attributes: ['id', 'companyName', 'logoUrl', 'industry', 'location'],
    }],
  },
  {
    model: Recruiter,
    as: 'recruiter',
    attributes: ['id', 'name', 'designation', 'email', 'phone'],
  },
];

export const getAllInterviews = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    applicationId,
    companyId,
    status,
    result,
    interviewType,
    mode,
    dateFrom,
    dateTo,
    sortBy = 'scheduledAt',
    sortOrder = 'DESC',
  } = queryParams;

  const offset = (page - 1) * limit;
  const where = { userId };

  if (search) {
    where[Op.or] = [
      { interviewerName: { [Op.like]: `%${search}%` } },
      { '$application.jobTitle$': { [Op.like]: `%${search}%` } },
      { '$application.company.companyName$': { [Op.like]: `%${search}%` } },
      { '$recruiter.name$': { [Op.like]: `%${search}%` } },
    ];
  }

  if (applicationId) where.applicationId = applicationId;
  if (status) where.status = status;
  if (result) where.result = result;
  if (interviewType) where.interviewType = interviewType;
  if (mode) where.mode = mode;

  // Date range filter on scheduledAt
  if (dateFrom || dateTo) {
    where.scheduledAt = {};
    if (dateFrom) where.scheduledAt[Op.gte] = new Date(dateFrom);
    if (dateTo) where.scheduledAt[Op.lte] = new Date(dateTo + 'T23:59:59');
  }

  // Company filter via Application include
  const includeChain = getFullInclude();
  if (companyId) {
    includeChain[0].where = { companyId };
  }

  // Sorting
  let order = [];
  if (sortBy === 'companyName') {
    order = [[{ model: Application, as: 'application' }, { model: Company, as: 'company' }, 'companyName', sortOrder.toUpperCase()]];
  } else if (sortBy === 'roundNumber') {
    order = [['roundNumber', sortOrder.toUpperCase()]];
  } else {
    order = [[sortBy, sortOrder.toUpperCase()]];
  }

  const { count, rows } = await Interview.findAndCountAll({
    where,
    include: includeChain,
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

export const getInterviewById = async (userId, interviewId) => {
  const interview = await Interview.findOne({
    where: { id: interviewId, userId },
    include: getFullInclude(),
  });

  if (!interview) {
    throw new NotFoundError('Interview not found');
  }
  return interview;
};

export const getInterviewsByApplication = async (userId, applicationId) => {
  return await Interview.findAll({
    where: { userId, applicationId },
    include: [
      {
        model: Recruiter,
        as: 'recruiter',
        attributes: ['id', 'name', 'designation'],
      },
    ],
    order: [['roundNumber', 'ASC']],
  });
};

export const createInterview = async (userId, data) => {
  // Validate application ownership
  const application = await Application.findOne({
    where: { id: data.applicationId, userId },
    include: [{ model: Company, as: 'company', attributes: ['id'] }],
  });
  if (!application) {
    throw new BadRequestError('Invalid application selected');
  }

  // Validate optional recruiter ownership + company match
  if (data.recruiterId) {
    const recruiter = await Recruiter.findOne({
      where: { id: data.recruiterId, userId, companyId: application.companyId },
    });
    if (!recruiter) {
      throw new BadRequestError('Invalid recruiter selected — recruiter must belong to the same company as the application');
    }
  }

  const interview = await Interview.create({
    ...data,
    userId,
  });

  return await getInterviewById(userId, interview.id);
};

export const updateInterview = async (userId, interviewId, data) => {
  const interview = await getInterviewById(userId, interviewId);

  // If changing application, validate ownership
  if (data.applicationId && data.applicationId !== interview.applicationId) {
    const application = await Application.findOne({ where: { id: data.applicationId, userId } });
    if (!application) {
      throw new BadRequestError('Invalid application selected');
    }
  }

  // If changing recruiter, validate ownership + company match
  if (data.recruiterId && data.recruiterId !== interview.recruiterId) {
    const targetAppId = data.applicationId || interview.applicationId;
    const application = await Application.findOne({ where: { id: targetAppId, userId } });
    if (!application) {
      throw new BadRequestError('Invalid application selected');
    }
    const recruiter = await Recruiter.findOne({
      where: { id: data.recruiterId, userId, companyId: application.companyId },
    });
    if (!recruiter) {
      throw new BadRequestError('Invalid recruiter selected — recruiter must belong to the same company as the application');
    }
  }

  await interview.update(data);
  return await getInterviewById(userId, interviewId);
};

export const updateInterviewStatus = async (userId, interviewId, statusData) => {
  const interview = await getInterviewById(userId, interviewId);
  const updateFields = {};
  if (statusData.status) updateFields.status = statusData.status;
  if (statusData.result) updateFields.result = statusData.result;

  await interview.update(updateFields);
  return await getInterviewById(userId, interviewId);
};

export const deleteInterview = async (userId, interviewId) => {
  const interview = await getInterviewById(userId, interviewId);
  await interview.destroy(); // Soft delete
  return true;
};
