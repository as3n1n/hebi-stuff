import { useState } from "react";

export default function ImportSave() {
  const [json, setJson] = useState("");
  const [message, setMessage] = useState("");

  const handleImport = async () => {
    try {
      const parsed = JSON.parse(json);
      const res = await fetch("https://api.javelin.asia/api/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": localStorage.getItem("hebi-key")
        },
        body: JSON.stringify({ uploads: parsed })
      });
      const data = await res.json();
      if (data.success) setMessage("Save imported.");
      else setMessage("Error importing.");
    } catch {
      setMessage("Invalid JSON.");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-hebiRed mb-6">Import Save</h1>
      <textarea
        className="w-full h-40 p-3 text-black"
        placeholder="Paste your JSON save here..."
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      <button onClick={handleImport} className="mt-4 bg-hebiRed px-6 py-2 rounded hover:bg-red-700">
        Import
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
