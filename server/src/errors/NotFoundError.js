import AppError from './AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export class NotFoundError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

export default NotFoundError;
