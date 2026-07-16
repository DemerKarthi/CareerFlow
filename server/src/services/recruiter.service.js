import { Op } from 'sequelize';
import Recruiter from '../models/Recruiter.js';
import Company from '../models/Company.js';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';

export const getAllRecruiters = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    companyId,
    department,
    isPrimaryContact,
    sortBy = 'createdAt',
    sortOrder = 'DESC',
  } = queryParams;

  const offset = (page - 1) * limit;

  // Build Where Clause
  const where = { userId };

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { designation: { [Op.like]: `%${search}%` } },
      { '$company.companyName$': { [Op.like]: `%${search}%` } },
    ];
  }

  if (companyId) where.companyId = companyId;
  if (department) where.department = department;
  if (isPrimaryContact !== undefined && isPrimaryContact !== '') {
    where.isPrimaryContact = isPrimaryContact === 'true';
  }

  // Handle sorting
  let order = [];
  if (sortBy === 'companyName') {
    order = [[{ model: Company, as: 'company' }, 'companyName', sortOrder.toUpperCase()]];
  } else {
    order = [[sortBy, sortOrder.toUpperCase()]];
  }

  const { count, rows } = await Recruiter.findAndCountAll({
    where,
    include: [{
      model: Company,
      as: 'company',
      attributes: ['id', 'companyName', 'logoUrl', 'industry', 'location'],
    }],
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

export const getRecruiterById = async (userId, recruiterId) => {
  const recruiter = await Recruiter.findOne({
    where: { id: recruiterId, userId },
    include: [{
      model: Company,
      as: 'company',
      attributes: ['id', 'companyName', 'logoUrl', 'website', 'industry', 'location'],
    }],
  });

  if (!recruiter) {
    throw new NotFoundError('Recruiter not found');
  }
  return recruiter;
};

export const createRecruiter = async (userId, data) => {
  // Validate that the company belongs to the user
  const company = await Company.findOne({ where: { id: data.companyId, userId } });
  if (!company) {
    throw new BadRequestError('Invalid company selected');
  }

  const recruiter = await Recruiter.create({
    ...data,
    userId,
  });

  return await getRecruiterById(userId, recruiter.id);
};

export const updateRecruiter = async (userId, recruiterId, data) => {
  const recruiter = await getRecruiterById(userId, recruiterId);

  // If changing company, validate ownership
  if (data.companyId && data.companyId !== recruiter.companyId) {
    const company = await Company.findOne({ where: { id: data.companyId, userId } });
    if (!company) {
      throw new BadRequestError('Invalid company selected');
    }
  }

  await recruiter.update(data);
  return await getRecruiterById(userId, recruiterId);
};

export const deleteRecruiter = async (userId, recruiterId) => {
  const recruiter = await getRecruiterById(userId, recruiterId);
  await recruiter.destroy(); // Soft delete via paranoid: true
  return true;
};
