import { memo } from "react";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { Keyboard80Display } from "./Keyboard80Display";
import { Keyboard100Display } from "./Keyboard100Display";
import type { Props } from "../types/types";

type KeyboardFactoryProps = Props & { keyboardSize: "60" | "80" | "full" ,};

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
      prevProps.customKeys === nextProps.customKeys &&
      prevProps.customSwitches === nextProps.customSwitches &&
      prevProps.switchColors === nextProps.switchColors &&
      prevProps.layouts === nextProps.layouts &&
      prevProps.keyWidths === nextProps.keyWidths &&
      prevProps.switchList === nextProps.switchList &&
      prevProps.keycaps === nextProps.keycaps
    );
  }
);
