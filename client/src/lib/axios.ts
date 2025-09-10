import { useAuthStore } from "@/store/auth";
import axios, { type AxiosRequestConfig, type AxiosError } from "axios";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Axios instance riêng cho refresh
const APIRefresh = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ----------------------
// Request interceptor: gắn token
// ----------------------
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----------------------
// Response interceptor: xử lý 401 + refresh token
// ----------------------
API.interceptors.response.use(
  (response) => {
    // Trường hợp message nằm trong response.data.data.message
    const message = response?.data?.message || response?.data?.data?.message;

    if (message) {
      toast.success(message);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (
      error?.response?.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
    ) {
      // Type assertion to access message safely
      toast.error((error.response.data as { message: string }).message);
    }
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await APIRefresh.post("/auth/refresh", {});
        const newAccessToken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return API(originalRequest); // retry request
      } catch (refreshError) {
        // Clear Zustand store
        useAuthStore.getState().logout();

        // Phát sự kiện ra window
        const event = new CustomEvent("session-expired", {
          detail: { isSessionExpired: true, error: refreshError },
        });
        window.dispatchEvent(event);

        return Promise.reject({
          ...(typeof refreshError === "object" && refreshError !== null
            ? refreshError
            : { error: refreshError }),
          isSessionExpired: true,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default API;
