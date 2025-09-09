import type { User } from "./types";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  address: string[];
};
export type AuthResponse = {
  user: User;
  access_token: string;
};
