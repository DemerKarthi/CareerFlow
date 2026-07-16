import express from 'express';
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../controllers/company.controller.js';
import { validateCompany } from '../validators/company.validator.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All company routes are protected
router.use(protect);

router.route('/')
  .get(getCompanies)
  .post(validateCompany, createCompany);

router.route('/:id')
  .get(getCompany)
  .put(validateCompany, updateCompany)
  .delete(deleteCompany);

export default router;
