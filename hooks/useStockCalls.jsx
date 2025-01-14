import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "@/redux/slices/stockSlice";
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

  const getBrands = () => getStockData("brands/getAllBrands", "brands");
  const getProducts = () => getStockData("products/getAllProducts", "products");
  const getTransactions = () =>
    getStockData("transactions/getTransactions", "transactions");
  const getPurchases = () =>
    getStockData("transactions/getAllPurchases", "purchases");
  const getSales = () => getStockData("transactions/getAllSales", "sales");
  const getTotalPurchases = () =>
    getStockData("transactions/getTotalPurchases", "totalPurchases");
  const getCategories = () =>
    getStockData("categories/getAllCategories", "categories");

  //!------------- POST CALLS ----------------
  const postStockData = async (info, url) => {
    try {
      const { data } = await axiosWithToken.post(`stock/${url}`, info);
      // console.log(data);
      toastSuccessNotify(data.message);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
    }
  };

  const postBrand = (info) => postStockData(info, "brands/createBrand");
  const postCategory = (info) =>
    postStockData(info, "categories/createCategory");
  const postProduct = (info) => postStockData(info, "products/createProduct");
  const postTransaction = (info) =>
    postStockData(info, "transactions/createTransaction");

  //!------------- DELETE CALLS ----------------
  const deleteStockData = async (url, id) => {
    try {
      const { data } = await axiosWithToken.delete(`stock/${url}?id=${id}`);
      toastSuccessNotify(data.message);
      // getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  const deleteBrand = (id) => deleteStockData("brands/deleteBrand", id);
  const deleteCategory = (id) =>
    deleteStockData("categories/deleteCategory", id);
  const deleteProduct = (id) => deleteStockData("products/deleteProduct", id);
  const deleteTransaction = (id) =>
    deleteStockData("transactions/deleteTransaction", id);

  //!------------- PUT CALLS ----------------
  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}`, info);
      toastSuccessNotify(`${url} successfuly updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be updated`);
    }
  };

  const putBrand = (info) => putStockData(info, "brands/updateBrand");
  const putCategory = (info) => putStockData(info, "categories/updateCategory");
  const putProduct = (info) => putStockData(info, "products/updateProduct");
  const putTransaction = (info) =>
    putStockData(info, "transactions/updateTransaction");

  return {
    getStockData,
    getTransactions,
    getPurchases,
    getSales,
    getTotalPurchases,
    getCategories,
    getProducts,
    getBrands,

    deleteBrand,
    deleteProduct,
    deleteTransaction,
    deleteCategory,

    postStockData,
    postBrand,
    postProduct,
    postTransaction,
    postCategory,

    putStockData,
    putProduct,
    putBrand,
    putCategory,
    putTransaction,
  };
};

export default useStockCalls;
