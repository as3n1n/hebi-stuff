export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-6 glow">Bienvenue sur Hebi</h1>
      <p className="text-lg">Connectez-vous pour continuer</p>
      <a
        href="https://discord.com/oauth2/authorize?client_id=1327772341639581747"
        className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all"
      >
        Se connecter avec Discord
      </a>
    </div>
  );
}
