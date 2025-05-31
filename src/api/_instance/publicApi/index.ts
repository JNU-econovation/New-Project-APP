import { setValueToSecureStore } from "@utils/secureStore";
import axios from "axios";

const publicApi = axios.create({
  baseURL: process.env.BASE_URI,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

publicApi.interceptors.response.use(
  async (response) => {
    // 만약 토큰이 있는 경우, SecureStore에 저장
    if (response.headers["accessToken"]) {
      const accessToken = response.headers["accesstoken"];
      const refreshToken = response.headers["refreshtoken"];
      const accessTokenExpiredTime = response.headers["accesstokenexpiredtime"];

      try {
        await setValueToSecureStore("accessToken", accessToken);
        await setValueToSecureStore("refreshToken", refreshToken);
        await setValueToSecureStore(
          "accessTokenExpiredTime",
          accessTokenExpiredTime,
        );
      } catch (error) {
        console.error("Failed to store tokens in SecureStore:", error);
      }
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default publicApi;
