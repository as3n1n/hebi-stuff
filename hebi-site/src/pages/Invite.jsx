export default function Invite() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Ajouter Hebi à ton serveur</h1>
      <a
        href="https://discord.com/oauth2/authorize?client_id=1327772341639581747"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all"
      >
        Inviter Hebi
      </a>
    </div>
  );
}
