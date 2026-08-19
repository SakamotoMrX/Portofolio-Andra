import type { CSSProperties } from "react";

type DistressedLogoProps = {
  text?: string;
  className?: string;
  style?: CSSProperties;
  scale?: number;
  seed?: number;
  animate?: boolean;
  duration?: number;
};

export default function DistressedLogo({
  text = "ANDRA",
  className = "",
  style = {},
  scale = 26,
  seed = 5,
  animate = true,
  duration = 15,
}: DistressedLogoProps) {
  return (
    <svg
      viewBox="0 0 680 200"
      className={className}
      style={style}
      role="img"
      aria-label={text}
    >
      <defs>
        <filter id="erode" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.009"
            numOctaves={3}
            seed={seed}
            result="noise"
          >
            {animate && (
              <animate
                attributeName="baseFrequency"
                dur={`${duration}s`}
                values="0.018 0.009;0.038 0.029;0.018 0.009"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <text
        x="340"
        y="130"
        textAnchor="middle"
        fontSize="90"
        fontWeight="800"
        fill="currentColor"
        filter="url(#erode)"
      >
        {text}
      </text>
    </svg>
  );
}
