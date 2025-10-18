import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold mb-8 text-red-600">Hebi</h1>
        <div className="space-y-3">
          <Link to="/login" className="block text-gray-400 hover:text-white">
            Login
          </Link>
          <Link to="/register" className="block text-red-500 hover:underline">
            Register
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 w-96">
          <h2 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">
            Register
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
              <label className="block text-sm mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full p-2 bg-black border border-zinc-700 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
