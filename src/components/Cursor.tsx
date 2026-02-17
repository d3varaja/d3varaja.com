"use client";

import { useEffect, useRef, useState } from "react";


export default function Cursor() {
  const elRef   = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -100, y: -100 });
  const rafRef  = useRef<number>(0);
  // Track actual values in refs to avoid redundant setState calls
  const hiddenRef = useRef(false);
  const hoverRef  = useRef(false);
  const [hover, setHover]   = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Inject global cursor: none — guard against duplicate tags
    if (!document.getElementById("custom-cursor-style")) {
      const style = document.createElement("style");
      style.id = "custom-cursor-style";
      style.textContent = `*, *::before, *::after { cursor: none !important; }`;
      document.head.appendChild(style);
      return () => style.remove();
    }
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Only trigger a re-render when transitioning from hidden → visible
      if (hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
      }
    };
    const onLeave = () => {
      hiddenRef.current = true;
      setHidden(true);
    };
    const onEnter = () => {
      if (hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
      }
    };
    const onOver  = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [role='button'], input, select, label");
      const next = !!el;
      // Only re-render when hover state actually changes
      if (next !== hoverRef.current) {
        hoverRef.current = next;
        setHover(next);
      }
    };

    // passive: true lets the browser skip waiting on JS before scrolling
    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });
    document.addEventListener("mouseover",  onOver,  { passive: true });

    const animate = () => {
      if (elRef.current) {
        elRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover",  onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        opacity: hidden ? 0 : 1,
        transition: "opacity 150ms ease",
        // Offset so tip aligns to mouse: arrow hotspot=(4,2), hand hotspot=(10,2)
        marginLeft: hover ? -10 : -4,
        marginTop:  hover ? -2  : -2,
      }}
    >
      {hover ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32">
          <path
            d="M10 1.5 C8.6 1.5 7.5 2.6 7.5 4 L7.5 17 C6.9 16.5 6.1 16.2 5.2 16.2 C3.4 16.2 2 17.6 2 19.4 L2 22 C2 27.5 6.5 31 11 31 L15 31 C19.5 31 24 27.5 24 22 L24 14 C24 12.6 22.9 11.5 21.5 11.5 C21.1 11.5 20.7 11.6 20.4 11.8 C20.1 10.7 19.1 9.9 17.9 9.9 C17.3 9.9 16.8 10.1 16.4 10.4 C16.1 9.4 15.2 8.7 14 8.7 C13.4 8.7 12.9 8.9 12.5 9.2 L12.5 4 C12.5 2.6 11.4 1.5 10 1.5 Z"
            fill="#0c0c0c"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
          <path
            d="M4 2 L4 21 L8.5 16.5 L12.5 25.5 L15.5 24 L11.5 15 L18 15 Z"
            fill="#0c0c0c"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
