import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Verify from "./Verify";
import Invite from "./Invite";
import Login from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black text-white font-[MuseoSansCyrl-900]">
        {/* Navbar */}
        <Navbar />

        {/* Contenu */}
        <main className="flex-grow">
          <Routes>
            {/* Page d’accueil */}
            <Route path="/" element={<><Hero /><Features /></>} />

            {/* Page de login */}
            <Route path="/login" element={<Login />} />

            {/* Vérification (captcha) */}
            <Route path="/verify" element={<Verify />} />

            {/* Invitation du bot */}
            <Route path="/invite" element={<Invite />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
