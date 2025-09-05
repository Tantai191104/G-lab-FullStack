import HorizontalLoopText from "@/pages/Home/components/HorizontalLoopText";
import SliderCarousel from "./components/SliderCarousel";
import Banner from "./components/Banner";
import KeyboardSlider from "./components/KeyboardSlider";
import ContactForm from "./components/ContactForm";
import Banner2 from "./components/Banner2";
import KeyboardParallax from "./components/KeyboardParallax";
import ImageTextSection from "./components/ImageTextSectionProps ";
import HotKeycapsGrid from "./components/KeycapCarousel";
import HotSwitchsGrid from "./components/HotSwitchsGrid";

export default function HomePage() {
  return (
    <div className="w-full bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <KeyboardParallax />
      <HorizontalLoopText text="LAB FOR KEYS" speed={20} />

      {/* Category Banner */}
      <Banner
        title="TẠO PHONG CÁCH RIÊNG"
        categories={[
          {
            name: "Kit",
            image: "https://i.pinimg.com/736x/2d/88/1d/2d881d59f26b8559928de0407d956ca5.jpg",
          },
          {
            name: "Keycaps",
            image: "https://i.pinimg.com/736x/ee/10/ac/ee10ac7d58a37c3228ae33985f9db1ad.jpg",
          },
          { 
            name: "Switchs", 
            image: "data:image/jpeg;base64,/9j/4AAQ..." 
          },
          {
            name: "Custom",
            image: "https://www.phongcachxanh.vn/cdn/shop/files/wlmouse-ying75-8k-ban-phim-he-75-forged-carbon-rapid-trigger-0-005mm-1184728828.jpg?v=1755320979&width=800",
          },
        ]}
      />

      {/* Featured Slider */}
      <SliderCarousel />

      {/* Product Grids */}
      <HotKeycapsGrid />
      <HotSwitchsGrid />

      {/* News Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-yellow-400/10 rounded-3xl blur-3xl"></div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 relative z-10">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent">
              THÔNG TIN VỀ
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              PHÍM CUSTOM
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300/90 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed relative z-10">
            Cập nhật những mẫu phím custom mới nhất, từ keycaps, switchs đến các
            thiết kế độc quyền.
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center items-center gap-4 mt-8 relative z-10">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </section>

      {/* Image Text Sections */}
      <div className="flex flex-col gap-20 px-6">
        <ImageTextSection
          image="https://down-vn.img.susercontent.com/file/sg-11134201-7rd4d-lvob5m0st63zb5@resize_w450_nl.webp"
          title="Keycaps Thiết Kế Độc Đáo"
          subtitle="CUSTOM KEYBOARD"
          description="Các bộ keycaps với thiết kế sáng tạo, chất liệu PBT bền bỉ, và màu sắc nổi bật, đem lại trải nghiệm gõ phím tuyệt vời."
        />
        <ImageTextSection
          image="https://i.pinimg.com/1200x/af/a4/a6/afa4a6b1b3f38ec0ce472053412156ff.jpg"
          title="Switchs Cảm Giác Nhạy"
          subtitle="CUSTOM KEYBOARD"
          description="Switchs từ các thương hiệu nổi tiếng giúp cải thiện tốc độ và cảm giác gõ phím, phù hợp mọi nhu cầu chơi game và lập trình."
          reverse={true}
        />
      </div>

      {/* Call to Action Section */}
      <section className="max-w-6xl mx-auto my-20 px-6">
        <div className="relative max-w-3xl mx-auto group">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>

          {/* Main container */}
          <div className="relative bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-gray-800/40 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-10 shadow-2xl group-hover:border-cyan-400/40 transition-all duration-500">
            {/* Top decoration */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg"></div>
            </div>

            {/* Top line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8 opacity-60"></div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Sẵn sàng khám phá?
              </h3>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-black font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Trải nghiệm ngay
                  <svg
                    className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>

              <p className="text-gray-400 mt-4 text-sm">
                Khám phá bộ sưu tập phím custom độc đáo
              </p>
            </div>

            {/* Bottom line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-8 opacity-60"></div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400/60 rounded-full"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400/60 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-500/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Additional sections */}
      <Banner2 />
      <KeyboardSlider />

      {/* Contact */}
      <ContactForm />
    </div>
  );
}
