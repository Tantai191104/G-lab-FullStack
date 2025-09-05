import { useState, useEffect, useRef } from "react";

const slides = [
    { id: 1, img: "https://i.pinimg.com/1200x/4a/f1/62/4af16247087680502cee22e6f4c4a5a6.jpg", title: "SAKURA KEYCAP" },
    { id: 2, img: "https://i.pinimg.com/1200x/6a/9b/2a/6a9b2ad83e8669818f815063d0edc379.jpg", title: "GALAXY KEYCAP" },
    { id: 3, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4tw4b2blak81d.webp", title: "RUBY RED KEYCAP" },
    { id: 4, img: "https://i.pinimg.com/736x/1a/57/3b/1a573b3c9c603287f4a4a2e855a59bab.jpg", title: "NEON PUNK KEYCAP" },
    { id: 5, img: "https://i.pinimg.com/736x/df/2f/db/df2fdbeb805ac4adfdc3fcd222dd7abc.jpg", title: "ICE BLUE KEYCAP" },
    { id: 6, img: "https://i.pinimg.com/1200x/f8/6d/68/f86d68d80627bec363afb1ab6dfebf47.jpg", title: "WOODEN ART KEYCAP" },
];

export default function SliderCarousel() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const slideTime = 3000;
    const frameTime = 20;

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setCurrent(prevSlide => (prevSlide + 1) % slides.length);
                    return 0;
                }
                return prev + (frameTime / slideTime) * 100;
            });
        }, frameTime);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const radius = 600; // Tăng bán kính vòng tròn
    const angleStep = 360 / slides.length;
    const topBase = 120; // lùi vòng tròn xuống

    return (
        <div className="relative w-full h-[650px] flex flex-col items-center perspective-[1500px] overflow-hidden">
            {/* Header */}
            <div className="w-full text-center mb-6 mt-6">
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(147,197,253,0.25)]">
                    SẢN PHẨM HOT
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded mt-2"></div>
            </div>

            {/* Slider */}
            <div className="relative w-full h-[550px] flex justify-center items-center overflow-hidden">
                {slides.map((slide, index) => {
                    const offset = (index - current + slides.length) % slides.length;
                    const rotationY = offset * angleStep;
                    const translateX = Math.sin((rotationY * Math.PI) / 180) * radius;
                    const translateZ = Math.cos((rotationY * Math.PI) / 180) * radius - radius;

                    // Scale, zIndex, opacity, top theo offset
                    let scale = 0.75;
                    let top = topBase;
                    let zIndex = 10;
                    let opacity = 0.5;
                    let rotateYDeg = rotationY;

                    if (offset === 0) {
                        scale = 1.3;
                        top = topBase - 50;
                        zIndex = 30;
                        opacity = 1;
                        rotateYDeg = 0;
                    } else if (offset === 1 || offset === slides.length - 1) {
                        scale = 1.05;
                        top = topBase - 20;
                        zIndex = 20;
                        opacity = 0.85;
                        rotateYDeg = rotationY / 2;
                    } else if (offset === 2 || offset === slides.length - 2) {
                        scale = 0.9;
                        top = topBase;
                        zIndex = 15;
                        opacity = 0.65;
                        rotateYDeg = rotationY / 3;
                    }

                    return (
                        <div
                            key={slide.id}
                            className="absolute transition-all duration-500 cursor-pointer"
                            style={{
                                width: "280px",
                                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateYDeg}deg) scale(${scale})`,
                                top: `${top}px`,
                                zIndex,
                                opacity,
                                transformStyle: "preserve-3d",
                                boxShadow: `0 40px 60px rgba(0,0,0,${0.3 * opacity})`,
                            }}
                            onMouseEnter={() => setCurrent(index)}
                        >
                            <div className="relative w-full h-[350px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute bottom-4 left-4 text-white font-bold text-xl md:text-2xl drop-shadow-lg">
                                    {slide.title}
                                </div>
                                {offset === 0 && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 rounded">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 transition-all duration-20 rounded"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

