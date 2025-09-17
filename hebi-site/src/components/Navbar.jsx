import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-hebiBlack border-b border-red-700 px-6 py-4 flex justify-between items-center">
      <h1 className="text-hebiRed font-bold text-xl">Hebi Upload</h1>
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/import">Import</Link>
      </div>
    </nav>
  );
}
