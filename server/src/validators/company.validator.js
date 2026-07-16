import { companySchema } from '../schemas/company.schema.js';
import BadRequestError from '../errors/BadRequestError.js';

export const validateCompany = (req, res, next) => {
  const validation = companySchema(req.body);

  if (!validation.isValid) {
    throw new BadRequestError(validation.errors[0], validation.errors);
  }

  next();
};
