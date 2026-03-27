import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

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
  { label: "Figma", href: "https://www.figma.com/design/ivrc5MYJvZv8zTatZXWjU9/CROW---Unified-Customer-Interaction-Intelligence-Platform?node-id=0-1&p=f" },
  { label: "GitHub", href: "https://github.com/CROW-B3" },
  { label: "Docs", href: "https://docs.crow.bbyb.dev" },
];

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

          {/* Hero image */}
          <img
            src="/projects/crow/Landing Page.png"
            alt="CROW landing page showcasing the unified intelligence platform"
            style={{ width: "100%", maxHeight: 480, objectFit: "cover", objectPosition: "top", borderRadius: 8, border: "1px solid var(--rule)", marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}
          />

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

            <img src="/projects/crow/Dashboard - Overview.png" alt="CROW dashboard overview with key metrics and recent interactions" style={{ borderRadius: 8, border: "1px solid var(--rule)" }} />

            <p>
              Then I built it. The frontend runs on React and Next.js 15, connected to a backend powered by Cloudflare D1 for persistence and Cloudflare Queues for async processing. I also built the core intelligence layer: multi-agent analysis that breaks down queries into subtasks, an AI vision extraction pipeline for processing visual content, and vector search for semantic retrieval across interaction histories.
            </p>

            <img src="/projects/crow/Dashboard - Ask CROW.png" alt="Ask CROW — natural language query interface" style={{ borderRadius: 8, border: "1px solid var(--rule)" }} />

            <h2>Connecting the Sources</h2>
            <p>
              The platform's value depends on the breadth of data it can ingest. I designed and built the source connection flow — a guided setup where users can link web analytics, CCTV feeds, and social media channels into a single unified pipeline.
            </p>

            <img src="/projects/crow/Connect Sources.png" alt="Connect data sources — Web, CCTV, and Social integrations" style={{ borderRadius: 8, border: "1px solid var(--rule)" }} />

            <h2>Notifications at Scale</h2>
            <p>
              Reliable communication was critical — users needed to be notified about query completions, anomaly alerts, and team activity. I implemented a queue-based async notification service using Cloudflare Queues with Resend API on the delivery side. This decoupled notification dispatch from the main request path and ensured emails were delivered reliably even under load.
            </p>

            <img src="/projects/crow/Dashboard Analysis Interactions.png" alt="Interaction analysis table with sentiment and source data" style={{ borderRadius: 8, border: "1px solid var(--rule)" }} />

            <h2>Testing & Documentation</h2>
            <p>
              I shipped a 288-test Playwright end-to-end suite covering the critical paths across the platform. This gave the team confidence to iterate fast without breaking existing flows. I also authored public documentation at <a href="https://docs.crow.bbyb.dev" target="_blank" rel="noopener noreferrer">docs.crow.bbyb.dev</a>, covering setup, architecture, and API reference.
            </p>

            <img src="/projects/crow/CROW - Select Plan.png" alt="CROW pricing tiers — Web, CCTV, and Social plans" style={{ borderRadius: 8, border: "1px solid var(--rule)" }} />

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
              <Stat value="30+" label="Screens designed & built" />
              <Stat value="288" label="E2E tests shipped" />
              <Stat value="In production" label="Used internally" />
            </div>

            <hr />

            <a href="/projects/crow/screens" style={{ display: "block", textAlign: "center", padding: "2rem", border: "1px solid var(--rule)", borderRadius: 8, textDecoration: "none", color: "var(--black)", fontWeight: 600, fontSize: "var(--body)" }}>
              View all 20 screens →
            </a>

            <h2>Outcome</h2>
            <p>
              CROW is used internally in production. It replaced a fragmented workflow of spreadsheets and manual reporting with a conversational interface that any team member can use. The natural-language query layer became the primary way the team accesses customer interaction data.
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
