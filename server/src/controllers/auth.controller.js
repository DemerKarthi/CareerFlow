import authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import response from '../utils/response.js';
import env from '../config/env.js';
import { MESSAGES } from '../constants/messages.js';

// Helper to set cookie
const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  res.cookie('token', token, cookieOptions);
};

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);
  
  setTokenCookie(res, token);
  
  return response.created(res, MESSAGES.REGISTER_SUCCESSFUL, { user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);
  
  setTokenCookie(res, token);
  
  return response.success(res, MESSAGES.LOGIN_SUCCESSFUL, { user });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'strict'
  });
  
  return response.success(res, MESSAGES.LOGOUT_SUCCESSFUL);
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  
  return response.success(res, 'User retrieved successfully', { user });
});
