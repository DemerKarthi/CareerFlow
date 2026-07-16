import * as taskService from '../services/task.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { response } from '../utils/response.js';

export const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await taskService.getAllTasks(userId, req.query);

  return response.paginated(
    res,
    'Tasks retrieved successfully',
    result.data,
    result.pagination
  );
});

export const getTask = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  const task = await taskService.getTaskById(userId, taskId);
  return response.success(res, 'Task retrieved successfully', { task });
});

export const createTask = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const task = await taskService.createTask(userId, req.body);

  return response.created(res, 'Task created successfully', { task });
});

export const updateTask = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  const task = await taskService.updateTask(userId, taskId, req.body);
  return response.success(res, 'Task updated successfully', { task });
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { status } = req.body;

  const task = await taskService.updateTaskStatus(userId, taskId, status);
  return response.success(res, 'Task status updated successfully', { task });
});

export const toggleTaskCompletion = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  const task = await taskService.toggleTaskCompletion(userId, taskId);
  const actionStr = task.status === 'Completed' ? 'completed' : 'marked as pending';
  
  return response.success(res, `Task ${actionStr}`, { task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  await taskService.deleteTask(userId, taskId);
  return response.success(res, 'Task deleted successfully');
});
