export default function Docs() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h2 className="text-xl font-bold text-red-600 mb-4">Hebi API</h2>
        <nav className="space-y-2">
          <a href="#intro" className="block hover:text-red-500">Introduction</a>
          <a href="#fileupload" className="block hover:text-red-500">File Upload</a>
          <a href="#urlupload" className="block hover:text-red-500">URL Upload</a>
          <a href="#delete" className="block hover:text-red-500">Delete File</a>
          <a href="#status" className="block hover:text-red-500">Status</a>
          <a href="#curl" className="block hover:text-red-500">cURL Examples</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 id="intro" className="text-4xl text-red-600 mb-6">
          Hebi API Documentation
        </h1>
        <p className="mb-6">
          Base URL:{" "}
          <code className="bg-zinc-900 px-2 py-1 rounded">
            https://upload.javelin.asia
          </code>
        </p>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">Introduction</h2>
          <p className="mb-4">
            The Hebi API allows you to upload and share files temporarily.
            Files are automatically deleted after 7 days.
          </p>
          <p className="mb-4">
            You can interact with the API using <code>curl</code>, a simple
            command-line tool that allows you to send requests to web servers.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <b>POST</b>: send data (like uploading a file).
            </li>
            <li>
              <b>GET</b>: retrieve data (like checking status or downloading a file).
            </li>
            <li>
              <b>DELETE</b>: remove a file you uploaded.
            </li>
          </ul>
          <p>
            Example: <br />
            <code className="bg-zinc-900 px-2 py-1 rounded">
              curl -F "fileToUpload=@test.png" https://upload.javelin.asia/upload
            </code>
          </p>
        </section>

        {/* File Upload */}
        <section id="fileupload" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">File Upload</h2>
          <p>
            Upload a local file (max 200MB). Files are stored temporarily and
            expire automatically after 7 days.
          </p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`POST /upload
Body: form-data
  - fileToUpload=@localfile.png`}
          </pre>
        </section>

        {/* URL Upload */}
        <section id="urlupload" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">URL Upload</h2>
          <p>
            Upload a file directly from a remote URL (Instagram, TikTok, YouTube,
            Facebook, etc). The server will fetch the media and store it like a
            normal file.
          </p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`POST /urlupload
Body: JSON
  {
    "url": "https://www.instagram.com/reel/DOqiaZaDF9E/"
  }`}
          </pre>
        </section>

        {/* Delete */}
        <section id="delete" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">Delete File</h2>
          <p>
            Delete a file manually before it expires. Requires a valid{" "}
            <code>x-api-key</code> header.
          </p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`DELETE /delete/:filename
Headers:
  x-api-key: YOUR_SECRET_KEY

Example:
curl -X DELETE https://upload.javelin.asia/delete/test.png \\
  -H "x-api-key: YOUR_SECRET_KEY"`}
          </pre>
        </section>

        {/* Status */}
        <section id="status" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">API Status</h2>
          <p>
            Get the current API status, number of stored files, and how many
            expired files were deleted today.
          </p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`GET /status`}
          </pre>
        </section>

        {/* cURL Examples */}
        <section id="curl">
          <h2 className="text-2xl text-red-500 mb-2">cURL Examples</h2>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`# Upload a local file
curl -F "fileToUpload=@test.png" https://upload.javelin.asia/upload

# Upload via URL
curl -X POST https://upload.javelin.asia/urlupload \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'

# Delete a file
curl -X DELETE https://upload.javelin.asia/delete/test.png \\
  -H "x-api-key: YOUR_SECRET_KEY"`}
          </pre>
        </section>
      </main>
    </div>
  );
}
