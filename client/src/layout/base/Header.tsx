import { Link, useLocation } from "react-router-dom";
import { useState, memo } from "react";
import { Menu, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GooeyNav from "@/components/react-bits/Components/GooeyNav/GooeyNav";
import { useAuthStore } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { logoutApi } from "@/services/authService";
import { toast } from "react-toastify";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "#" },
  { label: "Custom phím", href: "/customKeyboard" },
  { label: "Xem đơn", href: "#" },
  { label: "Khuyến mãi", href: "#" },
  { label: "Tin tức", href: "#" },
];

const MemoGooeyNav = memo(function ({ pathname }: { pathname: string }) {
  return (
    <GooeyNav
      items={navItems.map((item) => ({ label: item.label, href: item.href }))}
      particleCount={15}
      particleDistances={[90, 10]}
      particleR={200}
      initialActiveIndex={
        navItems.findIndex((item) => item.href === pathname) || 0
      }
      animationTime={600}
      timeVariance={300}
      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
    />
  );
});

function HeaderComponent() {
  const { pathname } = useLocation();
  const [openMobile, setOpenMobile] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const handleLogout = async () => {
    try {
      await logoutApi();
      toast.success("Đăng xuất thành công");
      logout();
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1200);
    } catch (err) {
      toast.error("Đăng xuất thất bại");
      console.error(err);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6 gap-6">
            {/* Logo */}
            {/* Logo */}
            <div
              className="flex items-center justify-center h-[48px] whitespace-nowrap"
              style={{ fontFamily: "Impact, Arial, sans-serif" }}
            >
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-white to-blue-700 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                G-LAB
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 w-full justify-center">
              <nav className="flex items-center gap-6">
                <MemoGooeyNav pathname={pathname} />
              </nav>
            </div>
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none cursor-pointer">
                      <Avatar>
                        <AvatarImage
                          src={"https://github.com/shadcn.png"}
                          alt={user.name || "avatar"}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {user.name ? user.name[0].toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-44 bg-gradient-to-br from-purple-100 via-white to-purple-300 border border-purple-300 shadow-xl animate-fade-in"
                  >
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full">
                        Trang cá nhân
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/auth/register">
                    <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:from-cyan-300 hover:to-purple-400 transition rounded-full px-5 py-2">
                      Đăng ký
                    </Button>
                  </Link>
                  <Link to="/auth/login">
                    <Button className="border border-white/20 text-white bg-transparent hover:bg-white/10 transition rounded-full px-5 py-2">
                      Đăng nhập
                    </Button>
                  </Link>
                  {/* Nút hỗ trợ nhỏ có icon */}
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition px-2 py-1"
                    style={{ height: 32, width: 32, minWidth: 32 }}
                    aria-label="Hỗ Trợ"
                  >
                    <HelpCircle size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-cyan-400 hover:shadow-[0_0_10px_#22D3EE] transition duration-300"
              onClick={() => setOpenMobile((prev) => !prev)}
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
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          openMobile ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="backdrop-blur-md bg-[#0B0B16]/60 border border-cyan-400/30 rounded-b-md shadow-[0_0_15px_#22D3EE,0_0_20px_#93C5FD] px-6 py-4 flex flex-col gap-4">
          {navItems
            .filter((item) => item.label !== "Liên hệ")
            .map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpenMobile(false)}
                className={
                  pathname === item.href
                    ? "text-cyan-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#22D3EE] after:via-[#93C5FD] after:to-[#A78BFA] after:animate-light-sweep font-medium transition duration-300"
                    : "text-[#B6B7BF] hover:text-cyan-300 hover:shadow-[0_0_6px_#22D3EE] font-medium transition duration-300"
                }
              >
                {item.label}
              </Link>
            ))}
          <div className="flex flex-col gap-2 mt-3">
            <Link to="/auth/register">
              <button className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:from-cyan-300 hover:to-purple-400 transition duration-200 rounded-md">
                Đăng ký
              </button>
            </Link>

            <Link to="/auth/login">
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
