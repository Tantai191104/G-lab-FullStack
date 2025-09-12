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
      <h2 className="text-xl font-semibold text-black mb-2">
        Xác nhận thông tin
      </h2>
      <div className="flex flex-col gap-3 text-black">
        <span className="flex items-center gap-3">
          <FiUser className="text-black/60 text-xl" />
          <span className="font-semibold">Họ và tên:</span>
          <span className="px-2 py-1 rounded bg-black/5 text-black font-medium ml-2">
            {name}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FiMail className="text-black/60 text-xl" />
          <span className="font-semibold">Email:</span>
          <span className="px-2 py-1 rounded bg-black/5 text-black font-medium ml-2">
            {email}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <MdPhoneAndroid className="text-black/60 text-xl" />
          <span className="font-semibold">Số điện thoại:</span>
          <span className="px-2 py-1 rounded bg-black/5 text-black font-medium ml-2">
            {phone}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FiMapPin className="text-black/60 text-xl" />
          <span className="font-semibold">Số nhà:</span>
          <span className="px-2 py-1 rounded bg-black/5 text-black font-medium ml-2">
            {houseNumber}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FaCity className="text-black/60 text-xl" />
          <span className="font-semibold">Thành phố:</span>
          <span className="px-2 py-1 rounded bg-black/5 text-black font-medium ml-2">
            {cities.find((c) => c.code === selectedCity)?.name}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FiMapPin className="text-black/60 text-xl" />
          <span className="font-semibold">Phường/Xã:</span>
          <span className="px-2 py-1 rounded bg-black/5 text-black font-medium ml-2">
            {wards.find((w) => w.code === selectedWard)?.name}
          </span>
        </span>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="flex items-center gap-2 bg-black/40 hover:bg-black text-white font-semibold px-6 py-2 rounded-full shadow transition-all border-2 border-black/40"
          onClick={() => setActiveIndex(1)}
        >
          <FaArrowLeft /> Quay lại
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 bg-black/80 hover:bg-black text-white font-semibold px-6 py-2 rounded-full shadow transition-all border-2 border-black/80 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default ConfirmStep;
