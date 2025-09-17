import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return setMessage("Select a file first.");
    const formData = new FormData();
    formData.append("fileToUpload", file);

    const res = await fetch("https://api.javelin.asia/api/upload", {
      method: "POST",
      headers: { "x-api-key": localStorage.getItem("hebi-key") },
      body: formData
    });
    const data = await res.json();
    if (data.error) setMessage(" Error on Upload " + data.error);
    else setMessage("Uploaded: " + data.file);
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-hebiRed mb-6">Upload File</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-3 bg-hebiRed px-6 py-2 rounded hover:bg-red-700">
        Upload
      </button>
      {message && <p className="mt-6">{message}</p>}
    </div>
  );
}
