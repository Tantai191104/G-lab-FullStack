import { Outlet } from "react-router-dom";
import Header from "./base/Header";
import Footer from "./base/Footer";
import HoverBackground from "./components/HoverBackground";
import AdPopup from "../components/common/AdPopup";
import { useAdPopup } from "../hooks/useAdPopup";
import { useLoadingStore } from '../store/loadingStore';
import Loading from '../components/common/Loading';

export default function BaseLayout() {
    const { isOpen, closePopup } = useAdPopup(true); // Show immediately
    const loading = useLoadingStore((s) => s.loading);

    return (
        <div
            className="subpixel-antialiased min-h-screen flex flex-col"
            style={{
                background: `linear-gradient(135deg, #0b0b16 0%, #1a1a27 50%, #121212 100%)`,
                backgroundSize: "cover",
            }}
        >
            {/* Loading overlay toàn trang */}
            {loading && <Loading fullscreen />}
            {/* Header */}
            <div className="mb-18">
                <Header />
            </div>

            {/* Main content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <HoverBackground />
            <Footer />

            {/* Ad Popup */}
            <AdPopup 
                isOpen={isOpen}
                onClose={closePopup}
                title="🎉 Chào mừng bạn đến với Custom Keyboard!"
                description="Khám phá bộ sưu tập bàn phím cơ chất lượng cao với thiết kế độc đáo. Giảm giá 20% cho khách hàng mới!"
                ctaText="Khám phá ngay"
                ctaLink="/customKeyboard"
            />
        </div>
    );
}
