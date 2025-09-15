export default function Invite() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl text-red-600 font-bold mb-6">Inviter Hebi</h1>
      <p className="text-gray-300 max-w-xl mb-8">
        Ajoutez Hebi à votre serveur Discord pour protéger votre communauté
        contre les faux comptes et améliorer l’expérience de vos membres.
      </p>
      <a
        href="https://discord.com/oauth2/authorize?client_id=1327772341639581747"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all"
      >
        Inviter Hebi
      </a>
    </div>
  );
}
