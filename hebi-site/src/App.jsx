import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Docs from "./pages/Docs";
import Status from "./pages/Status";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Invite from "./pages/Invite";

export default function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="bg-zinc-950 border-b border-zinc-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-600">Hebi</h1>
          <nav className="space-x-6">
            <Link to="/">Home</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/docs">Docs</Link>
            <Link to="/status">Status</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invite" element={<Invite />} />

            {/* Protected routes */}
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/docs" element={<ProtectedRoute><Docs /></ProtectedRoute>} />
            <Route path="/status" element={<ProtectedRoute><Status /></ProtectedRoute>} />

            {/* Public */}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="bg-zinc-950 border-t border-zinc-800 p-4 text-center text-sm text-gray-400">
          Hebi © {new Date().getFullYear()}
        </footer>
      </div>
    </Router>
  );
}
