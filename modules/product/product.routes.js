import express from "express";

import {
  getAllProducts,
  getFeaturedProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getSingleProduct);

router.post("/", authMiddleware, validate(createProductSchema), createProduct);
router.put("/:id", authMiddleware, validate(updateProductSchema), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;