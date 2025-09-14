import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-primary text-text py-24 px-6 text-center">
      <motion.h1
        className="text-5xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-accent">Javelin</span>
      </motion.h1>
      <p className="text-lg max-w-2xl mx-auto mb-8">
        Secure and simple Discord account verification.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/verify"
          className="px-6 py-3 bg-accent text-black rounded-lg hover:bg-yellow-400 transition"
        >
          Start Verification
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 border border-text rounded-lg hover:bg-white hover:text-primary transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
