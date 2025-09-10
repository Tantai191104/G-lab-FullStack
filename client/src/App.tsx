import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./components/common/Error/NotFoundPage";
import BaseLayout from "./layout/BaseLayout";
import KeyboardCustomizerModern from "./components/KeyboardCustomizerModern/KeyboardCustomizerModern";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/auth/AuthPage";
import AuthLayout from "./layout/AuthLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import { Toaster } from "sonner";
export default function App() {
  return (
    <>
      <Toaster position="top-right" theme="dark" />
      <BrowserRouter>
        <Routes>
          {/* Dùng chung layout */}
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="about" element={<AboutPage />} /> */}
          </Route>
          <Route
            path="/customKeyboard"
            element={<KeyboardCustomizerModern />}
          />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthPage />} />
            <Route path="register" element={<AuthPage />} />
          </Route>
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route element={<ProtectedRoute />}></Route>
          {/* Không có layout */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
