import { useEffect, useState } from "react";

export default function Status() {
  const [status, setStatus] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());

  async function fetchStatus() {
    try {
      const res = await fetch("/status.json"); // tu fais un fichier JSON statique ou API interne
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
    <div className="p-10 bg-black text-white">
      <h1 className="text-3xl text-red-600 mb-6">Hebi Status</h1>
      <ul className="space-y-4">
        {Object.entries(status).map(([service, state]) => (
          <li
            key={service}
            className="p-4 rounded bg-zinc-900 flex justify-between"
          >
            <span>{service}</span>
            <span className={state === "online" ? "text-green-500" : "text-red-500"}>
              {state}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-gray-400 text-sm">
        Last update: {lastUpdate}
      </p>
    </div>
  );
}
