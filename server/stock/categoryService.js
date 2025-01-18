import prisma from "../db";
import StockError from "../utils/error/StockError";
import { throwErrorOnMissingField } from "../utils/validators";

export const getAllCategories = async () => {
  try {
    return await prisma.category.findMany({
      where: {
        isDeleted: false,
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

export const createCategory = async (categoryInfo) => {
  const validatingFields = ["name"];
  throwErrorOnMissingField(validatingFields, categoryInfo);

  try {
    const category = await prisma.category.create({
      data: categoryInfo,
    });
    return category;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const updateCategory = async (categoryInfo) => {
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(categoryInfo.id) },
      data: {
        ...categoryInfo,
      },
    });
    return category;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const deleteCategory = async (categoryId) => {
  //TODO: find category by id and validate

  try {
    if (false) {
      throw new StockError(400, "Category doesn't exist!");
    }
    await prisma.category.update({
      data: { isDeleted: true },
      where: {
        id: parseInt(categoryId),
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
