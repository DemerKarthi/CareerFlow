import AppError from './AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export class BadRequestError extends AppError {
  constructor(message, errors = []) {
    super(message, HTTP_STATUS.BAD_REQUEST);
    this.errors = errors; // Allows returning detailed validation errors
  }
}

export default BadRequestError;
