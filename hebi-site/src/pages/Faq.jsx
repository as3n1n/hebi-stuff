import { useState } from "react";

const faqs = [
  {
    question: "What is Hebi?",
    answer:
      "Hebi is a private platform for secure file uploads with auto-expiration (7 days), preview support for Discord, and API integration.",
  },
  {
    question: "How long are my files kept?",
    answer:
      "All uploaded files are automatically deleted after 7 days. This keeps the platform clean and avoids abuse.",
  },
  {
    question: "Can I share my file links?",
    answer:
      "Yes! Each uploaded file gets a direct link and a preview link for Discord. Both will expire after 7 days.",
  },
  {
    question: "Is there an API documentation?",
    answer:
      "Yes, developers can use the Hebi API to automate uploads. Documentation is available in the Docs section.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Uploaded files are stored securely on Hebi's backend. Files are not indexed or made public without sharing the link.",
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
