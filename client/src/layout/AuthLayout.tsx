import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #0A92CC 0%, #F4BB19 25%, #ED2B52 50%, #AE214A 70%, #7ED957 85%, #A78BFA 100%)",
      }}
    >
      <AnimatePresence mode="wait"> 
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
