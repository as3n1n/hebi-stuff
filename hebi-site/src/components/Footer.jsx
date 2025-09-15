export default function Footer() {
  return (
    <footer className="bg-mid/90 text-center py-6 border-t border-primary/40">
      <p className="text-gray-400">
        © {new Date().getFullYear()} Hebi Bot — Built with ❤️
      </p>
    </footer>
  );
}
