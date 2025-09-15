import { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";

export default function Status() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("https://api.javelin.asia/") // adapter ton endpoint exact
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("offline"));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      {status === "loading" ? (
        <p className="text-gray-400">Loading status...</p>
      ) : (
        <StatusCard status={status} />
      )}
    </div>
  );
}
