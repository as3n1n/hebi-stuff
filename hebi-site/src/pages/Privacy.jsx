export default function Privacy() {
  return (
    <div className="bg-black text-gray-200 min-h-screen px-8 py-12">
      <h1 className="text-4xl text-red-600 font-bold mb-6">Privacy Policy</h1>
      <p className="mb-6 text-gray-400">Effective Date: September 17th, 2025</p>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">1. Information Collected</h2>
        <p>
          We may collect limited information to provide and improve Hebi’s services, including:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>IP address (for abuse prevention and automatic deletion tracking)</li>
          <li>Upload time and file metadata (filename, size, type)</li>
          <li>Technical information from your browser (user agent)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">2. Use of Information</h2>
        <p>
          The collected data is used exclusively for:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Operating and maintaining the Hebi platform</li>
          <li>Monitoring abuse and enforcing security</li>
          <li>Managing file expiration and deletion</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">3. Security</h2>
        <p>
          We implement reasonable security measures to protect your data from
          unauthorized access, alteration, or disclosure. However, no online service
          can guarantee complete security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">4. Third-Party Services</h2>
        <p>
          Hebi may use third-party services (such as hosting or analytics) which
          have their own privacy policies. We encourage you to review them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">5. Children’s Privacy</h2>
        <p>
          Hebi is not intended for children under 13. We do not knowingly collect
          personal information from children. If we learn that we have, the data
          will be deleted immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-red-500 mb-2">6. Changes</h2>
        <p>
          This Privacy Policy may be updated from time to time. Continued use of Hebi 
          after changes means you agree with the new terms.
        </p>
      </section>

      <p className="text-gray-400 mt-10">
        For questions about this Privacy Policy, contact us at{" "}
        <a href="mailto:admin@javelin.asia" className="text-red-500 underline">
          admin@javelin.asia
        </a>.
      </p>
    </div>
  );
}
