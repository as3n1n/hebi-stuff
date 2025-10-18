import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion (temporaire)
    navigate("/panels");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold mb-8 text-red-600">Hebi</h1>
        <div className="space-y-3">
          <Link to="/login" className="block text-red-500 hover:underline">
            Login
          </Link>
          <Link to="/register" className="block text-gray-400 hover:text-white">
            Register
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 w-96">
          <h2 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-black border border-zinc-700 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-black border border-zinc-700 rounded"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-400">
                <input type="checkbox" className="accent-red-600" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-sm text-red-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
