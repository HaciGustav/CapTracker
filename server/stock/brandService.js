import prisma from "../db";
import StockError from "../utils/error/StockError";
import { throwErrorOnMissingField } from "../utils/validators";

export const getAllBrands = async () => {
  try {
    return await prisma.brand.findMany({
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

export const createBrand = async (brandInfo) => {
  const validatingFields = ["name"];
  throwErrorOnMissingField(validatingFields, brandInfo);
  try {
    const brand = await prisma.brand.create({
      data: brandInfo,
    });
    return brand;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const updateBrand = async (brandInfo) => {
  try {
    const updatedBrand = await prisma.brand.update({
      where: { id: parseInt(brandInfo.id) },
      data: {
        ...brandInfo,
      },
    });
    return updatedBrand;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const deleteBrand = async (brandId) => {
  //TODO: find brand by id and validate

  try {
    if (false) {
      throw new StockError(400, "Brand doesn't exist!");
    }
    const deleteBrand = await prisma.brand.update({
      where: {
        id: parseInt(brandId),
      },
      data: {
        isDeleted: true,
      },
    });
    return deleteBrand;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};
