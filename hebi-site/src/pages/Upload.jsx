import { useState } from "react";

export default function Upload() {
  const [key, setKey] = useState(localStorage.getItem("hebi-key") || "");
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  async function checkKey() {
    const res = await fetch("https://api.javelin.asia/validate-key", {
      method: "POST",
      headers: { "x-api-key": key }
    });
    if (res.ok) {
      localStorage.setItem("hebi-key", key);
      setValid(true);
    } else {
      setMessage("❌ Invalid key");
    }
  }

  async function uploadFile(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("fileToUpload", file);
    const res = await fetch("https://api.javelin.asia/api/fileupload", {
      method: "POST",
      headers: { "x-api-key": key },
      body: form
    });
    const data = await res.json();
    setMessage(JSON.stringify(data));
  }

  async function uploadUrl(e) {
    e.preventDefault();
    const res = await fetch("https://api.javelin.asia/api/urlupload", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    setMessage(JSON.stringify(data));
  }

  if (!valid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl text-red-600 mb-4">Enter invitation code</h1>
        <input
          className="p-2 rounded text-black"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Paste your key"
        />
        <button
          onClick={checkKey}
          className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Submit
        </button>
        {message && <p className="mt-2 text-gray-400">{message}</p>}
      </div>
    );
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl text-red-600 mb-6">Upload Center</h1>

      {/* Upload File */}
      <form onSubmit={uploadFile} className="mb-6">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="ml-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Upload
        </button>
      </form>

      {/* Upload via URL */}
      <form onSubmit={uploadUrl} className="mb-6">
        <input
          type="text"
          placeholder="Enter file URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="text-black p-2 rounded w-80"
        />
        <button className="ml-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Upload URL
        </button>
      </form>

      {message && <p className="bg-zinc-900 p-4 rounded">{message}</p>}
    </div>
  );
}
