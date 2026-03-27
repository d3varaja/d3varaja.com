import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project CROW",
  description:
    "Unified interaction intelligence platform — designed and built 30+ screens with natural-language query, multi-agent analysis, and AI vision extraction.",
  openGraph: {
    title: "Project CROW — Tharun Devaraja",
    description:
      "Unified interaction intelligence platform with natural-language query, multi-agent analysis, and AI vision extraction.",
  },
};

const STACK = [
  "Figma", "React", "Next.js 15", "Node.js", "Cloudflare D1",
  "Cloudflare Queues", "Resend", "Playwright", "RAG", "LLM orchestration",
];

const LINKS = [
  { label: "Live Site", href: "https://crowai.dev/" },
  { label: "Figma", href: "https://www.figma.com/design/ivrc5MYJvZv8zTatZXWjU9/CROW---Unified-Customer-Interaction-Intelligence-Platform?node-id=0-1&p=f" },
  { label: "GitHub", href: "https://github.com/CROW-B3" },
  { label: "Docs", href: "https://docs.crow.bbyb.dev" },
];

const COLORS = [
  { name: "Core Purple", hex: "#6B3FA0" },
  { name: "Background Deep", hex: "#0D0617" },
  { name: "Accent Lavender", hex: "#A78BDA" },
];


const SCREENS = [
  { src: "/projects/crow/Dashboard - Overview.png", label: "Dashboard Overview" },
  { src: "/projects/crow/Dashboard - Ask CROW.png", label: "Ask CROW" },
  { src: "/projects/crow/Connect Sources.png", label: "Connect Sources" },
  { src: "/projects/crow/Dashboard Analysis Interactions.png", label: "Interaction Analysis" },
  { src: "/projects/crow/CROW - Select Plan.png", label: "Plan Selection" },
  { src: "/projects/crow/Dashboard Analytics Patterns.png", label: "Analytics Patterns" },
];

const IMG: React.CSSProperties = { width: "100%", borderRadius: 8, border: "1px solid var(--rule)" };

