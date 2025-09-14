export default function VerificationCard({ user }) {
  if (!user) return <p className="text-text">Loading...</p>;

  const verifyUser = async () => {
    const res = await fetch("https://javelin.asia/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        secret: "super_secret_key"
      }),
    });

    const data = await res.json();
    alert(data.success ? "✅ Verified!" : "❌ Verification failed");
  };

  return (
    <div className="bg-white text-black rounded-2xl p-8 shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">🔒 Verification</h2>
      <p>Email: {user.email}</p>
      <p>IP: {user.ip}</p>
      <p>Browser: {user.browser}</p>
      <button
        onClick={verifyUser}
        className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        Verify & Join
      </button>
    </div>
  );
}
