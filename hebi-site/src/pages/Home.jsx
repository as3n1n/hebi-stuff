import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-black text-red-600 min-h-screen flex flex-col justify-center items-center">
      <img src="/logo.png" alt="Hebi" className="w-40 mb-8" />
      <div className="space-x-6 text-xl">
        <Link to="/upload" className="hover:underline">[upload]</Link>
        <Link to="/docs" className="hover:underline">[docs]</Link>
        <Link to="/faq" className="hover:underline">[faq]</Link>
      </div>
    </div>
  );
}
