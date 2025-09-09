import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { FiCheckCircle, FiXCircle, FiMail } from "react-icons/fi";

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyEmail = useVerifyEmail();
  const hasTriggered = useRef(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }
    // Chỉ gọi mutate một lần
    if (!hasTriggered.current) {
      verifyEmail.mutate(token, {
        onSettled: () => setTimeout(() => navigate("/auth/login"), 1800),
      });
      hasTriggered.current = true;
    }
  }, [navigate, token, verifyEmail]);

  let content;
  if (verifyEmail.isPending) {
    content = (
      <div className="flex flex-col items-center gap-3">
        <FiMail className="text-5xl text-blue-400 animate-bounce" />
        <span className="text-lg text-blue-400 font-semibold">
          Đang xác thực email...
        </span>
      </div>
    );
  } else if (verifyEmail.isError) {
    content = (
      <div className="flex flex-col items-center gap-3">
        <FiXCircle className="text-5xl text-red-500 animate-shake" />
        <span className="text-lg text-red-500 font-semibold">
          Xác thực thất bại!
        </span>
        <span className="text-sm text-gray-400">
          Vui lòng kiểm tra lại liên kết hoặc thử lại sau.
        </span>
      </div>
    );
  } else if (verifyEmail.isSuccess) {
    content = (
      <div className="flex flex-col items-center gap-3">
        <FiCheckCircle className="text-5xl text-green-500 animate-pulse" />
        <span className="text-lg text-green-500 font-semibold">
          Xác thực thành công!
        </span>
        <span className="text-sm text-gray-400">
          Bạn sẽ được chuyển về trang đăng nhập...
        </span>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center gap-3">
        <FiMail className="text-5xl text-blue-400 animate-bounce" />
        <span className="text-lg text-blue-400 font-semibold">
          Đang xác thực email...
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 via-white to-purple-300">
      <div className="bg-white/80 rounded-2xl shadow-2xl px-10 py-12 min-w-[320px] flex flex-col items-center">
        {content}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
