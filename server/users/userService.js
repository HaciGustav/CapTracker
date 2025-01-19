import prisma from "../db";
import AuthenticationError from "../utils/error/AuthenticationError";
import BaseError from "../utils/error/BaseError";
import { throwErrorOnMissingField } from "../utils/validators";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        is_active: true,
      },
    });
    return users;
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }
    console.log(error);
    throw new AuthenticationError(500, "Something went wrong on the server!");
  }
};

export const createUser = async (userInfo) => {
  const validatingFields = [
    "password",
    "username",
    "email",
    "firstname",
    "lastname",
  ];
  throwErrorOnMissingField(validatingFields, userInfo);

  const { password, username, email, firstname, lastname, user_role } =
    userInfo;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
        email,
      },
    });

    if (existingUser) {
      if (!existingUser.is_active) {
        return await prisma.user.update({
          where: { id: existingUser.id },
          data: { is_active: true, password },
        });
      } else {
        return await prisma.user.update({
          where: { id: existingUser.id },
          data: userInfo,
        })
      }
    }

    return await prisma.user.create({
      data: userInfo,
    });
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }
    console.log(error);
    throw new AuthenticationError(500, "Something went wrong on the server!");
  }
};

export const deactivateUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user.is_active) {
      throw new AuthenticationError(400, "User is already inactive!");
    }

    return await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        is_active: false,
      },
    });
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }
    console.log(error);
    throw new AuthenticationError(500, "Something went wrong on the server!");
  }
};
