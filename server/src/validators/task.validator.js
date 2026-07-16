import { taskSchema, taskStatusSchema } from '../schemas/task.schema.js';
import BadRequestError from '../errors/BadRequestError.js';

export const validateTask = (req, res, next) => {
  const validation = taskSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};

export const validateTaskStatus = (req, res, next) => {
  const validation = taskStatusSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};
