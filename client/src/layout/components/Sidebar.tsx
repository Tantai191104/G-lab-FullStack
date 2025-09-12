// AdminSidebar.jsx
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaKeyboard,
} from "react-icons/fa";
import { PlusCircleOutlined } from "@ant-design/icons";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: <FaHome /> },
  { to: "/admin/users", label: "Người dùng", icon: <FaUser /> },
  { to: "/admin/orders", label: "Đơn hàng", icon: <FaClipboardList /> },
  { to: "/admin/products", label: "Key cap", icon: <FaKeyboard /> },
  { to: "/admin/switches", label: "Switches", icon: <PlusCircleOutlined /> },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [autoCollapsed, setAutoCollapsed] = useState(false);

  // Tự động collapse khi màn hình nhỏ hơn 900px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setAutoCollapsed(true);
        setCollapsed(true);
      } else {
        setAutoCollapsed(false);
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`bg-gray-800 text-gray-100 min-h-screen flex flex-col transition-all duration-500 ease-in-out ${
        collapsed ? "w-20 shadow-md" : "w-64 shadow-2xl"
      }`}
      style={{
        boxShadow: collapsed
          ? "0 2px 8px rgba(0,0,0,0.08)"
          : "0 4px 24px rgba(33,150,243,0.15)",
      }}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center h-[40px] whitespace-nowrap">
            <img
              src="/avatar/avatar - GLab.jpg"
              alt="Logo"
              className="h-8 w-8 mr-2 object-contain"
            />
            <span
              style={{
                fontFamily: "Amuro, sans-serif",
                fontWeight: 500,
                fontSize: "1.5rem",
                color: "#ffffff",
              }}
            >
              G-LAB
            </span>
          </div>
        )}
        <button
          onClick={() => {
            // Nếu đang autoCollapsed thì mở sidebar thủ công sẽ tắt autoCollapsed
            if (autoCollapsed && collapsed) {
              setAutoCollapsed(false);
            }
            setCollapsed(!collapsed);
          }}
          className="p-2 hover:bg-gray-700 rounded-md transition"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-auto mt-4">
        <ul className="space-y-1">
          {adminLinks.map((item, idx) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    pathname === item.to
                      ? "bg-gray-700 text-white shadow"
                      : "hover:bg-gray-700 hover:text-white"
                  }
                `}
                style={{
                  opacity: collapsed ? 0.7 : 1,
                  transform: collapsed ? "translateX(-10px)" : "translateX(0)",
                  transition: `opacity 0.4s ${0.05 * idx}s, transform 0.4s ${
                    0.05 * idx
                  }s`,
                }}
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button */}
      <div className={`mt-auto ${collapsed ? "px-1 py-2" : "px-4 py-4"}`}>
        <button
          className={`flex items-center w-full px-0 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold cursor-pointer
            ${collapsed ? "justify-center" : "justify-center gap-2"}
          `}
          style={{ minHeight: 40 }}
        >
          <FaSignOutAlt className="text-base" />
          {!collapsed && (
            <span className="text-sm align-middle">Đăng xuất</span>
          )}
        </button>
      </div>
    </aside>
  );
}
