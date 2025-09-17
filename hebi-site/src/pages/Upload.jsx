import { useState } from "react";

export default function Upload() {
  const [key, setKey] = useState("");
  const [valid, setValid] = useState(false);

  async function check() {
    const res = await fetch("https://api.javelin.asia/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key }
    });
    const data = await res.json();
    if (data.success) setValid(true);
    else alert("Invalid key");
  }

  if (!valid) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Enter invitation code</h1>
        <input value={key} onChange={e => setKey(e.target.value)} className="text-black p-2" />
        <button onClick={check} className="bg-red-600 px-4 py-2 mt-4 rounded">Submit</button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-6">Upload a File</h1>
      <form action="https://api.javelin.asia/api/fileupload" method="post" encType="multipart/form-data">
        <input type="file" name="fileToUpload" />
        <input type="hidden" name="x-api-key" value={key} />
        <button type="submit" className="bg-red-600 px-6 py-2 mt-4 rounded">Upload</button>
      </form>
    </div>
  );
}
