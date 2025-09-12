export type User = {
  _id: string;
  email: string;
  name: string;
  address: string[];
  phone: string;
  role: "customer" | "admin" | string;
  status: "active" | "inactive" | string;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string | null;
  reasonForBan?: string | null;
};

export type Ward = {
  code: string;
  name: string;
  parent_code: string;
};
export type Province = {
  name: string;
  slug: string;
  type: "thanh-pho" | "tinh";
  name_with_type: string;
  code: string;
};
