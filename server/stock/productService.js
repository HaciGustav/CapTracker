import prisma from "../db";
import StockError from "../utils/error/StockError";

import { throwErrorOnMissingField } from "../utils/validators";

const transformProduct = (product) => {
  const { category, brand } = product;
  return {
    ...product,
    brand: brand?.name,
    category: category?.name,
  };
};

export const getProductById = async (productId) => {
  try {
    const product = await prisma.product.findUnique({
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
      where: {
        id: productId,
        isDeleted: false,
      },
    });
    return transformProduct(product);
  } catch (error) {
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
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
      where: {
        isDeleted: false,
      },
    });

    return products.map((product) => transformProduct(product));
  } catch (error) {
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const createProduct = async (productInfo) => {
  const validatingFields = ["name", "price", "stock", "brandId", "categoryId"];
  throwErrorOnMissingField(validatingFields, productInfo);

  try {
    const product = await prisma.product.create({
      data: productInfo,
    });

    return product;
  } catch (error) {
    console.log(error);

    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const updateProduct = async (productInfo) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(productInfo.id) },
      data: {
        ...productInfo,
      },
    });

    return updatedProduct;
  } catch (error) {
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const deleteProduct = async (productId) => {
  //TODO: find product by id and validate
  // console.log({ productId });
  try {
    if (false) {
      throw new StockError(400, "Product doesn't exist!");
    }
    await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        isDeleted: true,
      },
    });
  } catch (error) {
    console.log(error);

    throw new StockError(500, "Something went wrong on the server!");
  }
};
