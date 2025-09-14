import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-dark text-light py-24 text-center">
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Discord Verification
      </motion.h1>
      <p className="text-lg mb-8 text-gray-300">
        with captcha, VPN/proxy detection, and alt-blocking.
      </p>
      <Link
        to="/verify"
        className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold"
      >
        Verify & Join
      </Link>
    </section>
  );
}
