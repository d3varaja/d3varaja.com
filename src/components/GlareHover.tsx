"use client";

import { forwardRef, useEffect, useMemo, useState, CSSProperties, ReactNode } from "react";

interface GlareHoverProps {
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  /** ms to wait before the sweep starts — default waits for card fade-in */
  delay?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const GlareHover = forwardRef<HTMLDivElement, GlareHoverProps>(
  (
    {
      glareColor = "#ffffff",
      glareOpacity = 0.25,
      glareAngle = -30,
      glareSize = 300,
      transitionDuration = 800,
      delay = 700,
      children,
      className = "",
      style = {},
    },
    ref
  ) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
      const id = setTimeout(() => setActive(true), delay);
      return () => clearTimeout(id);
    }, [delay]);

    // hex → rgba — memoised so regex runs only when color/opacity props change
    const rgba = useMemo(() => {
      const hex = glareColor.replace("#", "");
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
      }
      if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        return `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
      }
      return glareColor;
    }, [glareColor, glareOpacity]);

    return (
      <div ref={ref} className={className} style={{ position: "relative", ...style }}>
        {children}
        {/* glare sweep overlay — clipped by parent overflow:hidden */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(${glareAngle}deg, transparent 60%, ${rgba} 70%, transparent 85%, transparent 100%)`,
            backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: active ? "200% 200%, 0 0" : "-100% -100%, 0 0",
            transition: `background-position ${transitionDuration}ms ease`,
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: 2,
          }}
        />
      </div>
    );
  }
);

GlareHover.displayName = "GlareHover";
export default GlareHover;
