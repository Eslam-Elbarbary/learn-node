const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is required",
    });
  }

  const parts = authHeader.split(" ");

  const tokenType = parts[0];
  const token = parts[1];

  if (tokenType !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization format",
    });
  }

  if (token !== "secret-token") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.user = {
    id: "test-user-id",
    role: "ADMIN",
  };

  next();
};

export default authMiddleware;