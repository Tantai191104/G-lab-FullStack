import { Fragment } from "react";
import { FiMapPin } from "react-icons/fi";
import { FaCity, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import FormInput from "@/pages/auth/components/FormInput";
import type { Province } from "@/types/types";
import citiesData from "../../../data/province.json";
import wardsData from "../../../data/ward.json";

interface Ward {
  code: string;
  name: string;
  parent_code: string;
}

interface Props {
  houseNumber: string;
  setHouseNumber: (s: string) => void;
  selectedCity: string;
  setSelectedCity: (s: string) => void;
  selectedWard: string;
  setSelectedWard: (s: string) => void;
  setActiveIndex: (i: number) => void;
}

export default function AddressStep({
  houseNumber,
  setHouseNumber,
  selectedCity,
  setSelectedCity,
  selectedWard,
  setSelectedWard,
  setActiveIndex,
}: Props) {
  const cities = Object.values(citiesData) as Province[];
  const wards = (Object.values(wardsData) as Ward[])
    .filter((w) => w.parent_code === selectedCity)
    .sort((a, b) =>
      a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
    );

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Số nhà, Khu phố
      </label>
      <FormInput
        icon={<FiMapPin className="text-xl text-black/60" />}
        value={houseNumber}
        onChange={(e) => setHouseNumber((e.target as HTMLInputElement).value)}
        placeholder="Số nhà , Khu phố"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Thành phố
      </label>
      <Listbox
        value={selectedCity}
        onChange={(v: string) => {
          setSelectedCity(v);
          setSelectedWard("");
        }}
      >
        <div className="relative w-full">
          <ListboxButton className="relative w-full cursor-pointer bg-black/5 border-2 border-black/30 text-black py-3 pl-5 pr-10 rounded-full text-left focus:outline-none">
            <span>
              {cities.find((c) => c.code === selectedCity)?.name ||
                "Chọn thành phố"}
            </span>
            <FaCity className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60" />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-50 mt-1 w-full bg-black/90 rounded-xl py-1 text-white max-h-60 overflow-auto shadow-2xl">
              {cities.map((c) => (
                <ListboxOption
                  key={c.code}
                  value={c.code}
                  className={({ selected }) =>
                    `cursor-pointer py-2 pl-5 pr-10 ${
                      selected ? "bg-black/30 font-semibold text-black" : "text-black/80"}
                    }`
                  }
                >
                  {c.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>

      <label className="block text-sm font-medium text-black mb-1 ml-2">
        Phường/Xã
      </label>
      <Listbox
        value={selectedWard}
        onChange={setSelectedWard}
        disabled={!selectedCity}
      >
        <div className="relative w-full">
          <ListboxButton className="relative w-full cursor-pointer bg-black/5 border-2 border-black/30 text-black py-3 pl-5 pr-10 rounded-full text-left focus:outline-none disabled:opacity-50">
            <span>
              {wards.find((w) => w.code === selectedWard)?.name ||
                "Chọn phường/xã"}
            </span>
            <FiMapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60" />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-50 mt-1 w-full bg-black/90 rounded-xl py-1 text-white max-h-60 overflow-auto shadow-2xl">
              {wards.map((w) => (
                <ListboxOption
                  key={w.code}
                  value={w.code}
                  className={({ selected }) =>
                    `cursor-pointer py-2 pl-5 pr-10 ${
                      selected ? "bg-black/30 font-semibold text-black" : "text-black/80"}
                    }`
                  }
                >
                  {w.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>

      <div className="flex justify-between mt-2">
        <button
          type="button"
          className="flex items-center gap-2 bg-black/40 hover:bg-black text-white font-semibold px-6 py-2 rounded-full shadow transition-all border-2 border-black/40"
          onClick={() => setActiveIndex(0)}
        >
          <FaArrowLeft /> Quay lại
        </button>
        <button
          type="button"
          className="flex items-center gap-2 bg-black/80 hover:bg-black text-white font-semibold px-6 py-2 rounded-full shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black/80"
          onClick={() => setActiveIndex(2)}
          disabled={!houseNumber || !selectedCity || !selectedWard}
        >
          Tiếp tục <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
