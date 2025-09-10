import { useState, useMemo, useEffect, useCallback } from "react";
import data from "../data/keyboardData.json";
import type {
  ExportPayload,
  KeyboardSize,
  Keycap,
  KeyConfig,
  KeyGroups,
  KeyObject,
  SwitchItem,
} from "../components/types/types";

export function useKeyboardCustomizer() {
  // ==== Data Json ====
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

  // ==== Memo Data ====
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
  const [keyConfigs, setKeyConfigs] = useState<KeyConfig[]>([]);
  const [highlightKeys, setHighlightKeys] = useState<string[] | undefined>(
    undefined
  );
  const [exportData, setExportData] = useState<ExportPayload | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panelPickerOpen, setPanelPickerOpen] = useState(false);
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
    setKeyConfigs((prev) => {
      const next: KeyConfig[] = allKeysForSize.map((key) => {
        const found = prev.find((cfg) => cfg.key === key);
        return found || { key };
      });
      return next;
    });
  }, [allKeysForSize]);

  // ==== Actions ====
  const handleApplyToTargets = useCallback(
    (value: Keycap | SwitchItem, type: "keycap" | "switch") => {
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

      setKeyConfigs((prev) =>
        prev.map((cfg) =>
          targets.includes(cfg.key)
            ? type === "keycap"
              ? { ...cfg, keycap: value as Keycap }
              : { ...cfg, switch: value as SwitchItem }
            : cfg
        )
      );
    },
    [
      highlightKeys,
      selectedKey,
      selectedGroup,
      selectedKeycapGroup,
      keyGroups,
      setKeyConfigs,
    ]
  );

  const handleKeycapChange = useCallback(
    (keycapObj: Keycap) => handleApplyToTargets(keycapObj, "keycap"),
    [handleApplyToTargets]
  );

  const handleSwitchClick = useCallback(
    (switchObj: SwitchItem) => handleApplyToTargets(switchObj, "switch"),
    [handleApplyToTargets]
  );

  const clearAll = useCallback(() => {
    setKeyConfigs(allKeysForSize.map((key) => ({ key })));
    setSelectedKey(null);
    setSelectedGroup(null);
    setSelectedKeycapGroup(null);
    setSelectedSwitch(null);
  }, [
    allKeysForSize,
    setKeyConfigs,
    setSelectedKey,
    setSelectedGroup,
    setSelectedKeycapGroup,
    setSelectedSwitch,
  ]);

  const handleExport = useCallback(() => {
    const missingKeycaps = keyConfigs
      .filter((cfg) => !cfg.keycap)
      .map((cfg) => cfg.key);
    const missingSwitches = keyConfigs
      .filter((cfg) => !cfg.switch)
      .map((cfg) => cfg.key);

    const missingKit = !selectedKit;

    if (missingKeycaps.length || missingSwitches.length || missingKit) {
      return {
        error: true,
        missingKeycaps,
        missingSwitches,
        missingKit,
      };
    }

    setExportData({
      layout: keyboardSize,
      kit: selectedKit,
      keyConfigs,
    });
    setShowModal(true);
    return { error: false };
  }, [keyConfigs, keyboardSize, selectedKit, setExportData, setShowModal]);

  const handleLayoutSelect = (size: "60" | "80" | "full") => {
    setKeyboardSize(size);
    setShowLayoutPopup(false);
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
    );
    return () => clearTimeout(handler);
  }, [searchKeycap]);

  const filteredKeycaps = useMemo(() => {
    const q = debouncedSearchKeycap.trim().toLowerCase();
    return q
      ? keycaps.filter((c) => c.name.toLowerCase().includes(q))
      : keycaps;
  }, [debouncedSearchKeycap, keycaps]);

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
        (keyConfigs.filter((cfg) => !!cfg.keycap).length / totalKeys) * 100
      ),
    [keyConfigs, totalKeys]
  );

  const percentSwitches = useMemo(
    () =>
      Math.round(
        (keyConfigs.filter((cfg) => !!cfg.switch).length / totalKeys) * 100
      ),
    [keyConfigs, totalKeys]
  );

  useEffect(() => {
    if (keyConfigs.length === 0) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [keyConfigs]);

  useEffect(() => {
    setPanelPickerOpen(
      !!selectedKey ||
        !!selectedGroup ||
        !!selectedKeycapGroup ||
        (highlightKeys?.length ?? 0) > 0
    );
  }, [selectedKey, selectedGroup, selectedKeycapGroup, highlightKeys]);

  return {
    // Data
    memoKits,
    memoKeyWidths,
    memoLayouts,
    memoSwitchList,
    memoKeycaps,
    memoSwitchColors,
    baseGroups,
    keyGroups,
    filteredKeycaps,
    filteredSwitches,
    // State
    keyboardSize,
    setKeyboardSize,
    viewMode,
    setViewMode,
    selectedKey,
    setSelectedKey,
    selectedGroup,
    setSelectedGroup,
    selectedKeycapGroup,
    setSelectedKeycapGroup,
    selectedType,
    setSelectedType,
    selectedSwitch,
    setSelectedSwitch,
    selectedKit,
    setSelectedKit,
    keyConfigs,
    setKeyConfigs,
    highlightKeys,
    setHighlightKeys,
    exportData,
    setExportData,
    showModal,
    setShowModal,
    drawerOpen,
    setDrawerOpen,
    panelPickerOpen,
    setPanelPickerOpen,
    searchKeycap,
    setSearchKeycap,
    searchSwitch,
    setSearchSwitch,
    loading,
    setLoading,
    showLayoutPopup,
    setShowLayoutPopup,
    percentKeycaps,
    percentSwitches,
    handleKeycapChange,
    handleSwitchClick,
    clearAll,
    handleExport,
    handleLayoutSelect,
    handleSelectKit,
  };
}
