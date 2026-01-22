import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const openApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
});

export { api, openApi };
export default api;
