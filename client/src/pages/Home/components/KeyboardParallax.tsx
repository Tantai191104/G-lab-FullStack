"use client";

import { Separator } from "@radix-ui/react-separator";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface Keyboard {
  name: string;
  image: string;
  details: string;
  price: string;
  switches: string;
  connectivity: string;
  layout: string;
  backgroundColor: string;
}

const keyboards: Keyboard[] = [
  {
    name: "Keychron K2",
    image:
      "https://i.pinimg.com/1200x/5e/f8/ff/5ef8fff54e2cb54e4806bc8a6d19417b.jpg",
    details:
      "Wireless mechanical keyboard with hot-swappable switches and RGB lighting.",
    price: "2.500.000 VND",
    switches: "Gateron Red / Brown / Blue",
    connectivity: "Bluetooth 5.1 / USB-C",
    layout: "75% layout",
    backgroundColor: "#1a1a1a",
  },
  {
    name: "Ducky One 2 Mini",
    image:
      "https://i.pinimg.com/1200x/85/da/d7/85dad73503a6c9a7a373e4ece59a50a4.jpg",
    details:
      "Compact 60% mechanical keyboard with double-shot PBT keycaps, loved by gamers.",
    price: "3.000.000 VND",
    switches: "Cherry MX Red / Brown / Blue",
    connectivity: "USB-C",
    layout: "60% layout",
    backgroundColor: "#fdd835",
  },
  {
    name: "Akko 3068",
    image:
      "https://i.pinimg.com/736x/6b/52/03/6b52037e425977c652538daa3057297b.jpg",
    details:
      "68-key compact keyboard with durable PBT keycaps and multiple switch options.",
    price: "2.200.000 VND",
    switches: "Akko CS / Gateron",
    connectivity: "USB-C / Bluetooth 5.0",
    layout: "65% layout (68 keys)",
    backgroundColor: "#24243e",
  },
];

