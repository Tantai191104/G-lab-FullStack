export default function HoverBackground() {
    return (
        <div className="group relative w-full max-w-7xl mx-auto mt-4 overflow-hidden h-[180px] flex flex-col justify-center">

            {/* subtle glow background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-purple-500/15 blur-2xl" />

            {/* Line top */}
            <div className="w-full h-0.5 relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 transition-all duration-500 ease-in-out group-hover:w-full"
                ></div>
            </div>

            {/* 2 dòng chữ */}
            <div className="my-6 relative h-[120px] overflow-hidden flex flex-col justify-start">
                <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                    <h1 className="text-[4rem] font-extrabold font-header text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 whitespace-nowrap text-center tracking-wider drop-shadow-[0_0_12px_rgba(147,197,253,0.35)]">
                        Lab for Keys
                    </h1>
                    <h1 className="text-[4rem] font-extrabold font-header text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 whitespace-nowrap text-center tracking-wider drop-shadow-[0_0_12px_rgba(167,139,250,0.35)]">
                        Lab for Keys
                    </h1>
                </div>
            </div>

            {/* Line bottom */}
            <div className="w-full h-0.5 relative overflow-hidden">
                <div
                    className="absolute top-0 right-0 h-full w-0 bg-gradient-to-l from-purple-500 via-blue-400 to-cyan-300 transition-all duration-500 ease-in-out group-hover:w-full"
                ></div>
            </div>
        </div>
    );
}
