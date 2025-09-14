import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-text px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">Javelin</div>
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/verify">Verify</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
