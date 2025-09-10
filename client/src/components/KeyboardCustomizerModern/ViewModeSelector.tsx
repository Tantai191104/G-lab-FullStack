import { motion } from "framer-motion";
import { FaKeyboard } from "react-icons/fa";
import { AppstoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import type { KeyGroups } from "../types/types";

export function ViewModeSelector({
  viewMode,
  setViewMode,
  setDrawerOpen,
  setSelectedGroup,
  setSelectedKeycapGroup,
}: {
  viewMode: "keycap" | "switch";
  setViewMode: (v: "keycap" | "switch") => void;
  setDrawerOpen: (v: boolean) => void;
  setSelectedGroup: (v: keyof KeyGroups | "all" | null) => void;
  setSelectedKeycapGroup: (v: keyof KeyGroups | "all" | null) => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 pb-2 border-b border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <span className="text-3xl font-bold text-white">Chế độ hiển thị</span>
      <div className="flex w-full max-w-[500px] gap-4 relative">
        {/* Keycaps Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: viewMode === "keycap" ? "#6366f1" : "#ffffff",
            color: viewMode === "keycap" ? "#ffffff" : "#374151",
            boxShadow:
              viewMode === "keycap"
                ? "0px 4px 15px rgba(99, 102, 241, 0.5)"
                : "0px 2px 5px rgba(0,0,0,0.1)",
          }}
          transition={{ duration: 0.5 }}
          className="flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-lg font-semibold cursor-pointer"
          onClick={() => {
            setViewMode("keycap");
            setSelectedGroup(null);
            setSelectedKeycapGroup(null);
          }}
        >
          <FaKeyboard style={{ fontSize: 22 }} />
          Keycaps
        </motion.button>
        {/* Switches Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: viewMode === "switch" ? "#6366f1" : "#ffffff",
            color: viewMode === "switch" ? "#ffffff" : "#374151",
            boxShadow:
              viewMode === "switch"
                ? "0px 4px 15px rgba(99, 102, 241, 0.5)"
                : "0px 2px 5px rgba(0,0,0,0.1)",
          }}
          transition={{ duration: 0.5 }}
          className="flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-lg font-semibold cursor-pointer"
          onClick={() => {
            setViewMode("switch");
            setSelectedGroup(null);
            setSelectedKeycapGroup(null);
          }}
        >
          <PlusCircleOutlined style={{ fontSize: 22 }} />
          Switches
        </motion.button>
        {/* Bộ kit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-lg font-semibold cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #0C5776, #0A74DA)",
            color: "#fff",
            boxShadow: "0px 4px 15px rgba(12, 87, 118, 0.4)",
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <AppstoreOutlined style={{ fontSize: 22 }} />
          Bộ kit
        </motion.button>
      </div>
    </motion.div>
  );
}
