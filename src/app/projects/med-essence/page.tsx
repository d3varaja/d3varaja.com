import type { Metadata } from "next";
import { Sora } from "next/font/google";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Med-Essence",
  description:
    "Offline-first healthcare app designed for low-connectivity communities. Two on-device AI models, a counterfeit medicine scanner and a pregnancy risk assessment, run on budget Android phones without sending data anywhere.",
  openGraph: {
    title: "Med-Essence, Offline-First Healthcare App",
    description:
      "AI-powered health diagnostics that work entirely on-device. Built for communities where reliable internet is not a given.",
  },
};

const BASE = "/projects/med-essence";

const META = [
  { label: "Client", value: "CodeSprint X Competition" },
  { label: "Role", value: "UX Designer, Design Engineer" },
  { label: "Year", value: "2025" },
  { label: "Tools", value: "Figma, FigJam, Kotlin, TensorFlow Lite" },
];

const LINKS = [
  { label: "Figma", href: "https://www.figma.com/design/I7tTWE7eTz6mL41gm6tDv5/Med---Essence-figma-design?node-id=0-1&p=f" },
  { label: "GitHub", href: "https://github.com/Med-Essense" },
];

const STACK = ["Figma", "FigJam", "Kotlin", "TensorFlow Lite", "Offline-first"];

const SCREENS = [
  {
    src: `${BASE}/screens/home.png`,
    alt: "Home dashboard with feature cards for the five core services",
    caption: "Home, dashboard with feature cards for the five core services.",
  },
  {
    src: `${BASE}/screens/ai-report.png`,
    alt: "AI Health Report with on-device suggestions based on uploaded medical reports",
    caption:
      "AI Health Report, with on-device suggestions based on uploaded medical reports.",
  },
  {
    src: `${BASE}/screens/medicine-scheduler.png`,
    alt: "Medicine Scheduler with calendar and time selection designed for elderly users",
    caption:
      "Medicine Scheduler, calendar and time selection designed for elderly users.",
  },
  {
    src: `${BASE}/screens/nutrition-tracker.png`,
    alt: "Nutrition Tracker with recipe suggestions based on available household ingredients",
    caption:
      "Nutrition Tracker, recipe suggestions based on available household ingredients.",
  },
  {
    src: `${BASE}/screens/pregnancy-week-07.png`,
    alt: "Pregnancy Tracking week-by-week with fetal development info and risk indicators",
    caption:
      "Pregnancy Tracking, week-by-week guidance with fetal development info and risk indicators.",
  },
  {
    src: `${BASE}/screens/signup-options.png`,
    alt: "Onboarding screen, A step closer to a better Earth, the entry experience for first-time users",
    caption:
      "Onboarding, “A step closer to a better Earth”, the entry experience for first-time users.",
  },
];

const TAKEAWAYS = [
  {
    title: "Offline-first is a design language, not a feature.",
    body: "Every loading state, every confirmation, every error has to assume the user has zero bars. The constraint shapes the entire UI.",
  },
  {
    title: "Warmth is a design decision.",
    body: "The coral palette and Sora typeface aren't aesthetic choices. They're a position against the clinical, Western look of most health tech.",
  },
  {
    title: "Process artifacts are credibility.",
    body: "Personas, journeys, affinity maps, sitemaps, they're not just deliverables. They're proof that design work happened before the screens did.",
  },
];

