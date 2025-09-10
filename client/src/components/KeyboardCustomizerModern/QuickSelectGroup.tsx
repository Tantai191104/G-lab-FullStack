import { Modal } from "antd";
import React, { useLayoutEffect, useRef, useState } from "react";
import type { KeyGroups, KeyConfig } from "../types/types";

type Props = {
  baseGroups: KeyGroups;
  selectedKeycapGroup: string | null;
  setSelectedKeycapGroup: (g: string | null, keys?: string[]) => void;
  selectedSwitchGroup: string | null;
  setSelectedSwitchGroup: (g: string | null, keys?: string[]) => void;
  viewMode: "keycap" | "switch";
  keyConfigs: KeyConfig[];
  setHighlightKeys?: (keys: string[]) => void;
};

function QuickSelectGroupComponent({
  baseGroups,
  selectedKeycapGroup,
  setSelectedKeycapGroup,
  selectedSwitchGroup,
  setSelectedSwitchGroup,
  viewMode,
  keyConfigs,
  setHighlightKeys,
}: Props) {
  const groups = Object.keys(baseGroups);

  // ---- Handle logic chọn nhóm ----
  const handleGroupClick = (
    groupName: string,
    setValue: (g: string | null, keys?: string[]) => void
  ) => {
    if (!groupName || !baseGroups[groupName]) return;

    const groupKeys = baseGroups[groupName];

    // Lấy trạng thái custom từ keyConfigs
    const keysCustomed = groupKeys.filter((k) => {
      const cfg = keyConfigs.find((c) => c.key === k);
      return viewMode === "keycap" ? !!cfg?.keycap : !!cfg?.switch;
    });
    const keysNotCustomed = groupKeys.filter((k) => {
      const cfg = keyConfigs.find((c) => c.key === k);
      return viewMode === "keycap" ? !cfg?.keycap : !cfg?.switch;
    });

    if (keysCustomed.length > 0) {
      if (setHighlightKeys) setHighlightKeys(keysCustomed);

      Modal.confirm({
        title: `Nhóm "${groupName}" có ${keysCustomed.length} phím đã custom`,
        content: "Bạn có muốn chọn tất cả các phím trong nhóm không?",
        okText: "Chọn tất cả",
        cancelText: "Chỉ chọn phím chưa custom",
        onOk: () => {
          setValue(groupName, groupKeys);
          if (setHighlightKeys) setHighlightKeys([]);
        },
        onCancel: () => {
          setValue(null);
          if (setHighlightKeys) setHighlightKeys(keysNotCustomed);
        },
      });
    } else {
      setValue(groupName, groupKeys);
      if (setHighlightKeys) setHighlightKeys([]);
    }
  };

  // ---- Highlight pill effect ----
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
  const [activeValue, setActiveValue] = useState<string | null>(null);

  // Cập nhật activeValue mỗi khi selectedKeycapGroup hoặc selectedSwitchGroup thay đổi
  useLayoutEffect(() => {
    const newValue =
      viewMode === "keycap" ? selectedKeycapGroup : selectedSwitchGroup;
    if (newValue !== activeValue) {
      setActiveValue(newValue);

      const idx = newValue ? groups.indexOf(newValue) : -1;
      const btn = idx >= 0 ? refs.current[idx] : null;
      if (btn) {
        setHighlightStyle({
          width: btn.offsetWidth,
          transform: `translateX(${btn.offsetLeft}px)`,
        });
      } else {
        setHighlightStyle({ width: 0, transform: "translateX(0)" });
      }
    }
  }, [selectedKeycapGroup, selectedSwitchGroup, viewMode, activeValue, groups]);

  // ---- Render pill button group ----
  const renderGroup = (
    label: string,
    value: string | null,
    setValue: (g: string | null, keys?: string[]) => void
  ) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap relative">
      <span className="text-sm font-semibold text-gray-700 min-w-[100px]">
        {label}:
      </span>

      <div className="flex gap-2 flex-wrap relative">
        {/* Background chung cho tất cả nút */}
        <div className="absolute top-0 left-0 h-full w-full rounded-full bg-[#B6B7BF] opacity-50 z-0" />

        {/* Highlight gradient pill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-in-out shadow-lg z-10"
          style={{
            ...highlightStyle,
            background: "linear-gradient(90deg, #F72626, #FAE04E, #15368B)",
          }}
        />

        {groups.map((g, idx) => (
          <button
            key={g}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            onClick={() => handleGroupClick(g, setValue)}
            className={`relative z-20 px-4 py-1 rounded-full text-[16px] font-medium transition-colors duration-300 focus:outline-none select-none
          ${
            value === g
              ? "text-white" // chữ trắng khi active
              : "text-[#15368B] hover:bg-[#FAE04E] hover:text-[#15368B]"
          }
        `}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {viewMode === "keycap" &&
        renderGroup("Nhóm Keycap", selectedKeycapGroup, setSelectedKeycapGroup)}
      {viewMode === "switch" &&
        renderGroup("Nhóm Switch", selectedSwitchGroup, setSelectedSwitchGroup)}
    </div>
  );
}

// ---- Memoize để tránh render lại không cần thiết ----
export const QuickSelectGroup = React.memo(
  QuickSelectGroupComponent,
  (prev, next) =>
    prev.viewMode === next.viewMode &&
    prev.selectedKeycapGroup === next.selectedKeycapGroup &&
    prev.selectedSwitchGroup === next.selectedSwitchGroup &&
    Object.keys(prev.baseGroups).join(",") ===
      Object.keys(next.baseGroups).join(",") &&
    JSON.stringify(prev.keyConfigs) === JSON.stringify(next.keyConfigs)
);
