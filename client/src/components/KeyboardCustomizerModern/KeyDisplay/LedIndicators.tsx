import { Card, Tooltip } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";

type LedIndicatorsProps = {
    ledStatus?: {
        Num: boolean;
        Caps: boolean;
        Scroll: boolean;
    };
};

// LED cố định ngoài component → không cần dependency trong useEffect
const leds = ["Num", "Caps", "Scroll"];

const LedIndicators = ({
    ledStatus = { Num: true, Caps: true, Scroll: true },
}: LedIndicatorsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Interval để thay LED sáng gradient
    useEffect(() => {
        const activeLeds = leds.filter((led) => ledStatus[led as keyof typeof ledStatus]);
        if (activeLeds.length === 0) return; // nếu không có LED bật thì dừng

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % activeLeds.length);
        }, 500); // đổi LED mỗi 500ms

        return () => clearInterval(interval);
    }, [ledStatus]); // chỉ cần ledStatus

    const activeLeds = leds.filter((led) => ledStatus[led as keyof typeof ledStatus]);

    return (
        <Card
            size="small"
            className="w-full max-w-xs mx-auto shadow-md rounded-2xl border border-gray-300 bg-white"
        >
            <div className="flex justify-around items-center py-2">
                {leds.map((led) => {
                    const isActive = ledStatus[led as keyof typeof ledStatus];
                    const isLit = isActive && activeLeds[activeIndex] === led;

                    return (
                        <Tooltip title={`${led} Lock`} key={led}>
                            <div className="flex flex-col items-center text-xs font-semibold text-gray-800 transition-colors">
                                <div
                                    className={clsx(
                                        "w-4 h-4 rounded-full mb-1 border border-gray-400 shadow-inner transition-all duration-300",
                                        isActive
                                            ? isLit
                                                ? "bg-gradient-to-br from-green-400 via-green-500 to-green-600 shadow-lg animate-gradient"
                                                : "bg-green-500"
                                            : "bg-gray-300"
                                    )}
                                />
                                <span>{led}</span>
                            </div>
                        </Tooltip>
                    );
                })}
            </div>
        </Card>
    );
};

export default LedIndicators;
