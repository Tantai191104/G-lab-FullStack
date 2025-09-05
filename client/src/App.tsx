import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./components/common/Error/NotFoundPage";
import BaseLayout from "./layout/BaseLayout";
import KeyboardCustomizerModern from "./components/KeyboardCustomizerModern/KeyboardCustomizerModern";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dùng chung layout */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="about" element={<AboutPage />} /> */}
        </Route>
        <Route path="/customKeyboard" element={<KeyboardCustomizerModern />} />
        {/* Không có layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
