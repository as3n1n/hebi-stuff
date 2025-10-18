import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Pour le login réel avec token

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Appel réel vers ton backend Render / Javelin
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Stocke le token et charge le user
      login(data.token);

      // ✅ Redirige vers le dashboard Panels
      navigate("/panels");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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

              {/* ✅ Lien correct vers Forgot Password */}
              <Link
                to="/forgot-password"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
            >
              {loading ? "Connecting..." : "Login"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
