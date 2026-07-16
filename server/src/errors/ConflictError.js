import AppError from './AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export class ConflictError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

export default ConflictError;
