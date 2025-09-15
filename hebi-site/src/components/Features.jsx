import { motion } from "framer-motion";

export default function Features() {
  const features = [
    { title: "Vérification sécurisée", desc: "Empêche les faux comptes d’accéder." },
    { title: "Anti-spam", desc: "Protection en temps réel contre les bots." },
    { title: "Logs clairs", desc: "Suivi des actions directement dans Discord." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-16">
      {features.map((f, i) => (
        <motion.div
          key={i}
          className="p-6 bg-zinc-900 rounded-xl shadow-lg border border-red-600"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold text-red-500">{f.title}</h3>
          <p className="text-gray-300 mt-2">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
