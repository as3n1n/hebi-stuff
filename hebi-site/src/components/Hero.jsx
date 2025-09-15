import { motion } from "framer-motion";
import GlowTitle from "./GlowTitle";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-red-900/40 to-black"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 6 }}
      ></motion.div>

      {/* Title */}
      <GlowTitle>Welcome to Hebi</GlowTitle>
      <motion.p
        className="mt-6 text-gray-300 text-lg max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        verification & Discord.
      </motion.p>

      {/* CTA */}
      <motion.div
        className="flex gap-6 mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/verify">
          <Button>Verify Now</Button>
        </Link>
        <Link to="/invite">
          <Button>Invite Hebi</Button>
        </Link>
      </motion.div>
    </section>
  );
}
