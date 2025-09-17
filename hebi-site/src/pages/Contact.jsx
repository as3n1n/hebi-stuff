export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl text-red-600 mb-6">Contact</h1>
      <p className="text-lg">
        For support or questions, contact us at:
      </p>
      <a
        href="mailto:admin@javelin.asia"
        className="mt-4 text-red-500 underline"
      >
        admin@javelin.asia
      </a>
    </div>
  );
}
