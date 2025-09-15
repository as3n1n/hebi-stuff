import GlowTitle from "../components/GlowTitle";
import Button from "../components/Button";

export default function Invite() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <GlowTitle>Invite Hebi</GlowTitle>
      <p className="mt-4 text-gray-400 max-w-lg">
        Add Hebi to your Discord server.
      </p>
      <a
        href="https://discord.com/oauth2/authorize?client_id=1327772341639581747"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10"
      >
        <Button>Invite to Discord</Button>
      </a>
    </div>
  );
}
