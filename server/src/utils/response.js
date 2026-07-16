import { HTTP_STATUS } from '../constants/httpStatus.js';

export const response = {
  success: (res, message, data = {}, statusCode = HTTP_STATUS.OK) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  created: (res, message, data = {}) => {
    return response.success(res, message, data, HTTP_STATUS.CREATED);
  },

  paginated: (res, message, data = [], pagination = {}, statusCode = HTTP_STATUS.OK) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination,
    });
  },

  error: (res, message, errors = [], statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  },

  badRequest: (res, message, errors = []) => {
    return response.error(res, message, errors, HTTP_STATUS.BAD_REQUEST);
  },

  unauthorized: (res, message) => {
    return response.error(res, message, [], HTTP_STATUS.UNAUTHORIZED);
  },

  forbidden: (res, message) => {
    return response.error(res, message, [], HTTP_STATUS.FORBIDDEN);
  },

  notFound: (res, message) => {
    return response.error(res, message, [], HTTP_STATUS.NOT_FOUND);
  },

  conflict: (res, message) => {
    return response.error(res, message, [], HTTP_STATUS.CONFLICT);
  },

  serverError: (res, message) => {
    return response.error(res, message, [], HTTP_STATUS.INTERNAL_SERVER_ERROR);
  },
};

export default response;
