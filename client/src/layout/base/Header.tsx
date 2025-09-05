import { Link, useLocation } from "react-router-dom";
import { useState, memo } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import GooeyNav from "@/components/react-bits/Components/GooeyNav/GooeyNav";

const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "#" },
    { label: "Custom bàn phím", href: "/customKeyboard" },
    { label: "Dịch vụ", href: "#" },
    { label: "Khuyến mãi", href: "#" },
    { label: "Liên hệ", href: "#" },
];

const MemoGooeyNav = memo(function ({ pathname }: { pathname: string }) {
    return (
        <GooeyNav
            items={navItems.map(item => ({ label: item.label, href: item.href }))}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={200}
            initialActiveIndex={navItems.findIndex(item => item.href === pathname) || 0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
    );
});

function HeaderComponent() {
    const { pathname } = useLocation();
    const [openMobile, setOpenMobile] = useState(false);

    return (
        <header className="w-full fixed top-0 left-0 z-50">
            {/* Glass + Neon + Mech lines */}
            <div className="relative">
                {/* Neon glow border */}
                <div className="absolute inset-0 rounded-bl-lg rounded-br-lg shadow-[0_0_20px_#22D3EE,0_0_30px_#93C5FD,0_0_40px_#A78BFA] pointer-events-none"></div>

                {/* Animated Mech lines */}
                <div className="absolute inset-0 rounded-bl-lg rounded-br-lg pointer-events-none overflow-hidden">
                    {/* Ngang chạy từ trái sang phải */}
                    <div className="absolute top-2 left-0 w-full h-[1px] bg-gradient-to-r from-[#22D3EE]/50 via-[#93C5FD]/50 to-[#A78BFA]/50 animate-marquee-horizontal"></div>
                    <div className="absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-[#93C5FD]/50 via-[#A78BFA]/50 to-[#22D3EE]/50 animate-marquee-horizontal delay-2000"></div>

                    {/* Dọc chạy từ trên xuống */}
                    <div className="absolute top-0 left-4 w-[1px] h-full bg-gradient-to-b from-[#93C5FD]/50 via-[#22D3EE]/50 to-[#A78BFA]/50 animate-marquee-vertical"></div>
                    <div className="absolute top-0 right-4 w-[1px] h-full bg-gradient-to-b from-[#A78BFA]/50 via-[#93C5FD]/50 to-[#22D3EE]/50 animate-marquee-vertical delay-2000"></div>
                </div>

                {/* Main header container */}
                <div className="backdrop-blur-md bg-[#0B0B16]/50 border border-cyan-400/30 rounded-b-lg relative z-10">
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 gap-4">
                        {/* Logo */}
                        <div className="text-white font-bold text-xl tracking-wide">
                            Lab for Keys
                        </div>
                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8 flex-1 justify-center relative w-full">
                            <MemoGooeyNav pathname={pathname} />
                        </div>

                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/signup">
                                <Button className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:from-cyan-300 hover:to-purple-400 transition duration-200 rounded-full">
                                    Đăng ký
                                </Button>
                            </Link>

                            <Link to="/login">
                                <Button className="w-full border border-white/20 text-white bg-transparent hover:bg-white/10 transition duration-200 rounded-full">
                                    Đăng nhập
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-cyan-400 hover:shadow-[0_0_10px_#22D3EE] transition duration-300"
                            onClick={() => setOpenMobile(prev => !prev)}
                        >
                            {openMobile ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {/* Light Sweep under header */}
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#22D3EE] via-[#93C5FD] to-[#A78BFA] animate-light-sweep rounded-b-md"></span>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${openMobile ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="backdrop-blur-md bg-[#0B0B16]/60 border border-cyan-400/30 rounded-b-md shadow-[0_0_15px_#22D3EE,0_0_20px_#93C5FD] px-6 py-4 flex flex-col gap-4">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`font-medium transition duration-300 ${pathname === item.href
                                ? "text-cyan-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#22D3EE] after:via-[#93C5FD] after:to-[#A78BFA] after:animate-light-sweep"
                                : "text-[#B6B7BF] hover:text-cyan-300 hover:shadow-[0_0_6px_#22D3EE]"
                                }`}
                            onClick={() => setOpenMobile(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-2 mt-3">
                        <Link to="/signup">
                            <button className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:from-cyan-300 hover:to-purple-400 transition duration-200 rounded-md">
                                Đăng ký
                            </button>
                        </Link>

                        <Link to="/login">
                            <button className="w-full border border-white/20 text-white bg-transparent hover:bg-white/10 transition duration-200 rounded-md">
                                Đăng nhập
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default memo(HeaderComponent);
