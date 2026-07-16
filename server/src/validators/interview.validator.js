import { interviewSchema, interviewStatusSchema } from '../schemas/interview.schema.js';
import BadRequestError from '../errors/BadRequestError.js';

export const validateInterview = (req, res, next) => {
  const validation = interviewSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};

export const validateInterviewStatus = (req, res, next) => {
  const validation = interviewStatusSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};
