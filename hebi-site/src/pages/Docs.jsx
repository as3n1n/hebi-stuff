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
          <a href="#delete" className="block hover:text-red-500">Delete Files</a>
          <a href="#albums" className="block hover:text-red-500">Albums</a>
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
          <p>Upload a local file to Hebi’s storage.</p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`POST /api/fileupload
Headers: x-api-key=YOUR_KEY
Body: form-data
  - reqtype=fileupload
  - userhash=####
  - fileToUpload=@localfile.png`}
          </pre>
        </section>

        <section id="urlupload" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">URL Upload</h2>
          <p>Upload a file directly from a remote URL.</p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`POST /api/urlupload
Headers: x-api-key=YOUR_KEY
JSON body:
  {
    "reqtype": "urlupload",
    "userhash": "####",
    "url": "https://example.com/image.jpg"
  }`}
          </pre>
        </section>

        <section id="delete" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">Delete Files</h2>
          <p>Remove one or more files you previously uploaded.</p>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`POST /api/deletefiles
Headers: x-api-key=YOUR_KEY
JSON body:
  {
    "reqtype": "deletefiles",
    "userhash": "####",
    "files": "file1.png file2.gif"
  }`}
          </pre>
        </section>

        <section id="albums" className="mb-10">
          <h2 className="text-2xl text-red-500 mb-2">Album Management</h2>
          <p>Manage albums (max 500 files per album).</p>
          <ul className="list-disc ml-6">
            <li><code>createalbum</code> — create a new album</li>
            <li><code>editalbum</code> — update album title/desc/files</li>
            <li><code>addtoalbum</code> — add files to an album</li>
            <li><code>removefromalbum</code> — remove files from an album</li>
            <li><code>deletealbum</code> — delete an album permanently</li>
          </ul>
        </section>

        <section id="curl">
          <h2 className="text-2xl text-red-500 mb-2">cURL Examples</h2>
          <pre className="bg-zinc-900 p-4 rounded mt-2 text-sm overflow-x-auto">
{`curl -F "reqtype=fileupload" -F "userhash=####" -F "fileToUpload=@cutie.png" -H "x-api-key: YOUR_KEY" https://api.javelin.asia/api/fileupload

curl -X POST https://api.javelin.asia/api/urlupload \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"reqtype":"urlupload","userhash":"####","url":"https://example.com/test.jpg"}'`}
          </pre>
        </section>
      </main>
    </div>
  );
}
