import { useDispatch } from "react-redux";
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} from "@/features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helper/ToastNotify";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/router";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { axiosPublic } = useAxios();
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/auth/login", userInfo);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      router.push("/");
    } catch (err) {
      console.log(err);
      dispatch(fetchFail());
      toastErrorNotify(err.response.data);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosPublic.post("/auth/logout");
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      router.push("/auth/login");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/auth/register", userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      router.push("/");
    } catch (err) {
      console.log(err);
      dispatch(fetchFail());
      toastErrorNotify(err.response.data);
    }
  };

  return {
    login,
    logout,
    register,
  };
};

export default useAuthCalls;
