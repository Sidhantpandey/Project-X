import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { loginUser, registerUser } from '../services/userService.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser({ name, email, password });
  req.session.userId = user.id;

  res.status(201).json(
    new ApiResponse(201, { user }, 'Account created successfully')
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser({ email, password });
  req.session.userId = user.id;

  res.status(200).json(
    new ApiResponse(200, { user }, 'Login successful')
  );
});

export const logout = asyncHandler(async (req, res) => {
  await new Promise((resolve, reject) => {
    req.session.destroy((err) => (err ? reject(err) : resolve()));
  });

  res.clearCookie('connect.sid');
  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'));
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, 'User profile fetched')
  );
});

export default { register, login, logout, getMe };
