// import product services
const {
    getAllProductsServices,
    createProductService,
    getSingleProductService,
    updateProductService,
    deleteProductService,
    getFeaturedProductsService
} = require('./product.service');

// import utils
const asyncHandler = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/response.helper');
const AppError = require('../../utils/appError');

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = getAllProductsServices();
    return successResponse(res, 200, "all products fetched successfully", { products });
});

// get featured products
const getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = getFeaturedProductsService();
    return successResponse(res, 200, "featured products fetched successfully", { products });
});

// get single product
const getSingleProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = getSingleProductService(productId);
    if (!product) {
         throw new AppError("product not found", 404);
    }
    return successResponse(res, 200, "single product fetched successfully", { product });
});

// create product
const createProduct = asyncHandler(async (req, res) => {
    const productData = req.body;
    const user = req.user;

    const newProduct = createProductService(productData);

    return successResponse(res, 201, "product created successfully", { product: newProduct, createdBy: user });
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    const user = req.user;
    const updatedProduct = updateProductService(productId, updatedData);
    if (!updatedProduct) {
        throw new AppError("product not found", 404);
    }
    return successResponse(res, 200, "product updated successfully", { productId, product: updatedProduct, updatedBy: user });
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const user = req.user;
    const deletedProduct = deleteProductService(productId);
    if (!deletedProduct) {
        throw new AppError("product not found", 404);
    }
    return successResponse(res, 200, "product deleted successfully", { deletedProduct, deletedBy: user });
});

// export all controller functions
module.exports = { getAllProducts, getFeaturedProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, }; 