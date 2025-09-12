interface Category {
  name: string;
  image: string;
}

interface BannerProps {
  title: string;
  categories: Category[];
}

export default function Banner({ title, categories }: BannerProps) {
  return (
    <section
      className="w-full rounded-3xl shadow-2xl pt-8 pb-20 px-8 md:pt-12 md:pb-25 md:px-20 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/avatar/signatureKeycaps.jpg')",
        filter: "brightness(0.8)", // giảm độ sáng 70%
      }}
    >
  {/* Manga-inspired background gradients and accents */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#0A92CC]/20 via-[#F4BB19]/20 to-[#ED2B52]/20"></div>
  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#AE214A]/40 to-transparent rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#F4BB19]/40 to-transparent rounded-full blur-3xl"></div>
  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-[#ED2B52]/30 to-transparent rounded-full blur-2xl"></div>

      {/* Title với thiết kế đẹp hơn */}
      <div className="text-center mb-6 relative z-10">
        <h2
          className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-[0_2px_12px_rgba(234,33,74,0.7)] px-2 py-1 rounded-xl border-4 border-[#0A92CC] inline-block shadow-[0_0_24px_#F4BB19]"
          style={{
            textShadow: "0 2px 12px #AE214A, 0 0 2px #fff, 0 0 8px #F4BB19",
            background: "linear-gradient(90deg, #0A92CC 0%, #F4BB19 50%, #ED2B52 100%)",
            border: "4px solid #0A92CC",
          }}
        >
          {title}
        </h2>
        <div
          className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-[#AE214A] via-[#F4BB19] to-[#0A92CC] shadow-lg"
          style={{
            boxShadow: "0 0 12px #ED2B52, 0 0 6px #F4BB19",
            filter: "brightness(1.2)",
          }}
        ></div>
      </div>

      {/* Wrapper để bóp chiều ngang */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 grid-flow-dense auto-rows-[200px] md:auto-rows-[280px]">
          {categories.map((cat, idx) => {
            const isEvenRow = Math.floor(idx / 2) % 2 === 0;
            const isLarge = idx % 2 === 0 ? isEvenRow : !isEvenRow;

            return (
              <div
                key={idx}
                className={`relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group transform hover:scale-[1.04] transition-all duration-500 hover:shadow-[0_0_32px_#0A92CC] hover:z-20
                ${isLarge ? "col-span-3" : "col-span-1"} max-h-[289px]`}
              >
                {/* Background image với hiệu ứng đẹp */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />

                {/* Overlay gradient manga-inspired */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A92CC]/80 via-[#AE214A]/30 to-transparent group-hover:from-[#ED2B52]/70 group-hover:via-[#F4BB19]/20 transition-all duration-500"></div>

                {/* Decorative border glow manga-inspired */}
                <div className="absolute inset-0 rounded-3xl border-2 border-[#F4BB19]/40 group-hover:border-[#ED2B52]/60 transition-all duration-500"></div>

                {/* Text manga-inspired */}
                <div className="absolute top-5 left-5 right-5">
                  <span
                    className="inline-block text-lg md:text-3xl font-black px-3 py-1 rounded-xl backdrop-blur-sm bg-[#0A92CC]/80 border-2 border-[#F4BB19] text-white drop-shadow-[0_2px_12px_rgba(234,33,74,0.7)] shadow-lg transition-all duration-300 group-hover:bg-[#ED2B52]/80 group-hover:text-[#F4BB19] group-hover:border-[#AE214A]"
                    style={{
                      textShadow: "0 2px 12px #AE214A, 0 0 2px #fff, 0 0 8px #F4BB19",
                      background: "linear-gradient(90deg, #0A92CC 0%, #F4BB19 50%, #ED2B52 100%)",
                      border: "2px solid #F4BB19",
                    }}
                  >
                    {cat.name}
                  </span>
                </div>

                {/* Hover effect overlay manga-inspired */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#F4BB19]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Manga-style accent */}
                <div className="absolute top-3 right-3 w-4 h-4 bg-[#AE214A] rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
