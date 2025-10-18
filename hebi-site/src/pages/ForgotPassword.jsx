import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const api = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
      const res = await fetch(`${api}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = await res.json().catch(() => ({}));
      setStatus({
        type: "success",
        message:
          "If an account exists, a reset link has been sent to your email address.",
      });
      setEmail("");
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "Failed to send reset link. Please verify your email or try again later.",
      });
      console.error("Forgot password error:", err);
    }
  };

  const Notification = ({ type, message }) => {
    if (!message) return null;
    const isSuccess = type === "success";
    return (
      <div
        className={`flex items-center space-x-3 p-3 rounded-md mb-4 border ${
          isSuccess
            ? "bg-green-900/30 border-green-700 text-green-400"
            : "bg-red-900/30 border-red-700 text-red-400"
        }`}
      >
        {isSuccess ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
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
          <Link to="/register" className="block text-gray-400 hover:text-white">
            Register
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 w-96">
          <h2 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">
            Forgot your password?
          </h2>

          <Notification type={status.type} message={status.message} />

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">E-Mail</label>
              <input
                type="email"
                className="w-full p-2 bg-black border border-zinc-700 rounded focus:outline-none focus:ring-1 focus:ring-red-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
            >
              Send reset link
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
