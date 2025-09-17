import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Faq from "./pages/Faq";
import ImportSave from "./pages/ImportSave";
import Banned from "./pages/Banned";
import KeyGuard from "./components/KeyGuard";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white">
      <BackgroundAnimation />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route
            path="/upload"
            element={
              <KeyGuard>
                <Upload />
              </KeyGuard>
            }
          />
          <Route
            path="/import"
            element={
              <KeyGuard>
                <ImportSave />
              </KeyGuard>
            }
          />
          <Route path="/banned" element={<Banned />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
