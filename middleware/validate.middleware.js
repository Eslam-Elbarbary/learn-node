const AppError = require("../utils/appError");

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const validationErrors = result.error.issues.map((issue) => {
                return {
                    field: issue.path.join(".") || "body",
                    message: issue.message
                };
            });

            return next(
                new AppError(
                    "Validation failed",
                    400,
                    validationErrors
                )
            );
        }

        req.body = result.data;

        return next();
    };
};

module.exports = validate;