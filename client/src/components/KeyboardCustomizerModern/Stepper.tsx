import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaKeyboard,
  FaBox,
  FaKey,
  FaBolt,
  FaCheckCircle,
  FaRegCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Thay đổi interface
interface StepperProps {
  selectedKit: string | null;
  percentKeycaps: number;
  percentSwitches: number;
}

const Stepper: React.FC<StepperProps> = ({
  selectedKit,
  percentKeycaps,
  percentSwitches,
}) => {
  const [hidden, setHidden] = useState(false);

  // Logic xác định hoàn thành từng bước
  const isStepCompleted = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Layout
        return true;
      case 1: // Kit
        return !!selectedKit && selectedKit.trim() !== "";
      case 2: // Keycaps
        return percentKeycaps === 100;
      case 3: // Switches
        return percentSwitches === 100;
      case 4: // Complete
        return percentKeycaps === 100 && percentSwitches === 100;
      default:
        return false;
    }
  };

  const steps = [
    { title: "Layout", description: "Chọn kích thước", icon: FaKeyboard },
    { title: "Kit", description: "Chọn bộ kit", icon: FaBox },
    { title: "Keycaps", description: "Tùy chỉnh phím", icon: FaKey },
    { title: "Switches", description: "Chọn switches", icon: FaBolt },
    { title: "Hoàn thành", description: "Xuất bản", icon: FaCheckCircle },
  ];

  return (
    <div className="fixed top-75 right-2 z-40">
      {/* Toggle Button */}
      <button
        className="absolute -left-8 top-1 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 text-white border border-blue-500 hover:from-blue-500 hover:to-blue-900 hover:text-yellow-300 rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => setHidden((h) => !h)}
        aria-label={hidden ? "Hiện tiến độ" : "Ẩn tiến độ"}
      >
        {hidden ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <AnimatePresence>
        {!hidden && (
          <motion.div
            className="w-[90vw] max-w-xs bg-gradient-to-br from-blue-50 via-white to-blue-100 backdrop-blur-md rounded-2xl border border-blue-200 shadow-2xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="p-3 pb-2 border-b border-blue-200">
              <h3 className="text-xs font-semibold text-blue-700 mb-1">
                Tiến độ tạo bàn phím
              </h3>
              <p className="text-xs text-blue-400">
                {percentKeycaps === 100 && percentSwitches === 100
                  ? `Hoàn thành (${steps.length}/${steps.length})`
                  : `Tiến độ: ${
                      percentKeycaps === 100 ? 3 : percentKeycaps > 0 ? 2 : 1
                    } / ${steps.length}`}
              </p>
            </div>

            {/* Steps */}
            <div className="p-3 space-y-2">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = isStepCompleted(index);
                // Xác định bước hiện tại dựa trên phần trăm
                let isCurrent = false;
                if (index === 2 && percentKeycaps < 100) isCurrent = true;
                if (
                  index === 3 &&
                  percentKeycaps === 100 &&
                  percentSwitches < 100
                )
                  isCurrent = true;
                if (
                  index === 4 &&
                  percentKeycaps === 100 &&
                  percentSwitches === 100
                )
                  isCurrent = true;

                return (
                  <motion.div
                    key={index}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-200/60 border border-green-400"
                        : isCurrent
                        ? "bg-blue-200/60 border border-blue-400"
                        : "bg-gray-100 border border-gray-300"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? "bg-green-400 text-white"
                          : isCurrent
                          ? "bg-blue-400 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {isCompleted ? (
                        <FaCheckCircle className="w-4 h-4" />
                      ) : (
                        <IconComponent className="w-4 h-4" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-xs font-medium transition-colors duration-300 ${
                          isCompleted
                            ? "text-green-700"
                            : isCurrent
                            ? "text-blue-700"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`text-[10px] transition-colors duration-300 ${
                          isCompleted
                            ? "text-green-600"
                            : isCurrent
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Status indicator */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <FaCheckCircle className="w-4 h-4 text-green-500" />
                      ) : isCurrent ? (
                        <FaRegCircle className="w-4 h-4 text-blue-400" />
                      ) : (
                        <FaRegCircle className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="p-3 pt-0">
              <div className="w-full bg-blue-100 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-green-400 via-blue-400 to-green-400 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((percentKeycaps === 100 && percentSwitches === 100
                        ? steps.length
                        : percentKeycaps === 100
                        ? 4
                        : percentKeycaps > 0
                        ? 3
                        : 2) /
                        steps.length) *
                      100
                    }%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-blue-400">Bắt đầu</span>
                <span className="text-[10px] text-green-500">Hoàn thành</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stepper;
