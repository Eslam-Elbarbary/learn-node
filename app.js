import express from "express";

import loggerMiddleware from "./middleware/logger.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

import userRouter from "./modules/user/user.routes.js";
import productRouter from "./modules/product/product.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.use("/users", userRouter);
app.use("/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;