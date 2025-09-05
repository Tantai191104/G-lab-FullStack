import { Radio, Progress, Tooltip } from "antd";
import { FaKeyboard } from "react-icons/fa";
import BlurText from "../react-bits/TextAnimations/BlurText/BlurText";
import ShinyText from "../react-bits/TextAnimations/ShinyText/ShinyText";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import React from "react";

type Props = {
  keyboardSize: string;
  setKeyboardSize: (v: "60" | "80" | "full") => void;
  percentKeycaps: number;
  percentSwitches: number;
};

// Component nhỏ để loop BlurText
function LoopingBlurText({
  text,
  delay = 100,
  animateBy = "words",
  direction = "top",
  className = "",
}: {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
}) {
  const [toggle, setToggle] = useState(true);
  const animationFrom = {
    opacity: 0,
    y: direction === "top" ? -30 : 30,
    filter: "blur(10px)",
  };

  const animationTo = [
    { opacity: 1, y: 0, filter: "blur(0px)" }, // fade in
    { opacity: 1, y: 0, filter: "blur(0px)" }, // giữ
    { opacity: 0, y: direction === "top" ? 30 : -30, filter: "blur(10px)" }, // fade out
  ];
  return (
    <BlurText
      key={toggle ? "a" : "b"} // reset animation
      text={text}
      delay={delay}
      animateBy={animateBy}
      direction={direction}
      className={className}
      animationFrom={animationFrom}
      animationTo={animationTo}
      stepDuration={1.0}
      onAnimationComplete={() =>
        setTimeout(() => {
          setToggle(!toggle);
        }, 500)
      }
    />
  );
}

function HeaderBarComponent({
  keyboardSize,
  setKeyboardSize,
  percentKeycaps,
  percentSwitches,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 w-full">
      {/* Left: Title */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-3">
          <FaKeyboard className="text-5xl text-[#B6B7BF]" />
          <LoopingBlurText
            text="Keyboard Customizer"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl font-bold text-white"
          />
        </div>

        {/* Small subtitle with shiny effect */}
        <span className="bg-gradient-to-r from-indigo-500 via-blue-400 to-teal-300 bg-clip-text text-transparent">
          <ShinyText
            text="Tùy chỉnh layout, keycaps và switches theo ý bạn"
            disabled={false}
            speed={1.5}
            className="text-sm font-medium mt-1"
          />
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Keyboard size selector */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-semibold text-white mb-2 uppercase tracking-wide">
            Layout
          </span>
          <Radio.Group
            value={keyboardSize}
            onChange={(e) => setKeyboardSize(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            className="bg-white shadow rounded-xl p-1"
          >
            <Radio.Button
              value="60"
              className="px-4 py-2 text-sm md:text-base font-medium hover:bg-blue-50"
            >
              60%
            </Radio.Button>
            <Radio.Button
              value="80"
              className="px-4 py-2 text-sm md:text-base font-medium hover:bg-blue-50"
            >
              80%
            </Radio.Button>
            <Radio.Button
              value="full"
              className="px-4 py-2 text-sm md:text-base font-medium hover:bg-blue-50"
            >
              Fullsize
            </Radio.Button>
          </Radio.Group>
        </div>

        {/* Summary progress */}
        <div className="flex flex-wrap gap-4">
          <Tooltip title={`${percentKeycaps}% Keycaps đã hoàn thiện`}>
            <div className="w-[130px] text-center p-2 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center gap-2">
                <FaKeyboard className="text-xl text-[#B6B7BF]" />
                <span className="text-xs font-medium text-white">Keycaps</span>
                <Progress
                  type="circle"
                  percent={percentKeycaps}
                  size={50}
                  strokeColor="#FAE04E"
                  format={(percent) => (
                    <span style={{ color: "white" }}>{percent}%</span>
                  )}
                />
              </div>
            </div>
          </Tooltip>

          <Tooltip title={`${percentSwitches}% Switches đã hoàn thiện`}>
            <div className="w-[130px] text-center p-2 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center gap-2">
                <PlusCircleOutlined style={{ fontSize: "20px", color: "#fff" }} />
                <span className="text-xs font-medium text-white">Switches</span>
                <Progress
                  type="circle"
                  percent={percentSwitches}
                  size={50}
                  strokeColor="#f59e0b"
                  format={(percent) => (
                    <span style={{ color: "white" }}>{percent}%</span>
                  )}
                />
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

// ✅ Memo hóa component
export const HeaderBar = React.memo(
  HeaderBarComponent,
  (prev, next) =>
    prev.keyboardSize === next.keyboardSize &&
    prev.percentKeycaps === next.percentKeycaps &&
    prev.percentSwitches === next.percentSwitches
);
