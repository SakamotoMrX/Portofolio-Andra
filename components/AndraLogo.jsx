export default function AndraLogo({ className = "w-[min(92vw,980px)]" }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <svg
        viewBox="0 0 900 260"
        width="100%"
        className={className}
        style={{ display: "block", height: "auto" }}
        role="img"
        aria-label="ANDRA logo"
      >
        <defs>
          {/* Region enlarged so scrolling noise never leaves filter bounds — fixes flicker/disappear */}
          <filter id="waveDistort" x="-50%" y="-150%" width="200%" height="400%">
            {/* Fixed noise texture, seed never changes */}
            <feTurbulence
              type="fractalNoise"
              numOctaves="2"
              seed="7"
              result="noise"
              baseFrequency="0.014 0.09"
            />
            {/* Small contained scroll dy 0→-90, 8s linear indefinite — smooth continuous upward flow */}
            <feOffset in="noise" result="scrollingNoise" dx="0" dy="0">
              <animate
                attributeName="dy"
                from="0"
                to="-90"
                dur="8s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feDisplacementMap
              in="SourceGraphic"
              in2="scrollingNoise"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter="url(#waveDistort)">
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
            fontWeight="900"
            fontSize="180"
            letterSpacing="4"
            fill="#3A3A38"
          >
            ANDRA
          </text>
        </g>
      </svg>
    </div>
  );
}
