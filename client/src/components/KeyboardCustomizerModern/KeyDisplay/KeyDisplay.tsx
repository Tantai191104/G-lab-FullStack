import { memo, useMemo, useState } from "react";
import { Popover } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import type { Keycap, KeyObject, SwitchItem } from "../../types/types";
import { getKeyStyle } from "./KeyStyle";
import KeyPopoverContent from "./KeyPopover/KeyPopover";

type Props = {
    keyObj: KeyObject;
    unit: number;
    scale: number;
    viewMode: "keycap" | "switch";
    customKeys: Record<string, string>;
    customSwitches: Record<string, string>;
    selectedKey: string | null;
    setSelectedKey: (v: string | null) => void;
    selectedGroup: string | null;
    selectedKeycapGroup: string | null;
    keyGroups: Record<string, string[]>;
    switchColors: Record<string, string>;
    switchList: SwitchItem[];
    keycaps: Keycap[];
    keyWidths: Record<string, number>;
    highlightKeys?: string[];
};

export const KeyDisplay: React.FC<Props> = memo((props) => {
    const {
        keyObj,
        unit,
        scale,
        viewMode,
        customKeys,
        customSwitches,
        selectedKey,
        setSelectedKey,
        selectedGroup,
        selectedKeycapGroup,
        keyGroups,
        switchColors,
        switchList,
        keycaps,
        keyWidths,
        highlightKeys,
    } = props;

    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    const key = keyObj.key;
    const arrows: Record<string, string> = {
        Up: "↑",
        Down: "↓",
        Left: "←",
        Right: "→",
    };

    // Lookup dữ liệu
    const capId = customKeys[key];
    const swName = customSwitches[key];

    const capObj = useMemo(
        () => (capId ? keycaps.find((c) => c.id === capId) ?? null : null),
        [capId, keycaps]
    );
    const swObj = useMemo(
        () => (swName ? switchList.find((s) => s.name === swName) ?? null : null),
        [swName, switchList]
    );

    const swType = swObj?.type ?? null;
    const switchColor = useMemo(
        () =>
            viewMode === "switch" && swType ? switchColors[swType] : "#e5e7eb",
        [viewMode, swType, switchColors]
    );
    const keycapColor = capObj?.color ?? "#fdfdfd";

    // Size
    const width = (keyWidths[key] ?? 1) * unit * scale;
    const height = unit * scale;

    // State
    const isSelected = selectedKey === key;
    const inGroup = selectedGroup ? !!keyGroups[selectedGroup]?.includes(key) : false;
    const inKcGroup = selectedKeycapGroup
        ? !!keyGroups[selectedKeycapGroup]?.includes(key)
        : false;
    const isHighlighted = !!highlightKeys?.includes(key);

    // Style
    const { bg, border, text, shadow } = getKeyStyle(viewMode, keycapColor, {
        isHighlighted,
        isSelected,
        inGroup,
        inKcGroup,
    });

    return (
        <Popover
            key={key}
            trigger="hover"
            placement="top"
            content={<KeyPopoverContent keyName={key} cap={capObj} sw={swObj} />}
        >
            <div
                onClick={() => setSelectedKey(key)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    setHovered(false);
                    setPressed(false);
                }}
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
                className="flex flex-col items-center justify-center select-none text-xs font-medium cursor-pointer relative"
                style={{
                    width,
                    height,
                    background: bg,
                    borderRadius: "10px",
                    border: `2px solid ${border}`,
                    boxShadow: pressed
                        ? "0 4px 10px rgba(0,0,0,0.25)"
                        : hovered
                            ? "0 10px 22px rgba(0,0,0,0.2)"
                            : shadow,
                    transform: pressed ? "translateY(1px) scale(0.96)" : "scale(1)",
                    transition: "all 0.18s ease",
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                {/* border ngoài bằng SVG neon */}
                <svg
                    width={width + 20}
                    height={height + 20}
                    style={{
                        position: "absolute",
                        top: -8,
                        left: -14,
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                >
                    <rect
                        x="0"
                        y="0"
                        width={width + 20}
                        height={height + 20}
                        rx="12"
                        fill="none"
                        stroke={isSelected ? "#3B82F6" : border}
                        strokeWidth={isSelected ? 4 : 2}
                        style={{
                            filter: isSelected
                                ? "drop-shadow(0 0 8px #3B82F6) drop-shadow(0 0 18px #3B82F6)"
                                : isHighlighted
                                    ? "drop-shadow(0 0 6px #F59E0B)"
                                    : "none",
                            transition: "all 0.2s ease",
                        }}
                    />
                </svg>

                {viewMode === "switch" ? (
                    <PlusCircleOutlined
                        style={{ color: switchColor, fontSize: 18, zIndex: 2 }}
                    />
                ) : (
                    <div className="relative flex flex-col justify-between items-center w-full h-full select-none">
                        {keyObj.top && (
                            <span
                                className="text-[11px] z-10"
                                style={{ color: "#6B7280", fontWeight: 500 }}
                            >
                                {keyObj.top}
                            </span>
                        )}
                        <span
                            className="z-10"
                            style={{ fontSize: 14, color: text, fontWeight: 600 }}
                        >
                            {arrows[key] || keyObj.key}
                        </span>
                    </div>
                )}
            </div>
        </Popover>
    );
});
