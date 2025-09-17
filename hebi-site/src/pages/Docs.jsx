export default function Docs() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
        <h2 className="text-xl font-bold text-red-600 mb-4">Hebi API</h2>
        <nav className="space-y-2">
          <a href="#intro" className="block hover:text-red-500">Introduction</a>
          <a href="#fileupload" className="block hover:text-red-500">File Upload</a>
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
          Base URL: <code className="bg-zinc-900 px-2 py-1 rounded">https://api.javelin.asia</code>
        </p>

        <section id="fileupload" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">File Upload</h2>
          <p>Upload a local file (max 200MB). Files expire automatically after 7 days.</p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`POST /api/fileupload
Body: form-data
  - fileToUpload=@localfile.png`}
          </pre>
        </section>

        <section id="status" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">API Status</h2>
          <p>Check how many files are stored and how many were deleted today.</p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`GET /api/status`}
          </pre>
        </section>

        <section id="curl">
          <h2 className="text-2xl text-red-500 mb-2">cURL Example</h2>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`curl -F "fileToUpload=@test.png" https://api.javelin.asia/api/fileupload`}
          </pre>
        </section>
      </main>
    </div>
  );
}
