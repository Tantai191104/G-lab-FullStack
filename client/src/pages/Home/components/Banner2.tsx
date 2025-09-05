import CircularText from "./CircularText";

export default function Banner2() {
    return (
        <div
            className="relative w-full h-48 md:h-64 flex items-center overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
            }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
            
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                <div className="absolute bottom-16 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-300"></div>
            </div>

            {/* Left Text */}
            <div className="absolute left-6 md:left-12 z-10 max-w-lg">
                <h1 className="text-2xl md:text-4xl font-black leading-snug">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                        ĐA DẠNG MẪU MÃ
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        & PHÂN KHÚC PHÙ HỢP VỚI MỌI LOẠI KHÁCH HÀNG
                    </span>
                </h1>
                
                {/* Decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mt-4 shadow-lg shadow-cyan-400/25"></div>
            </div>

            {/* Right Circular Logo */}
            <div className="absolute right-6 md:right-12 z-10 flex items-center justify-center w-20 h-20 md:w-28 md:h-28">
                {/* Outer glow ring */}
                <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 p-1 animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                        {/* CircularText */}
                        <CircularText
                            text="Lab for keys - Create your own keyboard "
                            radius={70}
                            spinDuration={25}
                            onHover="speedUp"
                            className="w-full h-full text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        />
                        {/* Logo ở giữa */}
                        <div className="absolute inset-4 md:inset-6 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex items-center justify-center shadow-inner border border-gray-700/50">
                            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold text-xs md:text-sm">
                                LOGO
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
        </div>
    );
}
