import { Drawer } from "antd";
import { KeycapPanel } from "./KeycapPanel";
import { SwitchPanel } from "./SwitchPanel";
import type { Keycap, SwitchItem } from "../types/types";

type PickerDrawerProps = {
    viewMode: "keycap" | "switch";
    selectedKey: string | null;
    selectedGroup: string | null;
    selectedKeycapGroup: string | null;
    setSelectedKey: (key: string | null) => void;
    setSelectedGroup: (g: string | null) => void;
    setSelectedKeycapGroup: (g: string | null) => void;

    // Keycap
    filteredKeycaps: Keycap[];
    searchKeycap: string;
    setSearchKeycap: (v: string) => void;
    customKeys: Record<string, string>;
    handleKeycapChange: (capId: string, targets?: string[]) => void; // ⬅ chỉnh type

    // Switch
    filteredSwitches: SwitchItem[];
    selectedType: string | null;
    setSelectedType: (t: string | null) => void;
    searchSwitch: string;
    setSearchSwitch: (v: string) => void;
    handleSwitchClick: (sw: string, targets?: string[]) => void; // ⬅ chỉnh type
    selectedSwitch: string | null;
    setHighlightKeys: (keys: string[] | undefined) => void;
    // highlight
    highlightKeys?: string[];

    open: boolean
};

export function PickerDrawer({
    viewMode,
    selectedKey,
    setSelectedKey,
    setSelectedGroup,
    setSelectedKeycapGroup,
    filteredKeycaps,
    searchKeycap,
    setSearchKeycap,
    customKeys,
    handleKeycapChange,
    filteredSwitches,
    selectedType,
    setSelectedType,
    searchSwitch,
    setSearchSwitch,
    handleSwitchClick,
    selectedSwitch,
    setHighlightKeys,
    open,
}: PickerDrawerProps) {

    return (
        <Drawer
            destroyOnHidden
            title={viewMode === "keycap" ? "Chọn Keycap" : "Chọn Switch"}
            placement="left"
            open={
                open
            }
            onClose={() => {
                setSelectedKey(null);
                setSelectedGroup(null);
                setSelectedKeycapGroup(null);
                setHighlightKeys?.(undefined);
            }}
            width={window.innerWidth < 640 ? "100%" : window.innerWidth < 1024 ? "60%" : 380}
        >
            {viewMode === "keycap" ? (
                <KeycapPanel
                    keycaps={filteredKeycaps}
                    searchKeycap={searchKeycap}
                    setSearchKeycap={setSearchKeycap}
                    customKeys={customKeys}
                    selectedKey={selectedKey}
                    handleKeycapChange={handleKeycapChange}
                />
            ) : (
                <SwitchPanel
                    switchList={filteredSwitches}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    searchSwitch={searchSwitch}
                    setSearchSwitch={setSearchSwitch}
                    handleSwitchClick={handleSwitchClick}
                    selectedSwitch={selectedSwitch}
                />
            )}
        </Drawer>

    );
}
