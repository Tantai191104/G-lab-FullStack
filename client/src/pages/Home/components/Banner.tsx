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
        <section className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            {/* Title với thiết kế đẹp hơn */}
            <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-6xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-4">
                    {title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Wrapper để bóp chiều ngang */}
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[280px]">
                    {categories.map((cat, idx) => {
                        const isEvenRow = Math.floor(idx / 2) % 2 === 0;
                        const isLarge = idx % 2 === 0 ? isEvenRow : !isEvenRow;

                        return (
                            <div
                                key={idx}
                                className={`relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl
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

                                {/* Overlay gradient đẹp hơn */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/20 transition-all duration-500"></div>

                                {/* Decorative border glow */}
                                <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-cyan-400/40 transition-all duration-500"></div>

                                {/* Text với thiết kế đẹp hơn */}
                                <div className="absolute top-5 left-5 right-5">
                                    <span className="inline-block  text-lg md:text-3xl font-black drop-shadow-2xl bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent px-3 py-1 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                                        {cat.name}
                                    </span>
                                </div>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Corner accent */}
                                <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
