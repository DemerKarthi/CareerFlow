import { recruiterSchema } from '../schemas/recruiter.schema.js';
import BadRequestError from '../errors/BadRequestError.js';

export const validateRecruiter = (req, res, next) => {
  const validation = recruiterSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};
