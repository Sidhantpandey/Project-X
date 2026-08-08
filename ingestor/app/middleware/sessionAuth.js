import { ApiError } from '../utils/ApiError.js';
import { getUserById } from '../services/userService.js';

export const sessionAuth = (req, res, next) => {
  if (!req.session?.userId) {
    return next(new ApiError(401, 'Authentication required'));
  }

  const user = getUserById(req.session.userId);
  if (!user) {
    req.session.destroy(() => {});
    return next(new ApiError(401, 'User not found'));
  }

  req.user = user;
  next();
};

export default { sessionAuth };
