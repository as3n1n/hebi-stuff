export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-bold text-hebiRed">Hebi Upload</h1>
      <p className="mt-4 text-lg max-w-xl">
        A secure file upload platform. Access is only available by invitation key.
      </p>
      <a href="/upload" className="mt-6 bg-hebiRed px-6 py-3 rounded-lg hover:bg-red-700">
        Upload File
      </a>
    </div>
  );
}
