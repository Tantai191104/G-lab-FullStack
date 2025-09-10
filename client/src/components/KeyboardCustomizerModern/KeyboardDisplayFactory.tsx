import { memo } from "react";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { Keyboard80Display } from "./Keyboard80Display";
import { Keyboard100Display } from "./Keyboard100Display";
import type { Props } from "../types/types";

type KeyboardFactoryProps = Props & { keyboardSize: "60" | "80" | "full" };

function KeyboardFactoryComponent(props: KeyboardFactoryProps) {
  switch (props.keyboardSize) {
    case "full":
      return <Keyboard100Display {...props} />;
    case "80":
      return <Keyboard80Display {...props} />;
    default:
      return <KeyboardDisplay {...props} />;
  }
}

export const KeyboardFactory = memo(
  KeyboardFactoryComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.keyboardSize === nextProps.keyboardSize &&
      prevProps.viewMode === nextProps.viewMode &&
      prevProps.selectedKey === nextProps.selectedKey &&
      prevProps.selectedGroup === nextProps.selectedGroup &&
      prevProps.selectedKeycapGroup === nextProps.selectedKeycapGroup &&
      JSON.stringify(prevProps.keyConfigs) ===
        JSON.stringify(nextProps.keyConfigs) &&
      JSON.stringify(prevProps.switchColors) ===
        JSON.stringify(nextProps.switchColors) &&
      JSON.stringify(prevProps.layouts) === JSON.stringify(nextProps.layouts) &&
      JSON.stringify(prevProps.keyWidths) ===
        JSON.stringify(nextProps.keyWidths) &&
      JSON.stringify(prevProps.switchList) ===
        JSON.stringify(nextProps.switchList) &&
      JSON.stringify(prevProps.keycaps) === JSON.stringify(nextProps.keycaps)
    );
  }
);
