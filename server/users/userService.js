import prisma from "../db";
import { systemFailLog } from "../utils/logger/_logger";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
    systemFailLog(JSON.stringify(error));
  }
};

export const createUsers = async (userInfo) => {
  const validatingFields = ["name"];
  // throwErrorOnMissingField(validatingFields, userInfo);

  try {
    const user = await prisma.user.create({
      data: userInfo,
    });
    return user;
  } catch (error) {
    console.log(error);
    systemFailLog(JSON.stringify(error));
  }
};