import { useEffect, useState } from "react";
import VerificationCard from "../components/VerificationCard";

export default function Verify() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example mock data
    setUser({
      id: "123456",
      email: "user@example.com",
      ip: "192.168.1.1",
      browser: "Chrome / Windows"
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <VerificationCard user={user} />
    </div>
  );
}
