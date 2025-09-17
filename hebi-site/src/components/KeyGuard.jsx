import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KeyGuard({ children }) {
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("hebi-key");
    if (!key) {
      navigate("/banned");
      return;
    }

    fetch("https://api.javelin.asia/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key }
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) setValid(true);
        else navigate("/banned");
      })
      .catch(() => navigate("/banned"));
  }, []);

  if (!valid) return <div className="text-center mt-20">Checking access...</div>;

  return children;
}
