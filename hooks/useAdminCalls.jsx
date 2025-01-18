import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, getSuccess } from "@/redux/slices/stockSlice";
import { toastErrorNotify } from "@/helper/ToastNotify";

const useAdminCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getAllLogs = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`logs/getAllLogs`);
      dispatch(getSuccess({ data, name: "logs" }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getLogs = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("log/getAllLogs");
      dispatch(getSuccess({ data, name: "logs" }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify(`${error.response?.status} ${error.response?.data}`);
    }
  };

  return { getLogs };
};

export default useAdminCalls;
