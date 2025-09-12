"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FiStar, FiTrendingUp, FiEye } from "react-icons/fi";

interface Keycap {
    name: string;
    image: string;
    hot?: boolean; // đánh dấu keycap hot
    price?: string; // giá sản phẩm
    rating?: number; // đánh giá
}

const hotKeycaps: Keycap[] = [
    {
        name: "Keychron K2",
        image:
            "https://i.pinimg.com/736x/8d/eb/a5/8deba5a4b9dd960fa449183a0f84147b.jpg",
        hot: true,
        price: "$89.99",
        rating: 4.8,
    },
    {
        name: "Ducky One 2 Mini",
        image:
            "https://i.pinimg.com/736x/85/cf/ae/85cfae7cbd78cbca68fa4f99f2d3a061.jpg",
        hot: true,
        price: "$99.99",
        rating: 4.9,
    },
    {
        name: "Anne Pro 2",
        image:
            "https://i.pinimg.com/1200x/8b/c4/be/8bc4be6d521e245b6ce31e60aaece853.jpg",
        price: "$79.99",
        rating: 4.7,
    },
    {
        name: "Razer Huntsman Mini",
        image:
            "https://i.pinimg.com/736x/88/51/c6/8851c6cbc0377d4bd051def8f91c0d81.jpg",
        hot: true,
        price: "$129.99",
        rating: 4.6,
    },
    {
        name: "Leopold FC750R",
        image:
            "https://i.pinimg.com/1200x/53/c0/f7/53c0f799ec7482b2f53b5acfd34f4210.jpg",
        price: "$149.99",
        rating: 4.9,
    },
];

