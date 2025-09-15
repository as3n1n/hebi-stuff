export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary hover:bg-accent text-white font-bold py-3 px-6 rounded-lg shadow-glow transition ${className}`}
    >
      {children}
    </button>
  );
}
