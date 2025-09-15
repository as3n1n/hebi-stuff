import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState, useRef } from "react";
import GlowTitle from "../components/GlowTitle";
import Button from "../components/Button";

export default function Verify() {
  const captchaRef = useRef(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!verified) {
      setError("Please complete captcha first");
      return;
    }
    setError("");
    alert("Verification successful!");
  };

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <GlowTitle>Verification</GlowTitle>
      <p className="mt-4 text-gray-400">
        Complete captcha to verify your account
      </p>
      <div className="mt-6">
        <HCaptcha
          sitekey="your-hcaptcha-site-key"
          onVerify={() => setVerified(true)}
          ref={captchaRef}
        />
      </div>
      <div className="mt-6">
        <Button onClick={handleVerify}>Verify</Button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
