import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Docs from "./pages/Docs";
import Status from "./pages/Status";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Tos from "./pages/Tos";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Panels from "./pages/Panels";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 p-4 flex justify-between items-center">
      <a href="https://javelin.asia" className="flex items-center space-x-2">
        <img src="/logo.png" alt="Hebi Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-red-600">Hebi</span>
      </a>
      <nav className="space-x-6">
        <Link to="/" className="hover:text-red-500 transition">Home</Link>
        <Link to="/upload" className="hover:text-red-500 transition">Upload</Link>
        <Link to="/docs" className="hover:text-red-500 transition">Docs</Link>
        <Link to="/status" className="hover:text-red-500 transition">Status</Link>
        <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
        <Link to="/faq" className="hover:text-red-500 transition">FAQ</Link>
        <Link to="/tos" className="hover:text-red-500 transition">TOS</Link>
        <Link to="/privacy" className="hover:text-red-500 transition">Privacy</Link>
        {user ? (
          <>
            <Link to="/panels" className="hover:text-red-500 transition">Panels</Link>
            <button onClick={logout} className="hover:text-red-500 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-red-500 transition">Login</Link>
            <Link to="/register" className="hover:text-red-500 transition">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-black text-white min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/status" element={<Status />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/tos" element={<Tos />} />
              <Route path="/privacy" element={<Privacy />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="/panels" element={
                <ProtectedRoute>
                  <Panels />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="bg-zinc-950 border-t border-zinc-800 p-4 text-center text-sm text-gray-400">
            Hebi © {new Date().getFullYear()}
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
