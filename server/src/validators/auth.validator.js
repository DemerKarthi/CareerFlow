import { registerSchema } from '../schemas/register.schema.js';
import { loginSchema } from '../schemas/login.schema.js';
import BadRequestError from '../errors/BadRequestError.js';
import { MESSAGES } from '../constants/messages.js';

export const validateRegister = (req, res, next) => {
  const validation = registerSchema(req.body);

  if (!validation.isValid) {
    // If we only want the first message as the primary error string or custom format:
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const validation = loginSchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};
