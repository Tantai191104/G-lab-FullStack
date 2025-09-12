// LoginForm.tsx
import { useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => void;
  setMode: (mode: "login" | "register") => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleLogin,
  setMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const variants = {
    initial: { opacity: 0, y: 40, scale: 0.96, backdropFilter: "blur(0px)" },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      backdropFilter: "blur(20px)",
      transition: { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.96,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  return (
    <motion.form
      key="login"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white/30 border border-black/20 p-10 text-black rounded-2xl shadow-2xl backdrop-blur-md"
      onSubmit={handleLogin}
    >
      <h1 className="text-center text-2xl md:text-3xl font-extrabold mb-5 text-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
        Đăng nhập
      </h1>
      <div className="grid gap-5 mb-4">
        {/* Email */}
        <div className="grid grid-cols-[1fr_max-content] items-center gap-3 border-2 border-black/20 px-5 rounded-full bg-black/5">
          <input
            type="email"
            className="w-full bg-transparent text-black py-4 placeholder:text-gray-500 focus:outline-none"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <span className="text-xl text-black/60">
            <FiMail />
          </span>
        </div>

        {/* Password */}
        <div className="grid grid-cols-[1fr_32px_32px] items-center gap-3 border-2 border-black/20 px-5 rounded-full bg-black/5">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full bg-transparent text-black py-4 placeholder:text-gray-500 focus:outline-none"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="text-xl text-black/60 focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          <span className="text-xl text-black/60">
            <FiLock />
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer text-black/70">
          <input type="checkbox" className="accent-black" /> Remember me
        </label>
        <a href="#" className="text-black/70 hover:underline">
          Quên mật khẩu?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-4 mb-4 bg-black/80 rounded-full text-white font-bold cursor-pointer text-lg shadow-lg border-2 border-black/80 hover:bg-black transition duration-200"
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
        ) : (
          <>Đăng nhập</>
        )}
      </button>

      <div className="text-sm text-center">
        <span className="text-black/70">Bạn chưa có tài khoản?</span>{" "}
        <button
          type="button"
          className="font-bold text-black hover:underline"
          onClick={() => setMode("register")}
        >
          Đăng ký ngay
        </button>
      </div>
    </motion.form>
  );
};

export default LoginForm;
