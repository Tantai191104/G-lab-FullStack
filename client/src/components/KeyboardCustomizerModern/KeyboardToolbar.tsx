import { motion } from "framer-motion";
import { SelectedKey } from "./SelectedKey";
import { QuickSelectGroup } from "./QuickSelectGroup";
import { ActionToolbar } from "./ActionToolbar";
import type { KeyGroups, KeyConfig } from "../types/types";

interface KeyboardToolbarProps {
  viewMode: "keycap" | "switch";
  percentKeycaps: number;
  percentSwitches: number;
  selectedKey: string | null;
  selectedKeycapGroup: string | null;
  setSelectedKeycapGroup: (v: keyof KeyGroups | "all" | null) => void;
  selectedGroup: string | null;
  setSelectedGroup: (v: keyof KeyGroups | "all" | null) => void;
  baseGroups: KeyGroups;
  keyConfigs: KeyConfig[];
  setHighlightKeys: (keys: string[] | undefined) => void;
  clearAll: () => void;
}

export function KeyboardToolbar({
  viewMode,
  percentKeycaps,
  percentSwitches,
  selectedKey,
  selectedKeycapGroup,
  setSelectedKeycapGroup,
  selectedGroup,
  setSelectedGroup,
  baseGroups,
  keyConfigs,
  setHighlightKeys,
  clearAll,
}: KeyboardToolbarProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Progress Indicator */}
      <motion.div
        className="flex flex-col items-center md:flex-row md:gap-2 gap-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: [50, -15, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-16 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-3 rounded-full ${
              viewMode === "keycap" ? "bg-indigo-500" : "bg-green-500"
            }`}
            style={{
              width:
                viewMode === "keycap"
                  ? `${percentKeycaps}%`
                  : `${percentSwitches}%`,
              transition: "width 0.5s ease-out",
            }}
          />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xs font-semibold text-gray-700">
            {viewMode === "keycap" ? percentKeycaps : percentSwitches}%
          </span>
          <span className="text-[10px] text-gray-500 italic">
            {viewMode === "keycap"
              ? "Keycaps hoàn thiện"
              : "Switches hoàn thiện"}
          </span>
        </div>
      </motion.div>

      {/* SelectedKey */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: [50, -10, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SelectedKey selectedKey={selectedKey} />
      </motion.div>

      {/* QuickSelect */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: [50, -10, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <QuickSelectGroup
          baseGroups={baseGroups}
          selectedKeycapGroup={selectedKeycapGroup}
          setSelectedKeycapGroup={setSelectedKeycapGroup}
          selectedSwitchGroup={selectedGroup}
          setSelectedSwitchGroup={setSelectedGroup}
          viewMode={viewMode}
          keyConfigs={keyConfigs}
          setHighlightKeys={setHighlightKeys}
        />
      </motion.div>

      {/* ActionToolbar */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: [50, -10, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ActionToolbar
          viewMode={viewMode}
          selectedKeycapGroup={selectedKeycapGroup}
          setSelectedKeycapGroup={setSelectedKeycapGroup}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          clearAll={clearAll}
        />
      </motion.div>
    </motion.div>
  );
}
