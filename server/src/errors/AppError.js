export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Identifies expected vs unhandled errors

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
