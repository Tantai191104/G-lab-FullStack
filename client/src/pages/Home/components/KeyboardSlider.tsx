import { useEffect, useRef, useState } from "react";

const keyboards = [
	{ name: "Keychron K2", price: "2.500.000 VND", image: "https://i.pinimg.com/736x/8d/eb/a5/8deba5a4b9dd960fa449183a0f84147b.jpg" },
	{ name: "Ducky One 2 Mini", price: "3.000.000 VND", image: "https://i.pinimg.com/736x/85/cf/ae/85cfae7cbd78cbca68fa4f99f2d3a061.jpg" },
	{ name: "Anne Pro 2", price: "2.800.000 VND", image: "https://i.pinimg.com/1200x/8b/c4/be/8bc4be6d521e245b6ce31e60aaece853.jpg" },
	{ name: "Razer Huntsman Mini", price: "3.500.000 VND", image: "https://i.pinimg.com/736x/88/51/c6/8851c6cbc0377d4bd051def8f91c0d81.jpg" },
	{ name: "Leopold FC750R", price: "3.200.000 VND", image: "https://i.pinimg.com/1200x/53/c0/f7/53c0f799ec7482b2f53b5acfd34f4210.jpg" },
];

export default function KeyboardSlider() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActive(true);
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div className="overflow-x-hidden py-10 px-4 bg-gradient-to-b from-transparent via-black/20 to-transparent">
			<div ref={containerRef} className="relative flex h-[260px]">
				{keyboards.map((kb, idx) => {
					// spacing nhỏ hơn để card overlap
					const spacing = 180; // khoảng cách giữa các card, giảm overlap
					const transform = active
						? `translateX(${idx * spacing}px) scale(1)`
						: `translateX(0px) scale(0.85)`;

					return (
						<div
							key={idx}
							className="keyboard-item absolute w-[220px] h-[260px] rounded-2xl cursor-pointer group overflow-hidden transition-all duration-700 ease-out"
							style={{
								transform,
								zIndex: keyboards.length - idx, // card cuối cùng nổi trên
							}}
						>
							{/* Base glass card */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-white/10 shadow-xl" />

							{/* Hình nền */}
							<div
								className="absolute inset-0 bg-center bg-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-110"
								style={{ backgroundImage: `url(${kb.image})` }}
							></div>

							{/* Overlay hover gradient */}
							<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

							{/* Text hover */}
							<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 px-3">
								<div className="uppercase font-semibold tracking-wide drop-shadow-md">
									{kb.name}
								</div>
								<div className="font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-md">
									{kb.price}
								</div>
							</div>

							{/* Subtle top/bottom accents */}
							<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
							<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
						</div>
					);
				})}
			</div>
			<div className="flex justify-center mt-12">
				<button
					className="px-8 py-4 rounded-2xl shadow-xl border-2 border-[#F4BB19]/30 bg-gradient-to-r from-[#0A92CC]/30 via-[#F4BB19]/30 to-[#ED2B52]/30 text-white font-semibold hover:scale-105 transition-transform duration-300 max-w-[220px] max-h-[60px] w-full text-center text-[16px] drop-shadow-[0_2px_8px_#AE214A] hover:bg-gradient-to-r hover:from-[#F4BB19]/50 hover:to-[#AE214A]/50"
				>
					Tìm hiểu thêm
				</button>
			</div>

		</div>
	);
}
