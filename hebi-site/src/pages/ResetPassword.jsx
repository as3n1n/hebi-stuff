import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (!token) {
      setStatus({ type: "error", message: "Invalid or missing token." });
      return;
    }

    try {
      setLoading(true);
      const api = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
      const res = await fetch(`${api}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text);
      }

      if (!res.ok) throw new Error(data.message || "Request failed");

      setStatus({
        type: "success",
        message: "Your password has been successfully reset!",
      });
      setPassword("");
      setConfirm("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to reset password.",
      });
    } finally {
      setLoading(false);
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
            Reset your password
          </h2>

          <Notification type={status.type} message={status.message} />

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">New Password</label>
              <input
                type="password"
                className="w-full p-2 bg-black border border-zinc-700 rounded focus:outline-none focus:ring-1 focus:ring-red-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 bg-black border border-zinc-700 rounded focus:outline-none focus:ring-1 focus:ring-red-600"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded font-semibold transition ${
                loading
                  ? "bg-zinc-700 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
