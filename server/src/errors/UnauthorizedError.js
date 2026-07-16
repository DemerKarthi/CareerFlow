import AppError from './AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

export default UnauthorizedError;
