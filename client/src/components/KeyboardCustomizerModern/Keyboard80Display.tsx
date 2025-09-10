import { useEffect, useMemo, useRef, useState } from "react";
import type { Keycap, KeyConfig, KeyObject, SwitchItem } from "../types/types";
import { Key80Display } from "./KeyDisplay/Key80Display/Key80Display";

export type Keyboard80Props = {
  keyWidths: Record<string, number>;
  viewMode: "keycap" | "switch";
  keyConfigs: KeyConfig[];
  selectedKey: string | null;
  setSelectedKey: (v: string | null) => void;
  switchColors: Record<string, string>;
  switchList: SwitchItem[];
  keycaps: Keycap[];
  selectedGroup?: string | null;
  selectedKeycapGroup?: string | null;
  keyGroups?: Record<string, string[]>;
  highlightKeys?: string[];
};

export function Keyboard80Display({
  keyWidths,
  viewMode,
  keyConfigs,
  selectedKey,
  setSelectedKey,
  switchColors,
  selectedGroup,
  selectedKeycapGroup,
  keyGroups,
  highlightKeys,
}: Keyboard80Props) {
  const layout80Clustered: KeyObject[][][] = useMemo(
    () => [
      // Row F
      [
        [{ key: "Esc" }],
        [{ key: "F1" }, { key: "F2" }, { key: "F3" }, { key: "F4" }],
        [{ key: "F5" }, { key: "F6" }, { key: "F7" }, { key: "F8" }],
        [{ key: "F9" }, { key: "F10" }, { key: "F11" }, { key: "F12" }],
        [{ key: "Prtsc" }, { key: "Scrlk" }, { key: "Pause" }],
      ],
      // Row 1
      [
        [
          { key: "`", top: "~" },
          { key: "1", top: "!" },
          { key: "2", top: "@" },
          { key: "3", top: "#" },
          { key: "4", top: "$" },
          { key: "5", top: "%" },
          { key: "6", top: "^" },
          { key: "7", top: "&" },
          { key: "8", top: "*" },
          { key: "9", top: "(" },
          { key: "0", top: ")" },
          { key: "-", top: "_" },
          { key: "=", top: "+" },
          { key: "Backspace" },
        ],
        [{ key: "Insert" }, { key: "Home" }, { key: "PgUp" }],
      ],
      // Row 2
      [
        [
          { key: "Tab" },
          { key: "Q" },
          { key: "W" },
          { key: "E" },
          { key: "R" },
          { key: "T" },
          { key: "Y" },
          { key: "U" },
          { key: "I" },
          { key: "O" },
          { key: "P" },
          { key: "[", top: "{" },
          { key: "]", top: "}" },
          { key: "\\", top: "|" },
        ],
        [{ key: "Delete" }, { key: "End" }, { key: "PgDn" }],
      ],
      // Row 3
      [
        [
          { key: "CapsLock" },
          { key: "A" },
          { key: "S" },
          { key: "D" },
          { key: "F" },
          { key: "G" },
          { key: "H" },
          { key: "J" },
          { key: "K" },
          { key: "L" },
          { key: ";", top: ":" },
          { key: "'", top: '"' },
          { key: "Enter" },
        ],
      ],
      // Row 4
      [
        [
          { key: "Shift" },
          { key: "Z" },
          { key: "X" },
          { key: "C" },
          { key: "V" },
          { key: "B" },
          { key: "N" },
          { key: "M" },
          { key: ",", top: "<" },
          { key: ".", top: ">" },
          { key: "/", top: "?" },
          { key: "RShift" },
        ],
        [{ key: "Up" }],
      ],
      // Row 5
      [
        [
          { key: "Ctrl" },
          { key: "Win" },
          { key: "Alt" },
          { key: "Space" },
          { key: "RAlt" },
          { key: "Fn" },
          { key: "RCtrl" },
        ],
        [{ key: "Left" }, { key: "Down" }, { key: "Right" }],
      ],
    ],
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const baseUnit = 45; // unit chuẩn
  const baseGap = 20; // gap chuẩn giữa cluster
  const baseSpacing = 60; // spacing giữa cluster lớn

  // Tự động scale theo container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;

      const padding = 32;
      const extraGap = 20;

      const maxRowWidth = layout80Clustered.reduce((max, row) => {
        const rowWidth = row.reduce((sum, cluster) => {
          const clusterWidth = cluster.reduce((sumK, key) => {
            return sumK + (keyWidths[key.key] ?? 1) * baseUnit;
          }, 0);
          return sum + clusterWidth + (cluster.length - 1) * baseGap;
        }, 0);
        return Math.max(max, rowWidth);
      }, 0);

      const newScale = Math.min(
        1,
        (containerWidth - padding - extraGap) / maxRowWidth
      );
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [keyWidths, layout80Clustered]);
  // Sửa lại renderKey dùng keyconfigs
  const renderKey = (keyObj: KeyObject) => {
    const key = keyObj.key;
    const config = keyConfigs.find((cfg) => cfg.key === key);
    const capObj = config?.keycap ?? null;
    const swObj = config?.switch ?? null;

    return (
      <Key80Display
        key={key}
        keyObj={keyObj}
        cap={capObj}
        sw={swObj}
        unit={baseUnit}
        scale={scale}
        viewMode={viewMode}
        isSelected={selectedKey === key}
        inGroup={!!(selectedGroup && keyGroups?.[selectedGroup]?.includes(key))}
        inKcGroup={
          !!(
            selectedKeycapGroup &&
            keyGroups?.[selectedKeycapGroup]?.includes(key)
          )
        }
        isHighlighted={highlightKeys?.includes(key)}
        keyWidths={keyWidths}
        switchColors={switchColors}
        onSelect={setSelectedKey}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full p-6 mt-4 flex justify-center"
    >
      <div className="flex flex-col flex-nowrap">
        {layout80Clustered.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-nowrap mb-6"
            style={{
              columnGap: rowIndex === 0 ? 30 * scale : baseSpacing * scale,
            }}
          >
            {row.map((cluster, clusterIndex) => (
              <div
                key={clusterIndex}
                className="flex flex-nowrap"
                style={{
                  columnGap: baseGap * scale,
                  rowGap: 8 * scale,
                  marginLeft:
                    rowIndex === 0 && clusterIndex > 0
                      ? 27 * scale
                      : rowIndex === 4 && cluster.some((k) => k.key === "Up")
                      ? 60 * scale
                      : 0,
                }}
              >
                {cluster.map(renderKey)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
