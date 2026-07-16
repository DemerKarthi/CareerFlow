import * as recruiterService from '../services/recruiter.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { response } from '../utils/response.js';

export const getRecruiters = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await recruiterService.getAllRecruiters(userId, req.query);

  return response.paginated(
    res,
    'Recruiters retrieved successfully',
    result.data,
    result.pagination
  );
});

export const getRecruiter = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const recruiterId = req.params.id;

  const recruiter = await recruiterService.getRecruiterById(userId, recruiterId);
  return response.success(res, 'Recruiter retrieved successfully', { recruiter });
});

export const createRecruiter = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const recruiter = await recruiterService.createRecruiter(userId, req.body);

  return response.created(res, 'Recruiter created successfully', { recruiter });
});

export const updateRecruiter = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const recruiterId = req.params.id;

  const recruiter = await recruiterService.updateRecruiter(userId, recruiterId, req.body);
  return response.success(res, 'Recruiter updated successfully', { recruiter });
});

export const deleteRecruiter = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const recruiterId = req.params.id;

  await recruiterService.deleteRecruiter(userId, recruiterId);
  return response.success(res, 'Recruiter deleted successfully');
});
