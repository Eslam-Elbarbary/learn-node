const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
];

const getAllProductsServices = () => {
  return products;
};

const createProductService = (productData) => {
  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;

  const newProduct = {
    id: newId,
    name: productData.name,
    description: productData.description ?? null,
    price: productData.price,
    category: productData.category,
  };

  products.push(newProduct);

  return newProduct;
};

const getSingleProductService = (productId) => {
  return products.find((product) => product.id === Number(productId));
};

const updateProductService = (productId, updatedData) => {
  const product = products.find(
    (product) => product.id === Number(productId)
  );

  if (!product) {
    return null;
  }

  product.name = updatedData.name ?? product.name;
  product.description = updatedData.description ?? product.description;
  product.price = updatedData.price ?? product.price;
  product.category = updatedData.category ?? product.category;

  return product;
};

const deleteProductService = (productId) => {
  const productIndex = products.findIndex(
    (product) => product.id === Number(productId)
  );

  if (productIndex === -1) {
    return null;
  }

  const deletedProduct = products.splice(productIndex, 1)[0];

  return deletedProduct;
};

const getFeaturedProductsService = () => {
  return products.filter((product) => product.price > 150);
};

export {
  getAllProductsServices,
  createProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
  getFeaturedProductsService,
};