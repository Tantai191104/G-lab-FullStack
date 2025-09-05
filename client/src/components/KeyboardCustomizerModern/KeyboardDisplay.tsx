import { useEffect, useState } from "react";
import { KeyDisplay } from "./KeyDisplay/KeyDisplay";
import type { Props } from "../types/types";

export function KeyboardDisplay({
    layouts,
    keyboardSize,
    keyWidths,
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
    highlightKeys,
}: Props) {
    const unit = 50;
    const [scale, setScale] = useState(0.8);

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = window.innerWidth - 40; // padding container
            const rowWidths = layouts[keyboardSize].map(row =>
                row.reduce((sum, keyObj) => sum + (keyWidths[keyObj.key] ?? 1) * unit, 0)
                + spacing * (row.length - 1)
            );
            const maxRowWidth = Math.max(...rowWidths);
            const newScale = Math.min(1, containerWidth / maxRowWidth);
            setScale(newScale);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [layouts, keyboardSize, keyWidths]);

    const spacing = 15;

    return (
        <div className="w-full h-full flex justify-center items-start p-2 ">
            <div
                className="relative"
                style={{
                    display: "inline-block",
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                }}
            >
                {layouts[keyboardSize].map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="flex justify-center mb-6"
                        style={{ gap: spacing + 4 }}
                    >
                        {row.map((keyObj) => (
                            <KeyDisplay
                                key={keyObj.key}
                                keyObj={keyObj}
                                unit={unit}
                                scale={scale}
                                viewMode={viewMode}
                                customKeys={customKeys}
                                customSwitches={customSwitches}
                                selectedKey={selectedKey}
                                setSelectedKey={setSelectedKey}
                                selectedGroup={selectedGroup}
                                selectedKeycapGroup={selectedKeycapGroup}
                                keyGroups={keyGroups}
                                switchColors={switchColors}
                                switchList={switchList}
                                keycaps={keycaps}
                                keyWidths={keyWidths}
                                highlightKeys={highlightKeys}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
