export type ValidationErrors = Record<string, string[]>;
export type ApiResponse<T> = {
  status: "success" | "error";
  message?: string;
  code?: string; // cho trường hợp backend trả về code lỗi
  data?: T;
  errors?: ValidationErrors; // mảng hoặc object lỗi chi tiết
  path?: string;
  timestamp?: string;
};
