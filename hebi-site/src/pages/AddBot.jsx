export default function AddBot() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-5xl font-display text-primary mb-6 animate-fade-in">
        Add Hebi to your server
      </h1>
      <a
        href="https://discord.com/oauth2/authorize?client_id=1327772341639581747"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-dark px-8 py-4 rounded-full font-semibold hover:bg-red-600 shadow-md animate-fade-in"
      >
        Invite Hebi
      </a>
    </div>
  );
}
