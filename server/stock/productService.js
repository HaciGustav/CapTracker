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
    if (error instanceof StockError) {
      throw error;
    }
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
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const createProduct = async (productInfo) => {
  const validatingFields = ["name", "price", "stock", "brandId", "categoryId"];
  throwErrorOnMissingField(validatingFields, productInfo);
  const { stock, min, max, price } = productInfo;

  try {
    const product = await prisma.product.create({
      data: {
        ...productInfo,
        stock: parseInt(stock),
        min: parseInt(min),
        max: parseInt(max),
        price: parseFloat(price).toFixed(2),
      },
    });
    return product;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const updateProduct = async (productInfo) => {
  console.log(productInfo);
  try {
    const { id, brand, category, stock, min, max, price, ...restInfo } = productInfo;
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(productInfo.id) },
      data: {
        ...restInfo,
        ...(stock ? { stock: parseInt(stock) } : {}),
        ...(min ? { min: parseInt(min) } : {}),
        ...(max ? { max: parseInt(max) } : {}),
        ...(price ? { price: parseFloat(price).toFixed(2) } : {}),
      },
    });
    return updatedProduct;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const deleteProduct = async (productId) => {
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
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};
