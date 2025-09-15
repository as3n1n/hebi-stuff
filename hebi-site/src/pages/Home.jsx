import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero-bg flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-6xl font-display text-white mb-6 animate-fade-in">
        Hebi Bot
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl animate-fade-in">
        Hebi is a Discord bot designed for verification.
      </p>
      <div className="flex gap-6 animate-fade-in">
        <Link to="/addbot" className="btn bg-primary text-dark px-8 py-3 rounded-full font-semibold hover:bg-red-600">
          Invite Hebi
        </Link>
        <Link to="/status" className="btn border border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-dark">
          View Status
        </Link>
      </div>
    </section>
  );
}
