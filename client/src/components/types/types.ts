export type Keycap = {
  id: string;
  name: string; // luôn required
  color: string;
  image?: string;
  profile?: string;
  material?: string;
  price?: string;
};

export type SwitchItem = {
  name: string;
  type: "Linear" | "Tactile" | "Clicky" | "HE" | string;
  image?: string;
  force?: string;
  travel?: string;
  durability?: string;
  price?: string;
};
export type KeyGroups = Record<string, string[]>;
export type KeyboardSize = "60" | "80" | "full";
export type KeyObject = {
  key: string;
  top?: string;
  bottom?: string;
};
export type Props = {
    layouts: Record<string, KeyObject[][]>;
    keyboardSize: string;
    keyWidths: Record<string, number>;
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
    highlightKeys?: string[];
};