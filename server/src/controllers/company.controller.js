import * as companyService from '../services/company.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { response } from '../utils/response.js';

export const getCompanies = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await companyService.getAllCompanies(userId, req.query);
  
  return response.paginated(
    res, 
    'Companies retrieved successfully', 
    result.data, 
    result.pagination
  );
});

export const getCompany = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const companyId = req.params.id;
  
  const company = await companyService.getCompanyById(userId, companyId);
  return response.success(res, 'Company retrieved successfully', { company });
});

export const createCompany = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const company = await companyService.createCompany(userId, req.body);
  
  return response.created(res, 'Company created successfully', { company });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const companyId = req.params.id;
  
  const company = await companyService.updateCompany(userId, companyId, req.body);
  return response.success(res, 'Company updated successfully', { company });
});

export const deleteCompany = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const companyId = req.params.id;
  
  await companyService.deleteCompany(userId, companyId);
  return response.success(res, 'Company deleted successfully');
});
