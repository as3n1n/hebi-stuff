import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Verify from "./Verify.jsx";
import Invite from "./Invite.jsx";
import Login from "./Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black text-white font-[MuseoSansCyrl-900]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<><Hero /><Features /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/invite" element={<Invite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
