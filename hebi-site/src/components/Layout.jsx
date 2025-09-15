export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark text-text flex flex-col">
      <header className="py-6 px-8 border-b border-surface">
        <h1 className="text-2xl font-bold text-primary animate-fadeInUp">Hebi</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-8">{children}</main>
      <footer className="py-4 text-center text-text-secondary">© {new Date().getFullYear()} Hebi</footer>
    </div>
  );
}
