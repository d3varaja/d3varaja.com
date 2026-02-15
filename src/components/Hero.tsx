"use client";

import { useEffect, useRef, useState } from "react";

const TICKER_ITEMS = [
  "Product Design", "UX Research", "Design Systems",
  "Figma", "Prototyping", "Interaction Design",
  "Visual Design", "User Testing", "Brand Identity",
];

const TICKER_TEXT = [...TICKER_ITEMS, ...TICKER_ITEMS].map((t) => `${t}  ·`).join("  ");

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    const id = setTimeout(() => {
      el.style.transition = "opacity 600ms cubic-bezier(.16,1,.3,1), transform 600ms cubic-bezier(.16,1,.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
    return () => clearTimeout(id);
  }, []);

  const handleMailMe = () => {
    navigator.clipboard.writeText("tharun@d3varaja.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: "var(--gap)",
        position: "relative",
      }}
    >
      {/* ── Business Card ─────────────────────────── */}
      <div
        ref={cardRef}
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#ffffff",
          border: "1px solid rgba(12,12,12,.12)",
          borderRadius: "16px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "clamp(120px, 26%, 160px) 1fr",
          boxShadow: "0 1px 2px rgba(12,12,12,.04), 0 4px 16px rgba(12,12,12,.06)",
        }}
      >
        {/* Left — photo */}
        <div
          style={{
            aspectRatio: "1 / 1.2",
            background: "rgba(12,12,12,.04)",
            borderRight: "1px solid rgba(12,12,12,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Corner marks */}
          {[
            { top: 8,    left: 8,  borderTop:    "1px solid rgba(12,12,12,.2)", borderLeft:   "1px solid rgba(12,12,12,.2)" },
            { top: 8,    right: 8, borderTop:    "1px solid rgba(12,12,12,.2)", borderRight:  "1px solid rgba(12,12,12,.2)" },
            { bottom: 8, left: 8,  borderBottom: "1px solid rgba(12,12,12,.2)", borderLeft:   "1px solid rgba(12,12,12,.2)" },
            { bottom: 8, right: 8, borderBottom: "1px solid rgba(12,12,12,.2)", borderRight:  "1px solid rgba(12,12,12,.2)" },
          ].map((pos, i) => (
            <span key={i} style={{ position: "absolute", width: 10, height: 10, ...pos }} />
          ))}

          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ opacity: .15 }}>
            <circle cx="12" cy="8" r="4" stroke="#0c0c0c" strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#0c0c0c" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Right — info */}
        <div
          style={{
            padding: "clamp(1.1rem, 3vw, 1.6rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: ".85rem",
          }}
        >
          {/* Role eyebrow */}
          <p
            style={{
              fontSize: "var(--label)",
              fontWeight: 500,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--mid)",
            }}
          >
            Product Designer
          </p>

          {/* Name */}
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-.035em",
              lineHeight: 1.0,
              color: "var(--black)",
              marginTop: "-.25rem",
            }}
          >
            Tharun<br />Devaraja
          </h1>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--rule)" }} />

          {/* Location */}
          <p style={{ fontSize: "var(--small)", color: "var(--mid)", lineHeight: 1.5 }}>
            Western Province, Sri Lanka
          </p>

          {/* CTA buttons + social */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
              flexWrap: "wrap",
              paddingTop: ".5rem",
              borderTop: "1px solid var(--rule)",
            }}
          >
            <a
              href="mailto:tharun@d3varaja.com"
              style={{
                fontSize: "var(--label)",
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "#f2f1ef",
                background: "var(--black)",
                textDecoration: "none",
                padding: ".35rem .85rem",
                borderRadius: "99px",
                whiteSpace: "nowrap",
              }}
            >
              Hire me
            </a>
            <button
              onClick={handleMailMe}
              style={{
                fontSize: "var(--label)",
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--black)",
                background: "transparent",
                border: "1px solid rgba(12,12,12,.22)",
                padding: ".35rem .85rem",
                borderRadius: "99px",
                cursor: "none",
                whiteSpace: "nowrap",
              }}
            >
              {copied ? "Copied ✓" : "Mail me"}
            </button>

            {/* Social — pushed right */}
            <div style={{ display: "flex", gap: ".9rem", marginLeft: "auto" }}>
              <CardLink href="https://x.com/d3varaja">X</CardLink>
              <CardLink href="https://github.com/d3varaja">GitHub</CardLink>
              <CardLink href="https://linkedin.com/in/d3varaja">Li</CardLink>
            </div>
          </div>
        </div>
      </div>

      {/* ── Ticker ────────────────────────────────── */}
      <div
        className="ticker-wrap"
        style={{ width: "100vw", position: "absolute", bottom: 0, left: 0 }}
      >
        <div className="ticker-track">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: "var(--label)",
                fontWeight: 500,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--mid)",
                paddingRight: "3rem",
              }}
            >
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "var(--small)",
        color: "var(--mid)",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 120ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--black)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mid)")}
    >
      {children}
    </a>
  );
}
