import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "./Login";
import Verify from "./Verify";
import Invite from "./Invite";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/invite" element={<Invite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
