const express = require('express');
const router = express.Router();
const { getAllProducts, getFeaturedProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require('./product.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const { createProductSchema, updateProductSchema } = require('./product.validation');
const  validate  = require('../../middleware/validate.middleware');

router.get("/", getAllProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getSingleProduct);
router.post("/", authMiddleware, validate(createProductSchema), createProduct);

router.put("/:id", authMiddleware, validate(updateProductSchema), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
