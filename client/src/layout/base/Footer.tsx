import { FaFacebookF, FaDiscord, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 relative overflow-hidden bg-gradient-to-b from-[#0f0f23] via-[#0e1224] to-[#0a0f1f] text-gray-300">

      {/* subtle glow accents */}
      <div className="pointer-events-none absolute -top-20 -left-24 w-72 h-72 rounded-full blur-3xl bg-cyan-400/10" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl bg-purple-500/10" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">

        {/* Cột 1: Logo + Social */}
        <div className="space-y-8">
          <h3
            className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            LAB FOR KEYS
          </h3>
          <p className="text-base leading-relaxed text-gray-400">
            Your ultimate destination for custom mechanical keyboards. From keycaps to switches, we have everything to build your dream setup.
          </p>
          <div className="flex items-center gap-4 mt-4 text-lg">
            <button className="p-2 rounded-full border border-white/10 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300">
              <FaFacebookF />
            </button>
            <button className="p-2 rounded-full border border-white/10 hover:border-blue-400/50 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300">
              <FaDiscord />
            </button>
            <button className="p-2 rounded-full border border-white/10 hover:border-purple-400/50 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300">
              <FaTiktok />
            </button>
          </div>
        </div>

        {/* Cột 2: Company */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">COMPANY</h3>
          <ul className="space-y-3 text-[16px]">
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
            <li><Link to="/works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/career" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Cột 3: Help */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">HELP</h3>
          <ul className="space-y-3 text-[16px]">
            <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Customer Support</Link></li>
            <li><Link to="/delivery" className="text-gray-400 hover:text-white transition-colors">Delivery Details</Link></li>
            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Cột 4: Resources */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">RESOURCES</h3>
          <ul className="space-y-3 text-[16px]">
            <li><Link to="/account" className="text-gray-400 hover:text-white transition-colors">Account</Link></li>
            <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors">Manage Orders</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Tutorials</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom line */}
      <div className="border-t border-white/10 mt-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 px-6">
        <span className="text-gray-400">© 2025 LabForKeys, All Rights Reserved</span>
        <div className="flex items-center gap-4 mt-4 md:mt-0 opacity-80">
          <img src="/images/visa.png" alt="Visa" className="h-5" />
          <img src="/images/mastercard.png" alt="MasterCard" className="h-5" />
          <img src="/images/paypal.png" alt="PayPal" className="h-5" />
          <img src="/images/applepay.png" alt="Apple Pay" className="h-5" />
          <img src="/images/googlepay.png" alt="Google Pay" className="h-5" />
        </div>
      </div>
    </footer>
  );
}
