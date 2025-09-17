export default function Tos() {
  return (
    <div className="bg-black text-gray-200 min-h-screen px-8 py-12">
      <h1 className="text-4xl text-red-600 font-bold mb-6">Terms of Service</h1>
      <p className="mb-6 text-gray-400">Effective Date: September 17th, 2025</p>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">1. Introduction</h2>
        <p>
          By using Hebi services, you agree to these Terms of Service ("ToS").
          If you do not agree, please stop using the service immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">2. File Uploads</h2>
        <ul className="list-disc ml-6">
          <li>Uploaded files are automatically deleted after 7 days.</li>
          <li>Maximum file size is 200MB.</li>
          <li>You must not upload illegal, harmful, or abusive content.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">3. Privacy</h2>
        <p>
          Hebi does not sell or share your data. Metadata such as IP and upload time may be stored
          temporarily for security and automatic deletion tracking.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">4. Liability</h2>
        <p>
          Hebi is provided "as is" without warranty. We are not responsible for any data loss, 
          misuse, or third-party actions. Use the service at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">5. Changes</h2>
        <p>
          These ToS may be updated at any time. Continued use of Hebi after changes means
          you accept the new terms.
        </p>
      </section>

      <p className="text-gray-400 mt-10">
        For any questions regarding these ToS, contact us at{" "}
        <a href="mailto:admin@javelin.asia" className="text-red-500 underline">
          admin@javelin.asia
        </a>.
      </p>
    </div>
  );
}
