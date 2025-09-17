export default function Docs() {
  return (
    <div className="max-w-4xl mx-auto p-10 text-gray-200">
      <h1 className="text-4xl font-bold text-hebiRed mb-6">Hebi API Documentation</h1>
      <p>The Hebi API is located at <code>https://api.javelin.asia</code>. You must supply a valid <code>x-api-key</code> header for all requests.</p>

      <h2 className="text-2xl mt-6 mb-2">File Uploads</h2>
      <p>Upload a file directly to Hebi.</p>
      <pre className="bg-black text-green-400 p-4 rounded">
{`POST /api/fileupload
Headers:
  x-api-key: ####
Body:
  fileToUpload=(file data)`}</pre>

      <h2 className="text-2xl mt-6 mb-2">URL Uploads</h2>
      <p>Provide a URL to import a file.</p>
      <pre className="bg-black text-green-400 p-4 rounded">
{`POST /api/urlupload
Headers:
  x-api-key: ####
Body (JSON):
  { "url": "http://example.com/image.png" }`}</pre>

      <h2 className="text-2xl mt-6 mb-2">Deleting Files</h2>
      <p>Delete one or multiple files by filename.</p>
      <pre className="bg-black text-green-400 p-4 rounded">
{`POST /api/deletefiles
Headers:
  x-api-key: ####
Body (JSON):
  { "files": ["file1.png", "file2.gif"] }`}</pre>

      <h2 className="text-2xl mt-6 mb-2">Album Management</h2>
      <p>Create and manage albums of files.</p>
      <pre className="bg-black text-green-400 p-4 rounded">
{`POST /api/createalbum
POST /api/editalbum
POST /api/addtoalbum
POST /api/removefromalbum
POST /api/deletealbum
Headers:
  x-api-key: ####
Body:
  JSON with title, desc, files, etc.`}</pre>

      <h2 className="text-2xl mt-6 mb-2">cURL Examples</h2>
      <pre className="bg-black text-green-400 p-4 rounded">
{`curl -F "fileToUpload=@image.png" -H "x-api-key: ####" https://api.javelin.asia/api/fileupload
curl -H "Content-Type: application/json" -H "x-api-key: ####" -d '{"url":"https://example.com/file.png"}' https://api.javelin.asia/api/urlupload`}
      </pre>
    </div>
  );
}
