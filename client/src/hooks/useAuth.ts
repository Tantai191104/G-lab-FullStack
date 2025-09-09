import { loginApi, registerApi } from "@/services/authService";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/types/apiTypes";
import type { AuthResponse, LoginData, RegisterData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<
    ApiResponse<AuthResponse>,
    AxiosError<ApiResponse<AuthResponse>>,
    LoginData
  >({
    mutationFn: (data: LoginData) => loginApi(data),
    onSuccess: (res) => {
      if (res.status === "success" && res.data) {
        console.log("Login successful:", res);
        setAuth(res.data.access_token, res.data.user);
      }
    },
  });
};
export const useRegister = () => {
  return useMutation<
    ApiResponse<{ message: string }>,
    AxiosError<ApiResponse<{ message: string }>>,
    RegisterData
  >({
    mutationFn: (data: RegisterData) => registerApi(data),
  });
};
