import type { FC } from "react";
import { FiUser, FiMail, FiMapPin } from "react-icons/fi";
import { MdPhoneAndroid } from "react-icons/md";
import { FaCity, FaArrowLeft } from "react-icons/fa";

interface Props {
  name: string;
  email: string;
  phone: string;
  houseNumber: string;
  selectedCity: string;
  selectedWard: string;
  setActiveIndex: (i: number) => void;
  loading: boolean;
  cities: { code: string; name: string }[];
  wards: { code: string; name: string }[];
}

const ConfirmStep: FC<Props> = ({
  name,
  email,
  phone,
  houseNumber,
  selectedCity,
  selectedWard,
  setActiveIndex,
  loading,
  cities,
  wards,
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-white mb-2">
        Xác nhận thông tin
      </h2>
      <div className="flex flex-col gap-3 text-white">
        <span className="flex items-center gap-3">
          <FiUser className="text-blue-500 text-xl" />
          <span className="font-semibold">Họ và tên:</span>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium ml-2">
            {name}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FiMail className="text-blue-500 text-xl" />
          <span className="font-semibold">Email:</span>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium ml-2">
            {email}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <MdPhoneAndroid className="text-blue-500 text-xl" />
          <span className="font-semibold">Số điện thoại:</span>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium ml-2">
            {phone}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FiMapPin className="text-blue-500 text-xl" />
          <span className="font-semibold">Số nhà:</span>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium ml-2">
            {houseNumber}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FaCity className="text-blue-500 text-xl" />
          <span className="font-semibold">Thành phố:</span>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium ml-2">
            {cities.find((c) => c.code === selectedCity)?.name}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FiMapPin className="text-blue-500 text-xl" />
          <span className="font-semibold">Phường/Xã:</span>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium ml-2">
            {wards.find((w) => w.code === selectedWard)?.name}
          </span>
        </span>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
          onClick={() => setActiveIndex(1)}
        >
          <FaArrowLeft /> Quay lại
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
          disabled={loading}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default ConfirmStep;
