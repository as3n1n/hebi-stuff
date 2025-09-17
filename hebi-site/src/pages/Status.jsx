import { useState } from "react";

const faqs = [
  {
    question: "What is Hebi?",
    answer:
      "Hebi is a lightweight file hosting platform with a clean design. It allows anyone to upload and share files with Discord previews (like Catbox), but with Hebi’s own style.",
  },
  {
    question: "How large can my uploads be?",
    answer:
      "Files can be up to 200MB in size. Both images and videos are supported.",
  },
  {
    question: "How long are files stored?",
    answer:
      "Files are automatically deleted after 7 days to keep storage light and protect privacy.",
  },
  {
    question: "Do I need an account or a key?",
    answer:
      "No. Hebi is private and invitation-only via shared links. If someone shares a link with you, you can access it.",
  },
  {
    question: "Is there an API?",
    answer:
      "Yes. You can interact with Hebi via the public API for uploads and embeds. Documentation is available on the Docs page.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Uploaded files are stored securely on Hebi’s backend and cannot be accessed without their unique link.",
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
