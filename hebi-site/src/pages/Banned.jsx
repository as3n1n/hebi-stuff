export default function Banned() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-5xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-gray-400">
        You have been banned from Hebi. Sharing your key is strictly forbidden.
      </p>
    </div>
  );
}
