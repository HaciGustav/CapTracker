import prisma from "../db";
import StockError from "../utils/StockError";

const transformProduct = (product) => {
  const { category, brand } = product;
  return {
    ...product,
    brand: brand?.name,
    category: category?.name,
  };
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      relationLoadStrategy: "join",
      include: {
        brand: {
          select: { name: true },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return products.map((product) => transformProduct(product));
  } catch (error) {
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};
