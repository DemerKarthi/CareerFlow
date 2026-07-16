import response from '../utils/response.js';
import AppError from '../errors/AppError.js';
import { MESSAGES } from '../constants/messages.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import env from '../config/env.js';

const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  if (env.nodeEnv === 'development') {
    console.error(err);
  }

  // Handle specific Sequelize errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return response.error(res, MESSAGES.DUPLICATE_FIELD, [], HTTP_STATUS.CONFLICT);
  }

  if (err.name === 'SequelizeValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return response.badRequest(res, message);
  }

  // Handle our custom AppErrors
  if (err instanceof AppError) {
    return response.error(res, err.message, err.errors || [], err.statusCode);
  }

  // Default to 500 server error
  return response.serverError(res, err.message || MESSAGES.SERVER_ERROR);
};

export default errorHandler;
