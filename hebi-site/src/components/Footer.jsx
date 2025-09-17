export default function Footer() {
  return (
    <footer className="bg-hebiBlack border-t border-red-700 py-4 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} Hebi Upload
    </footer>
  );
}
