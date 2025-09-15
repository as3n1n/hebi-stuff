import React from "react";

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8B0000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
          fill="url(#grad)"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z;
              M0,120 C180,0 320,220 500,120 L500,00 L0,0 Z;
              M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
