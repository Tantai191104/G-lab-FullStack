import { Empty, Input, Tag, Typography, Tooltip } from "antd";
import { BgColorsOutlined, SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import type { Keycap, KeyConfig } from "../types/types";

type Props = {
  keycaps: Keycap[];
  searchKeycap: string;
  setSearchKeycap: (v: string) => void;
  keyConfigs: KeyConfig[]; // dùng keyConfigs thay cho customKeys
  selectedKey: string | null;
  handleKeycapChange: (keycap: Keycap, targets?: string[]) => void; // truyền object
  highlightKeys?: string[];
};

export function KeycapPanel({
  keycaps,
  searchKeycap,
  setSearchKeycap,
  keyConfigs,
  selectedKey,
  handleKeycapChange,
  highlightKeys,
}: Props) {
  // Filter keycaps by search
  const filteredKeycaps = keycaps.filter((cap) =>
    cap.name.toLowerCase().includes(searchKeycap.toLowerCase())
  );

  // Stagger animation variant
  const listVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Lấy trạng thái đã chọn từ keyConfigs
  const getIsSelected = (cap: Keycap) => {
    if (!selectedKey) return false;
    const cfg = keyConfigs.find((c) => c.key === selectedKey);
    return cfg?.keycap?.id === cap.id;
  };

  // Khi click chọn keycap
  const handleClick = (cap: Keycap) => {
    // Nếu có highlightKeys thì apply cho tất cả, không thì chỉ selectedKey
    if (highlightKeys && highlightKeys.length > 0) {
      handleKeycapChange(cap, highlightKeys);
    } else {
      handleKeycapChange(cap, selectedKey ? [selectedKey] : []);
    }
  };

  return (
    <div
      className="rounded-2xl h-full p-4 flex flex-col"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Typography.Title
          level={5}
          className="!mb-0 flex items-center gap-2 text-gray-800"
        >
          <BgColorsOutlined /> Keycaps
        </Typography.Title>
      </div>

      {/* Search */}
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Tìm keycap theo tên"
        value={searchKeycap}
        onChange={(e) => setSearchKeycap(e.target.value)}
        className="mb-3"
      />

      {/* Keycap List */}
      {filteredKeycaps.length === 0 ? (
        <Empty description="Không có keycap phù hợp" />
      ) : (
        <motion.div
          className="flex flex-col gap-2 max-h-[700px] overflow-y-auto pr-1"
          variants={listVariant}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredKeycaps.map((cap) => {
              const isSelected = getIsSelected(cap);

              return (
                <motion.div
                  key={cap.id}
                  variants={itemVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <Tooltip
                    placement="right"
                    styles={{
                      body: {
                        background: "rgba(255, 255, 255, 0.95)",
                        color: "#333",
                        borderRadius: 12,
                        padding: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                        minWidth: 220,
                      },
                    }}
                    title={
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          {cap.image && (
                            <img
                              src={cap.image}
                              alt={cap.name}
                              className="w-12 h-12 rounded-lg object-cover border"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-gray-800">
                              {cap.name}
                            </div>
                            <Tag
                              style={{
                                backgroundColor: cap.color,
                                border: "none",
                                color: "#333",
                              }}
                            >
                              {cap.id.toUpperCase()}
                            </Tag>
                          </div>
                        </div>
                        {cap.profile && (
                          <div className="text-sm text-gray-700">
                            Profile: <b>{cap.profile}</b>
                          </div>
                        )}
                        {cap.material && (
                          <div className="text-sm text-gray-700">
                            Material: <b>{cap.material}</b>
                          </div>
                        )}
                        {cap.price && (
                          <div className="text-sm text-gray-700">
                            Giá: <b>{cap.price}</b>
                          </div>
                        )}
                      </div>
                    }
                  >
                    <div
                      onClick={() => handleClick(cap)}
                      className={`flex items-center justify-between rounded-xl border p-3 transition hover:shadow-md cursor-pointer 
      ${
        isSelected
          ? "border-blue-500 bg-white/70"
          : "border-gray-200 bg-white/40"
      }`}
                    >
                      <div className="flex items-center gap-3">
                        {cap.image ? (
                          <img
                            src={cap.image}
                            alt={cap.name}
                            className="w-10 h-10 rounded-lg object-cover border"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-lg border"
                            style={{ backgroundColor: cap.color }}
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">
                            {cap.name}
                          </span>
                          <Tag
                            style={{
                              backgroundColor: cap.color,
                              border: "none",
                              color: "#333",
                              fontWeight: 500,
                              width: "fit-content",
                            }}
                          >
                            {cap.id.toUpperCase()}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
