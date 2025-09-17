import { useState } from "react";

const faqs = [
  {
    question: "What is Hebi?",
    answer:
      "Hebi is a private file hosting service. It allows fast uploads, Discord embed previews, and automatic file expiration after 7 days.",
  },
  {
    question: "How do uploads work?",
    answer:
      "You can upload images and videos directly from the Upload page. Once uploaded, you will receive a direct link and a Discord-compatible preview link.",
  },
  {
    question: "How long are files stored?",
    answer:
      "Files are stored for 7 days. After that, they are automatically deleted from the server.",
  },
  {
    question: "Can I share links publicly?",
    answer:
      "Yes. Each uploaded file generates a unique link that you can share anywhere, including Discord, where it will generate a proper embed preview.",
  },
  {
    question: "Is there an API?",
    answer:
      "Yes. Developers can use the API endpoint at https://api.javelin.asia/api/fileupload to upload files programmatically. Documentation will be provided soon.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "All files are stored on Hebi’s backend server. Metadata is tracked only to manage expiration and deletion. No personal data is collected.",
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
