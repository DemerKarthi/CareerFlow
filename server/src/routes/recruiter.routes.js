import express from 'express';
import {
  getRecruiters,
  getRecruiter,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
} from '../controllers/recruiter.controller.js';
import { validateRecruiter } from '../validators/recruiter.validator.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All recruiter routes are protected
router.use(protect);

router.route('/')
  .get(getRecruiters)
  .post(validateRecruiter, createRecruiter);

router.route('/:id')
  .get(getRecruiter)
  .put(validateRecruiter, updateRecruiter)
  .delete(deleteRecruiter);

export default router;
