import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Invite() {
  const [key, setKey] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!key) {
      setError("Please enter your key");
      return;
    }

    try {
      const res = await fetch("https://api.javelin.asia/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
        },
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("hebiKey", key);
        navigate("/upload"); // redirection vers upload
      } else {
        setError("Invalid or banned key");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Enter Invitation Code</h1>
        <p className="text-gray-400 mb-4">This route requires a valid Hebi invitation key.</p>

        <input
          type="text"
          placeholder="Paste your key..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
        >
          Continue
        </button>

        <small className="block text-gray-500 mt-3">
          Sharing keys will result in an immediate ban.
        </small>
      </div>
    </div>
  );
}
