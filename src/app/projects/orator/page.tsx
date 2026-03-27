import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";

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

const COLORS = [
  { name: "Deep Charcoal", hex: "#1a1a2e", light: false },
  { name: "Warm Cream", hex: "#f5f0eb", light: true },
  { name: "Sepia Tone", hex: "#f4ecd8", light: true },
];

const THEMES = [
  { name: "Dark", bg: "#1a1a2e", fg: "#e0e0e0" },
  { name: "Light", bg: "#ffffff", fg: "#1a1a1a" },
  { name: "Sepia", bg: "#f4ecd8", fg: "#5b4636" },
  { name: "Blue", bg: "#1e2a3a", fg: "#c8d6e5" },
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
            <div style={{ display: "flex", gap: ".75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "var(--small)",
                    fontWeight: 600,
                    color: "var(--white)",
                    background: "var(--black)",
                    textDecoration: "none",
                    padding: ".5rem 1.25rem",
                    borderRadius: "99px",
                  }}
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

          {/* Hero — 3 phones side by side */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              maxWidth: 580,
              margin: "0 auto clamp(2.5rem, 5vw, 3.5rem)",
            }}
          >
            <img src="/projects/orator/Orator-ss-1.png" alt="Orator home screen" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)" }} />
            <img src="/projects/orator/Orator-ss-2.png" alt="Orator library screen" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)" }} />
            <img src="/projects/orator/Orator-ss-3.png" alt="Orator settings screen" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)" }} />
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

            <div style={{ maxWidth: 280, margin: "1.5rem auto" }}>
              <img src="/projects/orator/Orator-ss-4.png" alt="Book details screen with AI-generated summary and metadata" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)", margin: 0 }} />
            </div>

          </article>

          {/* ── Design System ── */}
          <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div className="sec-head">
              <h2>Design System</h2>
            </div>

            <div style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
              {/* Typography */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Typography
              </p>
              <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1 }}>
                System Default
              </p>
              <p style={{ fontSize: "var(--small)", color: "var(--mid)", marginTop: ".5rem", marginBottom: "2rem" }}>
                Bold · Medium · Regular — adaptive sizes from 16px to 24px for maximum readability
              </p>

              {/* Color Palette */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Color Palette
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                {COLORS.map((c) => (
                  <div key={c.name}>
                    <div style={{ aspectRatio: "4/3", borderRadius: 8, background: c.hex, border: c.light ? "1px solid var(--rule)" : "none" }} />
                    <p style={{ fontSize: "var(--small)", fontWeight: 600, marginTop: ".5rem" }}>{c.name}</p>
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", fontFamily: "monospace" }}>{c.hex}</p>
                  </div>
                ))}
              </div>

              {/* Reading Themes */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Reading Themes
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: ".75rem" }}>
                {THEMES.map((t) => (
                  <div key={t.name} style={{ borderRadius: 8, background: t.bg, padding: "1rem .75rem", border: "1px solid var(--rule)", textAlign: "center" }}>
                    <p style={{ fontSize: "var(--small)", fontWeight: 600, color: t.fg }}>{t.name}</p>
                    <p style={{ fontSize: "var(--label)", color: t.fg, opacity: .6, marginTop: ".25rem", fontFamily: "monospace" }}>{t.bg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Interfaces ── */}
          <div>
            <div className="sec-head">
              <h2>Interfaces</h2>
            </div>

            <div style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  maxWidth: 580,
                  margin: "0 auto",
                }}
              >
                <div>
                  <ImageLightbox src="/projects/orator/Orator-ss-5.png" alt="Reading screen with sentence navigation" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)" }} />
                  <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>Reading</p>
                </div>
                <div>
                  <ImageLightbox src="/projects/orator/Orator-ss-6.png" alt="Bookmark and progress tracking" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)" }} />
                  <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>Bookmarks</p>
                </div>
                <div>
                  <ImageLightbox src="/projects/orator/Orator-ss-4.png" alt="Book details with AI analysis" style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)" }} />
                  <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>Book Details</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Technical Architecture ── */}
          <div>
            <div className="sec-head">
              <h2>Technical Architecture</h2>
            </div>

            <article className="prose" style={{ paddingTop: "2rem" }}>
              <h3>Multi-Format Parsing Engine</h3>
              <p>
                Each file format — TXT, EPUB, and PDF — has its own dedicated parser. Plain text is tokenised into sentences for navigation. EPUB is parsed by extracting chapters and rendering structured HTML content. PDF extraction is powered by Google Gemini's vision capabilities, converting scanned or complex layouts into clean, readable text.
              </p>

              <h3>AI Content Analysis Pipeline</h3>
              <p>
                When a user imports a document, the Gemini API analyses it to detect the content type (book, article, research paper, essay, news, story, or document), identify the author and genre, generate a summary, and suggest improved titles. This metadata enriches the library view and helps users manage larger collections.
              </p>

              <h3>Text-to-Speech Engine</h3>
              <p>
                The TTS system is built on top of React Native's speech synthesis APIs with custom playback controls — play, pause, skip forward/back by sentence. It synchronises with the reader's current position, so switching between reading and listening is seamless.
              </p>

              <h3>Data Persistence & State</h3>
              <p>
                All reading progress, bookmarks, settings, and library metadata are persisted locally using a custom store layer. The app works fully offline after initial content import — no account required, no cloud sync dependency.
              </p>

              <h3>Project Structure</h3>
              <pre><code>{`orator/
├── src/
│   ├── core/
│   │   ├── analysis/        # AI content analysis (Gemini)
│   │   ├── notifications/   # Reading reminders
│   │   ├── sources/         # TXT, EPUB, PDF parsers
│   │   ├── speech/          # TTS engine + controls
│   │   └── store/           # Local data persistence
│   └── ui/
│       ├── HomeScreen.tsx
│       ├── LibraryScreen.tsx
│       ├── ReaderScreen.tsx
│       ├── SettingsScreen.tsx
│       └── themes.ts        # 4 reading themes
├── App.tsx
└── package.json`}</code></pre>

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

              <a href="/projects/orator/screens" style={{ display: "block", textAlign: "center", padding: "1rem 2rem", background: "var(--black)", color: "var(--white)", borderRadius: "99px", textDecoration: "none", fontWeight: 600, fontSize: "var(--small)" }}>
                View all 6 screens →
              </a>

              <h2>Outcome</h2>
              <p>
                Orator shipped as v1.0.0 and is used by 2 initial clients. It demonstrates that accessibility-first design isn't a constraint — it's a lens that produces better products for everyone. The same clarity and simplicity that helps an elderly user also makes the app genuinely pleasant for any reader.
              </p>

            </article>
          </div>

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
