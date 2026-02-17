import PillNav from "@/components/PillNav";
import WorkRow, { type WorkRowProps } from "@/components/WorkRow";

const WORK: WorkRowProps[] = [
  {
    index: "01",
    title: "Project Name",
    role: "Product Design",
    year: "2025",
    href: "https://placeholder.com",
  },
  {
    index: "02",
    title: "Project Name",
    role: "Design System",
    year: "2025",
    href: "https://placeholder.com",
  },
  {
    index: "03",
    title: "Project Name",
    role: "UX Research",
    year: "2024",
    href: "https://placeholder.com",
  },
  {
    index: "04",
    title: "Project Name",
    role: "Interaction Design",
    year: "2024",
  },
  {
    index: "05",
    title: "Project Name",
    role: "Visual Design",
    year: "2024",
  },
  {
    index: "06",
    title: "Project Name",
    role: "Brand Identity",
    year: "2023",
    placeholder: true,
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
