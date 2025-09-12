import { memo } from "react";
import CircularText from "./CircularText";

function Banner2() {
  return (
    <div
      className="relative w-full h-48 md:h-64 flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f2a50 0%, #1a3b70 50%, #0f4c90 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/15 via-blue-500/15 to-white/10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/25 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/25 to-transparent rounded-full blur-3xl"></div>

      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-16 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Digital lines effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute top-0 w-[1px] h-full animate-slideDown`}
            style={{
              left: `${i * 5 + 5}%`,
              background:
                i % 3 === 0
                  ? "rgba(255,0,0,0.3)"
                  : i % 3 === 1
                  ? "rgba(0,0,255,0.3)"
                  : "rgba(255,255,255,0.3)",
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Left Text */}
      <div className="absolute left-6 md:left-12 z-10 max-w-lg">
        <h1 className="text-2xl md:text-4xl font-black leading-snug">
          <span className="text-white">ĐA DẠNG MẪU MÃ</span>
          <br />
          <span className="text-white">
            & PHÂN KHÚC PHÙ HỢP VỚI MỌI LOẠI KHÁCH HÀNG
          </span>
        </h1>

        <div className="w-24 h-1  rounded-full mt-4 shadow-lg shadow-red-500/30"></div>
      </div>

      {/* Right Circular Logo */}
      <div className="absolute right-6 md:right-12 z-10 flex items-center justify-center w-20 h-20 md:w-28 md:h-28">
        <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-red-500 via-blue-500 to-white p-1 animate-spin-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center">
            <CircularText
              text="Lab for keys - Create your own keyboard "
              radius={70}
              spinDuration={25}
              onHover="speedUp"
              className="w-full h-full text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-white bg-clip-text drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]"
            />
            <div className="absolute inset-4 md:inset-6 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center shadow-inner border border-gray-600/50">
              <span className="text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text font-bold text-xs md:text-sm">
                LOGO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-blue-500 opacity-70"></div>

      {/* Tailwind animation for digital lines */}
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-slideDown {
          animation: slideDown 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default memo(Banner2);
