"use client";

import { useEffect, useState } from "react";

interface CursorPreviewProps {
  src: string | null;
  alt: string;
  accentBg: string;
  accent: string;
  position: { x: number; y: number };
}

export default function CursorPreview({
  src,
  alt,
  accentBg,
  accent,
  position,
}: CursorPreviewProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 800px), (hover: none)");
    setIsDesktop(!mql.matches);
    const onChange = () => setIsDesktop(!mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (!src || !isDesktop) return null;

  return (
    <>
      <style>{`
        @keyframes cs-cursor-pop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .cs-cursor-preview {
          position: fixed;
          left: 0;
          top: 0;
          width: 300px;
          height: 188px;
          border-radius: var(--radius);
          overflow: hidden;
          pointer-events: none;
          z-index: 30;
          box-shadow: 0 24px 48px -16px rgba(0,0,0,.28);
          transition: transform .12s linear, background .25s ease;
          will-change: transform;
          animation: cs-cursor-pop-in 280ms cubic-bezier(.2,.9,.3,1.4) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-cursor-preview { animation: none; transition: none; }
        }
      `}</style>
      <div
        key={src}
        aria-hidden
        className="cs-cursor-preview"
        style={{
          background: accentBg,
          border: `1px solid ${accent}33`,
          transform: `translate3d(${position.x + 24}px, ${position.y - 110}px, 0)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 0%",
            display: "block",
          }}
        />
      </div>
    </>
  );
}
