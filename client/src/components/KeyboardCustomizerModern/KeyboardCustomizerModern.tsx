import { useState, useMemo, useEffect, useCallback } from "react";
import { Modal, Spin, Tag } from "antd";
import data from "../../data/keyboardData.json";
import { HeaderBar } from "./HeaderBar";
import { KeyboardFactory } from "./KeyboardDisplayFactory";
import {
  AppstoreOutlined,
  ExportOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { FaKeyboard } from "react-icons/fa";
import { SelectedKey } from "./SelectedKey";
import { QuickSelectGroup } from "./QuickSelectGroup";
import { motion } from "framer-motion";
import { PickerDrawer } from "./PickerDrawer";
import { ActionToolbar } from "./ActionToolbar";
import type {
  KeyboardSize,
  Keycap,
  KeyGroups,
  KeyObject,
  SwitchItem,
} from "../types/types";
import Balatro from "../react-bits/Backgrounds/Balatro/Balatro";
import StartLayoutModal from "./StartLayoutModal";
import KitDrawer from "./KitDrawer";
import ExportDialog from "./ExportDialog";
import Stepper from "./Stepper";

export default function KeyboardCustomizerModern() {
  const {
    keyWidths,
    layouts,
    switches: switchList,
    keycaps,
    kits,
    switchColors,
  } = data as unknown as {
    keyWidths: Record<KeyboardSize, Record<string, number>>;
    layouts: Record<string, KeyObject[][]>;
    switches: SwitchItem[];
    keycaps: Keycap[];
    kits: { name: string; image: string; description?: string }[];
    switchColors: Record<string, string>;
  };
  // ==== Memo Data Json ====
  const memoKits = useMemo(() => kits, [kits]);
  const memoKeyWidths = useMemo(() => keyWidths, [keyWidths]);
  const memoLayouts = useMemo(() => layouts, [layouts]);
  const memoSwitchList = useMemo(() => switchList, [switchList]);
  const memoKeycaps = useMemo(() => keycaps, [keycaps]);
  const memoSwitchColors = useMemo(() => switchColors, [switchColors]);
  // ==== Derived groups ====
  const baseGroups: KeyGroups = useMemo(
    () => ({
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      letters: layouts.full
        .flat()
        .map((k) => k.key)
        .filter((k) => /^[A-Z]$/i.test(k)),
      arrows: ["Up", "Down", "Left", "Right"],
    }),
    [layouts.full]
  );

  // ==== States ====
  const [keyboardSize, setKeyboardSize] = useState<KeyboardSize>("full");
  const [viewMode, setViewMode] = useState<"keycap" | "switch">("keycap");

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<
    keyof KeyGroups | "all" | null
  >(null);
  const [selectedKeycapGroup, setSelectedKeycapGroup] = useState<
    keyof KeyGroups | "all" | null
  >(null);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSwitch, setSelectedSwitch] = useState<string | null>(null);
  const [selectedKit, setSelectedKit] = useState<string | null>(null);

  const [customKeys, setCustomKeys] = useState<Record<string, string>>({});
  const [customSwitches, setCustomSwitches] = useState<Record<string, string>>(
    {}
  );
  const [highlightKeys, setHighlightKeys] = useState<string[] | undefined>(
    undefined
  );
  const [exportData, setExportData] = useState<{
    size: string;
    mainKeycap: string;
    keycapOthers: Record<string, string[]>;
    perKeySwitch: Record<string, string>;
  } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panelPickerOpen, setPanelPickerOpen] = useState(false);
  // search
  const [searchKeycap, setSearchKeycap] = useState("");
  const [searchSwitch, setSearchSwitch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLayoutPopup, setShowLayoutPopup] = useState(true);

  // ==== Keys for layout ====
  const allKeysForSize = useMemo(
    () => layouts[keyboardSize].flat().map((k) => k.key),
    [keyboardSize, layouts]
  );

  const keyGroups: KeyGroups = useMemo(
    () => ({
      all: allKeysForSize,
      ...baseGroups,
    }),
    [allKeysForSize, baseGroups]
  );

  useEffect(() => {
    setCustomKeys((prev) => {
      const next: Record<string, string> = {};
      allKeysForSize.forEach((k) => (next[k] = prev[k] || ""));
      return next;
    });
    setCustomSwitches((prev) => {
      const next: Record<string, string> = {};
      allKeysForSize.forEach((k) => (next[k] = prev[k] || ""));
      return next;
    });
  }, [allKeysForSize]);

  // ==== Actions ====
  // Hàm apply chung cho keycap hoặc switch
  const handleApplyToTargets = useCallback(
    (value: string, type: "keycap" | "switch") => {
      let targets: string[] = [];

      if (highlightKeys?.length) {
        targets = highlightKeys;
      } else if (selectedKeycapGroup === "all" || selectedGroup === "all") {
        targets = keyGroups.all;
      } else if (selectedKeycapGroup && keyGroups[selectedKeycapGroup]) {
        targets = keyGroups[selectedKeycapGroup];
      } else if (selectedGroup && keyGroups[selectedGroup]) {
        targets = keyGroups[selectedGroup];
      } else if (selectedKey) {
        targets = [selectedKey];
      }

      if (!targets.length) return;

      if (type === "keycap") {
        setCustomKeys((prev) => {
          const next = { ...prev };
          targets.forEach((k) => (next[k] = value));
          return next;
        });
      } else {
        setCustomSwitches((prev) => {
          const next = { ...prev };
          targets.forEach((k) => (next[k] = value));
          return next;
        });
      }
    },
    [
      highlightKeys,
      selectedKey,
      selectedGroup,
      selectedKeycapGroup,
      keyGroups,
      setCustomKeys,
      setCustomSwitches,
    ]
  );

  // handle riêng cho keycap và switch dùng chung handleApplyToTargets
  const handleKeycapChange = useCallback(
    (capId: string) => handleApplyToTargets(capId, "keycap"),
    [handleApplyToTargets]
  );

  const handleSwitchClick = useCallback(
    (swName: string) => handleApplyToTargets(swName, "switch"),
    [handleApplyToTargets]
  );

  const clearAll = useCallback(() => {
    const cleared: Record<string, string> = {};
    allKeysForSize.forEach((k) => {
      cleared[k] = "";
    });

    setCustomKeys(cleared);
    setCustomSwitches({ ...cleared });
    setSelectedKey(null);
    setSelectedGroup(null);
    setSelectedKeycapGroup(null);
    setSelectedSwitch(null);
  }, [
    allKeysForSize,
    setCustomKeys,
    setCustomSwitches,
    setSelectedKey,
    setSelectedGroup,
    setSelectedKeycapGroup,
    setSelectedSwitch,
  ]);

  const handleExport = useCallback(() => {
    const missingKeycaps: string[] = [];
    const missingSwitches: string[] = [];

    allKeysForSize.forEach((key) => {
      if (!customKeys[key]) missingKeycaps.push(key);
      if (!customSwitches[key]) missingSwitches.push(key);
    });

    if (missingKeycaps.length || missingSwitches.length) {
      Modal.warning({
        title: "Thiếu thông tin phím",
        content: (
          <div className="space-y-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
            {missingKeycaps.length > 0 && (
              <p className="text-yellow-800">
                <strong>Chưa chọn keycap:</strong>{" "}
                {missingKeycaps.map((k) => (
                  <Tag key={k} color="gold" className="mb-1">
                    {k}
                  </Tag>
                ))}
              </p>
            )}
            {missingSwitches.length > 0 && (
              <p className="text-red-800">
                <strong>Chưa chọn switch:</strong>{" "}
                {missingSwitches.map((k) => (
                  <Tag key={k} color="red" className="mb-1">
                    {k}
                  </Tag>
                ))}
              </p>
            )}
          </div>
        ),
      });
      return;
    }

    const counts: Record<string, number> = {};
    Object.values(customKeys).forEach((cap) => {
      if (!cap) return;
      counts[cap] = (counts[cap] || 0) + 1;
    });

    const mainKeycap =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

    const others: Record<string, string[]> = {};
    Object.entries(customKeys).forEach(([key, cap]) => {
      if (cap && cap !== mainKeycap) {
        if (!others[cap]) others[cap] = [];
        others[cap].push(key);
      }
    });

    setExportData({
      size: keyboardSize,
      mainKeycap,
      keycapOthers: others,
      perKeySwitch: customSwitches,
    });
    setShowModal(true);
  }, [
    allKeysForSize,
    customKeys,
    customSwitches,
    keyboardSize,
    setExportData,
    setShowModal,
  ]);

  const handleLayoutSelect = (size: "60" | "80" | "full") => {
    setKeyboardSize(size);
    setShowLayoutPopup(false); // đóng popup sau khi chọn
  };

  const handleSelectKit = useCallback((kitName: string) => {
    setSelectedKit(kitName);
  }, []);

  // ==== Filters ====
  const [debouncedSearchKeycap, setDebouncedSearchKeycap] =
    useState(searchKeycap);
  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedSearchKeycap(searchKeycap),
      300
    ); // 300ms debounce
    return () => clearTimeout(handler);
  }, [searchKeycap]);

  const filteredKeycaps = useMemo(() => {
    const q = debouncedSearchKeycap.trim().toLowerCase();
    return q
      ? keycaps.filter((c) => c.name.toLowerCase().includes(q))
      : keycaps;
  }, [debouncedSearchKeycap, keycaps]);

  // Debounced value của searchSwitch
  const [debouncedSearchSwitch, setDebouncedSearchSwitch] =
    useState(searchSwitch);
  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedSearchSwitch(searchSwitch),
      300
    );
    return () => clearTimeout(handler);
  }, [searchSwitch]);

  const filteredSwitches = useMemo(() => {
    const q = debouncedSearchSwitch.trim().toLowerCase();
    const list = q
      ? switchList.filter((s) => s.name.toLowerCase().includes(q))
      : switchList;
    return list.filter((sw) => !selectedType || sw.type === selectedType);
  }, [debouncedSearchSwitch, selectedType, switchList]);

  const totalKeys = allKeysForSize.length;
  const percentKeycaps = useMemo(
    () =>
      Math.round(
        (Object.values(customKeys).filter(Boolean).length / totalKeys) * 100
      ),
    [customKeys, totalKeys]
  );
  const percentSwitches = useMemo(
    () =>
      Math.round(
        (Object.values(customSwitches).filter(Boolean).length / totalKeys) * 100
      ),
    [customSwitches, totalKeys]
  );
  const MemoizedBalatro = useMemo(
    () => (
      <Balatro
        isRotate={false}
        mouseInteraction={true}
        pixelFilter={700}
        color1="#"
        color2="#FAE04E"
        color3="#15368B"
      />
    ),
    [] // chỉ tạo 1 lần
  );
  // Khi customKeys thay đổi
  useEffect(() => {
    if (Object.keys(customKeys).length === 0) return; // tránh lần đầu
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false); // tắt loading sau khi "update xong"
    }, 200); // giả lập async / debounce, có thể chỉnh thời gian

    return () => clearTimeout(timer);
  }, [customKeys]);

  // Khi customSwitches thay đổi
  useEffect(() => {
    if (Object.keys(customSwitches).length === 0) return;
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [customSwitches]);

  useEffect(() => {
    setPanelPickerOpen(
      !!selectedKey ||
        !!selectedGroup ||
        !!selectedKeycapGroup ||
        (highlightKeys?.length ?? 0) > 0
    );
  }, [selectedKey, selectedGroup, selectedKeycapGroup, highlightKeys]);

  return (
    <>
      <div className=" min-h-screen w-full md:p-6">
        {/* Background Balatro */}
        <div className="fixed inset-0 -z-20">{MemoizedBalatro}</div>

        {/* Header */}
        <motion.div
          className="relative z-10 flex items-center justify-between gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeaderBar
            keyboardSize={keyboardSize}
            setKeyboardSize={setKeyboardSize}
            percentKeycaps={percentKeycaps}
            percentSwitches={percentSwitches}
          />
        </motion.div>

        {/* Stepper */}
        <Stepper
          selectedKit={selectedKit}
          percentKeycaps={percentKeycaps}
          percentSwitches={percentSwitches}
        />

        {/* ViewMode */}
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

        {/* Keyboard center */}
        <div className="relative z-10 flex justify-center mt-2">
          <motion.div
            className="rounded-2xl shadow-lg border border-[#0C5776] p-4 w-full max-w-[95vw] md:w-fit bg-white/70 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Stagger animation cho các phần con */}
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
                  customKeys={customKeys} // thêm đây
                  customSwitches={customSwitches} // thêm đây
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
          </motion.div>
        </div>

        {/* Keyboard box */}
        <div className="relative w-full flex justify-center mt-2">
          <motion.div
            className="rounded-2xl shadow-lg border border-[#0C5776] p-4 w-full max-w-[95vw] md:w-fit"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(3px)",
            }}
          >
            <motion.div
              className="w-full h-full flex justify-center items-center relative"
              key={keyboardSize + viewMode + highlightKeys?.join(",")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <KeyboardFactory
                layouts={memoLayouts}
                keyboardSize={keyboardSize}
                keyWidths={memoKeyWidths[keyboardSize]}
                viewMode={viewMode}
                customKeys={customKeys}
                customSwitches={customSwitches}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
                selectedGroup={selectedGroup}
                selectedKeycapGroup={selectedKeycapGroup}
                keyGroups={keyGroups}
                switchColors={memoSwitchColors}
                switchList={memoSwitchList}
                keycaps={memoKeycaps}
                highlightKeys={highlightKeys}
              />
              {loading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30 rounded-2xl">
                  <Spin size="large" />
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.button
            whileHover={{
              scale: 1.15,
              boxShadow: "0px 10px 30px rgba(12, 87, 118, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="absolute flex items-center gap-3 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl font-bold text-white z-20
             bottom-[-4rem] sm:bottom-[-2rem] md:bottom-[-1.5rem] right-4"
            style={{
              background: "linear-gradient(90deg, #0A74DA, #0C5776)",
              boxShadow: "0px 6px 20px rgba(12, 87, 118, 0.6)",
            }}
          >
            <ExportOutlined className="text-lg sm:text-xl" />
            <span className="hidden sm:inline">Xuất</span>
          </motion.button>
        </div>
      </div>

      <PickerDrawer
        viewMode={viewMode}
        open={panelPickerOpen}
        selectedKey={selectedKey}
        selectedGroup={selectedGroup}
        selectedKeycapGroup={selectedKeycapGroup}
        setSelectedKey={setSelectedKey}
        setSelectedGroup={setSelectedGroup}
        setSelectedKeycapGroup={setSelectedKeycapGroup}
        filteredKeycaps={filteredKeycaps}
        searchKeycap={searchKeycap}
        setSearchKeycap={setSearchKeycap}
        customKeys={customKeys}
        handleKeycapChange={handleKeycapChange}
        filteredSwitches={filteredSwitches}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchSwitch={searchSwitch}
        setSearchSwitch={setSearchSwitch}
        handleSwitchClick={handleSwitchClick}
        selectedSwitch={selectedSwitch}
        setHighlightKeys={setHighlightKeys}
      />

      <StartLayoutModal open={showLayoutPopup} onSelect={handleLayoutSelect} />
      <KitDrawer
        kits={memoKits}
        selectedKit={selectedKit}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onSelectKit={handleSelectKit}
      />
      <ExportDialog
        showModal={showModal}
        setShowModal={setShowModal}
        exportData={exportData}
      />
    </>
  );
}
