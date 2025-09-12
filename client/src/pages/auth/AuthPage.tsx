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
  const handleRegister = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    houseNumber: string;
    selectedCity: string;
    selectedWard: string;
  }) => {
    // Tìm city và ward theo code
    const cityObj = cities.find((c) => c.code === data.selectedCity);
    const wardObj = wards.find(
      (w) => w.code === data.selectedWard && w.parent_code === data.selectedCity
    );

    const cityName = cityObj?.name || "";
    const wardName = wardObj?.name || "";

    const address = `${data.houseNumber}, ${wardName}, ${cityName}`;
    console.log("Full Address:", address);

    // Gọi mutation register
    registerMutation.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
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
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#0A92CC] to-[#F4BB19] text-white font-bold shadow-lg hover:brightness-110 hover:shadow-[0_0_12px_#0A92CC] transition-all duration-200 border-2 border-[#0A92CC]"
        onClick={() => navigate("/")}
      >
        <FiArrowLeft className="text-xl" />
        Trang chủ
      </button>

      <motion.img
        src="/avatar/signatureKeycaps.jpg"
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
