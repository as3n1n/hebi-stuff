import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";

export default function Verify() {
  const [status, setStatus] = useState("");

  const handleVerify = (token) => {
    if (token) {
      setStatus("✅ Vérification réussie !");
    } else {
      setStatus("❌ Vérification échouée.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Vérification</h1>
      <HCaptcha
        sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
        onVerify={handleVerify}
      />
      <p className="mt-4">{status}</p>
    </div>
  );
}
