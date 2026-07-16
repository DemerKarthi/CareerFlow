import { applicationSchema, stageUpdateSchema } from '../schemas/application.schema.js';
import BadRequestError from '../errors/BadRequestError.js';

export const validateApplication = (req, res, next) => {
  const validation = applicationSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};

export const validateStageUpdate = (req, res, next) => {
  const validation = stageUpdateSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};
