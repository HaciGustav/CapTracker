import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "@/redux/slices/aiSlice";
import { toastSuccessNotify, toastErrorNotify } from "@/helper/ToastNotify";
import useAxios from "./useAxios";

const useAICalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //!------------- POST CALLS ----------------
  const callAI = async (prompt) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/ai", { prompt });
      dispatch(getSuccess(data)); // Update Redux state
      toastSuccessNotify("AI response received successfully");
      return data; // Return response for immediate use
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify("Failed to get AI response");
      throw error; // Propagate the error to the caller
    }
  };

  //!------------- Wrapper Functions ----------------
  const getAIResponse = (prompt) => callAI(prompt);

  return {
    getAIResponse,
  };
};

export default useAICalls;