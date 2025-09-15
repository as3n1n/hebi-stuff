import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Features from "../components/Features";

export default function Home() {
  return (
    <div className="text-center px-6">
      <motion.h1
        className="text-6xl font-bold text-red-600 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hebi - Protection & Vérification
      </motion.h1>

      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Un bot Discord conçu pour sécuriser votre communauté avec un système de
        vérification fiable, un anti-spam et une protection en temps réel.
      </p>

      <div className="flex justify-center space-x-6">
        <Link
          to="/verify"
          className="px-6 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all"
        >
          Vérifier un compte
        </Link>
        <Link
          to="/invite"
          className="px-6 py-3 border border-red-600 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all"
        >
          Inviter Hebi
        </Link>
      </div>

      <Features />
    </div>
  );
}
