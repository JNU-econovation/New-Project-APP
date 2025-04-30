import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URI,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
  },
});

export default instance;
