import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";

export default function Verify() {
  const [verified, setVerified] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl text-red-600 mb-6">Vérification</h1>
      <p className="text-gray-300 mb-6">Complétez le captcha pour continuer.</p>

      <HCaptcha
        sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
        onVerify={() => setVerified(true)}
      />

      {verified ? (
        <p className="text-green-500 mt-6">Vérification réussie !</p>
      ) : (
        <p className="text-red-500 mt-6">Vérification en attente...</p>
      )}
    </div>
  );
}
