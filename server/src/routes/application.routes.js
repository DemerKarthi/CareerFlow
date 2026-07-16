import express from 'express';
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  updateApplicationStage,
  deleteApplication,
} from '../controllers/application.controller.js';
import { validateApplication, validateStageUpdate } from '../validators/application.validator.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All application routes are protected
router.use(protect);

router.route('/')
  .get(getApplications)
  .post(validateApplication, createApplication);

router.route('/:id')
  .get(getApplication)
  .put(validateApplication, updateApplication)
  .delete(deleteApplication);

router.route('/:id/stage')
  .patch(validateStageUpdate, updateApplicationStage);

export default router;
