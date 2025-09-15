export default function StatusCard({ status }) {
  return (
    <div className="bg-mid/80 border border-primary rounded-xl p-8 text-center shadow-xl animate-fade-in">
      <h2 className="text-3xl font-bold text-primary mb-4">Bot Status</h2>
      <p className="mt-4 text-lg">
        {status === "online" ? "🟢 Online" : "🔴 Offline"}
      </p>
    </div>
  );
}
