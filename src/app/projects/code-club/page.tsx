import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeClub Admin Portal",
  description:
    "Admin portal for StemUp Sri Lanka's CodeClub program — designed and developed the full UI and frontend end-to-end, used by 30–40 members island-wide.",
  openGraph: {
    title: "CodeClub Admin Portal — Tharun Devaraja",
    description:
      "Admin portal for StemUp Sri Lanka's CodeClub — volunteer training, session management, student attendance, and registrations.",
  },
};

const STACK = [
  "Figma", "React", "Admin Portal", "Dashboard Design",
];

const LINKS = [
  { label: "Behance", href: "https://www.behance.net/gallery/246190855/Lions-Club-Plymouth-Community-Platform-Design" },
];

const COLORS = [
  { name: "Emerald Green", hex: "#41B553", light: false },
  { name: "Obsidian Blue", hex: "#0F172A", light: false },
  { name: "Slate Gray", hex: "#64748B", light: false },
];

const SCREENS = [
  { src: "/projects/code-club/Code Clubs - Code Clubs Dashboard.png", alt: "Code Clubs dashboard", label: "Code Clubs" },
  { src: "/projects/code-club/Code Clubs - Volunteer Training Dashboard.png", alt: "Volunteer Training dashboard", label: "Volunteer Training" },
  { src: "/projects/code-club/Code Clubs - Sessions Dashboard.png", alt: "Sessions dashboard", label: "Sessions" },
  { src: "/projects/code-club/Code Clubs - Student Attendance Dashboard.png", alt: "Student Attendance dashboard", label: "Student Attendance" },
  { src: "/projects/code-club/Code Clubs - New Registration Dashboard.png", alt: "New Registrations dashboard", label: "New Registrations" },
  { src: "/projects/code-club/Code Clubs - All Registration Dashboard.png", alt: "All Registrations dashboard", label: "All Registrations" },
];

export default function CodeClubProject() {
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
              Jan 2025 — Present · UX Design · Frontend Development · Volunteering
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
              CodeClub — Admin Portal for StemUp Sri Lanka
            </h1>
            <p style={{ fontSize: "var(--h2)", fontWeight: 300, lineHeight: 1.55, color: "var(--mid)", maxWidth: "42ch" }}>
              A full admin portal for managing coding clubs, volunteer training, sessions, and student registrations across Sri Lanka.
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

            <h2>The Context</h2>
            <p>
              StemUp Sri Lanka runs CodeClub communities across the island, teaching kids to code through volunteer-led sessions. As a Community Co-Lead for the Walisara community, I saw firsthand how the programme was being managed — spreadsheets, group chats, and manual tracking. With 30–40 active members and growing, the coordination overhead was becoming a bottleneck.
            </p>
            <p>
              The programme needed a proper admin tool — something that could handle club management, volunteer coordination, session scheduling, and student registrations in one place.
            </p>

            <h2>What I Built</h2>
            <p>
              I solely designed and developed the full UI and frontend end-to-end. The portal covers the core operational workflows: managing coding clubs across districts, tracking volunteer training progress, scheduling and monitoring sessions, and handling student registrations from application through approval.
            </p>

            <p>
              Each dashboard was designed around the real tasks coordinators perform daily. The volunteer training view shows completion status at a glance. The sessions dashboard lets leads schedule, track attendance, and manage across multiple centres. The registration flow handles the full pipeline from new applications to approved members.
            </p>

            <h2>Designed for Coordinators</h2>
            <p>
              The users are volunteer coordinators — not power users. Every screen prioritises clarity: prominent search and filters, clean data tables with expandable detail rows, and obvious action buttons. The sidebar navigation maps directly to the mental model of how coordinators think about their work: clubs, people, sessions, registrations.
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
              <p className={inter.className} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1 }}>
                Inter
              </p>
              <div className={inter.className} style={{ display: "flex", gap: "1.5rem", marginTop: ".75rem", marginBottom: "2rem" }}>
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
                    <div style={{ aspectRatio: "4/3", borderRadius: 8, background: c.hex, border: c.light ? "1px solid var(--rule)" : "none" }} />
                    <p style={{ fontSize: "var(--small)", fontWeight: 600, marginTop: ".5rem" }}>{c.name}</p>
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", fontFamily: "monospace" }}>{c.hex}</p>
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
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                }}
              >
                {SCREENS.map((s) => (
                  <div key={s.label}>
                    <ImageLightbox src={s.src} alt={s.alt} style={{ width: "100%", borderRadius: 8, border: "1px solid var(--rule)" }} />
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Technical Architecture ── */}
          <div>
            <div className="sec-head">
              <h2>Technical Architecture</h2>
            </div>

            <article className="prose" style={{ paddingTop: "2rem" }}>
              <h3>Frontend — React</h3>
              <p>
                Solely built the full UI and frontend end-to-end. Component-based architecture with reusable dashboard patterns — data tables, filter bars, expandable detail rows, and action panels.
              </p>

              <h3>Admin Dashboard System</h3>
              <p>
                Designed and implemented 8 dashboard screens covering the full operational workflow: club management across districts, volunteer training progress tracking, session scheduling with attendance monitoring, and registration pipeline from application to approval.
              </p>

              <h3>Designed for Coordinators</h3>
              <p>
                The interface maps directly to how volunteer coordinators think about their work. Prominent search and filters, clean data tables with expandable rows, and obvious action buttons. Sidebar navigation mirrors the mental model: clubs, people, sessions, registrations.
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
                <Stat value="8" label="Dashboard screens" />
                <Stat value="30–40" label="Active members" />
                <Stat value="Island-wide" label="Used across Sri Lanka" />
              </div>

              <hr />

              <a href="/projects/code-club/screens" style={{ display: "block", textAlign: "center", padding: "2rem", border: "1px solid var(--rule)", borderRadius: 8, textDecoration: "none", color: "var(--black)", fontWeight: 600, fontSize: "var(--body)" }}>
                View all 8 screens →
              </a>

              <h2>Outcome</h2>
              <p>
                The portal is used by coordinators across Sri Lanka to manage the CodeClub programme. It replaced the scattered coordination tools with a single, purpose-built interface — and it was built by someone who was also using it, which meant every design decision was grounded in real operational needs.
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
            href="/projects/crow"
            style={{ fontSize: "var(--h2)", fontWeight: 600, letterSpacing: "-.02em", color: "var(--black)", textDecoration: "none" }}
          >
            Project CROW — Unified Interaction Intelligence Platform →
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
