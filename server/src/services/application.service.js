import { Op } from 'sequelize';
import Application from '../models/Application.js';
import Company from '../models/Company.js';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';

export const getAllApplications = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    companyId,
    stage,
    status,
    priority,
    platform,
    employmentType,
    sortBy = 'createdAt',
    sortOrder = 'DESC',
  } = queryParams;

  const offset = (page - 1) * limit;

  // Build Where Clause
  const where = { userId };

  if (search) {
    where[Op.or] = [
      { jobTitle: { [Op.like]: `%${search}%` } },
      { recruiterName: { [Op.like]: `%${search}%` } },
      // Company name search is handled via include below
      { '$company.companyName$': { [Op.like]: `%${search}%` } }
    ];
  }

  if (companyId) where.companyId = companyId;
  if (stage) where.currentStage = stage;
  if (status) where.applicationStatus = status;
  if (priority) where.priority = priority;
  if (platform) where.platform = platform;
  if (employmentType) where.employmentType = employmentType;

  // Handle sorting mapping since standard sorts might reference associations
  let order = [];
  if (sortBy === 'companyName') {
    order = [[{ model: Company, as: 'company' }, 'companyName', sortOrder.toUpperCase()]];
  } else {
    order = [[sortBy, sortOrder.toUpperCase()]];
  }

  const { count, rows } = await Application.findAndCountAll({
    where,
    include: [{
      model: Company,
      as: 'company',
      attributes: ['id', 'companyName', 'logoUrl', 'location', 'industry']
    }],
    order,
    limit: parseInt(limit),
    offset: parseInt(offset),
    subQuery: false, // Required when ordering/searching by associated model
  });

  return {
    data: rows,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    }
  };
};

export const getApplicationById = async (userId, applicationId) => {
  const application = await Application.findOne({
    where: { id: applicationId, userId },
    include: [{
      model: Company,
      as: 'company',
      attributes: ['id', 'companyName', 'logoUrl', 'website', 'industry', 'location']
    }]
  });

  if (!application) {
    throw new NotFoundError('Application not found');
  }
  return application;
};

export const createApplication = async (userId, data) => {
  // Validate that the company belongs to the user
  const company = await Company.findOne({ where: { id: data.companyId, userId } });
  if (!company) {
    throw new BadRequestError('Invalid company selected');
  }

  const application = await Application.create({
    ...data,
    userId,
  });
  
  // Return with company include for the UI
  return await getApplicationById(userId, application.id);
};

export const updateApplication = async (userId, applicationId, data) => {
  const application = await getApplicationById(userId, applicationId);
  
  // If changing company, validate ownership
  if (data.companyId && data.companyId !== application.companyId) {
    const company = await Company.findOne({ where: { id: data.companyId, userId } });
    if (!company) {
      throw new BadRequestError('Invalid company selected');
    }
  }
  
  await application.update(data);
  return await getApplicationById(userId, applicationId);
};

export const updateApplicationStage = async (userId, applicationId, currentStage) => {
  const application = await getApplicationById(userId, applicationId);
  await application.update({ currentStage });
  return await getApplicationById(userId, applicationId);
};

export const deleteApplication = async (userId, applicationId) => {
  const application = await getApplicationById(userId, applicationId);
  await application.destroy(); // Soft delete because paranoid: true
  return true;
};
