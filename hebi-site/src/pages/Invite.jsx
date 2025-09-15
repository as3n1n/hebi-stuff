import { motion } from "framer-motion";
import Button from "../components/Button";
import GlowTitle from "../components/GlowTitle";

export default function Invite() {
  const inviteUrl =
    "https://discord.com/oauth2/authorize?client_id=1327772341639581747&permissions=8&scope=bot%20applications.commands";

  return (
    <motion.div
      className="w-full max-w-lg bg-surface p-10 rounded-2xl shadow-glow text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlowTitle>Add Hebi to your server</GlowTitle>
      <p className="text-text-secondary mb-8">
        Bring verification, logging, to your Discord
        server with <span className="text-primary font-bold">Hebi Bot</span>.
      </p>
      <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full text-lg py-4">Invite Hebi</Button>
      </a>
      <p className="mt-6 text-sm text-text-secondary">
        By inviting Hebi, you grant it the permissions it.
      </p>
    </motion.div>
  );
}
