const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

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