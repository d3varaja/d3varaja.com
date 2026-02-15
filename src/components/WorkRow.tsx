"use client";

export interface WorkRowProps {
  index: string;
  title: string;
  role: string;
  year: string;
  href?: string;
  placeholder?: boolean;
}

export default function WorkRow({ index, title, role, year, href, placeholder }: WorkRowProps) {
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
    const title = el.querySelector<HTMLElement>(".work-title");
    const arrow = el.querySelector<HTMLElement>(".work-arrow");
    if (title) title.style.transform = "translateX(6px)";
    if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translate(3px, -3px)"; }
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.background = "transparent";
    el.style.color = "var(--black)";
    const title = el.querySelector<HTMLElement>(".work-title");
    const arrow = el.querySelector<HTMLElement>(".work-arrow");
    if (title) title.style.transform = "translateX(0)";
    if (arrow) { arrow.style.opacity = ".6"; arrow.style.transform = "translate(0,0)"; }
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
