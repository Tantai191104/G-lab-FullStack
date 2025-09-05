import { Button, Switch, Tooltip } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import React from "react";

type Props = {
  viewMode: "keycap" | "switch";
  selectedKeycapGroup: string | null;
  setSelectedKeycapGroup: (v: string | null) => void;
  selectedGroup: string | null;
  setSelectedGroup: (v: string | null) => void;
  clearAll: () => void;
};

function ActionToolbarComponent({
  viewMode,
  selectedKeycapGroup,
  setSelectedKeycapGroup,
  selectedGroup,
  setSelectedGroup,
  clearAll,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Switch chọn tất cả */}
      <div className="flex flex-col items-center">
        <Tooltip title="Chọn tất cả hoặc từng phím">
          <Switch
            checkedChildren="All"
            unCheckedChildren="Single"
            checked={
              viewMode === "keycap"
                ? selectedKeycapGroup === "all"
                : selectedGroup === "all"
            }
            onChange={(checked) => {
              if (viewMode === "keycap") {
                setSelectedKeycapGroup(checked ? "all" : null);
              } else {
                setSelectedGroup(checked ? "all" : null);
              }
            }}
          />
        </Tooltip>
        <span className="text-xs italic text-gray-500 opacity-80 mt-1">
          {viewMode === "keycap"
            ? selectedKeycapGroup === "all"
              ? "Áp dụng: tất cả phím"
              : "Áp dụng: từng phím"
            : selectedGroup === "all"
              ? "Áp dụng: tất cả phím"
              : "Áp dụng: từng phím"}
        </span>
      </div>

      {/* Reset */}
      <div className="flex flex-col items-center">
        <Tooltip title="Reset tất cả">
          <Button
            icon={<ClearOutlined />}
            onClick={clearAll}
            className="rounded-lg border border-[#0C5776] text-gray-500 transition-colors duration-200 hover:bg-blue-50"
            size="small"
          />
        </Tooltip>
        <span className="text-xs italic text-gray-500 opacity-80 mt-1">
          Reset
        </span>
      </div>
    </div>
  );
}

// ✅ Memo hóa
export const ActionToolbar = React.memo(
  ActionToolbarComponent,
  (prev, next) =>
    prev.viewMode === next.viewMode &&
    prev.selectedKeycapGroup === next.selectedKeycapGroup &&
    prev.selectedGroup === next.selectedGroup
);
