import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setSent(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold mb-8 text-red-600">Hebi</h1>
        <div className="space-y-3">
          <Link to="/login" className="block text-gray-400 hover:text-white">Login</Link>
          <Link to="/register" className="block text-gray-400 hover:text-white">Register</Link>
        </div>
      </aside>

      <main className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 w-96">
          <h2 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">
            Forgot your password?
          </h2>
          {sent ? (
            <p className="text-sm text-gray-300">
              If an account exists, a reset link has been sent.
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">E-Mail</label>
                <input type="email" className="w-full p-2 bg-black border border-zinc-700 rounded"
                       value={email} onChange={e=>setEmail(e.target.value)} required />
