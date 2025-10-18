import { Link } from "react-router-dom";
import { useState } from "react";

export default function Panels() {
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState("24h");

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");
    alert(`Uploading ${file.name} for ${duration}`);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold mb-8 text-red-600">Hebi</h1>
        <div className="space-y-3">
          <Link to="/panels" className="block text-red-500 hover:underline">
            Dashboard
          </Link>
          <Link to="/upload" className="block text-gray-400 hover:text-white">
            Upload
          </Link>
          <Link to="/faq" className="block text-gray-400 hover:text-white">
            FAQ
          </Link>
          <Link to="/login" className="block text-gray-400 hover:text-white">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 w-96">
          <h2 className="text-lg font-semibold mb-4 border-b border-zinc-800 pb-2">
            Upload File
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
            />

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-black border border-zinc-700 p-2 w-full rounded"
            >
              <option value="1h">1 Hour</option>
              <option value="6h">6 Hours</option>
              <option value="24h">1 Day</option>
              <option value="72h">3 Days</option>
              <option value="168h">7 Days</option>
            </select>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
            >
              Upload
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
