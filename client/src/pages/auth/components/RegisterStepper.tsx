import type { FC } from "react";
import { FiUser } from "react-icons/fi";
import { FaCity, FaCheckCircle } from "react-icons/fa";

const items = [
  { label: "Tài khoản", icon: <FiUser /> },
  { label: "Địa chỉ", icon: <FaCity /> },
  { label: "Xác nhận", icon: <FaCheckCircle /> },
];

interface Props {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

const RegisterStepper: FC<Props> = ({ activeIndex, setActiveIndex }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-8">
        {items.map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${
                  activeIndex === idx
                    ? "bg-gradient-to-tr from-blue-700 to-blue-500 border-white text-white shadow-lg scale-110"
                    : "bg-white border-blue-700 text-blue-700"
                }
                w-12 h-12 text-xl font-bold`}>
              {item.icon}
            </button>
            <span
              className={`mt-2 text-base font-bold transition-all duration-200
                ${activeIndex === idx ? "text-white drop-shadow" : "text-blue-700"}`}>
              {item.label}
            </span>
            {idx < items.length - 1 && (
              <div className="w-12 h-1 bg-gradient-to-r from-blue-700 to-transparent mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterStepper;
