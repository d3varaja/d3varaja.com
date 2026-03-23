import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import WorkRow, { type WorkRowProps } from "@/components/WorkRow";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Tharun Devaraja — product design, UX research, design systems, and interaction design.",
  openGraph: {
    title: "Projects — Tharun Devaraja",
    description:
      "Selected work spanning product design, UX research, design systems, and interaction design.",
  },
};

const WORK: WorkRowProps[] = [
  {
    index: "01",
    title: "OLO — XR Companion for Workplace Focus",
    role: "UX Design · XR",
    year: "2026",
  },
  {
    index: "02",
    title: "Project CROW — Unified Interaction Intelligence Platform",
    role: "UX Design · Frontend Development",
    year: "2025–2026",
  },
  {
    index: "03",
    title: "Med-Essence — Offline-First Healthcare App",
    role: "UX Design · AI/ML",
    year: "2025",
  },
  {
    index: "04",
    title: "Orator — Accessibility-First Reading Companion",
    role: "UX Design · Development",
    year: "2025",
  },
];

export default function Projects() {
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
        <div className="wrap">

          {/* Page header */}
          <div style={{ paddingBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
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
              Selected Work
            </p>
            <h1
              style={{
                fontSize: "var(--display)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.0,
              }}
            >
              Projects
            </h1>
          </div>

          {/* Work rows */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>All Work</h2>
            <span>({String(WORK.length).padStart(2, "0")})</span>
          </div>

          {WORK.map((w) => (
            <WorkRow key={w.index} {...w} />
          ))}
          <div style={{ borderTop: "1px solid var(--rule)" }} />

        </div>
      </main>

      <footer style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}>
        <div
          className="wrap"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
        >
          <a
            href="/"
            style={{ fontSize: "var(--small)", color: "var(--mid)", textDecoration: "none", letterSpacing: ".02em" }}
          >
            ← Back
          </a>
          <p style={{ fontSize: "var(--small)", color: "var(--mid)" }}>
            Tharun Devaraja
          </p>
        </div>
      </footer>
    </>
  );
}
