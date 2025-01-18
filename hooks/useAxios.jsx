import axios from "axios";
import { signOut, useSession } from "next-auth/react";

const BASE_URL = "/api";

const terminateSessionAfterUnauthorizedResponse = async (error) => {
  const originalRequest = error.config;
  console.log(error.response?.status);
  if (error.response?.status === 401) {
    signOut();
  }
  return Promise.reject(error);
};

const setUserIdInHeaders = (config, userId) => {
  config.headers["captracker_userid"] = `${userId}`;
  return config;
};

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const userId = session?.user?.user?.id;
  //* Axios Instance for Private API Request
  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });

  axiosWithToken.interceptors.response.use(
    (response) => response,
    async (error) => terminateSessionAfterUnauthorizedResponse(error)
  );
  axiosWithToken.interceptors.request.use(
    (config) => setUserIdInHeaders(config, userId),
    async (error) => Promise.reject(error)
  );

  return { axiosWithToken, axiosPublic };
};

export default useAxios;