export default function HotKeycapsGrid() {
    return (
        <section className="w-full bg-gradient-to-br from-[#0A1A2F] via-[#1A2233] to-[#0A1A2F] py-20 relative overflow-hidden">
            {/* Dark manga-inspired background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A92CC]/10 via-[#AE214A]/10 to-[#ED2B52]/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#AE214A]/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#F4BB19]/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-[#ED2B52]/20 to-transparent rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#0A92CC] to-[#AE214A] rounded-2xl flex items-center justify-center shadow-[0_0_24px_#ED2B52] border-2 border-[#F4BB19]/60">
                            <FiTrendingUp className="w-6 h-6 text-[#F4BB19] drop-shadow-[0_0_8px_#ED2B52]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F4BB19] via-[#ED2B52] to-[#0A92CC] bg-clip-text text-transparent drop-shadow-[0_2px_12px_#AE214A]">
                            HOT KEYCAPS
                        </h2>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Khám phá những bộ keycaps được yêu thích nhất với thiết kế độc đáo và chất lượng cao
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-[#AE214A] via-[#F4BB19] to-[#ED2B52] mx-auto mt-6 rounded-full shadow-[0_0_12px_#0A92CC]"></div>
                </div>

                {/* Keycaps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {hotKeycaps.map((keycap, idx) => (
                        <Card
                            key={idx}
                            className="group relative h-full flex flex-col bg-gradient-to-br from-[#0A92CC]/40 via-[#1A2233]/60 to-[#ED2B52]/40 backdrop-blur-md border-2 border-[#F4BB19]/30 hover:border-[#AE214A]/60 text-white shadow-[0_0_24px_#0A92CC] hover:shadow-[0_0_48px_#ED2B52] transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-2xl overflow-hidden"
                        >
                            {/* Hot Badge (keep red/pink) */}
                            {keycap.hot && (
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="h-6 inline-flex items-center bg-gradient-to-r from-[#AE214A] to-[#ED2B52] text-white text-xs px-3 rounded-full font-bold shadow-lg gap-1 border-2 border-[#F4BB19]/40">
                                        <FiStar className="w-3 h-3" />
                                        <span className="leading-none">HOT</span>
                                    </div>
                                </div>
                            )}

                            {/* Image Container - fixed height */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={keycap.image}
                                    alt={keycap.name}
                                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A92CC]/90 via-[#AE214A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                {/* Quick View Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <button className="bg-gradient-to-r from-[#0A92CC]/40 via-[#F4BB19]/40 to-[#ED2B52]/40 backdrop-blur-md text-white px-4 py-2 rounded-full border-2 border-[#AE214A]/40 hover:bg-[#F4BB19]/50 hover:text-[#0A92CC] transition-all duration-300 flex items-center gap-2 shadow-[0_0_12px_#ED2B52]">
                                        <FiEye className="w-4 h-4" />
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>

                            {/* Content - stretch to fill, pin actions bottom */}
                            <CardContent className="p-6 flex flex-col gap-3 flex-1">
                                {/* Title and Rating - reserve space */}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-white group-hover:text-[#F4BB19] transition-colors duration-300 min-h-[2.75rem] line-clamp-2 drop-shadow-[0_2px_12px_#0A92CC]">
                                        {keycap.name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-[#ED2B52]/20 px-2 py-1 rounded-full min-w-[3.25rem] justify-center border-2 border-[#F4BB19]/30">
                                        <FiStar className="w-3 h-3 text-[#F4BB19] drop-shadow-[0_0_4px_#AE214A]" />
                                        <span className="text-[#F4BB19] text-xs font-semibold">
                                            {keycap.rating?.toFixed(1) ?? "-"}
                                        </span>
                                    </div>
                                </div>

                                {/* Price - reserve height consistently */}
                                <div className="min-h-[2rem]">
                                    {keycap.price ? (
                                        <span className="text-2xl font-black bg-gradient-to-r from-[#F4BB19] via-[#ED2B52] to-[#0A92CC] bg-clip-text text-transparent drop-shadow-[0_2px_12px_#AE214A]">
                                            {keycap.price}
                                        </span>
                                    ) : (
                                        <span className="invisible text-2xl font-black">placeholder</span>
                                    )}
                                </div>

                                {/* Spacer to push actions to bottom */}
                                <div className="flex-1" />

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gradient-to-r from-[#0A92CC]/80 via-[#AE214A]/80 to-[#ED2B52]/80 text-white font-bold py-3 px-4 rounded-xl hover:from-[#F4BB19]/80 hover:to-[#AE214A]/80 transform hover:scale-105 transition-all duration-300 shadow-[0_0_16px_#F4BB19] hover:shadow-[0_0_32px_#ED2B52] border-2 border-[#F4BB19]/40">
                                        Mua ngay
                                    </button>
                                    <button className="w-12 h-12 bg-[#0A92CC]/30 hover:bg-[#AE214A]/30 rounded-xl flex items-center justify-center border-2 border-[#ED2B52]/40 hover:border-[#F4BB19]/60 transition-all duration-300 group/btn shadow-[0_0_12px_#ED2B52]">
                                        <FiStar className="w-5 h-5 text-[#F4BB19] group-hover/btn:text-[#AE214A] transition-colors duration-300 drop-shadow-[0_0_4px_#ED2B52]" />
                                    </button>
                                </div>
                            </CardContent>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0A92CC]/0 via-[#AE214A]/10 to-[#ED2B52]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </Card>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-16">
                    <button className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0A92CC]/90 via-[#AE214A]/90 to-[#ED2B52]/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl border-2 border-[#F4BB19]/40 hover:border-[#AE214A]/60 hover:from-[#F4BB19]/90 hover:to-[#AE214A]/90 transform hover:scale-105 transition-all duration-300 shadow-[0_0_24px_#0A92CC] hover:shadow-[0_0_48px_#ED2B52]">
                        <span className="text-lg font-bold drop-shadow-[0_2px_12px_#F4BB19]">Xem tất cả keycaps</span>
                        <FiTrendingUp className="w-5 h-5 text-[#F4BB19] drop-shadow-[0_0_8px_#AE214A]" />
                    </button>
                </div>
            </div>
        </section>
    );
}
