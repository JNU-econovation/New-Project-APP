import {
  getValueFromSecureStore,
  setValueToSecureStore,
} from "@utils/secureStore";
import axios from "axios";

const authenticatedApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
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
    return response.data.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default authenticatedApi;
