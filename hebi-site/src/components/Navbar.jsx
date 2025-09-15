import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="flex justify-between items-center px-10 py-6 bg-black/40 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-glow"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
    >
      <h1 className="text-3xl font-bold glow text-hebi">HEBI</h1>
      <div className="flex gap-8 text-lg">
        <Link to="/" className="hover:text-hebi transition">
          Home
        </Link>
        <Link to="/verify" className="hover:text-hebi transition">
          Verify
        </Link>
        <Link to="/invite" className="hover:text-hebi transition">
          Invite
        </Link>
      </div>
    </motion.nav>
  );
}
