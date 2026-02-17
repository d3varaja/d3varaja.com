"use client";

import { useRef } from "react";

export interface WorkRowProps {
  index: string;
  title: string;
  role: string;
  year: string;
  href?: string;
  placeholder?: boolean;
}

export default function WorkRow({ index, title, role, year, href, placeholder }: WorkRowProps) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const base: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "2.5rem 1fr auto auto auto",
    alignItems: "center",
    gap: "0 clamp(1rem, 2.5vw, 2.5rem)",
    padding: "1.25rem var(--gap)",
    marginInline: "calc(var(--gap) * -1)",
    borderTop: "1px solid var(--rule)",
    textDecoration: "none",
    color: "var(--black)",
    opacity: placeholder ? 0.25 : 1,
    transition: "background 150ms ease, color 150ms ease",
  };

  const inner = (
    <>
      {/* Index */}
      <span
        style={{
          fontSize: "var(--label)",
          fontWeight: 500,
          letterSpacing: ".08em",
          opacity: .35,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}
      >
        {index}
      </span>

      {/* Title */}
      <span
        ref={titleRef}
        className="work-title"
        style={{
          fontSize: "clamp(1.0625rem, 2vw, 1.375rem)",
          fontWeight: 600,
          letterSpacing: "-.02em",
          lineHeight: 1.2,
          display: "block",
          transition: "transform 200ms cubic-bezier(.16,1,.3,1)",
        }}
      >
        {title}
      </span>

      {/* Role — hidden on small screens via opacity, not display */}
      <span
        style={{
          fontSize: "var(--small)",
          opacity: .4,
          whiteSpace: "nowrap",
          display: "var(--role-display, block)" as "block",
        }}
      >
        {role}
      </span>

      {/* Year */}
      <span
        style={{
          fontSize: "var(--small)",
          opacity: .35,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        {year}
      </span>

      {/* Arrow */}
      <span
        ref={arrowRef}
        style={{
          fontSize: "1rem",
          opacity: href ? .6 : 0,
          transition: "opacity 150ms ease, transform 200ms cubic-bezier(.16,1,.3,1)",
          display: "block",
          lineHeight: 1,
        }}
        className="work-arrow"
      >
        ↗
      </span>
    </>
  );

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.background = "var(--black)";
    el.style.color = "var(--white)";
    // Use refs instead of querySelector to avoid DOM traversal on every hover
    if (titleRef.current) titleRef.current.style.transform = "translateX(6px)";
    if (arrowRef.current) {
      arrowRef.current.style.opacity = "1";
      arrowRef.current.style.transform = "translate(3px, -3px)";
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.background = "transparent";
    el.style.color = "var(--black)";
    if (titleRef.current) titleRef.current.style.transform = "translateX(0)";
    if (arrowRef.current) {
      arrowRef.current.style.opacity = ".6";
      arrowRef.current.style.transform = "translate(0,0)";
    }
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={base}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <div style={base}>
      {inner}
    </div>
  );
}
