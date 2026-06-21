import env from "../config/env.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.details,
    stack: env.nodeEnv === "development" ? err.stack : undefined,
  });
};

export default errorHandler;