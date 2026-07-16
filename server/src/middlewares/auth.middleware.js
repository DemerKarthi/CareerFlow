import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { MESSAGES } from '../constants/messages.js';

export const protect = (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new UnauthorizedError(MESSAGES.UNAUTHORIZED));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, env.jwtSecret);

    // Add user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return next(new UnauthorizedError(MESSAGES.UNAUTHORIZED));
  }
};
