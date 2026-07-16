import { Op } from 'sequelize';
import Company from '../models/Company.js';
import NotFoundError from '../errors/NotFoundError.js';

export const getAllCompanies = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    status,
    priority,
    workMode,
    sortBy = 'createdAt',
    sortOrder = 'DESC',
  } = queryParams;

  const offset = (page - 1) * limit;

  // Build Where Clause
  const where = { userId };

  if (search) {
    where[Op.or] = [
      { companyName: { [Op.like]: `%${search}%` } },
      { industry: { [Op.like]: `%${search}%` } },
      { location: { [Op.like]: `%${search}%` } },
    ];
  }

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (workMode) where.workMode = workMode;

  const { count, rows } = await Company.findAndCountAll({
    where,
    order: [[sortBy, sortOrder.toUpperCase()]],
    limit: parseInt(limit),
    offset: parseInt(offset),
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

export const getCompanyById = async (userId, companyId) => {
  const company = await Company.findOne({ where: { id: companyId, userId } });
  if (!company) {
    throw new NotFoundError('Company not found');
  }
  return company;
};

export const createCompany = async (userId, data) => {
  // Generate initials for logoUrl if not provided (frontend can also handle this, but good fallback)
  const logoUrl = data.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.companyName)}&background=random`;
  
  const company = await Company.create({
    ...data,
    logoUrl,
    userId,
  });
  return company;
};

export const updateCompany = async (userId, companyId, data) => {
  const company = await getCompanyById(userId, companyId);
  
  const updatedCompany = await company.update(data);
  return updatedCompany;
};

export const deleteCompany = async (userId, companyId) => {
  const company = await getCompanyById(userId, companyId);
  await company.destroy(); // Soft delete because paranoid: true
  return true;
};
