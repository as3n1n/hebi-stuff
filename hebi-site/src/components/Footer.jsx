import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-mid/80 backdrop-blur-md rounded-full px-8 py-3 flex space-x-6 border border-primary/40 shadow-lg">
        <Link to="/" className="flex items-center gap-2 hover:text-primary">
          Dashboard
        </Link>
        <Link to="/addbot" className="flex items-center gap-2 hover:text-primary">
          Invite
        </Link>
        <a
          href="https://discord.gg/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary"
        >
          Help
        </a>
      </div>
    </div>
  );
}
