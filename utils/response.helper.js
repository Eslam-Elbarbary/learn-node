const successResponse = (res, statusCode, message, data = {}) => {
    res.status(statusCode).json({ message, data });
};

module.exports = { successResponse };