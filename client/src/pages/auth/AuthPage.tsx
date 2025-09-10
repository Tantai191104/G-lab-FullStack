import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import type { Province, Ward } from "@/types/types";
import citiesData from "../../data/province.json";
import wardsData from "../../data/ward.json";
import { useLogin, useRegister } from "@/hooks/useAuth";
const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const urlMode = location.pathname.includes("register") ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(urlMode);
  const cities = Object.values(citiesData) as Province[];
  // Lọc phường theo city đã chọn
  const wards = Object.values(wardsData) as Ward[];

  useEffect(() => {
    setMode(urlMode);
  }, [urlMode]);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Đăng nhập thành công!");
          navigate("/");
        },
      }
    );
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tìm city và ward theo code
    const cityObj = cities.find((c) => c.code === selectedCity);
    const wardObj = wards.find(
      (w) => w.code === selectedWard && w.parent_code === selectedCity
    );

    const cityName = cityObj?.name || "";
    const wardName = wardObj?.name || "";

    const address = `${houseNumber}, ${wardName}, ${cityName}`;
    console.log("Full Address:", address);

    // Gọi mutation register
    registerMutation.mutate(
      {
        name,
        email,
        password,
        address: [address],
      },
      {
        onSuccess: () => {
          navigate("/auth/login");
        },
      }
    );
  };

  const variants = {
    initial: { opacity: 0, y: 40, scale: 0.96, backdropFilter: "blur(0px)" },
    animate: { opacity: 1, y: 0, scale: 1, backdropFilter: "blur(20px)" },
    exit: { opacity: 0, y: -40, scale: 0.96, backdropFilter: "blur(0px)" },
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden">
      {/* Nút trở về trang chủ */}
      <button
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 hover:bg-white text-purple-700 font-semibold shadow-lg transition-all cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FiArrowLeft className="text-xl" />
        Trang chủ
      </button>

      <motion.img
        src="/login-bg.png"
        alt="bg"
        className="absolute w-4/5 h-4/5 object-cover object-center z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl"
        key={mode}
        initial={{ scale: 1.05, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05, opacity: 0.8 }}
        transition={{ duration: 1, ease: cubicBezier(0.22, 1, 0.36, 1) }}
      />

      <motion.div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loginMutation.isPending}
              handleLogin={handleLogin}
              setMode={setMode}
            />
          ) : (
            <motion.div
              key="register"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <RegisterForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                houseNumber={houseNumber}
                setHouseNumber={setHouseNumber}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedWard={selectedWard}
                setSelectedWard={setSelectedWard}
                loading={registerMutation.isPending}
                handleRegister={handleRegister}
                setMode={setMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;
