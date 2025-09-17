import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const key = localStorage.getItem("hebi-key");
    if (!key) {
      setValid(false);
      return;
    }

    async function checkKey() {
      try {
        const res = await fetch("https://api.javelin.asia/validate-key", {
          method: "POST",
          headers: { "x-api-key": key }
        });
        setValid(res.ok);
      } catch {
        setValid(false);
      }
    }
    checkKey();
  }, []);

  if (valid === null) return <div className="text-white p-10">Checking key...</div>;
  if (!valid) return <Navigate to="/invite" replace />;

  return children;
}
