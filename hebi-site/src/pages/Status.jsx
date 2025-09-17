import { useEffect, useState } from "react";

export default function Status() {
  const [status, setStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());

  async function fetchStatus() {
    try {
      const res = await fetch("https://api.javelin.asia/api/status");
      const data = await res.json();
      setStatus(data);
      setLastUpdate(new Date().toLocaleString());
    } catch (e) {
      console.error("❌ Failed to fetch status:", e);
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // refresh toutes les 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-3xl text-red-600 mb-6">Hebi Status</h1>

      {!status ? (
        <p className="text-gray-400">Loading status...</p>
      ) : (
        <ul className="space-y-4">
          <li className="p-4 rounded bg-zinc-900 flex justify-between">
            <span>API</span>
            <span
              className={
                status.api === "online" ? "text-green-500" : "text-red-500"
              }
            >
              {status.api}
            </span>
          </li>
          <li className="p-4 rounded bg-zinc-900 flex justify-between">
            <span>Files stored</span>
            <span className="text-gray-300">{status.filesCount}</span>
          </li>
          <li className="p-4 rounded bg-zinc-900 flex justify-between">
            <span>Deleted today</span>
            <span className="text-gray-300">{status.deletedToday}</span>
          </li>
        </ul>
      )}

      <p className="mt-6 text-gray-400 text-sm">
        Last update: {lastUpdate}
      </p>
    </div>
  );
}
