import API from "@/lib/axios";
import type { ApiResponse } from "@/types/apiTypes";
import type { AuthResponse, LoginData, RegisterData } from "@/types/auth";

// Login
export const loginApi = async (
  data: LoginData
): Promise<ApiResponse<AuthResponse>> => {
  const res = await API.post("/auth/signin", data);
  console.log("Login Response:", res.data);
  return res.data;
};

// Register
export const registerApi = async (
  data: RegisterData
): Promise<ApiResponse<{ message: string }>> => {
  const res = await API.post("/auth/signup", data);
  console.log("Register Response:", res.data);
  return res.data;
};

// Logout
export const logoutApi = async () => {
  const res = await API.post("/auth/logout");
  console.log("Logout Response:", res.data);
  return res.data;
};

// verify email
export const verifyEmailApi = async (
  token: string
): Promise<ApiResponse<{ message: string }>> => {
  const res = await API.get(`/auth/verify-email?token=${token}`);
  return res.data;
};
