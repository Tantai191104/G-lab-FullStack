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
      className="w-full overflow-hidden relative py-6 md:py-8 mb-3.5 bg-gradient-to-b from-[#0A92CC]/20 via-[#F4BB19]/20 to-[#ED2B52]/20"
      onMouseEnter={() => {
        if (marqueeRef.current)
          marqueeRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (marqueeRef.current)
          marqueeRef.current.style.animationPlayState = "running";
      }}
    >
      {/* manga-inspired top/bottom accent lines (lighter) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#AE214A]/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F4BB19]/15 to-transparent" />

      <div
        ref={marqueeRef}
        className="flex flex-nowrap animate-scroll"
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span
            key={i}
            style={{ fontFamily: "Amuro, sans-serif" }}
            className="flex-shrink-0 select-none text-3xl md:text-5xl uppercase tracking-wider font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0A92CC]/70 via-[#F4BB19]/70 to-[#ED2B52]/70 drop-shadow-[0_0_8px_#AE214A]/40 mr-12 md:mr-16"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
