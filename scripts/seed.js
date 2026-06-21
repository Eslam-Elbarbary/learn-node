import prisma from "../lib/prisma.js";

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  console.log("Seeding database...");

  const phonesCategory = await prisma.category.upsert({
    where: {
      slug: "phones",
    },
    update: {
      name: "Phones",
      description: "Smart phones and mobile devices",
      isActive: true,
    },
    create: {
      name: "Phones",
      slug: "phones",
      description: "Smart phones and mobile devices",
      isActive: true,
    },
  });

  const laptopsCategory = await prisma.category.upsert({
    where: {
      slug: "laptops",
    },
    update: {
      name: "Laptops",
      description: "Laptops and personal computers",
      isActive: true,
    },
    create: {
      name: "Laptops",
      slug: "laptops",
      description: "Laptops and personal computers",
      isActive: true,
    },
  });

  const iphoneName = "iPhone 16";
  const iphoneSlug = createSlug(iphoneName);

  const iphoneProduct = await prisma.product.upsert({
    where: {
      slug: iphoneSlug,
    },
    update: {
      name: iphoneName,
      description: "Apple iPhone 16 with high performance and modern design",
      price: "50000.00",
      stock: 10,
      isFeatured: true,
      isActive: true,
      categoryId: phonesCategory.id,
    },
    create: {
      name: iphoneName,
      slug: iphoneSlug,
      description: "Apple iPhone 16 with high performance and modern design",
      price: "50000.00",
      stock: 10,
      isFeatured: true,
      isActive: true,
      categoryId: phonesCategory.id,
    },
  });

  const laptopName = "Lenovo ThinkPad";
  const laptopSlug = createSlug(laptopName);

  const laptopProduct = await prisma.product.upsert({
    where: {
      slug: laptopSlug,
    },
    update: {
      name: laptopName,
      description: "Reliable business laptop for daily work",
      price: "35000.00",
      stock: 5,
      isFeatured: false,
      isActive: true,
      categoryId: laptopsCategory.id,
    },
    create: {
      name: laptopName,
      slug: laptopSlug,
      description: "Reliable business laptop for daily work",
      price: "35000.00",
      stock: 5,
      isFeatured: false,
      isActive: true,
      categoryId: laptopsCategory.id,
    },
  });

  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  console.log("Seed completed successfully ✅");

  console.log({
    phonesCategory,
    laptopsCategory,
    iphoneProduct,
    laptopProduct,
  });

  console.log(
    products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      category: product.category.name,
    }))
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed ❌");
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  });