export default function HoverGlow({ children }) {
  return (
    <div className="group relative inline-block cursor-pointer">
      {children}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-primary blur-2xl transition-opacity"></div>
    </div>
  );
}
