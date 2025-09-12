import type { FC } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiLock,
} from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import FormInput from "@/pages/auth/components/FormInput";

interface Props {
  name: string;
  setName: (s: string) => void;
  email: string;
  setEmail: (s: string) => void;
  phone: string;
  setPhone: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  confirmPassword: string;
  setConfirmPassword: (s: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
  setActiveIndex: (i: number) => void;
}

const AccountStep: FC<Props> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  setActiveIndex,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Họ và tên
      </label>
      <FormInput
        icon={<FiUser className="text-xl text-black/60" />}
        value={name}
        onChange={(e) => setName((e.target as HTMLInputElement).value)}
        placeholder="Họ và tên"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Email
      </label>
      <FormInput
        icon={<FiMail className="text-xl text-black/60" />}
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        placeholder="Email"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Số điện thoại
      </label>
      <FormInput
        icon={<FiPhone className="text-xl text-black/60" />}
        value={phone}
        onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
        placeholder="Số điện thoại"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Mật khẩu
      </label>
      <div className="grid grid-cols-[1fr_32px_32px] items-center gap-3 border-2 border-black/30 px-5 rounded-full bg-black/5">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full bg-transparent text-black py-3 placeholder:text-gray-500 focus:outline-none"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="text-xl text-black/60"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
        <FiLock className="text-xl text-black/60" />
      </div>

      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Nhập lại mật khẩu
      </label>
      <div className="grid grid-cols-[1fr_32px_32px] items-center gap-3 border-2 border-black/30 px-5 rounded-full bg-black/5">
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="w-full bg-transparent text-black py-3 placeholder:text-gray-500 focus:outline-none"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="text-xl text-black/60"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          tabIndex={-1}
        >
          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
        </button>
        <FiLock className="text-xl text-black/60" />
      </div>

      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="flex items-center gap-2 bg-black/80 hover:bg-black text-white font-semibold px-6 py-2 rounded-full shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black/80"
          onClick={() => setActiveIndex(1)}
          disabled={
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
          }
        >
          Tiếp tục <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AccountStep;
