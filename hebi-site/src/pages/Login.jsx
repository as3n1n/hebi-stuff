export default function Login() {
  const clientId = "1327772341639581747"; 
  const redirect = window.location.origin + "/panel";
  const discordOAuth = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirect
  )}&response_type=token&scope=identify%20guilds`;

  return (
    <div className="flex items-center justify-center min-h-screen text-center px-6">
      <div className="bg-mid/80 p-10 rounded-2xl shadow-lg border border-primary/40">
        <img src="/assets/server.svg" className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-6">Login with Discord</h1>
        <a
          href={discordOAuth}
          className="bg-primary text-dark px-8 py-4 rounded-full font-semibold hover:bg-red-600 shadow-md"
        >
          Connect Discord
        </a>
      </div>
    </div>
  );
}
