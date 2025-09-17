import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("fileToUpload", file);

    const res = await fetch("https://api.javelin.asia/api/fileupload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setLink(data.preview); // lien preview Discord
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Upload your file</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
      >
        Upload
      </button>

      {link && (
        <div className="mt-6">
          <p className="text-green-400">File uploaded!</p>
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
