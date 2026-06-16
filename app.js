const express = require("express");
const loggerMiddleware = require("./middleware/logger.middleware");
const notFoundMiddleware = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");
const userRouter = require("./modules/user/user.routes");
const productRouter = require("./modules/product/product.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use(notFoundMiddleware);
app.use(errorHandler);

module.exports = app;