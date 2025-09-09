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
      className="bg-white/5 border-2 border-white/70 p-10 text-white rounded-2xl shadow-2xl"
      onSubmit={handleLogin}
    >
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-5">
        Login
      </h1>
      <div className="grid gap-5 mb-4">
        {/* Email */}
        <div className="grid grid-cols-[1fr_max-content] items-center gap-3 border-2 border-white/70 px-5 rounded-full">
          <input
            type="email"
            className="w-full bg-transparent text-white py-4 placeholder:text-white focus:outline-none"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <span className="text-xl text-white">
            <FiMail />
          </span>
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
            autoComplete="current-password"
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
          <span className="text-xl text-white">
            <FiLock />
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="accent-white" /> Remember me
        </label>
        <a href="#" className="text-white hover:underline">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-4 mb-4 bg-white rounded-full text-black font-medium cursor-pointer text-lg shadow-lg"
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full inline-block"></span>
        ) : (
          <>Login</>
        )}
      </button>

      <div className="text-sm text-center">
        Bạn chưa có tài khoản?{" "}
        <button
          type="button"
          className="font-medium hover:underline"
          onClick={() => setMode("register")}
        >
          Đăng ký ngay
        </button>
      </div>
    </motion.form>
  );
};

export default LoginForm;
