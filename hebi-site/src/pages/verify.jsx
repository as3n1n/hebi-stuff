import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Button from "../components/Button";
import GlowTitle from "../components/GlowTitle";

export default function Verify() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const handleVerify = async () => {
    if (!token) {
      setStatus("Please complete the captcha.");
      return;
    }

    setStatus("Verifying...");
    try {
      const res = await fetch("https://javelin.asia/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID",
          secret: import.meta.env.VITE_API_SECRET,
          token
        })
      });
      const data = await res.json();
      setStatus(data.success ? "Verification successful!" : "Verification failed.");
    } catch {
      setStatus("Server error.");
    }
  };

  return (
    <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-glow animate-fadeInUp">
      <GlowTitle>Verification</GlowTitle>
      <p className="text-text-secondary mb-4">Complete the captcha to proceed</p>
      <div className="flex justify-center mb-4">
        <HCaptcha
          sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
          onVerify={setToken}
        />
      </div>
      <Button onClick={handleVerify}>Verify</Button>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}
