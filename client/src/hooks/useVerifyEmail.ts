// src/hooks/useVerifyEmail.ts
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { verifyEmailApi } from "@/services/authService";
import type { ApiResponse } from "@/types/apiTypes";

export const useVerifyEmail = (): UseMutationResult<
  ApiResponse<{ message: string }>,
  unknown,
  string,
  unknown
> => {
  return useMutation({
    mutationFn: (token: string) => verifyEmailApi(token),
    onSuccess: (res: ApiResponse<{ message: string }>) => {
      toast.success(res.data?.message || "Xác thực email thành công!");
    },
  });
};
