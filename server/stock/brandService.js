import prisma from "../db";
import StockError from "../utils/StockError";

export const getAllBrands = async () => {
  try {
    return await prisma.brand.findMany();
  } catch (error) {
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const createBrand = async (brandInfo) => {
  const { name, image } = brandInfo;
  console.log(brandInfo);
  if (!name) {
    throw new StockError(400, "Brand name is required!");
  }

  try {
    const brand = await prisma.brand.create({
      data: brandInfo,
    });
    return brand;
  } catch (error) {
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};
