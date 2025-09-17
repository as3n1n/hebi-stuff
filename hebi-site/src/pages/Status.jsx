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
      console.error(e);
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-3xl text-red-600 mb-6">Hebi Status</h1>

      {status ? (
        <div className="space-y-4">
          <div className="p-4 rounded bg-zinc-900 flex justify-between">
            <span>API</span>
            <span
              className={
                status.api === "online" ? "text-green-500" : "text-red-500"
              }
            >
              {status.api}
            </span>
          </div>

          <div className="p-4 rounded bg-zinc-900 flex justify-between">
            <span>Files stored</span>
            <span className="text-blue-400">{status.filesCount}</span>
          </div>

          <div className="p-4 rounded bg-zinc-900 flex justify-between">
            <span>Files deleted today</span>
            <span className="text-yellow-400">{status.deletedToday}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Loading status...</p>
      )}

      <p className="mt-6 text-gray-500 text-sm">
        Last update: {lastUpdate}
      </p>
    </div>
  );
}
