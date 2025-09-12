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
              HOT SWITCHES
            </h2>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Những dòng switch được ưa chuộng với cảm giác gõ đặc trưng và độ bền
            cao
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#AE214A] via-[#F4BB19] to-[#ED2B52] mx-auto mt-6 rounded-full shadow-[0_0_12px_#0A92CC]"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {hotSwitches.map((sw, idx) => (
            <Card
              key={idx}
              className="group relative h-full flex flex-col bg-gradient-to-br from-[#0A92CC]/40 via-[#1A2233]/60 to-[#ED2B52]/40 backdrop-blur-md border-2 border-[#F4BB19]/30 hover:border-[#AE214A]/60 text-white shadow-[0_0_24px_#0A92CC] hover:shadow-[0_0_48px_#ED2B52] transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-2xl overflow-hidden"
            >
              {/* Hot Badge (keep red/pink) */}
              {sw.hot && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="h-6 inline-flex items-center bg-gradient-to-r from-[#AE214A] to-[#ED2B52] text-white text-xs px-3 rounded-full font-bold shadow-lg gap-1 border-2 border-[#F4BB19]/40">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A92CC]/90 via-[#AE214A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="bg-gradient-to-r from-[#0A92CC]/40 via-[#F4BB19]/40 to-[#ED2B52]/40 backdrop-blur-md text-white px-4 py-2 rounded-full border-2 border-[#AE214A]/40 hover:bg-[#F4BB19]/50 hover:text-[#0A92CC] transition-all duration-300 flex items-center gap-2 shadow-[0_0_12px_#ED2B52]">
                    <FiEye className="w-4 h-4" />
                    Xem chi tiết
                  </button>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#F4BB19] transition-colors duration-300 min-h-[2.75rem] line-clamp-2 drop-shadow-[0_2px_12px_#0A92CC]">
                    {sw.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-[#ED2B52]/20 px-2 py-1 rounded-full min-w-[3.25rem] justify-center border-2 border-[#F4BB19]/30">
                    <FiStar className="w-3 h-3 text-[#F4BB19] drop-shadow-[0_0_4px_#AE214A]" />
                    <span className="text-[#F4BB19] text-xs font-semibold">
                      {sw.rating?.toFixed(1) ?? "-"}
                    </span>
                  </div>
                </div>

                {/* Specs row */}
                <div className="text-sm text-[#F4BB19]/90 flex items-center gap-3 min-h-[1.5rem]">
                  <span className="px-2 py-0.5 rounded-full bg-[#0A92CC]/10 border-2 border-[#AE214A]/20">
                    {sw.type}
                  </span>
                  {sw.force && (
                    <span className="px-2 py-0.5 rounded-full bg-[#0A92CC]/10 border-2 border-[#AE214A]/20">
                      {sw.force}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="min-h-[2rem]">
                  {sw.price ? (
                    <span className="text-2xl font-black bg-gradient-to-r from-[#F4BB19] via-[#ED2B52] to-[#0A92CC] bg-clip-text text-transparent drop-shadow-[0_2px_12px_#AE214A]">
                      {sw.price}
                    </span>
                  ) : (
                    <span className="invisible text-2xl font-black">placeholder</span>
                  )}
                </div>

                <div className="flex-1" />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-[#0A92CC]/80 via-[#AE214A]/80 to-[#ED2B52]/80 text-white font-bold py-3 px-4 rounded-xl hover:from-[#F4BB19]/80 hover:to-[#AE214A]/80 transform hover:scale-105 transition-all duration-300 shadow-[0_0_16px_#F4BB19] hover:shadow-[0_0_32px_#ED2B52] border-2 border-[#F4BB19]/40">
                    Thêm vào giỏ
                  </button>
                  <button className="w-12 h-12 bg-[#0A92CC]/30 hover:bg-[#AE214A]/30 rounded-xl flex items-center justify-center border-2 border-[#ED2B52]/40 hover:border-[#F4BB19]/60 transition-all duration-300 group/btn shadow-[0_0_12px_#ED2B52]">
                    <FiStar className="w-5 h-5 text-[#F4BB19] group-hover/btn:text-[#AE214A] transition-colors duration-300 drop-shadow-[0_0_4px_#ED2B52]" />
                  </button>
                </div>
              </CardContent>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0A92CC]/0 via-[#AE214A]/10 to-[#ED2B52]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0A92CC]/90 via-[#AE214A]/90 to-[#ED2B52]/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl border-2 border-[#F4BB19]/40 hover:border-[#AE214A]/60 hover:from-[#F4BB19]/90 hover:to-[#AE214A]/90 transform hover:scale-105 transition-all duration-300 shadow-[0_0_24px_#0A92CC] hover:shadow-[0_0_48px_#ED2B52]">
            <span className="text-lg font-bold drop-shadow-[0_2px_12px_#F4BB19]">Xem tất cả switches</span>
            <FiTrendingUp className="w-5 h-5 text-[#F4BB19] drop-shadow-[0_0_8px_#AE214A]" />
          </button>
        </div>
      </div>
    </section>
  );
}
