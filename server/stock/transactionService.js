import { transactionTypes } from "@/helper/enums";
import prisma from "../db";
import StockError from "../utils/error/StockError";
import { getProductById, updateProduct } from "./productService";

const transformTransaction = (transaction) => {
  const { product, user, brand } = transaction;

  return {
    ...transaction,
    user: user?.firstname + " " + user?.lastname,
    brand: brand?.name,
    product: product?.name,
    category: product?.category?.name,
  };
};

export const getAllTransactions = async (transactionType) => {
  try {
    const transactions = await prisma.transaction.findMany({
      relationLoadStrategy: "join",
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        brand: {
          select: { name: true },
        },
        product: {
          select: {
            name: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        transaction_type: transactionType,
      },
    });

    return transactions.map((transaction) => transformTransaction(transaction));
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const getAllSales = async () => {
  return await getAllTransactions(transactionTypes.SALE);
};

export const getAllPurchases = async () => {
  return await getAllTransactions(transactionTypes.PURCHASE);
};

export const getTotalSales = async () => {
  try {
    const sales = await getAllSales();
    const total = sales.reduce((sum, sale) => {
      return sum + parseFloat(sale.price_total);
    }, 0);
    return total.toFixed(2);
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const getTotalPurchases = async () => {
  try {
    const purchases = await getAllPurchases();

    const total = purchases.reduce((sum, purchase) => {
      return sum + parseFloat(purchase.price_total);
    }, 0);

    return total.toFixed(2);
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

const isSaleValid = (stock, saleAmount) => stock > saleAmount;

export const createTransaction = async (transactionInfo) => {
  const { userId, brandId, productId, quantity, price, transaction_type } =
    transactionInfo;
  const isSale = transaction_type === transactionTypes.SALE;
  try {
    const product = await getProductById(productId);
    // console.log({ product });
    if (isSale && !isSaleValid(product.stock, quantity)) {
      throw new StockError(400, "Not enough products in stock!");
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        brandId,
        productId,
        quantity,
        price,
        price_total: quantity * price,
        transaction_type,
      },
    });
    const newProductStock = isSale
      ? product.stock - quantity
      : product.stock + quantity;

    await updateProduct({ id: productId, stock: newProductStock });

    return transaction;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const deleteTransaction = async (transactionId) => {
  //TODO: find transaction by id and validate

  try {
    if (false) {
      throw new StockError(400, "Transaction doesn't exist!");
    }
    const deleteTransaction = await prisma.transaction.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        isDeleted: true,
      },
    });
    return deleteTransaction;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};

export const updateTransaction = async (transactionInfo) => {
  const isSale = transactionInfo.transaction_type === transactionTypes.SALE;

  const priceTotal =
    transactionInfo.price && transactionInfo.quantity
      ? transactionInfo.price * transactionInfo.quantity
      : undefined;

  const updatedTransactionInfo = priceTotal
    ? { ...transactionInfo, price_total: priceTotal }
    : transactionInfo;

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(transactionInfo.id) },
      data: {
        ...updatedTransactionInfo,
      },
    });

    const newProductStock = isSale
      ? product.stock - quantity
      : product.stock + quantity;

    await updateProduct({ id: productId, stock: newProductStock });

    return updatedTransaction;
  } catch (error) {
    if (error instanceof StockError) {
      throw error;
    }
    console.log(error);
    throw new StockError(500, "Something went wrong on the server!");
  }
};
