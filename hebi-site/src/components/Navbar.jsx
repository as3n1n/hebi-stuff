import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-mid/80 backdrop-blur-md rounded-full px-8 py-3 flex space-x-6 border border-primary/40 shadow-lg">
        <Link to="/" className="hover:text-primary">Home</Link>
        <Link to="/status" className="hover:text-primary">Status</Link>
        <Link to="/addbot" className="hover:text-primary">Add Bot</Link>
        <Link to="/login" className="hover:text-primary">Login</Link>
      </nav>
    </div>
  );
}
