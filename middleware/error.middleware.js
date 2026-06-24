import env from "../config/env.js";

const getUniqueConstraintField = (err) => {
  if (Array.isArray(err.meta?.target)) {
    return err.meta.target.join(", ");
  }

  return err.meta?.target || "field";
};

const errorHandler = (err, req, res, next) => {
  if (err.code === "P2002") {
    const field = getUniqueConstraintField(err);

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      errors: [
        {
          field,
          message: "This value must be unique",
        },
      ],
      stack: env.nodeEnv === "development" ? err.stack : undefined,
    });
  }

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