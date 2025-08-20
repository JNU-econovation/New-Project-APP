import { ErrorResponse } from "@model/api";
import { getValueFromSecureStore } from "@utils/secureStore";
import axios, { AxiosError } from "axios";

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
  (error: AxiosError<ErrorResponse>) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.warn("=============[authenticatedApi API error]=============");
      console.warn("[error :]", error);
      console.warn("[url:]", error.config?.url);
      console.warn("[data:]", error.response?.data);
      console.warn("[status:]", error.response?.status);
    }

    const apiError: ErrorResponse = {
      status: "error",
      errorCode: error.response?.data.errorCode || "UNKNOWN_ERROR",
      message:
        error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
    };

    return Promise.reject(apiError);
  },
);

export default authenticatedApi;
