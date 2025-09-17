import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Docs from "./pages/Docs";
import Status from "./pages/Status";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";

export default function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="bg-zinc-950 border-b border-zinc-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-600">Hebi</h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <Link to="/upload" className="hover:text-red-500 transition">Upload</Link>
            <Link to="/docs" className="hover:text-red-500 transition">Docs</Link>
            <Link to="/status" className="hover:text-red-500 transition">Status</Link>
            <Link to="/faq" className="hover:text-red-500 transition">FAQ</Link>
            <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
          </nav>
        </header>

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/status" element={<Status />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-zinc-950 border-t border-zinc-800 p-4 text-center text-sm text-gray-400">
          Hebi © {new Date().getFullYear()}
        </footer>
      </div>
    </Router>
  );
}