// Shapes dùng cho tất cả slide, mỗi slide sẽ có copy riêng
const shapes = [
  { x: 100, y: 200, size: 60, src: "/shapes/Vector.png" },
  { x: 500, y: 150, size: 40, src: "/shapes/Vector.png" },
  { x: 300, y: 600, size: 40, src: "/shapes/Vector.png" },
  { x: 800, y: 400, size: 50, src: "/shapes/Vector.png" },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const KeyboardParallax: React.FC = () => {
  const refs = useRef<HTMLDivElement[]>([]);
  const glowRefs = useRef<HTMLDivElement[]>([]);
  const shapeRefs = useRef<HTMLDivElement[]>([]);
  const ticking = useRef(false);
  const lastFrameTs = useRef(0);
  const [visibleSlides, setVisibleSlides] = useState<Set<number>>(new Set());

  // Observe which slides are on screen to limit per-frame work
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSlides((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const target = entry.target as HTMLDivElement;
            const idx = refs.current.findIndex((n) => n === target);
            if (idx >= 0) {
              if (entry.isIntersecting) next.add(idx);
              else next.delete(idx);
            }
          });
          return next;
        });
      },
      { root: null, threshold: 0.15 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Apply once-only transitions on slides for smooth parallax interpolation
  useEffect(() => {
    refs.current.forEach((ref) => {
      if (!ref) return;
      ref.style.transition = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease-out";
      ref.style.willChange = "transform, opacity";
    });
  }, []);

  // Parallax effect cho slide (mượt hơn, biên độ nhẹ hơn)
  const updateParallax = () => {
    const windowHeight = window.innerHeight;
    refs.current.forEach((ref) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const distanceToCenter = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
      const maxDistance = windowHeight / 2 + rect.height / 2;
      const progress = Math.min(distanceToCenter / maxDistance, 1);
      // scale và opacity nhẹ hơn + easing để mượt
      const scale = 1 - easeOutCubic(progress) * 0.04;
      const opacity = 1 - easeOutCubic(progress) * 0.08;

      ref.style.transform = `scale(${scale})`;
      ref.style.opacity = `${opacity}`;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation cho glow và shapes (chỉ animate slide đang hiển thị + skip frames)
  useAnimationFrame((t) => {
    // Skip if frames are too close to reduce work (~30-45fps is enough for subtle bg)
    if (t - lastFrameTs.current < 22) return;
    lastFrameTs.current = t;

    const a1 = t / 1000;
    const a2 = t / 1400;

    visibleSlides.forEach((slideIdx) => {
      // Glow động theo slide
      const glow = glowRefs.current[slideIdx];
      if (glow) {
        const dx = Math.sin(a1 + slideIdx) * 12;
        const dy = Math.cos(a1 + slideIdx) * 12;
        glow.style.transform = `translate(${dx}px, ${dy}px) scale(1.12)`;
        glow.style.background = `radial-gradient(circle, ${keyboards[slideIdx].backgroundColor}70 0%, transparent 70%)`;
        glow.style.opacity = "0.42";
        glow.style.willChange = "transform, opacity";
      }

      // Animate only shapes that belong to this slide
      const base = slideIdx * shapes.length;
      for (let i = 0; i < shapes.length; i += 1) {
        const shape = shapeRefs.current[base + i];
        if (!shape) continue;
        const ty = Math.sin(a2 + i) * 10;
        const rot = (t / 6500) % 360;
        shape.style.transform = `translateY(${ty}px) rotate(${rot}deg)`;
        shape.style.willChange = "transform";
      }
    });
  });

  return (
    <section className="relative w-full overflow-hidden">
      {keyboards.map((kb, slideIdx) => (
        <div
          key={slideIdx}
          ref={(el) => {
            if (el) refs.current[slideIdx] = el;
          }}
          className="flex flex-col md:flex-row items-center justify-between min-h-screen w-full px-8 md:px-20 relative transition-transform duration-300 ease-out"
          style={{
            background: `linear-gradient(135deg, ${kb.backgroundColor}, #000000)`,
            // Fixed backgrounds cause repaint/reflow issues on mobile; keep scroll for perf
            backgroundAttachment: "scroll",
            // Paint containment helps isolate cost per section
            contain: "content",
            // Use content-visibility to skip offscreen paint/layout
            contentVisibility: "auto" as any,
            // Provide intrinsic size hint to avoid layout jumps when skipping rendering
            containIntrinsicSize: "1000px 800px" as any,
          }}
        >
          {/* Gundam Shapes riêng cho mỗi slide */}
          {shapes.map((s, shapeIdx) => {
            const globalIdx = slideIdx * shapes.length + shapeIdx;
            return (
              <img
                key={shapeIdx}
                ref={(el) => {
                  if (el) shapeRefs.current[globalIdx] = el;
                }}
                src={s.src}
                alt="gundam shape"
                className="absolute z-10 will-change-transform"
                loading="lazy"
                decoding="async"
                style={{
                  width: s.size,
                  height: s.size,
                  top: s.y,
                  left: s.x,
                  pointerEvents: "none",
                }}
              />
            );
          })}

          <div className="absolute inset-y-0 left-0 w-1/2 bg-black/40 backdrop-blur-sm z-0 pointer-events-none" />

          {/* Left Content */}
          <motion.div
            className="flex-1 text-white space-y-8 max-w-2xl relative z-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.8 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          >
            <h2 className="text-6xl md:text-7xl font-header font-extrabold leading-tight tracking-tight drop-shadow-lg">
              {kb.name}
            </h2>

            <p className="opacity-90 font-body text-xl md:text-2xl max-w-lg leading-relaxed">
              Khám phá <span className="font-semibold">{kb.name}</span> — bàn phím cơ mang lại trải nghiệm gõ mượt mà, thiết kế tinh tế, và phong cách độc đáo.
            </p>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.4 }}
              className="flex items-center justify-center rounded-[62px] bg-white text-black px-10 py-3 font-body text-sm md:text-base w-[220px] h-[48px] font-semibold shadow-xl"
            >
              Mua Ngay
            </motion.button>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mt-10">
              <div className="flex flex-col items-center text-center">
                <p className="text-3xl font-bold">200+</p>
                <p className="text-sm text-gray-300">Keyboard Models</p>
              </div>
              <Separator className="hidden sm:block w-px h-12 bg-white" />
              <div className="flex flex-col items-center text-center">
                <p className="text-3xl font-bold">2,000+</p>
                <p className="text-sm text-gray-300">Keycaps & Switches</p>
              </div>
              <Separator className="hidden sm:block w-px h-12 bg-white" />
              <div className="flex flex-col items-center text-center">
                <p className="text-3xl font-bold">30,000+</p>
                <p className="text-sm text-gray-300">Happy Customers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center items-center relative">
            {kb.image && (
              <motion.img
                src={kb.image}
                alt={kb.name}
                className="h-[65vh] md:h-[80vh] object-contain drop-shadow-2xl relative z-10 will-change-transform"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                loading="lazy"
                decoding="async"
              />
            )}
            <div
              ref={(el) => {
                if (el) glowRefs.current[slideIdx] = el;
              }}
              className="absolute inset-0 blur-3xl mix-blend-screen will-change-transform"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default KeyboardParallax;
