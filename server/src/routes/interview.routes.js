import express from 'express';
import {
  getInterviews,
  getInterview,
  createInterview,
  updateInterview,
  updateInterviewStatus,
  deleteInterview,
} from '../controllers/interview.controller.js';
import { validateInterview, validateInterviewStatus } from '../validators/interview.validator.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All interview routes are protected
router.use(protect);

router.route('/')
  .get(getInterviews)
  .post(validateInterview, createInterview);

router.route('/:id')
  .get(getInterview)
  .put(validateInterview, updateInterview)
  .delete(deleteInterview);

router.route('/:id/status')
  .patch(validateInterviewStatus, updateInterviewStatus);

export default router;
