import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-mid/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-primary/40">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-display text-primary">Hebi</h1>
        <ul className="flex space-x-8 font-semibold">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li><Link to="/status" className="hover:text-primary">Status</Link></li>
          <li><Link to="/addbot" className="hover:text-primary">Add Bot</Link></li>
        </ul>
      </div>
    </nav>
  );
}
