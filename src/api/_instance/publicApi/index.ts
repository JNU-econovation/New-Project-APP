import { setValueToSecureStore } from "@utils/secureStore";
import axios from "axios";

const publicApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL?.replace(/\/$/, ""),
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

publicApi.interceptors.response.use(
  async (response) => {
    // 만약 토큰이 있는 경우, SecureStore에 저장
    if (response.headers["accesstoken"]) {
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

        response.data = {
          ...response.data,
          accessToken,
          refreshToken,
          accessTokenExpiredTime,
        };
      } catch (error) {
        console.error("Failed to store tokens in SecureStore:", error);
      }
    }

    return response.data;
  },
  (error) => {
    console.error(
      "Public API error:",
      error,
      "url:",
      error.config?.url,
      "method:",
      error.config?.method,
    );
    return Promise.reject(error);
  },
);

export default publicApi;