export default function CrowProject() {
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
              Sep 2025 — Mar 2026 · UX Design · Frontend Development
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
              CROW — Unified Interaction Intelligence Platform
            </h1>
            <p style={{ fontSize: "var(--h2)", fontWeight: 300, lineHeight: 1.55, color: "var(--mid)", maxWidth: "42ch" }}>
              A platform that lets teams query complex customer interaction data using natural language — instead of rigid dashboards.
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

          {/* Hero — smaller landing page preview */}
          <div style={{ maxWidth: 520, margin: "0 auto clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img
              src="/projects/crow/Landing Page.png"
              alt="CROW landing page"
              style={{ width: "100%", maxHeight: 340, objectFit: "cover", objectPosition: "top", borderRadius: 8, border: "1px solid var(--rule)" }}
            />
          </div>

          {/* Story */}
          <article className="prose">
            <h2>The Problem</h2>
            <p>
              Customer interaction data is messy. It lives across channels — emails, chats, calls, tickets — and extracting meaning from it usually means jumping between dashboards, writing queries, or waiting on analysts. Most teams don't have a fast way to ask a simple question and get a real answer.
            </p>
            <p>
              CROW was built to fix that. The goal was a single platform where anyone on the team could type a question in plain language and get actionable insights, without needing to know SQL or navigate five different tools.
            </p>

            <h2>What I Did</h2>
            <p>
              I solely owned the design and frontend for the entire product. Starting from research and wireframing in Figma, I designed 30+ screens covering the full user journey — from onboarding and query input to results visualisation, conversation replay, and admin management.
            </p>
            <p>
              Then I built it. The frontend runs on React and Next.js 15, connected to a backend powered by Cloudflare D1 for persistence and Cloudflare Queues for async processing. I also built the core intelligence layer: multi-agent analysis that breaks down queries into subtasks, an AI vision extraction pipeline for processing visual content, and vector search for semantic retrieval across interaction histories.
            </p>

            <h2>Connecting the Sources</h2>
            <p>
              The platform's value depends on the breadth of data it can ingest. I designed and built the source connection flow — a guided setup where users can link web analytics, CCTV feeds, and social media channels into a single unified pipeline.
            </p>

            <h2>Notifications at Scale</h2>
            <p>
              Reliable communication was critical — users needed to be notified about query completions, anomaly alerts, and team activity. I implemented a queue-based async notification service using Cloudflare Queues with Resend API on the delivery side. This decoupled notification dispatch from the main request path and ensured emails were delivered reliably even under load.
            </p>
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
              <p className={sora.className} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1 }}>
                Sora
              </p>
              <div className={sora.className} style={{ display: "flex", gap: "1.5rem", marginTop: ".75rem", marginBottom: "2rem" }}>
                <span style={{ fontSize: "var(--body)", fontWeight: 700 }}>Bold</span>
                <span style={{ fontSize: "var(--body)", fontWeight: 500 }}>Medium</span>
                <span style={{ fontSize: "var(--body)", fontWeight: 400 }}>Regular</span>
              </div>

              {/* Color Palette */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Color Palette
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                {COLORS.map((c) => (
                  <div key={c.name}>
                    <div style={{ aspectRatio: "4/3", borderRadius: 8, background: c.hex }} />
                    <p style={{ fontSize: "var(--small)", fontWeight: 600, marginTop: ".5rem" }}>{c.name}</p>
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", fontFamily: "monospace" }}>{c.hex}</p>
                  </div>
                ))}
              </div>

              {/* Core Components */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Core Components
              </p>
              {/* Row 1: Action Button | Billing Toggle */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <CompCard src="/projects/crow/components/Button.svg" label="Action Button" />
                <CompCard src="/projects/crow/components/Frame 49.svg" label="Billing Toggle" />
              </div>

              {/* Row 2: Ask CROW Search Bar (full width) */}
              <div style={{ marginBottom: "1.5rem" }}>
                <CompCard src="/projects/crow/components/Frame 1.svg" label="Ask CROW Search Bar" />
              </div>

              {/* Row 3: Component Card | Overview Stat Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <CompCard src="/projects/crow/components/Overlay+Border+Shadow+OverlayBlur.svg" label="Component Card" />
                <CompCard src="/projects/crow/components/Frame 10123356.svg" label="Overview Stat Cards" />
              </div>

              {/* Row 4: Feature Configuration Card (full width) */}
              <div>
                <CompCard src="/projects/crow/components/Overlay+Border.svg" label="Feature Configuration Card" />
              </div>
            </div>
          </div>

          {/* ── Interfaces ── */}
          <div>
            <div className="sec-head">
              <h2>Interfaces</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", paddingTop: "2rem", paddingBottom: "2.5rem" }}>
              {SCREENS.map((s) => (
                <div key={s.label}>
                  <ImageLightbox src={s.src} alt={s.label} style={IMG} />
                  <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Technical Architecture ── */}
          <div>
            <div className="sec-head">
              <h2>Technical Architecture</h2>
            </div>

            <article className="prose" style={{ paddingTop: "2rem" }}>
              <h3>Frontend — React & Next.js 15</h3>
              <p>
                Solely built the full frontend across 30+ screens. Next.js 15 App Router with React for the component layer. Server components for initial data loading, client components for interactive dashboards and real-time query interfaces.
              </p>

              <h3>Intelligence Layer — RAG & LLM Orchestration</h3>
              <p>
                Built multi-agent analysis that decomposes complex queries into subtasks. AI vision extraction pipeline processes visual content from CCTV and web sources. Vector search enables semantic retrieval across interaction histories.
              </p>

              <h3>Infrastructure — Cloudflare Stack</h3>
              <p>
                Cloudflare D1 for serverless SQL persistence. Cloudflare Queues for async job processing. Queue-based notification service with Resend API for reliable email delivery at scale.
              </p>

              <h3>Testing — Playwright E2E</h3>
              <p>
                288-test Playwright end-to-end suite covering critical paths. Public documentation at <a href="https://docs.crow.bbyb.dev" target="_blank" rel="noopener noreferrer">docs.crow.bbyb.dev</a> covering setup, architecture, and API reference.
              </p>

              <hr />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                  textAlign: "center",
                  padding: "1.5rem 0",
                }}
              >
                <Stat value="30+" label="Screens designed & built" />
                <Stat value="288" label="E2E tests shipped" />
                <Stat value="In production" label="Used internally" />
              </div>

              <hr />

              <a href="/projects/crow/screens" style={{ display: "block", textAlign: "center", padding: "1rem 2rem", background: "var(--black)", color: "var(--white)", borderRadius: "99px", textDecoration: "none", fontWeight: 600, fontSize: "var(--small)" }}>
                View all 20 screens →
              </a>

              <h2>Outcome</h2>
              <p>
                CROW is used internally in production. It replaced a fragmented workflow of spreadsheets and manual reporting with a conversational interface that any team member can use. The natural-language query layer became the primary way the team accesses customer interaction data.
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
            href="/projects/med-essence"
            style={{ fontSize: "var(--h2)", fontWeight: 600, letterSpacing: "-.02em", color: "var(--black)", textDecoration: "none" }}
          >
            Med-Essence — Offline-First Healthcare App →
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

function CompCard({ src, label }: { src: string; label: string }) {
  return (
    <div>
      <p style={{ fontSize: "var(--small)", fontWeight: 600, color: "var(--black)", marginBottom: ".5rem", textAlign: "center" }}>{label}</p>
      <img src={src} alt={label} style={{ width: "100%", borderRadius: 8 }} />
    </div>
  );
}
