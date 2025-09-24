import { useEffect, useState } from "react";

export default function Status() {
  const [status, setStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());

  async function fetchStatus() {
    try {
      const res = await fetch("https://upload.javelin.asia/status");
      const data = await res.json();
      setStatus(data);
      setLastUpdate(new Date().toLocaleString());
    } catch (e) {
      console.error("Erreur fetch status:", e);
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  function StatusCard({ name, state }) {
    return (
      <div className="p-4 rounded bg-zinc-900 flex justify-between items-center">
        <span className="font-semibold">{name}</span>
        <span
          className={
            state === "Operational"
              ? "text-green-500"
              : state === "Down"
              ? "text-red-500"
              : "text-yellow-400"
          }
        >
          {state}
        </span>
      </div>
    );
  }

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-3xl text-red-600 mb-6">Hebi Status</h1>

      {status ? (
        <div className="space-y-4">
          <StatusCard name="Bot" state={status.bot} />
          <StatusCard name="API" state={status.api} />
          <StatusCard name="Database" state={status.database} />
          <StatusCard name="Website" state={status.website} />

          <div className="p-4 rounded bg-zinc-900 flex justify-between">
            <span>Last API ping</span>
            <span className="text-gray-400">
              {new Date(status.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Chargement du status...</p>
      )}

      <p className="mt-6 text-gray-500 text-sm">Last update: {lastUpdate}</p>
    </div>
  );
}
