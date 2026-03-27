import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

export const metadata: Metadata = {
  title: "Orator",
  description:
    "Accessibility-first reading companion with AI-powered content analysis, TTS, and WCAG-compliant layouts designed for elderly users.",
  openGraph: {
    title: "Orator — Tharun Devaraja",
    description:
      "Accessibility-first reading companion with AI content analysis, TTS, and adaptive layouts for elderly users.",
  },
};

const STACK = [
  "Figma", "React Native", "Expo", "TypeScript", "Google Gemini API",
];

const LINKS = [
  { label: "GitHub", href: "https://github.com/d3varaja/orator" },
];

export default function OratorProject() {
  return (
    <>
      <PillNav />

      <main
        style={{
          minHeight: "100svh",
          paddingTop: "clamp(5rem, 10vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div className="wrap" style={{ maxWidth: 720 }}>

          {/* Header */}
          <header style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <p
              style={{
                fontSize: "var(--label)",
                fontWeight: 500,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--mid)",
                marginBottom: ".75rem",
              }}
            >
              Oct 2025 · UX Design · Full-Stack Development
            </p>
            <h1
              style={{
                fontSize: "var(--h1)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Orator — Accessibility-First Reading Companion
            </h1>
            <p style={{ fontSize: "var(--h2)", fontWeight: 300, lineHeight: 1.55, color: "var(--mid)", maxWidth: "42ch" }}>
              A reading app built around the people most apps forget — elderly users who deserve a better experience with their books and documents.
            </p>

            {/* Links */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem" }}>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "var(--small)", color: "var(--mid)", textDecoration: "none", fontWeight: 500 }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </header>

          {/* Stack pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            {STACK.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: "var(--label)",
                  fontWeight: 500,
                  letterSpacing: ".02em",
                  padding: ".35rem .75rem",
                  border: "1px solid var(--rule)",
                  borderRadius: "99px",
                  color: "var(--mid)",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Story */}
          <article className="prose">

            <h2>The Problem</h2>
            <p>
              Most reading apps are designed for young, tech-savvy users. Small text, gesture-heavy navigation, cluttered interfaces. For elderly users — many of whom are avid readers — these apps create barriers instead of removing them. The simple act of reading a book shouldn't require a tutorial.
            </p>
            <p>
              Orator started from a straightforward question: what would a reading app look like if it was designed for your grandparents first?
            </p>

            <h2>Designing for Readability</h2>
            <p>
              Every design decision was filtered through accessibility. Large-type adaptive layouts that adjust to the user's needs. High contrast. Clear visual hierarchy. Navigation that relies on obvious, labelled actions rather than swipe gestures or hidden menus.
            </p>
            <p>
              The interface follows WCAG compliance standards — not as a checkbox, but as a design philosophy. I prototyped in Figma, testing layouts at various text sizes and with simulated visual impairments to ensure the experience held up across conditions.
            </p>

            <h2>Multi-Format Reading Engine</h2>
            <p>
              Orator supports TXT, EPUB, and PDF — covering the three formats that account for most personal and professional reading. Each format has its own parsing and rendering pipeline built in React Native with Expo, with a unified reading experience across all three: consistent typography, bookmarks, chapter navigation, and a multi-theme system that includes high-contrast and night modes.
            </p>

            <h2>AI-Powered Content Analysis</h2>
            <p>
              Integrated Google's Gemini API to add an intelligence layer on top of the reading experience. Users can get summaries of chapters, extract key points, or ask questions about what they're reading. For elderly users who might read in shorter sessions, this means they can quickly catch up on where they left off without re-reading entire sections.
            </p>

            <h2>Text-to-Speech</h2>
            <p>
              A built-in TTS engine lets users listen to their documents. This is particularly valuable for users with declining vision or reading fatigue — they can switch between reading and listening seamlessly, without leaving the app for a separate audio tool.
            </p>

            <hr />

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
                textAlign: "center",
                padding: "1.5rem 0",
              }}
            >
              <Stat value="3" label="Formats supported" />
              <Stat value="WCAG" label="Compliant layouts" />
              <Stat value="v1.0" label="Shipped & in use" />
            </div>

            <hr />

            <h2>Outcome</h2>
            <p>
              Orator shipped as v1.0.0 and is used by 2 initial clients. It demonstrates that accessibility-first design isn't a constraint — it's a lens that produces better products for everyone. The same clarity and simplicity that helps an elderly user also makes the app genuinely pleasant for any reader.
            </p>

          </article>

        </div>
      </main>

      {/* Next project */}
      <nav style={{ borderTop: "1px solid var(--rule)", paddingBlock: "2.5rem" }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: "var(--label)", color: "var(--mid)", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 500, marginBottom: ".5rem" }}>
            Next project
          </p>
          <a
            href="/projects/lions-plymouth"
            style={{ fontSize: "var(--h2)", fontWeight: 600, letterSpacing: "-.02em", color: "var(--black)", textDecoration: "none" }}
          >
            Lions Club Plymouth — Community Platform Design →
          </a>
        </div>
      </nav>

      <footer style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}>
        <div
          className="wrap"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
        >
          <p style={{ fontSize: "var(--small)", color: "var(--mid)" }}>Tharun Devaraja</p>
        </div>
      </footer>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".25rem" }}>{label}</p>
    </div>
  );
}
