import { logActivityTypes, logResultTypes } from "@/helper/enums";
import prisma from "../../db";

const authLoggerFail = async (userId, message) => {
  try {
    const log = await prisma.log.create({
      data: {
        userId,
        activityType: logActivityTypes.AUTH_OPERATION,
        result: logResultTypes.FAIL,
        message,
      },
    });
    return log;
  } catch (error) {
    console.log(error);
  }
};

const authLoggerSuccess = async (userId, message) => {
  try {
    const log = await prisma.log.create({
      data: {
        userId,
        activityType: logActivityTypes.AUTH_OPERATION,
        result: logResultTypes.SUCCESS,
        message,
      },
    });
    return log;
  } catch (error) {
    console.log(error);
  }
};

export const registerSuccessLog = async (user) => {
  const logMessage = `User created successfully. UserId: ${user.id} | Email:${
    user.email
  } | Name: ${user.firstname + " " + user.lastname}`;
  await authLoggerSuccess(user.id, logMessage);
};

export const registerFailLog = async (user) => {
  const logMessage = `Register attempt failed. Email:${user?.email} | Name: ${
    user?.firstname + " " + user?.lastname
  }`;
  await authLoggerFail(user.id, logMessage);
};
export const loginSuccessLog = async (user) => {
  const logMessage = `Successfully Logged in. UserId: ${user.id} | Email:${
    user.email
  } | Name: ${user.firstname + " " + user.lastname}`;
  await authLoggerSuccess(user.id, logMessage);
};

export const loginFailLog = async (email, msg) => {
  const logMessage = `Login attempt failed. Email:${email}. Message: ${msg}`;
  await authLoggerFail(null, logMessage);
};

export const systemFailLog = async (message) => {
  try {
    await prisma.log.create({
      data: {
        activityType: logActivityTypes.SYSTEM_FAIL,
        result: logResultTypes.FAIL,
        message,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
