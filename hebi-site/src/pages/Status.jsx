import { useEffect, useState } from "react";

export default function Status() {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    fetch("https://api.javelin.asia")
      .then((res) => res.json())
      .then((data) => setApis(data.services || []))
      .catch(() => setApis([]));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {apis.length === 0 ? (
        <p className="text-center text-gray-400 col-span-full">Loading services...</p>
      ) : (
        apis.map((api, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-br from-[#1a0000] to-[#330000] rounded-2xl p-6 border border-primary/40 shadow-lg hover:shadow-primary/40 transition group"
          >
            <img
              src={`/assets/${api.icon || "server.svg"}`}
              alt=""
              className="w-10 h-10 mb-4 opacity-80"
            />
            <h2 className="text-2xl font-bold text-white mb-3">{api.name}</h2>
            <p className="text-gray-300 text-sm mb-4">{api.description}</p>
            <a
              href={api.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold group-hover:translate-x-1 transition"
            >
              Open →
            </a>
          </div>
        ))
      )}
    </section>
  );
}
