// import { axiosWithToken } from "../service/axiosInstance";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  getProCatBrandsSuccess,
  getAllStockSuccess,
} from "@/redux/slices/stockSlice";
import { toastSuccessNotify, toastErrorNotify } from "@/helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //!------------- GET CALLS ----------------
  const getStockData = async (url, name) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}`);
      dispatch(getSuccess({ data, name }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getTransactions = () =>
    getStockData("transactions/getTransactions", "transactions");
  const getPurchases = () =>
    getStockData("transactions/getAllPurchases", "purchases");
  const getSales = () => getStockData("transactions/getAllSales", "sales");
  const getTransactionsSummary = () =>
    getStockData("transactions/getTransactionsSummary", "transactionsSummary");
  const getTotalPurchases = () =>
    getStockData("transactions/getTotalPurchases", "totalPurchases");

  const getCategories = () => getStockData("categories");
  const getBrands = () => getStockData("brands/getAllBrands", "brands");
  const getProducts = () => getStockData("products/getAllProducts", "products");

  //!------------- POST CALLS ----------------
  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}`, info);
      toastSuccessNotify(`${url} successfuly added`);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
    }
  };

  const postFirm = (info) => postStockData(info, "firms");
  const postBrand = (info) => postStockData(info, "brands/createBrand");
  const postProduct = (info) => postStockData(info, "products");
  const postTransaction = (info) =>
    postStockData(info, "transactions/createTransaction");

  //!------------- DELETE CALLS ----------------
  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}`);
      toastSuccessNotify(`${url} successfuly deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  const deleteFirm = (id) => deleteStockData("firms", id);
  const deleteBrand = (id) => deleteStockData("brands", id);
  const deleteSale = (id) => deleteStockData("sales", id);
  const deleteProduct = (id) => deleteStockData("products", id);
  const deletePurchase = (id) => deleteStockData("purchases", id);

  //!------------- PUT CALLS ----------------
  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be updated`);
    }
  };

  const putFirm = (info) => putStockData(info, "firms");
  const putBrand = (info) => putStockData(info, "brands");
  const putSale = (info) => putStockData(info, "sales");
  const putPurchase = (info) => putStockData(info, "purchases");

  return {
    getStockData,
    getTransactions,
    getPurchases,
    getSales,
    getTransactionsSummary,
    getTotalPurchases,
    getCategories,
    getProducts,
    getBrands,
    deleteFirm,
    deleteBrand,
    deleteProduct,
    deleteSale,
    deletePurchase,
    postFirm,
    postStockData,
    postBrand,
    postProduct,
    postTransaction,
    putFirm,
    putStockData,
    putBrand,
    putSale,
    putPurchase,
  };
};

export default useStockCalls;
