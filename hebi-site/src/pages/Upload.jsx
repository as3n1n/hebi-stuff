import { useState, useRef } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const dropRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "https://upload.javelin.asia";

  // 📂 Gestion fichier local
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUrl("");
    setResult(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setUrl("");
      setResult(null);
      setError(null);
    }
    dropRef.current.classList.remove("border-red-500");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("border-red-500");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("border-red-500");
  };

  // 🚀 Upload (fichier ou URL)
  const handleUpload = async () => {
    if (!file && !url) {
      return setError("Please choose a file or enter a URL first.");
    }

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      let res;

      if (file) {
        // Fichier local
        const formData = new FormData();
        formData.append("fileToUpload", file);

        res = await fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
        });
      } else if (url) {
        // Upload par URL
        res = await fetch(`${API_URL}/urlupload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      }

      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Error uploading file.");
    }

    setUploading(false);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Upload your file</h1>

      {/* Zone Drag & Drop */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-2xl p-10 w-full max-w-xl text-center cursor-pointer transition-colors"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <p className="text-gray-300 mb-4">
          {file ? (
            <span className="text-red-400 font-semibold">{file.name}</span>
          ) : (
            "Drag & drop your file here or click to select"
          )}
        </p>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-gray-500 my-4">— or —</p>

      {/* Upload via URL */}
      <input
        type="text"
        placeholder="Paste a video/image URL (Instagram, TikTok, YouTube, etc)"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setFile(null);
          setResult(null);
          setError(null);
        }}
        className="w-full max-w-xl px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
      />

      {/* Bouton Upload */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Résultat */}
      {result && (
        <div className="mt-8 bg-zinc-900 p-6 rounded-xl w-full max-w-xl text-center">
          <p className="text-green-400 font-bold mb-2">Upload successful!</p>

          <p className="text-sm text-gray-400">Direct link:</p>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 break-all"
          >
            {result.url}
          </a>

          <p className="text-sm text-gray-400 mt-4">Preview link:</p>
          <a
            href={result.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 break-all"
          >
            {result.preview}
          </a>

          {/* Afficher Hashes */}
          {result.analysis && (
            <div className="mt-6 text-left">
              {result.analysis.type && (
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {result.analysis.type}
                </p>
              )}
              {result.analysis.contents && (
                <div className="mt-2">
                  <span className="font-semibold">Archive Contents:</span>
                  <pre className="bg-zinc-800 p-2 mt-1 rounded text-xs overflow-x-auto">
                    {result.analysis.contents.join("\n")}
                  </pre>
                </div>
              )}
              {result.analysis.nsfw && (
                <div className="mt-2">
                  <span className="font-semibold">NSFW Analysis:</span>
                  <pre className="bg-zinc-800 p-2 mt-1 rounded text-xs overflow-x-auto">
                    {result.analysis.nsfw.join("\n")}
                  </pre>
                </div>
              )}
            </div>
          )}

          <p className="text-gray-500 text-xs mt-4">
            This file will be deleted automatically in {result.expiresIn}.
          </p>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="mt-6 text-red-500 font-semibold">{error}</div>
      )}
    </div>
  );
}
