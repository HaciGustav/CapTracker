import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getSuccess } from "@/redux/slices/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helper/ToastNotify";

const useAdminCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //!------------- GET CALLS ----------------
  const getAdminData = async (url, name) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`${url}`);
      dispatch(getSuccess({ data, name }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify(`${error.response?.status} ${error.response?.data}`);
    }
  };

  const getLogs = () => getAdminData("log/getAllLogs", "logs");
  const getUsers = () => getAdminData("user/getAllUsers", "users");

  //!------------- POST CALLS ----------------
  const postAdminData = async (info, url) => {
    try {
      const { data } = await axiosWithToken.post(`${url}`, info);
      dispatch(getSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const postUser = (info) => postAdminData(info, "user/createUsers");
  //!------------- DELETE CALLS ----------------

  const deleteAdminData = async (url) => {
    try {
      const { data } = await axiosWithToken.delete(url);
      toastSuccessNotify(data.message);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${error.response?.status} ${error.response?.data}`);
    }
  };

  const deleteUser = (userId) =>
    deleteAdminData(`user/deactivateUser?id=${userId}`);

  return { getLogs, getUsers, postUser, deleteUser };
};

export default useAdminCalls;
