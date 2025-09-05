import React, { useState } from "react";
import { Popover } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import type { Keycap, KeyObject, SwitchItem } from "../../../types/types";
import { getKeyStyle } from "../KeyStyle";
import KeyPopoverContent from "../KeyPopover/KeyPopover";


type Props = {
    keyObj: KeyObject;
    cap?: Keycap | null;
    sw?: SwitchItem | null;
    unit: number;
    scale: number;
    viewMode: "keycap" | "switch";
    isSelected: boolean;
    inGroup?: boolean;
    inKcGroup?: boolean;
    isHighlighted?: boolean;
    keyWidths: Record<string, number>;
    switchColors: Record<string, string>;
    onSelect: (key: string) => void;
};

const arrowMap: Record<string, string> = {
    Up: "↑",
    Down: "↓",
    Left: "←",
    Right: "→",
};

export const Key80Display: React.FC<Props> = ({
    keyObj,
    cap,
    sw,
    unit,
    scale,
    viewMode,
    isSelected,
    inGroup,
    inKcGroup,
    isHighlighted,
    keyWidths,
    switchColors,
    onSelect,
}) => {
    const key = keyObj.key;
    const swType = sw?.type ?? null;
    const switchColor =
        viewMode === "switch" && swType ? switchColors[swType] : "#e5e7eb";
    const keycapColor = cap?.color ?? "#fdfdfd";

    // size
    const width = (keyWidths[key] ?? 1) * unit * scale;
    const height = unit * scale;

    // màu hiển thị
    const { bg, border, text, shadow } = getKeyStyle(viewMode, keycapColor, {
        isHighlighted,
        isSelected,
        inGroup,
        inKcGroup,
    });
    const [pressed, setPressed] = useState(false);

    return (
        <Popover
            key={key}
            trigger="hover"
            placement="top"
            content={<KeyPopoverContent keyName={key} cap={cap} sw={sw} />}
        >
            <div
                onClick={() => onSelect(key)}
                className="flex flex-col items-center justify-center select-none text-xs font-medium cursor-pointer relative"
                style={{
                    width,
                    height,
                    background: bg,
                    borderRadius: 8 * scale,
                    border: `2px solid ${border}`,
                    boxShadow: shadow,
                    transform: pressed ? "translateY(1px)" : "translateY(0)",
                    transition:
                        "transform 0.1s, box-shadow 0.2s, background-color 0.2s, border-color 0.2s",
                }}
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
                onMouseLeave={() => setPressed(false)}
            >
                {/* Border ngoài */}
                <svg
                    width={width + 20 * scale}
                    height={height + 20 * scale}
                    style={{
                        position: "absolute",
                        top: -8 * scale,
                        left: -14 * scale,
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                >
                    <rect
                        x={0}
                        y={0}
                        width={width + 20 * scale}
                        height={height + 20 * scale}
                        rx={12 * scale}
                        fill="none"
                        stroke={border}
                        strokeWidth={isSelected ? 3 : 1}
                    />
                </svg>

                {viewMode === "switch" ? (
                    <PlusCircleOutlined
                        style={{ color: switchColor, fontSize: 18 * scale, zIndex: 2 }}
                    />
                ) : (
                    <div className="relative flex flex-col justify-between items-center w-full h-full select-none">
                        {keyObj.top && (
                            <span
                                className="text-[12px] z-10"
                                style={{
                                    color: "#374151",
                                    fontWeight: 600,
                                    fontSize: 12 * scale,
                                }}
                            >
                                {keyObj.top}
                            </span>
                        )}
                        <span
                            className="z-10"
                            style={{
                                fontSize: 14 * scale,
                                color: text,
                                fontWeight: 600,
                            }}
                        >
                            {arrowMap[key] || keyObj.key}
                        </span>
                    </div>
                )}
            </div>
        </Popover>
    );
};
