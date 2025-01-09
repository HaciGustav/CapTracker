import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart } from "@/redux/slices/stockSlice";

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

  return { getAllLogs };
};

export default useAdminCalls;
