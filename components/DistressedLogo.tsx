type DistressedLogoProps = {
  text?: string;
  className?: string;
  scale?: number;
  seed?: number;
  animate?: boolean;
  duration?: number;
};

export default function DistressedLogo({
  text = "ANDRA",
  className = "",
  scale = 18,
  seed = 7,
  animate = true,
  duration = 10,
}: DistressedLogoProps) {
  return (
    <svg
      viewBox="0 0 680 200"
      className={className}
      role="img"
      aria-label={text}
    >
      <defs>
        <filter id="distressed-edge" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.025"
            numOctaves={3}
            seed={seed}
            result="noise"
          >
            {animate && (
              <animate
                attributeName="baseFrequency"
                dur={`${duration}s`}
                values="0.015 0.025;0.035 0.045;0.015 0.025"
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
        filter="url(#distressed-edge)"
      >
        {text}
      </text>
    </svg>
  );
}
