import { setValueToSecureStore } from "@utils/secureStore";
import axios from "axios";

const publicApi = axios.create({
  baseURL: process.env.BASE_URI,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
  },
});

publicApi.interceptors.response.use(
  (response) => {
    // 만약 토큰이 있는 경우, SecureStore에 저장
    if (response.headers["accessToken"]) {
      const accessToken = response.headers["accessToken"];
      const refreshToken = response.headers["refreshToken"];
      const accessTokenExpiredTime = response.headers["accessTokenExpiredTime"];

      setValueToSecureStore("accessToken", accessToken);
      setValueToSecureStore("refreshToken", refreshToken);
      setValueToSecureStore("accessTokenExpiredTime", accessTokenExpiredTime);
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default publicApi;
