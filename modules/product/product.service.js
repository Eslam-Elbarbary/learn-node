import prisma from "../../lib/prisma.js";

const createSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const formatProduct = (product) => {
  if (!product) {
    return null;
  }

  return {
    ...product,
    price: product.price.toString(),
  };
};

const getAllProductsServices = async () => {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(formatProduct);
};

const getFeaturedProductsService = async () => {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map(formatProduct);
};

const getSingleProductService = async (productId) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      isActive:true
    },
    include: {
      category: true,
    },
  });

  return formatProduct(product);
};

const createProductService = async (productData) => {
  const slug = createSlug(productData.name);

  const newProduct = await prisma.product.create({
    data: {
      name: productData.name,
      slug,
      description: productData.description ?? null,
      price: productData.price,
      stock: productData.stock ?? 0,
      isFeatured: productData.isFeatured ?? false,
      isActive: productData.isActive ?? true,
      categoryId: productData.categoryId,
    },
    include: {
      category: true,
    },
  });

  return formatProduct(newProduct);
};

const updateProductService = async (productId, updatedData) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      isActive : true
    },
  });

  if (!product) {
    return null;
  }

  const dataToUpdate = {
    ...updatedData,
  };

  if (updatedData.name) {
    dataToUpdate.slug = createSlug(updatedData.name);
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: dataToUpdate,
    include: {
      category: true,
    },
  });

  return formatProduct(updatedProduct);
};

const deleteProductService = async (productId) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      isActive : true
    },
  });

  if (!product) {
    return null;
  }

  const deletedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      isActive: false,
    },
    include: {
      category: true,
    },
  });

  return formatProduct(deletedProduct);
};

export {
  getAllProductsServices,
  createProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
  getFeaturedProductsService,
};