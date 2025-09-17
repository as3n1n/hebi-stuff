import { useState, useRef } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const dropRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
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

  const handleUpload = async () => {
    if (!file) return setError("⚠️ Please choose or drop a file first.");
    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("fileToUpload", file);

    try {
      const res = await fetch("https://api.javelin.asia/api/fileupload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "❌ Upload failed.");
      }
    } catch (err) {
      setError("❌ Error uploading file.");
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
          <p className="text-green-400 font-bold mb-2">✅ Upload successful!</p>

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
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="mt-6 text-red-500 font-semibold">{error}</div>
      )}
    </div>
  );
}
