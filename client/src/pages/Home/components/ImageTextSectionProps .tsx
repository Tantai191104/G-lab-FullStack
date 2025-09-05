import { useEffect, useRef, useState } from "react";

interface ImageTextSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  reverse?: boolean;
}

export default function ImageTextSection({
  image,
  title,
  subtitle,
  description,
  reverse = false,
}: ImageTextSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-6 py-12 gap-8 transition-all duration-700 ease-out transform
        ${reverse ? "md:flex-row-reverse" : ""}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* soft background accents for consistency */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-6 -left-10 w-40 h-40 rounded-full blur-3xl bg-cyan-400/10"></div>
        <div className="absolute -bottom-8 -right-12 w-56 h-56 rounded-full blur-3xl bg-purple-500/10"></div>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 relative flex justify-center">
        {isVisible && (
          <div className="group relative overflow-hidden rounded-2xl shadow-2xl w-full md:w-[90%] border border-white/10 bg-gradient-to-br from-gray-800/40 via-gray-900/50 to-gray-800/40 backdrop-blur-sm">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"></div>
            {/* hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-purple-500/0"></div>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
        {subtitle && (
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {subtitle}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-snug drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]">
          {title}
        </h2>
        <p className="text-gray-300/90 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
          {description}
        </p>
        <button className="mx-auto md:mx-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-black px-8 md:px-10 py-3 md:py-3 font-semibold text-sm md:text-base shadow-xl transition-transform duration-200 hover:scale-105">
          Tìm hiểu thêm
          <span className="inline-block translate-y-[1px]">→</span>
        </button>
      </div>
    </section>
  );
}
