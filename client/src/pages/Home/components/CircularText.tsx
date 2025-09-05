import React, { useEffect } from "react";
import { motion, useAnimation, useMotionValue, MotionValue } from "motion/react";

interface CircularTextProps {
    text: string;
    radius?: number;               // bán kính vòng tròn
    spinDuration?: number;
    onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
    className?: string;
}

const getRotationTransition = (duration: number, loop: boolean = true) => ({
    type: "tween" as const,
    ease: "linear" as const,
    duration,
    repeat: loop ? Infinity : 0,
});

const CircularText: React.FC<CircularTextProps> = ({
    text,
    radius = 90,
    spinDuration = 20,
    onHover = "speedUp",
    className = "",
}) => {
    const letters = Array.from(text);
    const controls = useAnimation();
    const rotation: MotionValue<number> = useMotionValue(0);

    // Khởi chạy animation
    useEffect(() => {
        controls.start({
            rotate: 360,
            transition: getRotationTransition(spinDuration),
        });
    }, [spinDuration, controls]);

    const handleHoverStart = () => {
        let duration = spinDuration;
        switch (onHover) {
            case "slowDown":
                duration = spinDuration * 2;
                break;
            case "speedUp":
                duration = spinDuration / 4;
                break;
            case "goBonkers":
                duration = spinDuration / 20;
                break;
            case "pause":
                duration = 0;
                break;
        }
        controls.start({
            rotate: 360,
            transition: getRotationTransition(duration),
        });
    };

    const handleHoverEnd = () => {
        controls.start({
            rotate: 360,
            transition: getRotationTransition(spinDuration),
        });
    };

    return (
        <motion.div
            className={`absolute flex items-center justify-center ${className}`}
            style={{ rotate: rotation }}
            animate={controls}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {letters.map((letter, i) => {
                const angle = (360 / letters.length) * i;
                const rad = (angle * Math.PI) / 180;

                // Tính tọa độ để chữ hướng ra ngoài vòng tròn
                const x = radius * Math.sin(rad);
                const y = -radius * Math.cos(rad);

                return (
                    <span
                        key={i}
                        className="absolute text-sm font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-white to-red-500"
                        style={{
                            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                            transformOrigin: "center center",
                            whiteSpace: "pre",
                        }}
                    >
                        {letter}
                    </span>
                );
            })}
        </motion.div>
    );
};

export default CircularText;
