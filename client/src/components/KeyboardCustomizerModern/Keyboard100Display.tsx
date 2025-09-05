import { PlusCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useEffect, useRef, useState } from "react";
import type { Keycap, KeyObject, SwitchItem } from "../types/types";
import { getKeyStyle } from "./KeyDisplay/KeyStyle";
import KeyPopoverContent from "./KeyDisplay/KeyPopover/KeyPopover";
import LedIndicators from "./KeyDisplay/LedIndicators";

export type Keyboard100Props = {
    keyWidths: Record<string, number>;
    viewMode: "keycap" | "switch";
    customKeys: Record<string, string>;
    customSwitches: Record<string, string>;
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

type GridKey = KeyObject & { gridColumn?: string; gridRow?: string };

export function Keyboard100Display({
    keyWidths,
    viewMode,
    customKeys,
    customSwitches,
    selectedKey,
    setSelectedKey,
    switchColors,
    switchList,
    keycaps,
    selectedGroup,
    selectedKeycapGroup,
    keyGroups,
    highlightKeys,
}: Keyboard100Props) {

    // ==== 1. ESC + FUNCTION KEYS ====
    const escRow: KeyObject[] = [
        { key: "Esc" },
        { key: "" },
        { key: "F1" }, { key: "F2" }, { key: "F3" }, { key: "F4" },
        { key: "" }, // khoảng trống sau F4
        { key: "F5" }, { key: "F6" }, { key: "F7" }, { key: "F8" },
        { key: "" }, // khoảng trống sau F8
        { key: "F9" }, { key: "F10" }, { key: "F11" }, { key: "F12" },
    ];

    // ==== 2. MAIN KEYS (ANSI layout) ====
    const mainKeys: KeyObject[][] = [
        [
            { key: "`", top: "~" }, { key: "1", top: "!" }, { key: "2", top: "@" },
            { key: "3", top: "#" }, { key: "4", top: "$" }, { key: "5", top: "%" },
            { key: "6", top: "^" }, { key: "7", top: "&" }, { key: "8", top: "*" },
            { key: "9", top: "(" }, { key: "0", top: ")" }, { key: "-", top: "_" },
            { key: "=", top: "+" }, { key: "Backspace" }
        ],
        [
            { key: "Tab" }, { key: "Q" }, { key: "W" }, { key: "E" }, { key: "R" },
            { key: "T" }, { key: "Y" }, { key: "U" }, { key: "I" }, { key: "O" },
            { key: "P" }, { key: "[", top: "{" }, { key: "]", top: "}" }, { key: "\\", top: "|" }
        ],
        [
            { key: "CapsLock" }, { key: "A" }, { key: "S" }, { key: "D" }, { key: "F" },
            { key: "G" }, { key: "H" }, { key: "J" }, { key: "K" }, { key: "L" },
            { key: ";", top: ":" }, { key: "'", top: "\"" }, { key: "Enter" }
        ],
        [
            { key: "Shift" }, { key: "Z" }, { key: "X" }, { key: "C" }, { key: "V" },
            { key: "B" }, { key: "N" }, { key: "M" }, { key: ",", top: "<" },
            { key: ".", top: ">" }, { key: "/", top: "?" }, { key: "RShift" }
        ],
        [
            { key: "Ctrl" }, { key: "Win" }, { key: "Alt" }, { key: "Space" },
            { key: "RAlt" }, { key: "LWin" }, { key: "Fn" }, { key: "RCtrl" }
        ]
    ];

    // ==== 4. NUMPAD KEYS ====
    const numpadLayout: GridKey[] = [
        { key: "Num", gridColumn: "1", gridRow: "1" },
        { key: "/", gridColumn: "2", gridRow: "1" },
        { key: "*", gridColumn: "3", gridRow: "1" },
        { key: "-", gridColumn: "4", gridRow: "1" },

        { key: "7", gridColumn: "1", gridRow: "2" },
        { key: "8", gridColumn: "2", gridRow: "2" },
        { key: "9", gridColumn: "3", gridRow: "2" },
        { key: "N+", gridColumn: "4", gridRow: "2 / span 2" },

        { key: "4", gridColumn: "1", gridRow: "3" },
        { key: "5", gridColumn: "2", gridRow: "3" },
        { key: "6", gridColumn: "3", gridRow: "3" },

        { key: "1", gridColumn: "1", gridRow: "4" },
        { key: "2", gridColumn: "2", gridRow: "4" },
        { key: "3", gridColumn: "3", gridRow: "4" },
        { key: "NEnter", gridColumn: "4", gridRow: "4 / span 2" },

        { key: "N0", gridColumn: "1 / span 2", gridRow: "5" },
        { key: ".", gridColumn: "3", gridRow: "5" },
    ];


    // ==== CONFIG ====
    const unit = 38; // đơn vị cơ bản
    const keyboardRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.8);

    // Auto scale theo container    
    useEffect(() => {
        const handleResize = () => {
            if (!keyboardRef.current) return;
            const containerWidth = keyboardRef.current.parentElement?.offsetWidth || window.innerWidth;

            const totalKeys = 14 + 3 + 4; // main + cluster + numpad (ước lượng)
            const gap = 3.5; // gap giữa keys
            const totalWidth = totalKeys * unit + (totalKeys - 1) * gap;

            const newScale = Math.min(1, containerWidth / totalWidth);
            setScale(newScale);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const arrowMap: Record<string, string> = {
        Up: "↑",
        Down: "↓",
        Left: "←",
        Right: "→",
    };

    // ==== RENDER KEY ====
    const renderKey = (keyObj: GridKey, idx?: number) => {
        const key = keyObj.key;

        // placeholder => render div rỗng
        if (!key) {
            return (
                <div
                    key={`placeholder-${idx}`}
                    style={{ width: unit / 1.8, height: unit }}
                />
            );
        }

        const specialNumpadKeys = ["NEnter", "N+", "N0"];
        const capId = customKeys[key];
        const swName = customSwitches[key];

        const capObj = capId ? keycaps.find((c) => c.id === capId) : null;
        const swObj = swName ? switchList.find((s) => s.name === swName) : null;

        const swType = swObj?.type ?? null;
        const switchColor =
            viewMode === "switch" && swType ? switchColors[swType] : "#e5e7eb";
        const keycapColor = capObj?.color ?? "#fdfdfd";

        const isSpecialNumpad = specialNumpadKeys.includes(key);
        const isGridCell = !!(keyObj.gridColumn || keyObj.gridRow);
        const scaledUnit = unit * scale;

        const width: number | string = isGridCell
            ? "100%"
            : (keyWidths[key] ?? 1) * scaledUnit;
        const height: number | string = isGridCell ? "100%" : scaledUnit;

        // trạng thái
        const isSelected = selectedKey === key;
        const inGroup = !!(
            selectedGroup && keyGroups?.[selectedGroup]?.includes(key)
        );

        const inKcGroup = !!(
            selectedKeycapGroup && keyGroups?.[selectedKeycapGroup]?.includes(key)
        );

        const isHighlighted = !!highlightKeys?.includes(key);

        const { bg, border, text, shadow } = getKeyStyle(viewMode, keycapColor, {
            isSelected,
            isHighlighted,
            inGroup,
            inKcGroup,
        });

        const scaledWidth =
            (typeof width === "number" ? width : scaledUnit) *
            (key === "N0" ? 2.3 : 1);
        const scaledHeight =
            (typeof height === "number" ? height : scaledUnit) *
            (key === "N+" || key === "NEnter" ? 2.3 : 1);

        const borderOffsetX = scaledUnit / 3;
        const borderOffsetY = scaledUnit / 10;
        const paddingX = Math.max(2, scaledUnit * 0.15);
        const paddingY = Math.max(2, scaledUnit * 0.15);
        const offsetX = scaledUnit * 0.25;
        const offsetY = -scaledUnit * 0.1;
        const specialPadding = scaledUnit * 0.5;

        return (
            <Popover
                key={key}
                trigger="hover"
                placement="top"
                content={
                    <KeyPopoverContent keyName={key} cap={capObj} sw={swObj} />
                }
            >
                <div
                    onClick={() => setSelectedKey(key)}
                    className="flex flex-col items-center justify-center select-none text-xs font-medium cursor-pointer relative"
                    style={{
                        width,
                        height,
                        background: bg,
                        borderRadius: "8px",
                        border: `2px solid ${border}`,
                        boxShadow: shadow,
                        transition: "transform 0.1s, box-shadow 0.2s",
                        paddingTop: 4,
                        paddingBottom: 4,
                    }}
                    onMouseDown={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(1px)";
                        el.style.boxShadow = isSelected
                            ? "0 7px 18px rgba(37,99,235,0.5)"
                            : "0 5px 14px rgba(0,0,0,0.2)";
                    }}
                    onMouseUp={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(0)";
                        el.style.boxShadow = shadow;
                    }}
                >
                    {/* Border ngoài */}
                    <svg
                        width={scaledWidth + paddingX * 2}
                        height={scaledHeight + paddingY * 2}
                        style={{
                            position: "absolute",
                            top: borderOffsetY - paddingY + offsetY,
                            left: -borderOffsetX - paddingX + offsetX,
                            pointerEvents: "none",
                        }}
                    >
                        <rect
                            x={0}
                            y={0}
                            width={scaledWidth + paddingX * 2}
                            height={scaledHeight + paddingY * 2}
                            rx={scaledUnit / 6}
                            fill="none"
                            stroke={border}
                            strokeWidth={Math.max(1, scaledUnit / 30)}
                        />

                        {isSpecialNumpad && (
                            <rect
                                x={scaledUnit / 30 - specialPadding}
                                y={scaledUnit / 30 - specialPadding}
                                width={scaledWidth + paddingX * 2 + specialPadding * 2}
                                height={scaledHeight + paddingY * 2 + specialPadding * 2}
                                rx={scaledUnit / 10 + specialPadding / 2}
                                fill="none"
                                stroke={isSelected ? "#3b82f6" : "#aaa"}
                                strokeWidth={Math.max(0.8, scaledUnit / 40)}
                            />
                        )}
                    </svg>

                    {viewMode === "switch" ? (
                        <PlusCircleOutlined
                            style={{
                                color: switchColor,
                                fontSize: Math.max(12, scaledUnit / 3),
                                zIndex: 2,
                            }}
                        />
                    ) : (
                        <div className="relative flex flex-col justify-between items-center w-full h-full select-none z-10">
                            <span
                                style={{
                                    fontSize: Math.max(10, scaledUnit / 3),
                                    color: text,
                                    fontWeight: 600,
                                }}
                            >
                                {arrowMap[key] || key}
                            </span>
                            {keyObj.top && (
                                <span
                                    style={{
                                        fontSize: Math.max(8, scaledUnit / 5),
                                        color: "#374151",
                                        fontWeight: 600,
                                    }}
                                >
                                    {keyObj.top}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Popover>
        );
    };

    // ==== RENDER MAIN ====
    return (
        <div className="w-full h-full p-4 flex justify-center ">
            <div
                ref={keyboardRef}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                }}
            >

                {/* Tính scaledUnit */}
                {(() => {
                    const scaledUnit = unit * scale;
                    return (
                        <div className="flex justify-center gap-10">

                            {/* MAIN BLOCK */}
                            <div className="flex flex-col gap-3">
                                {/* ESC + F */}
                                <div className="flex gap-3 mb-4">
                                    {escRow.map((k, i) => renderKey(k, i))}
                                </div>

                                {/* Main keys */}
                                {mainKeys.map((row, idx) => (
                                    <div key={idx} className="flex gap-3.5">
                                        {row.map((k, i) => renderKey(k, i))}
                                    </div>
                                ))}
                            </div>

                            {/* CLUSTER */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: scaledUnit * 0.27 }}>

                                {/* Row 0 */}
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(3, ${scaledUnit}px)`,
                                    columnGap: scaledUnit * 0.3,
                                    marginBottom: scaledUnit * 0.4,
                                }}>
                                    {["PrtSc", "Scroll", "Pause"].map((key) => renderKey({ key }))}
                                </div>

                                {/* Insert/Home/PgUp */}
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(3, ${scaledUnit}px)`,
                                    gridAutoRows: `${scaledUnit}px`,
                                    columnGap: scaledUnit * 0.3,
                                    rowGap: scaledUnit * 0.3,
                                    marginBottom: scaledUnit * 1.2,
                                }}>

                                    {["Insert", "Home", "PgUp", "Delete", "End", "PgDn"].map((key) => renderKey({ key }))}
                                </div>

                                {/* Arrow keys */}
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(3, ${scaledUnit}px)`,
                                    gridAutoRows: `${scaledUnit}px`,
                                    columnGap: scaledUnit * 0.3,
                                    rowGap: scaledUnit * 0.3,
                                }}>
                                    <div style={{ gridColumn: "2", gridRow: "1" }}>{renderKey({ key: "Up" })}</div>
                                    <div style={{ gridColumn: "1", gridRow: "2" }}>{renderKey({ key: "Left" })}</div>
                                    <div style={{ gridColumn: "2", gridRow: "2" }}>{renderKey({ key: "Down" })}</div>
                                    <div style={{ gridColumn: "3", gridRow: "2" }}>{renderKey({ key: "Right" })}</div>
                                </div>

                            </div>

                            {/* NUMPAD */}
                            <div>
                                <LedIndicators />

                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(4, ${scaledUnit}px)`,
                                    gridAutoRows: `${scaledUnit}px`,
                                    columnGap: scaledUnit * 0.3,
                                    rowGap: scaledUnit * 0.3,
                                    marginTop: scaledUnit * 0.4,
                                }}>
                                    {numpadLayout.map((item, idx) => (
                                        <div key={idx} style={{ gridColumn: item.gridColumn, gridRow: item.gridRow }}>
                                            {renderKey(item)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    );
                })()}
            </div>
        </div>
    );


}