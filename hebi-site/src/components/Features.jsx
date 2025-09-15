import { motion } from "framer-motion";

const features = [
  { title: "Verification", desc: "erification system." },
  { title: "Invite Bot", desc: "Add Hebi to your Discord server." },
];

export default function Features() {
  return (
    <section className="py-32 bg-black text-center">
      <h2 className="text-4xl font-bold glow mb-16">Features</h2>
      <div className="grid md:grid-cols-3 gap-12 px-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="p-8 bg-black/60 rounded-2xl shadow-glow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-2xl text-hebi font-bold mb-4">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
