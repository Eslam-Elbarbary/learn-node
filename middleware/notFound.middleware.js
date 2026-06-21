import AppError from "../utils/appError.js";

const notFoundMiddleware = (req, res, next) => {
  return next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export default notFoundMiddleware;