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
        <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                            <FiTrendingUp className="w-6 h-6 text-black" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            HOT KEYCAPS
                        </h2>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Khám phá những bộ keycaps được yêu thích nhất với thiết kế độc đáo và chất lượng cao
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Keycaps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {hotKeycaps.map((keycap, idx) => (
                        <Card
                            key={idx}
                            className="group relative h-full flex flex-col bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:border-cyan-400/50 text-white shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-2xl overflow-hidden"
                        >
                            {/* Hot Badge (keep red/pink) */}
                            {keycap.hot && (
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="h-6 inline-flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 rounded-full font-bold shadow-lg gap-1">
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                {/* Quick View Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                                        <FiEye className="w-4 h-4" />
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>

                            {/* Content - stretch to fill, pin actions bottom */}
                            <CardContent className="p-6 flex flex-col gap-3 flex-1">
                                {/* Title and Rating - reserve space */}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 min-h-[2.75rem] line-clamp-2">
                                        {keycap.name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-cyan-400/20 px-2 py-1 rounded-full min-w-[3.25rem] justify-center">
                                        <FiStar className="w-3 h-3 text-cyan-300" />
                                        <span className="text-cyan-300 text-xs font-semibold">
                                            {keycap.rating?.toFixed(1) ?? "-"}
                                        </span>
                                    </div>
                                </div>

                                {/* Price - reserve height consistently */}
                                <div className="min-h-[2rem]">
                                    {keycap.price ? (
                                        <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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
                                    <button className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-3 px-4 rounded-xl hover:from-cyan-300 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        Mua ngay
                                    </button>
                                    <button className="w-12 h-12 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl flex items-center justify-center border border-gray-600/50 hover:border-cyan-400/50 transition-all duration-300 group/btn">
                                        <FiStar className="w-5 h-5 text-gray-400 group-hover/btn:text-cyan-300 transition-colors duration-300" />
                                    </button>
                                </div>
                            </CardContent>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </Card>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-16">
                    <button className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-gray-600/50 hover:border-cyan-400/50 hover:from-gray-700/50 hover:to-gray-600/50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                        <span className="text-lg font-bold">Xem tất cả keycaps</span>
                        <FiTrendingUp className="w-5 h-5 text-cyan-300" />
                    </button>
                </div>
            </div>
        </section>
    );
}
