"use client";

import { useEffect, useRef, useState } from "react";

const END_ID = "olo-pointer-end";

export default function OloPointer() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const startNode = sentinelRef.current;
    if (!startNode) return;

    const update = () => {
      const startRect = startNode.getBoundingClientRect();
      const endNode = document.getElementById(END_ID);
      const startedShowing = startRect.top < window.innerHeight * 0.8;
      const endedShowing = endNode
        ? endNode.getBoundingClientRect().top < window.innerHeight * 0.8
        : false;
      setVisible(startedShowing && !endedShowing);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          right: "4.25rem",
          bottom: "0.5rem",
          display: "flex",
          alignItems: "flex-start",
          gap: ".4rem",
          pointerEvents: "none",
          color: "var(--mid)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(8px)",
          transition: "opacity .35s ease, transform .35s ease",
          zIndex: 60,
        }}
      >
        <span
          style={{
            fontSize: ".85rem",
            fontStyle: "italic",
            whiteSpace: "nowrap",
            transform: "translateY(28px)",
          }}
        >
          click OLO
        </span>
        <svg
          width="60"
          height="44"
          viewBox="0 0 60 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 38 C 18 36, 36 26, 52 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M52 8 L 44 10 M52 8 L 48 18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </>
  );
}
