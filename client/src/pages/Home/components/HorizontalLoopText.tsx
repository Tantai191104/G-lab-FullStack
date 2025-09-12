import { useRef } from "react";

interface HorizontalLoopTextProps {
  text: string;
  speed?: number; // tốc độ chạy (giây)
}

export default function HorizontalLoopText({
  text,
  speed = 20,
}: HorizontalLoopTextProps) {
  const repeatCount = 12;
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="w-full overflow-hidden relative py-6 md:py-8 mb-3.5 bg-gradient-to-b from-black via-black to-black"
      onMouseEnter={() => {
        if (marqueeRef.current)
          marqueeRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (marqueeRef.current)
          marqueeRef.current.style.animationPlayState = "running";
      }}
    >
      {/* subtle top/bottom accent lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div
        ref={marqueeRef}
        className="flex flex-nowrap animate-scroll"
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span
            key={i}
            style={{ fontFamily: "Amuro, sans-serif" }}
            className="flex-shrink-0 select-none text-3xl md:text-5xl uppercase tracking-wider font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] mr-12 md:mr-16"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
