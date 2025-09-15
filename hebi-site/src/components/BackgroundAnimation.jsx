export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(to bottom, #1a0000, #000000)",
          maskImage: "url('/topography.svg')",
          WebkitMaskImage: "url('/topography.svg')",
          opacity: 0.3,
        }}
      />
    </div>
  );
}
