import { getValueFromSecureStore } from "@utils/secureStore";
import axios from "axios";

const { EXPO_PUBLIC_MODE } = process.env;

const authenticatedApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL?.replace(/\/$/, ""),
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

authenticatedApi.interceptors.request.use(
  async (config) => {
    // 헤더에서 accessToken 추가
    const accessToken = await getValueFromSecureStore("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authenticatedApi.interceptors.response.use(
  (response) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.log(
        "==================[authenticatedApi API Response]======================",
      );
      console.log("[status:]", response.status);
      console.log("[url:]", response.config.url);
      console.log("[data:]", response.data);
    }
    return response.data;
  },
  (error) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.warn("=============[authenticatedApi API error]=============");
      console.warn("[error :]", error);
      console.warn("[url:]", error.config?.url);
      console.warn("[data:]", error.response?.data);
      console.warn("[status:]", error.response?.status);
    }
    return Promise.reject(error);
  },
);

export default authenticatedApi;
