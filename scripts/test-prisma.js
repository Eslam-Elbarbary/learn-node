import prisma from "../lib/prisma.js";

async function main() {
  const categoriesCount = await prisma.category.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();

  console.log("Prisma connected successfully ");

  console.log({
    categoriesCount,
    productsCount,
    usersCount,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Prisma connection failed ❌");
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  });