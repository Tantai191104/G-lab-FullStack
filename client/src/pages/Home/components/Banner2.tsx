import { memo } from "react";
import CircularText from "./CircularText";

function Banner2() {
  return (
    <div
      className="relative w-full h-48 md:h-64 flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A92CC 0%, #F4BB19 50%, #ED2B52 100%)",
      }}
    >
      {/* Manga-inspired background gradients and accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A92CC]/15 via-[#F4BB19]/15 to-[#ED2B52]/10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#AE214A]/25 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#F4BB19]/25 to-transparent rounded-full blur-3xl"></div>

      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-25">
  <div className="absolute top-4 left-1/4 w-2 h-2 bg-[#AE214A] rounded-full animate-pulse"></div>
  <div className="absolute top-12 right-1/3 w-1.5 h-1.5 bg-[#0A92CC] rounded-full animate-pulse delay-100"></div>
  <div className="absolute bottom-8 left-1/3 w-2 h-2 bg-[#F4BB19] rounded-full animate-pulse delay-200"></div>
  <div className="absolute bottom-16 right-1/4 w-1.5 h-1.5 bg-[#ED2B52] rounded-full animate-pulse delay-300"></div>
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
          <span className="text-[#0A92CC] drop-shadow-[0_2px_8px_#0A92CC]">ĐA DẠNG MẪU MÃ</span>
          <br />
          <span className="text-[#AE214A] drop-shadow-[0_2px_8px_#AE214A]">
            & PHÂN KHÚC PHÙ HỢP VỚI MỌI LOẠI KHÁCH HÀNG
          </span>
        </h1>

        <div className="w-24 h-1 rounded-full mt-4 shadow-lg bg-gradient-to-r from-[#F4BB19] via-[#ED2B52] to-[#0A92CC] shadow-[#AE214A]/30"></div>
      </div>

      {/* Right Circular Logo */}
      <div className="absolute right-6 md:right-12 z-10 flex items-center justify-center w-20 h-20 md:w-28 md:h-28">
        <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#0A92CC] via-[#F4BB19] to-[#ED2B52] p-1 animate-spin-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center">
            <CircularText
              text="Lab for keys - Create your own keyboard "
              radius={70}
              spinDuration={25}
              onHover="speedUp"
              className="w-full h-full text-transparent bg-gradient-to-r from-[#AE214A] via-[#F4BB19] to-[#0A92CC] bg-clip-text drop-shadow-[0_0_15px_#ED2B52]"
            />
            <div className="absolute inset-4 md:inset-6 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center shadow-inner border border-[#0A92CC]/50">
              <span className="text-transparent bg-gradient-to-r from-[#F4BB19] to-[#ED2B52] bg-clip-text font-bold text-xs md:text-sm">
                LOGO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>

  {/* Bottom accent line manga-inspired */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F4BB19] to-[#ED2B52] opacity-80"></div>

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
