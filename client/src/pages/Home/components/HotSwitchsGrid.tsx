import { Card, CardContent } from "@/components/ui/card";
import { FiStar, FiTrendingUp, FiEye } from "react-icons/fi";

interface SwitchItem {
  name: string;
  image: string;
  type: string;
  force?: string;
  price?: string;
  hot?: boolean;
  rating?: number;
}

const hotSwitches: SwitchItem[] = [
  {
    name: "Gateron Red",
    type: "Linear",
    force: "45g",
    image:
      "https://i.pinimg.com/736x/6e/12/1a/6e121a8fe8de1b9c9a383bb8587d2a38.jpg",
    price: "$22.99",
    rating: 4.8,
    hot: true,
  },
  {
    name: "Gateron Brown",
    type: "Tactile",
    force: "55g",
    image:
      "https://i.pinimg.com/736x/71/85/bf/7185bf52069b828d5329262586121268.jpg",
    price: "$23.99",
    rating: 4.7,
  },
  {
    name: "Cherry MX Red",
    type: "Linear",
    force: "45g",
    image:
      "https://i.pinimg.com/736x/4a/3d/1f/4a3d1f1b9b9988ffb6148aed30c95874.jpg",
    price: "$39.99",
    rating: 4.9,
    hot: true,
  },
  {
    name: "Kailh Box White",
    type: "Clicky",
    force: "50g",
    image:
      "https://i.pinimg.com/736x/e1/aa/85/e1aa859be3c0f1d74e8a7d7c63e5f08e.jpg",
    price: "$27.99",
    rating: 4.6,
  },
  {
    name: "Akko CS Lavender",
    type: "Tactile",
    force: "53g",
    image:
      "https://i.pinimg.com/736x/9f/3a/9a/9f3a9a76a0d1f7a56b0f5b8e3d89b93a.jpg",
    price: "$19.99",
    rating: 4.5,
  },
];

export default function HotSwitchsGrid() {
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
              HOT SWITCHES
            </h2>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Những dòng switch được ưa chuộng với cảm giác gõ đặc trưng và độ bền
            cao
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {hotSwitches.map((sw, idx) => (
            <Card
              key={idx}
              className="group relative h-full flex flex-col bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:border-cyan-400/50 text-white shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-2xl overflow-hidden"
            >
              {/* Hot Badge (keep red/pink) */}
              {sw.hot && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="h-6 inline-flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 rounded-full font-bold shadow-lg gap-1">
                    <FiStar className="w-3 h-3" />
                    <span className="leading-none">HOT</span>
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={sw.image}
                  alt={sw.name}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                    <FiEye className="w-4 h-4" />
                    Xem chi tiết
                  </button>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 min-h-[2.75rem] line-clamp-2">
                    {sw.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-cyan-400/20 px-2 py-1 rounded-full min-w-[3.25rem] justify-center">
                    <FiStar className="w-3 h-3 text-cyan-300" />
                    <span className="text-cyan-300 text-xs font-semibold">
                      {sw.rating?.toFixed(1) ?? "-"}
                    </span>
                  </div>
                </div>

                {/* Specs row */}
                <div className="text-sm text-gray-300/90 flex items-center gap-3 min-h-[1.5rem]">
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {sw.type}
                  </span>
                  {sw.force && (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {sw.force}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="min-h-[2rem]">
                  {sw.price ? (
                    <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {sw.price}
                    </span>
                  ) : (
                    <span className="invisible text-2xl font-black">placeholder</span>
                  )}
                </div>

                <div className="flex-1" />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-3 px-4 rounded-xl hover:from-cyan-300 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Thêm vào giỏ
                  </button>
                  <button className="w-12 h-12 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl flex items-center justify-center border border-gray-600/50 hover:border-cyan-400/50 transition-all duration-300 group/btn">
                    <FiStar className="w-5 h-5 text-gray-400 group-hover/btn:text-cyan-300 transition-colors duration-300" />
                  </button>
                </div>
              </CardContent>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-gray-600/50 hover:border-cyan-400/50 hover:from-gray-700/50 hover:to-gray-600/50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <span className="text-lg font-bold">Xem tất cả switches</span>
            <FiTrendingUp className="w-5 h-5 text-cyan-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
