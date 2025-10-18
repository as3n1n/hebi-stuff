import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const token = params.get("token") || "";

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      alert("Password updated. You can login now.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold mb-8 text-red-600">Hebi</h1>
        <Link to="/login" className="text-gray-400 hover:text-white">Login</Link>
      </aside>

      <main className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 w-96">
          <h2 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">Reset Password</h2>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">New Password</label>
              <input type="password" className="w-full p-2 bg-black border border-zinc-700 rounded"
                     value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input type="password" className="w-full p-2 bg-black border border-zinc-700 rounded"
                     value={confirm} onChange={e=>setConfirm(e.target.value)} required />
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold">
              Update
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
