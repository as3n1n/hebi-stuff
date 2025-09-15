import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import Home from "./pages/Home";
import Status from "./pages/Status";
import AddBot from "./pages/AddBot";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundAnimation />
      <Navbar />
      <main className="flex-grow relative z-10 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/addbot" element={<AddBot />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
