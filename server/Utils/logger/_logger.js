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

export const stockLoggerFail = async (userId, message) => {
  try {
    const log = await prisma.log.create({
      data: {
        userId,
        activityType: logActivityTypes.STOCK_OPERATION,
        result: logResultTypes.FAIL,
        message,
      },
    });
    return log;
  } catch (error) {
    console.log(error);
  }
};
export const stockLoggerSuccess = async (userId, message) => {
  try {
    const log = await prisma.log.create({
      data: {
        userId,
        activityType: logActivityTypes.STOCK_OPERATION,
        result: logResultTypes.SUCCESS,
        message,
      },
    });
    return log;
  } catch (error) {
    console.log(error);
  }
};

export const createProductSuccessLog = async (userId, product) => {
  const logMessage = `Product created successfully. User ID: ${userId} | Product: ${JSON.stringify(
    product
  )}`;
  await stockLoggerSuccess(userId, logMessage);
};
export const createProductFailLog = async (userId, product) => {
  const logMessage = `Product creation attempt failed. User ID: ${userId} | Product: ${JSON.stringify(
    product
  )}`;
  await stockLoggerSuccess(userId, logMessage);
};

export const updateProductSuccessLog = async (userId, product) => {
  const logMessage = `Product updated successfully. User ID: ${userId} | Product: ${JSON.stringify(
    product
  )}`;
  await stockLoggerSuccess(userId, logMessage);
};
export const updateProductFailLog = async (userId, product) => {
  const logMessage = `Product update attempt failed. User ID: ${userId} | Product: ${JSON.stringify(
    product
  )}`;
  await stockLoggerFail(userId, logMessage);
};

export const deleteProductSuccessLog = async (userId, productId) => {
  const logMessage = `Product deleted successfully. User ID: ${userId} | Product ID: ${productId}`;
  await stockLoggerSuccess(userId, logMessage);
};
export const deleteProductFailLog = async (userId, productId) => {
  const logMessage = `Product deletion attempt failed. User ID: ${userId} | Product ID: ${productId}`;
  await stockLoggerFail(userId, logMessage);
};

export const createTransactionSuccessLog = async (userId, transaction) => {
  const logMessage = `Transaction created successfully.  User ID: ${userId} | Transaction: ${JSON.stringify(
    transaction
  )}`;
  await stockLoggerSuccess(userId, logMessage);
};
export const createTransactionFailLog = async (userId, transaction) => {
  const logMessage = `Transaction creation attempt failed. User ID: ${userId} | Transaction: ${JSON.stringify(
    transaction
  )}`;
  await stockLoggerSuccess(userId, logMessage);
};

export const updateTransactionSuccessLog = async (userId, transaction) => {
  const logMessage = `Transaction updated successfully. User ID: ${userId} | Transaction: ${JSON.stringify(
    transaction
  )}`;
  await stockLoggerSuccess(userId, logMessage);
};
export const updateTransactionFailLog = async (userId, transaction) => {
  const logMessage = `Transaction update attempt failed. User ID: ${userId} | Transaction: ${JSON.stringify(
    transaction
  )}`;
  await stockLoggerFail(userId, logMessage);
};

export const deleteTransactionSuccessLog = async (userId, transactionId) => {
  const logMessage = `Transaction deleted successfully. User ID: ${userId} | Transaction ID: ${transactionId}`;
  await stockLoggerSuccess(userId, logMessage);
};
export const deleteTransactionFailLog = async (userId, transactionId) => {
  const logMessage = `Transaction deletion attempt failed. User ID: ${userId} | Transaction ID: ${transactionId}`;
  await stockLoggerFail(userId, logMessage);
};
