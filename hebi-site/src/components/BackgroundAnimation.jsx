export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="w-full h-full bg-gradient-to-br from-black via-hebiBlack to-red-900 animate-pulse"></div>
    </div>
  );
}
