import { useEffect, useState } from "react";

export default function Panel() {
  const [user, setUser] = useState(null);
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const token = hash.get("access_token");

    if (token) {
      fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data));

      fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setGuilds(data.filter((g) => (g.permissions & 0x20) === 0x20));
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-20">
      {!user ? (
        <p className="text-gray-400">Not logged in</p>
      ) : (
        <>
          <div className="bg-mid/80 p-6 rounded-2xl border border-primary/40 shadow-lg text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Welcome {user.username}#{user.discriminator}
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6">Select a server</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            {guilds.map((guild) => (
              <div
                key={guild.id}
                className="bg-gradient-to-br from-[#1a0000] to-[#330000] rounded-2xl p-6 border border-primary/40 shadow-lg hover:shadow-primary/40 transition flex flex-col items-center"
              >
                {guild.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                    alt={guild.name}
                    className="w-16 h-16 rounded-full mb-4"
                  />
                ) : (
                  <img src="/assets/server.svg" className="w-16 h-16 mb-4 opacity-70" />
                )}
                <h3 className="text-xl font-bold text-white">{guild.name}</h3>
                <button className="mt-4 bg-primary text-dark px-4 py-2 rounded-full font-semibold hover:bg-red-600">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
