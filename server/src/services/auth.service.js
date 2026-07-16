import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import ConflictError from '../errors/ConflictError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import NotFoundError from '../errors/NotFoundError.js';
import { MESSAGES } from '../constants/messages.js';

class AuthService {
  async registerUser(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictError(MESSAGES.USER_ALREADY_EXISTS);
    }

    // Create user (password hashed via model hook)
    const newUser = await User.create({
      name,
      email,
      password,
    });

    return this.generateAuthResponse(newUser);
  }

  async loginUser(email, password) {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedError(MESSAGES.INVALID_CREDENTIALS);
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError(MESSAGES.INVALID_CREDENTIALS);
    }

    return this.generateAuthResponse(user);
  }

  generateAuthResponse(user) {
    // Generate JWT payload
    const payload = {
      id: user.id,
      email: user.email,
    };

    // Sign JWT
    const token = jwt.sign(payload, env.jwtSecret, {
      expiresIn: '7d', // 7 days
    });

    // Return user without password
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { user: userWithoutPassword, token };
  }

  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw new NotFoundError(MESSAGES.NOT_FOUND);
    }

    return user;
  }
}

export default new AuthService();
