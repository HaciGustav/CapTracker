import { useDispatch } from "react-redux";
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} from "@/redux/slices/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "@/helper/ToastNotify";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/router";
import { getSession, signIn, signOut } from "next-auth/react";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { axiosPublic } = useAxios();

  const login = async (userInfo) => {
    dispatch(fetchStart());
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (!res.ok) {
      dispatch(fetchFail());
      toastErrorNotify(res.error);
      return;
    }
    const session = await getSession();
    if (session) {
      const { user: userInfo } = session?.user;
      const credentials = {
        avatar: userInfo?.avatar,
        userRole: userInfo?.user_role,
        token: session?.user?.token,
        ...userInfo,
      };
      dispatch(loginSuccess({ user: credentials }));
    }
    router.push("/");
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await signOut().then(() => dispatch(logoutSuccess()));
      // router.push("/auth/login");
    } catch (err) {
      console.log(err);
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/register", userInfo);
      dispatch(registerSuccess(data));
      await login(userInfo);
      toastSuccessNotify("Register performed");
    } catch (err) {
      dispatch(fetchFail());
      console.log(err);
      toastErrorNotify(err.response.data);
    }
  };

  const sendResetMail = async (email) => {
    try {
      await axiosPublic.post("/sendResetMail", { email });
      toastSuccessNotify("Recovery mail has been sent!");
    } catch (err) {
      console.log(err);
      toastErrorNotify(err.response.data);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await axiosPublic.post("/resetPassword", { token, password });
      toastSuccessNotify("Password successfully updated!");
    } catch (err) {
      console.log(err);
      toastErrorNotify(err.response.data);
    }
  };

  return {
    login,
    logout,
    register,
    sendResetMail,
    resetPassword,
  };
};

export default useAuthCalls;
