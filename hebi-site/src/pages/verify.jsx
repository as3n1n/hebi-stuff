import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function Verify() {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(null);

  const handleVerify = async () => {
    if (!token) {
      setStatus("❌ Please complete the captcha first.");
      return;
    }

    try {
      const res = await fetch("https://api.javelin.asia/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken: token, userId: "1234567890" }),
      });

      const data = await res.json();
      setStatus(data.success ? "✅ Verification successful!" : "❌ Verification failed.");
    } catch (err) {
      setStatus("❌ Error connecting to server.");
    }
  };

  return (
    <section className="bg-dark text-light py-24 text-center">
      <h1 className="text-3xl font-bold mb-6 text-primary">Verification</h1>
      <p className="mb-6 text-gray-300">Complete captcha to verify your account.</p>

      <div className="flex justify-center mb-6">
        <HCaptcha
          sitekey="c702e536-82f6-4c24-9a5c-f6d40530bbce"
          onVerify={(token) => setToken(token)}
        />
      </div>

      <button
        onClick={handleVerify}
        className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold"
      >
        Verify
      </button>

      {status && <p className="mt-6">{status}</p>}
    </section>
  );
}
