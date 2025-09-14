export default function Features() {
  const features = [
    { title: "Captcha Verification", desc: "Solve a captcha to access the server." },
    { title: "IP & Proxy Check", desc: "Block VPNs, proxies, and suspicious IPs." },
    { title: "Alt Account Blocker", desc: "Prevent raids and fake accounts." },
    { title: "24/7 Protection", desc: "Automated bot protection all the time." },
  ];

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-dark rounded-xl shadow-lg hover:shadow-red-600/40 transition">
            <h3 className="text-xl font-bold text-primary mb-3">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
