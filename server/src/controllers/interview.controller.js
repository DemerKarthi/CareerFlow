import * as interviewService from '../services/interview.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { response } from '../utils/response.js';

export const getInterviews = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await interviewService.getAllInterviews(userId, req.query);

  return response.paginated(
    res,
    'Interviews retrieved successfully',
    result.data,
    result.pagination
  );
});

export const getInterview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const interviewId = req.params.id;

  const interview = await interviewService.getInterviewById(userId, interviewId);
  return response.success(res, 'Interview retrieved successfully', { interview });
});

export const createInterview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const interview = await interviewService.createInterview(userId, req.body);

  return response.created(res, 'Interview created successfully', { interview });
});

export const updateInterview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const interviewId = req.params.id;

  const interview = await interviewService.updateInterview(userId, interviewId, req.body);
  return response.success(res, 'Interview updated successfully', { interview });
});

export const updateInterviewStatus = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const interviewId = req.params.id;

  const interview = await interviewService.updateInterviewStatus(userId, interviewId, req.body);
  return response.success(res, 'Interview status updated successfully', { interview });
});

export const deleteInterview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const interviewId = req.params.id;

  await interviewService.deleteInterview(userId, interviewId);
  return response.success(res, 'Interview deleted successfully');
});
