"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

type DistressedLogoProps = {
  text?: string;
  className?: string;
  style?: CSSProperties;
  scale?: number;
  seed?: number;
  animate?: boolean;
  duration?: number;
  repelRadius?: number;
  maxRepelDistance?: number;
  distractScale?: number;
};

type LetterState = {
  char: string;
  originX: number;
  originY: number;
  baselineY: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  currentRotate: number;
  targetRotate: number;
  vRotate: number;
  currentScale: number;
  targetScale: number;
  vScale: number;
};

export default function DistressedLogo({
  text = "ANDRA",
  className = "",
  style = {},
  scale = 26,
  seed = 5,
  animate = true,
  duration = 15,
  repelRadius = 160,
  maxRepelDistance = 55,
  distractScale = 30,
}: DistressedLogoProps) {
  const rawId = useId();
  const filterId = `erode-${rawId.replace(/:/g, "")}`;

  const svgRef = useRef<SVGSVGElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const dispMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const letterGroupRefs = useRef<(SVGGElement | null)[]>([]);

  const [mounted, setMounted] = useState(false);
  const [letterLayouts, setLetterLayouts] = useState<
    { char: string; originX: number; originY: number; baselineY: number }[]
  >([]);

  const letterStatesRef = useRef<LetterState[]>([]);
  const pointerRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const isPointerActiveRef = useRef(false);
  const isIntersectingRef = useRef(true);

  // Measure character positions accurately in SVG coordinate space
  const measureCharacters = () => {
    if (!measureRef.current) return;
    const measureEl = measureRef.current;
    const chars = text.split("");
    const layouts: {
      char: string;
      originX: number;
      originY: number;
      baselineY: number;
    }[] = [];

    for (let i = 0; i < chars.length; i++) {
      try {
        const extent = measureEl.getExtentOfChar(i);
        const start = measureEl.getStartPositionOfChar(i);
        layouts.push({
          char: chars[i],
          originX: extent.x + extent.width / 2,
          originY: extent.y + extent.height / 2,
          baselineY: start.y,
        });
      } catch {
        // Fallback approximation if browser SVG getExtentOfChar fails
        const approxWidth = 70;
        const totalW = approxWidth * chars.length;
        const startX = 340 - totalW / 2 + approxWidth / 2;
        layouts.push({
          char: chars[i],
          originX: startX + i * approxWidth,
          originY: 100,
          baselineY: 130,
        });
      }
    }

    setLetterLayouts(layouts);

    letterStatesRef.current = layouts.map((l, i) => {
      const prev = letterStatesRef.current[i];
      return {
        char: l.char,
        originX: l.originX,
        originY: l.originY,
        baselineY: l.baselineY,
        currentX: prev?.currentX ?? 0,
        currentY: prev?.currentY ?? 0,
        targetX: 0,
        targetY: 0,
        vx: prev?.vx ?? 0,
        vy: prev?.vy ?? 0,
        currentRotate: prev?.currentRotate ?? 0,
        targetRotate: 0,
        vRotate: prev?.vRotate ?? 0,
        currentScale: prev?.currentScale ?? 1,
        targetScale: 1,
        vScale: prev?.vScale ?? 0,
      };
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    measureCharacters();

    window.addEventListener("resize", measureCharacters);
    return () => window.removeEventListener("resize", measureCharacters);
  }, [mounted, text]);

  // Pause SVG & Physics animations when off-screen to save CPU
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    try {
      svg.pauseAnimations();
    } catch {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        try {
          if (entry.isIntersecting) {
            if (animate) svg.unpauseAnimations();
          } else {
            svg.pauseAnimations();
          }
        } catch {}
      },
      { threshold: 0 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [animate]);

  // Pointer & Window tracking for magnetic interaction
  useEffect(() => {
    if (!mounted) return;

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      if (!svgRef.current || !isIntersectingRef.current) return;
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();

      // Generous proximity detection margin around SVG (in screen pixels)
      const marginX = 80;
      const marginY = 60;

      if (
        e.clientX < rect.left - marginX ||
        e.clientX > rect.right + marginX ||
        e.clientY < rect.top - marginY ||
        e.clientY > rect.bottom + marginY
      ) {
        isPointerActiveRef.current = false;
        return;
      }

      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const svgP = pt.matrixTransform(ctm.inverse());

      pointerRef.current = { x: svgP.x, y: svgP.y };
      isPointerActiveRef.current = true;
    };

    const handlePointerLeave = () => {
      isPointerActiveRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [mounted]);

  // High-performance 60/120fps physics loop (Magnetic Repulsion + Distract distortion)
  useEffect(() => {
    if (!mounted) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let animId: number;
    let currentDistortScale = scale;
    const SPRING_K = 0.16;
    const SPRING_DAMPING = 0.76;

    const loop = () => {
      if (isIntersectingRef.current) {
        const pointer = pointerRef.current;
        const isActive = isPointerActiveRef.current;
        const letterStates = letterStatesRef.current;
        const groupEls = letterGroupRefs.current;

        let maxProximityFactor = 0;

        for (let i = 0; i < letterStates.length; i++) {
          const l = letterStates[i];
          let targetX = 0;
          let targetY = 0;
          let targetRotate = 0;
          let targetScale = 1;

          if (isActive) {
            const dx = l.originX - pointer.x;
            const dy = l.originY - pointer.y;
            const dist = Math.hypot(dx, dy);

            if (dist < repelRadius && dist > 0.01) {
              // Inverse non-linear magnetic falloff curve
              const factor = Math.pow(1 - dist / repelRadius, 1.6);
              if (factor > maxProximityFactor) {
                maxProximityFactor = factor;
              }

              const angle = Math.atan2(dy, dx);
              const push = factor * maxRepelDistance;

              targetX = Math.cos(angle) * push;
              targetY = Math.sin(angle) * push;

              // Tilt / rotation away from cursor
              const rotDir = Math.cos(angle);
              targetRotate = rotDir * factor * 16;

              // Slight bulge/scale distraction
              targetScale = 1 + factor * 0.12;
            }
          }

          l.targetX = targetX;
          l.targetY = targetY;
          l.targetRotate = targetRotate;
          l.targetScale = targetScale;

          // Spring physics integration
          const ax = (l.targetX - l.currentX) * SPRING_K;
          l.vx = (l.vx + ax) * SPRING_DAMPING;
          l.currentX += l.vx;

          const ay = (l.targetY - l.currentY) * SPRING_K;
          l.vy = (l.vy + ay) * SPRING_DAMPING;
          l.currentY += l.vy;

          const aRot = (l.targetRotate - l.currentRotate) * SPRING_K;
          l.vRotate = (l.vRotate + aRot) * SPRING_DAMPING;
          l.currentRotate += l.vRotate;

          const aScale = (l.targetScale - l.currentScale) * SPRING_K;
          l.vScale = (l.vScale + aScale) * SPRING_DAMPING;
          l.currentScale += l.vScale;

          const el = groupEls[i];
          if (el) {
            el.setAttribute(
              "transform",
              `translate(${(l.originX + l.currentX).toFixed(2)}, ${(l.originY + l.currentY).toFixed(2)}) rotate(${l.currentRotate.toFixed(2)}) scale(${l.currentScale.toFixed(3)}) translate(${(-l.originX).toFixed(2)}, ${(-l.originY).toFixed(2)})`
            );
          }
        }

        // Dynamic distress / erosion disturbance reaction on feDisplacementMap
        if (dispMapRef.current) {
          const targetDistort = scale + maxProximityFactor * distractScale;
          currentDistortScale += (targetDistort - currentDistortScale) * 0.2;
          dispMapRef.current.setAttribute("scale", currentDistortScale.toFixed(1));
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [mounted, scale, repelRadius, maxRepelDistance, distractScale]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 680 200"
      className={`select-none cursor-default ${className}`}
      style={style}
      role="img"
      aria-label={text}
    >
      <defs>
        <filter id={filterId} x="-10%" y="-15%" width="120%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.009"
            numOctaves={2}
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
            ref={dispMapRef}
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Hidden baseline text for dynamic character layout measurement */}
      <text
        ref={measureRef}
        x="340"
        y="130"
        textAnchor="middle"
        fontSize="90"
        fontWeight="800"
        style={{
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        {text}
      </text>

      {/* Interactive Render: Individual Letters with magnetic & distract engine */}
      {mounted && letterLayouts.length > 0 ? (
        <g filter={`url(#${filterId})`}>
          {letterLayouts.map((item, idx) => (
            <g
              key={`${item.char}-${idx}`}
              ref={(el) => {
                letterGroupRefs.current[idx] = el;
              }}
            >
              <text
                x={item.originX}
                y={item.baselineY}
                textAnchor="middle"
                fontSize="90"
                fontWeight="800"
                fill="currentColor"
              >
                {item.char}
              </text>
            </g>
          ))}
        </g>
      ) : (
        /* SSR / Initial static fallback matching initial HTML */
        <text
          x="340"
          y="130"
          textAnchor="middle"
          fontSize="90"
          fontWeight="800"
          fill="currentColor"
          filter={`url(#${filterId})`}
        >
          {text}
        </text>
      )}
    </svg>
  );
}