export default function MedEssenceProject() {
  return (
    <>
      <PillNav />

      <main
        className={sora.className}
        style={
          {
            minHeight: "100svh",
            paddingTop: "clamp(5rem, 10vw, 7rem)",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
            // Scoped accent + body text override for this page only.
            // .sec-head h2 picks up var(--accent), so coral propagates to all section labels.
            ["--accent" as string]: "#FF6B6B",
            ["--accent-soft" as string]: "rgba(255, 107, 107, 0.10)",
            ["--black" as string]: "#1A1A2E",
          } as React.CSSProperties
        }
      >
        <div className="wrap" style={{ maxWidth: 720 }}>
          {/* ── Header ──────────────────────────────────────── */}
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
              2025 · Coursework Project · UX Design
            </p>
            <h1
              style={{
                fontSize: "var(--h1)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.1,
                color: "var(--black)",
                marginBottom: "1rem",
              }}
            >
              Med-Essence, Offline-First Healthcare App
            </h1>
            <p
              style={{
                fontSize: "var(--h2)",
                fontWeight: 300,
                lineHeight: 1.55,
                color: "var(--mid)",
                maxWidth: "44ch",
              }}
            >
              AI-powered health diagnostics that work entirely on-device,
              designed for communities where reliable internet is not a given.
            </p>

            {/* Links */}
            <div
              style={{
                display: "flex",
                gap: ".75rem",
                marginTop: "1.25rem",
                flexWrap: "wrap",
              }}
            >
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".5rem",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
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

          {/* Metadata strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1.25rem 2rem",
              padding: "1.25rem 0",
              borderTop: "1px solid var(--rule)",
              borderBottom: "1px solid var(--rule)",
              marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
            }}
          >
            {META.map((m) => (
              <div key={m.label}>
                <p
                  style={{
                    fontSize: "var(--label)",
                    fontWeight: 600,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--mid)",
                    margin: "0 0 .35rem",
                  }}
                >
                  {m.label}
                </p>
                <p
                  style={{
                    fontSize: "var(--small)",
                    fontWeight: 500,
                    color: "var(--black)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Hero ────────────────────────────────────────── */}
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto clamp(3rem, 6vw, 4.5rem)",
            }}
          >
            <ImageLightbox
              src={`${BASE}/hero/Preview.png`}
              alt="Med-Essence marketing image, Personal Healthcare Management App with home screen preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 14,
                border: "1px solid var(--rule)",
                display: "block",
              }}
            />
          </div>

          {/* ── Overview ────────────────────────────────────── */}
          <Section label="Overview" headline="Project Overview">
            <Paragraph>
              AI-powered health diagnostics that work entirely on-device.
              Designed for communities where reliable internet, formal
              healthcare, and verified medicine supply chains aren&apos;t a
              given.
            </Paragraph>
            <Paragraph>
              The product is built around two on-device AI models, a
              counterfeit medicine scanner and a pregnancy risk assessment
              tool. Both run on budget Android phones without sending data
              anywhere. Offline isn&apos;t a fallback in Med-Essence.
              It&apos;s the default.
            </Paragraph>
          </Section>

          {/* ── Discovery ───────────────────────────────────── */}
          <Section label="Discovery" headline="Where the product came from">
            <Paragraph>
              Two early-stage exercises shaped the direction. The roadmap
              identification mapped the audience, common problems, and
              possible solutions. The four-quadrant mind map weighed
              challenges, impact, business model, and real-world cases.
            </Paragraph>
            <Figure
              src={`${BASE}/process/roadmap-mind-map.png`}
              alt="Roadmap identification mind map, narrowing 14 candidate features down to 9 selected solutions"
              caption="From 14 candidate features to 9 selected solutions, narrowed by audience and real problems."
            />
            <Figure
              src={`${BASE}/process/four-quadrant-mind-map.png`}
              alt="Four-quadrant mind map weighing challenges, impact, business model, and real-world use cases"
              caption="The project considered against challenges, impact, business model, and real-world use cases."
            />
          </Section>

          {/* ── Research ────────────────────────────────────── */}
          <Section label="Research" headline="Designed for one specific user">
            <Paragraph>
              Med-Essence&apos;s primary user is a community health worker
              operating beyond reliable infrastructure. The persona below
              was built from desk research on rural healthcare patterns,
              Sri Lankan MOH operational reports, and observed health
              worker behaviour in low-connectivity regions.
            </Paragraph>
            <Figure
              src={`${BASE}/process/persona-aruna.png`}
              alt="Persona, Aruna Perera, community health midwife in rural Anuradhapura, Sri Lanka"
              caption="Aruna Perera, community health midwife in rural Anuradhapura, Sri Lanka. The primary user shaping the product's design decisions."
            />
            <Figure
              src={`${BASE}/process/empathy-map.png`}
              alt="Empathy map for Aruna, mapping what she says, thinks, does, and feels during a typical day"
              caption="Empathy map for Aruna, mapping what she says, thinks, does, and feels during a typical day in the field."
            />
          </Section>

          {/* ── Synthesis ───────────────────────────────────── */}
          <Section label="Synthesis" headline="What the research told the design">
            <Figure
              src={`${BASE}/process/affinity-diagram.png`}
              alt="Affinity diagram synthesising research insights into five themes"
              caption="Synthesised insights from secondary research on rural healthcare, counterfeit medicine reports, and offline-first design patterns. Grouped into five themes that shaped the product direction."
            />
            <Figure
              src={`${BASE}/process/user-journey-map.png`}
              alt="User journey map for Aruna verifying a suspicious medicine during a home visit"
              caption="Journey map for Aruna verifying a suspicious medicine during a home visit. Shows where existing tools fail her and where Med-Essence enters the flow."
            />
          </Section>

          {/* ── Design System ───────────────────────────────── */}
          <Section label="Design System" headline="Warm, not clinical">
            <Paragraph>
              The colour palette deliberately rejects medical blue. Coral
              pink (#FF6B6B), Soft White (#FFEEFF), and Deep Navy (#1A1A2E)
              signal warmth and approachability, health tech that
              doesn&apos;t look like Western health tech.
            </Paragraph>
            <Paragraph>
              Sora as the typeface for its readability at small sizes on
              budget Android devices.
            </Paragraph>
            <Figure
              src={`${BASE}/process/design-system.png`}
              alt="The Med-Essence design system, palette, typography, and treatment language"
              caption="The Med-Essence design system, palette, typography, and treatment language."
            />
          </Section>

          {/* ── Architecture ────────────────────────────────── */}
          <Section label="Architecture" headline="Information architecture">
            <Figure
              src={`${BASE}/process/sitemap.png`}
              alt="Sitemap, every feature one tap away from Home"
              caption="From Home, every feature is one tap away. Onboarding gates first-time use. Each main section has one or two sub-screens for context-specific tasks."
            />
          </Section>

          {/* ── Solution ────────────────────────────────────── */}
          <Section label="Solution" headline="Key screens">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem 1.25rem",
                margin: "1.5rem 0",
              }}
            >
              {SCREENS.map((s) => (
                <figure key={s.src} style={{ margin: 0 }}>
                  <ImageLightbox
                    src={s.src}
                    alt={s.alt}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: "1px solid var(--rule)",
                      display: "block",
                    }}
                  />
                  <figcaption
                    style={{
                      fontSize: "var(--small)",
                      color: "var(--mid)",
                      textAlign: "center",
                      marginTop: ".75rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href={`${BASE}/screens`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".4rem",
                  fontSize: "var(--small)",
                  fontWeight: 600,
                  color: "var(--white)",
                  background: "var(--black)",
                  textDecoration: "none",
                  padding: ".7rem 1.5rem",
                  borderRadius: "99px",
                }}
              >
                View all screens →
              </a>
            </div>
          </Section>

          {/* ── Technical ───────────────────────────────────── */}
          <Section label="Technical" headline="Built to run anywhere">
            <Paragraph>
              Native Android in Kotlin with a fully offline-first
              architecture. Two TensorFlow Lite models run on-device, one
              for counterfeit medicine detection through image analysis,
              one for pregnancy risk assessment from health metrics. Models
              optimised with TFLite quantisation to fit on budget Android
              devices.
            </Paragraph>
            <Paragraph>
              Data persistence, model inference, and result storage all
              happen locally. When connectivity becomes available, the app
              syncs. It never depends on it.
            </Paragraph>
          </Section>

          {/* ── Outcome ─────────────────────────────────────── */}
          <Section label="Outcome" headline="What this project shows">
            <Paragraph>
              Med-Essence is a working Android app with a complete UX design
              system, six high-fidelity screens, and on-device AI models.
              It is built for deployment in low-connectivity communities.
              The architecture proves that meaningful AI-powered health
              tools don&apos;t require cloud connectivity, they require
              deliberate constraint design.
            </Paragraph>
          </Section>

          {/* ── Reflection ──────────────────────────────────── */}
          <Section label="Reflection" headline="Takeaways">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {TAKEAWAYS.map((t) => (
                <div
                  key={t.title}
                  style={{
                    borderLeft: "2px solid var(--accent)",
                    paddingLeft: "1rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(1.0625rem, 1.8vw, 1.25rem)",
                      fontWeight: 700,
                      letterSpacing: "-.02em",
                      lineHeight: 1.3,
                      color: "var(--black)",
                      margin: "0 0 .5rem",
                    }}
                  >
                    {t.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--body)",
                      lineHeight: 1.7,
                      color: "var(--black)",
                      margin: 0,
                    }}
                  >
                    {t.body}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </main>

      {/* Next project */}
      <nav
        style={{
          borderTop: "1px solid var(--rule)",
          paddingBlock: "2.5rem",
        }}
      >
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p
            style={{
              fontSize: "var(--label)",
              color: "var(--mid)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: ".5rem",
            }}
          >
            Next project
          </p>
          <a
            href="/projects/orator"
            style={{
              fontSize: "var(--h2)",
              fontWeight: 600,
              letterSpacing: "-.02em",
              color: "var(--black)",
              textDecoration: "none",
            }}
          >
            Orator, Accessibility-First Reading Companion →
          </a>
        </div>
      </nav>

      <footer
        style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "var(--small)", color: "var(--mid)" }}>
            Tharun Devaraja
          </p>
        </div>
      </footer>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Local section + figure helpers (Med-Essence specific styling)        */
/* ──────────────────────────────────────────────────────────────────── */

function Section({
  label,
  headline,
  children,
}: {
  label: string;
  headline: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)" }}>
      <p
        style={{
          fontSize: "var(--label)",
          fontWeight: 600,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--accent)",
          margin: "0 0 .65rem",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 700,
          letterSpacing: "-.025em",
          lineHeight: 1.18,
          color: "var(--black)",
          margin: "0 0 1.25rem",
          maxWidth: "26ch",
        }}
      >
        {headline}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {children}
      </div>
    </section>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "var(--body)",
        lineHeight: 1.7,
        color: "var(--black)",
        margin: 0,
        maxWidth: "62ch",
      }}
    >
      {children}
    </p>
  );
}

function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure style={{ margin: ".5rem 0 0" }}>
      <ImageLightbox
        src={src}
        alt={alt}
        style={{
          width: "100%",
          borderRadius: 12,
          border: "1px solid var(--rule)",
          display: "block",
        }}
      />
      <figcaption
        style={{
          fontSize: "var(--small)",
          color: "var(--mid)",
          textAlign: "center",
          marginTop: ".85rem",
          lineHeight: 1.55,
          maxWidth: "60ch",
          marginInline: "auto",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
