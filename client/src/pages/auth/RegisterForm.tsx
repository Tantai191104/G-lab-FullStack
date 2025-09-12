import React, { useState } from "react";
import RegisterStepper from "./components/RegisterStepper";
import AccountStep from "./components/AccountStep";
import AddressStep from "./components/AddressStep";
import ConfirmStep from "./components/ConfirmStep";

import citiesData from "../../data/province.json";
import wardsData from "../../data/ward.json";
import type { Province } from "@/types/types";

interface RegisterFormProps {
  loading: boolean;
  handleRegister: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    houseNumber: string;
    selectedCity: string;
    selectedWard: string;
  }) => void;
  setMode: (mode: "login" | "register") => void;
}

export default function RegisterForm({
  loading,
  handleRegister,
  setMode,
}: RegisterFormProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // errors shown in ConfirmStep or handled by parent
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  interface Ward {
    code: string;
    name: string;
    parent_code: string;
  }

  const cities = Object.values(citiesData) as Province[];
  const wards = (Object.values(wardsData) as Ward[])
    .filter((w: Ward) => w.parent_code === selectedCity)
    .sort((a: Ward, b: Ward) =>
      a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
    );

  // stepper items handled in RegisterStepper

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // parent handles displaying this error if needed; stop submission
      return;
    }

    handleRegister({
      name,
      email,
      phone,
      password,
      confirmPassword,
      houseNumber,
      selectedCity,
      selectedWard,
    });
  };

  return (
    <div className="p-6 bg-white/10 text-white rounded-2xl shadow-2xl w-full backdrop-blur-md">
      <RegisterStepper
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />

      <form onSubmit={onSubmit} className="mt-2 space-y-4">
        {activeIndex === 0 && (
          <AccountStep
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            setActiveIndex={setActiveIndex}
          />
        )}

        {activeIndex === 1 && (
          <AddressStep
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedWard={selectedWard}
            setSelectedWard={setSelectedWard}
            setActiveIndex={setActiveIndex}
          />
        )}

        {activeIndex === 2 && (
          <ConfirmStep
            name={name}
            email={email}
            phone={phone}
            houseNumber={houseNumber}
            selectedCity={selectedCity}
            selectedWard={selectedWard}
            setActiveIndex={setActiveIndex}
            loading={loading}
            cities={cities}
            wards={wards}
          />
        )}
      </form>

      <div className="text-sm text-center mt-4">
        Đã có tài khoản?{" "}
        <button
          type="button"
          className="font-medium hover:underline text-blue-400"
          onClick={() => setMode("login")}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
