/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";
import { baseUrl, accessToken, backUrl } from "@/constants";
import type { ErrorResponse } from "@/types";

const apiClient = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const backClient = axios.create({
  baseURL: `${backUrl}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});

// Interceptors

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      if (response && response.data) {
        const errorMessage = (response.data as ErrorResponse).message;
        return Promise.reject(new Error(errorMessage));
      }
    }
    return Promise.reject(new Error("An unexpected error occurred"));
  },
);

backClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiClient, backClient };
