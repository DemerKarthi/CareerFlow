import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  toggleTaskCompletion,
  deleteTask,
} from '../controllers/task.controller.js';
import { validateTask, validateTaskStatus } from '../validators/task.validator.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router.route('/:id')
  .get(getTask)
  .put(validateTask, updateTask)
  .delete(deleteTask);

router.route('/:id/status')
  .patch(validateTaskStatus, updateTaskStatus);

router.route('/:id/complete')
  .patch(toggleTaskCompletion);

export default router;
