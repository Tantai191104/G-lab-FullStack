import React, { Fragment, useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiMapPin,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

import citiesData from "../../data/province.json";
import wardsData from "../../data/ward.json";
import type { Province } from "@/types/types";

export interface RegisterFormProps {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  houseNumber: string;
  setHouseNumber: (v: string) => void;
  selectedCity: string;
  setSelectedCity: (v: string) => void;
  selectedWard: string;
  setSelectedWard: (v: string) => void;
  loading: boolean;
  handleRegister: (e: React.FormEvent, confirmPassword: string) => void;
  setMode: (mode: "login" | "register") => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  houseNumber,
  setHouseNumber,
  selectedCity,
  setSelectedCity,
  selectedWard,
  setSelectedWard,
  loading,
  handleRegister,
  setMode,
}) => {
  // Thêm state cho nhập lại mật khẩu
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  interface Ward {
    code: string;
    name: string;
    parent_code: string;
  }

  const cities = Object.values(citiesData) as Province[];
  // Lọc phường theo city đã chọn
  const wards = (Object.values(wardsData) as Ward[])
    .filter((w: Ward) => w.parent_code === selectedCity)
    .sort((a: Ward, b: Ward) =>
      a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
    );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }
    handleRegister(e, confirmPassword);
  };

  return (
    <form
      className="bg-white/5 border-2 border-white/70 p-10 text-white rounded-2xl shadow-2xl animate-fade-in"
      onSubmit={onSubmit}
    >
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-5">
        Register
      </h1>
      <div className="grid gap-5 mb-4">
        {/* Name */}
        <div className="grid grid-cols-[1fr_max-content] items-center gap-3 border-2 border-white/70 px-5 rounded-full">
          <input
            type="text"
            className="w-full bg-transparent text-white py-4 placeholder:text-white focus:outline-none"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FiUser className="text-xl" />
        </div>

        {/* Email */}
        <div className="grid grid-cols-[1fr_max-content] items-center gap-3 border-2 border-white/70 px-5 rounded-full">
          <input
            type="email"
            className="w-full bg-transparent text-white py-4 placeholder:text-white focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FiMail className="text-xl" />
        </div>

        {/* Password */}
        <div className="grid grid-cols-[1fr_32px_32px] items-center gap-3 border-2 border-white/70 px-5 rounded-full">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full bg-transparent text-white py-4 placeholder:text-white focus:outline-none"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="text-xl text-white focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          <FiLock className="text-xl" />
        </div>

        {/* Confirm Password */}
        <div className="grid grid-cols-[1fr_32px_32px] items-center gap-3 border-2 border-white/70 px-5 rounded-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full bg-transparent text-white py-4 placeholder:text-white focus:outline-none"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="text-xl text-white focus:outline-none"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          <FiLock className="text-xl" />
        </div>

        {/* House Number */}
        <div className="grid grid-cols-[1fr_max-content] items-center gap-3 border-2 border-white/70 px-5 rounded-full">
          <input
            type="text"
            className="w-full bg-transparent text-white py-4 placeholder:text-white focus:outline-none"
            placeholder="Số nhà , Khu phố"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            required
          />
          <FiMapPin className="text-xl" />
        </div>

        {/* City */}
        <Listbox
          value={selectedCity}
          onChange={(value) => {
            setSelectedCity(value);
            setSelectedWard(""); // reset phường khi đổi city
          }}
        >
          <div className="relative w-full">
            <ListboxButton className="relative w-full cursor-pointer bg-white/5 border-2 border-white/70 text-white py-4 pl-5 pr-10 rounded-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400">
              <span>
                {cities.find((c: Province) => c.code === selectedCity)?.name ||
                  "Chọn thành phố"}
              </span>
              <FaCity className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-50 mt-1 w-full bg-black/90 backdrop-blur-md rounded-xl py-1 text-white max-h-60 overflow-auto shadow-2xl">
                {cities.map((city: Province) => (
                  <ListboxOption
                    key={city.code}
                    value={city.code}
                    className={({ selected }) =>
                      `cursor-pointer select-none relative py-2 pl-5 pr-10 ${
                        selected ? "bg-blue-500 text-white" : "text-white"
                      } ${selected ? "font-semibold" : "font-normal"}`
                    }
                  >
                    {city.name}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>

        {/* Ward */}
        <Listbox
          value={selectedWard}
          onChange={setSelectedWard}
          disabled={!selectedCity}
        >
          <div className="relative w-full">
            <ListboxButton className="relative w-full cursor-pointer bg-white/5 border-2 border-white/70 text-white py-4 pl-5 pr-10 rounded-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50">
              <span>
                {wards.find((w: Ward) => w.code === selectedWard)?.name ||
                  "Chọn phường/xã"}
              </span>
              <FiMapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-50 mt-1 w-full bg-black/90 backdrop-blur-md rounded-xl py-1 text-white max-h-60 overflow-auto shadow-2xl">
                {wards.map((ward: Ward) => (
                  <ListboxOption
                    key={ward.code}
                    value={ward.code}
                    className={({ selected }) =>
                      `cursor-pointer select-none relative py-2 pl-5 pr-10 ${
                        selected ? "bg-blue-500 text-white" : "text-white"
                      } ${selected ? "font-semibold" : "font-normal"}`
                    }
                  >
                    {ward.name}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error && <div className="text-red-400 text-center mb-2">{error}</div>}

      <button
        type="submit"
        className="w-full py-4 mb-4 bg-white rounded-full text-black font-medium cursor-pointer text-lg shadow-lg"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full inline-block"></span>
        ) : (
          <>Register</>
        )}
      </button>

      <div className="text-sm text-center">
        Đã có tài khoản?{" "}
        <button
          type="button"
          className="font-medium hover:underline"
          onClick={() => setMode("login")}
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
