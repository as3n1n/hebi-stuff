import { useState } from "react";

const faqs = [
  {
    question: "What is Hebi?",
    answer:
      "Hebi is a private platform that allows secure file uploads, album management, and API integration with Discord bot verification.",
  },
  {
    question: "How do I get an invitation key?",
    answer:
      "Invitation keys are generated only by admins via the Discord bot using /genkey. Keys are unique and bound to the first IP that uses them.",
  },
  {
    question: "What happens if I share my key?",
    answer:
      "If a key is shared, the system will immediately ban the new IP and revoke the key. This protects the platform from abuse.",
  },
  {
    question: "How can I unban an IP?",
    answer:
      "If a ban was a mistake, admins can use the /unban command in Hebi Bot. This will restore access via the API.",
  },
  {
    question: "Is there an API documentation?",
    answer:
      "Yes. The full documentation is available on the Docs page. It explains how to use the API endpoints for file and album management.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Uploaded files are stored securely on Hebi's backend. No public access is allowed without a valid key and API authentication.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold text-red-600 mb-10 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-zinc-800 rounded-lg overflow-hidden bg-[#101010]"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center hover:bg-[#181818] transition"
            >
              <span>{faq.question}</span>
              <span className="text-red-600 text-2xl">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
