import React, { useState, useEffect } from "react";
import { IoClose, IoGift, IoArrowForward, IoStar } from "react-icons/io5";

interface AdPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

const AdPopup: React.FC<AdPopupProps> = ({
  isOpen,
  onClose,
  title = "🎉 Chào mừng bạn đến với Custom Keyboard!",
  description = "Khám phá bộ sưu tập bàn phím cơ chất lượng cao với thiết kế độc đáo. Giảm giá 20% cho khách hàng mới!",
  ctaText = "Khám phá ngay",
  ctaLink = "#",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      {/* Popup Content */}
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <IoClose className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <IoGift className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
            {title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features */}
        <div className="px-6 pb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <IoStar className="w-3 h-3 text-yellow-500 flex-shrink-0" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Chất lượng cao cấp
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <IoStar className="w-3 h-3 text-yellow-500 flex-shrink-0" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Thiết kế độc đáo
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <IoStar className="w-3 h-3 text-yellow-500 flex-shrink-0" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Giao hàng miễn phí
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="p-6 pt-2">
          <button
            onClick={() => {
              // Mở link trong tab hiện tại
              window.location.href = ctaLink;
            }}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center justify-center space-x-2"
          >
            <span className="text-sm">{ctaText}</span>
            <IoArrowForward className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full mt-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 text-xs"
          >
            Có thể để sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdPopup;
