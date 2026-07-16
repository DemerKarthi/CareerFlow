import * as applicationService from '../services/application.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { response } from '../utils/response.js';

export const getApplications = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await applicationService.getAllApplications(userId, req.query);
  
  return response.paginated(
    res, 
    'Applications retrieved successfully', 
    result.data, 
    result.pagination
  );
});

export const getApplication = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const applicationId = req.params.id;
  
  const application = await applicationService.getApplicationById(userId, applicationId);
  return response.success(res, 'Application retrieved successfully', { application });
});

export const createApplication = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const application = await applicationService.createApplication(userId, req.body);
  
  return response.created(res, 'Application created successfully', { application });
});

export const updateApplication = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const applicationId = req.params.id;
  
  const application = await applicationService.updateApplication(userId, applicationId, req.body);
  return response.success(res, 'Application updated successfully', { application });
});

export const updateApplicationStage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const applicationId = req.params.id;
  const { currentStage } = req.body;
  
  const application = await applicationService.updateApplicationStage(userId, applicationId, currentStage);
  return response.success(res, 'Application stage updated successfully', { application });
});

export const deleteApplication = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const applicationId = req.params.id;
  
  await applicationService.deleteApplication(userId, applicationId);
  return response.success(res, 'Application deleted successfully');
});
