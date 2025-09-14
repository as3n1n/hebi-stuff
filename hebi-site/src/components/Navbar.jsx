import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-extrabold text-primary">
          Hebi
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-light hover:text-primary">Home</Link>
          <Link to="/verify" className="text-light hover:text-primary">Verify</Link>
        </div>
      </div>
    </nav>
  );
}
