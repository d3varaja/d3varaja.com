import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

export const metadata: Metadata = {
  title: "CodeClub — All Screens",
  description: "All designed screens for the CodeClub Admin Portal — StemUp Sri Lanka.",
};

const IMG: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid var(--rule)",
};

const GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

export default function CodeClubScreens() {
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

          {/* Header */}
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
              CodeClub
            </p>
            <h1
              style={{
                fontSize: "var(--h1)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.1,
              }}
            >
              All Screens
            </h1>
          </div>

          {/* Club Management */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Club Management</h2>
            <span>(02)</span>
          </div>
          <div style={{ ...GRID, paddingTop: "1.5rem", paddingBottom: "2.5rem" }}>
            <img src="/projects/code-club/Code Clubs - Code Clubs Dashboard.png" alt="Code Clubs dashboard" style={IMG} />
            <img src="/projects/code-club/Code Clubs - My Sessions Dashboard.png" alt="My Sessions dashboard" style={IMG} />
          </div>

          {/* Volunteer Training */}
          <div className="sec-head">
            <h2>Volunteer Training</h2>
            <span>(02)</span>
          </div>
          <div style={{ ...GRID, paddingTop: "1.5rem", paddingBottom: "2.5rem" }}>
            <img src="/projects/code-club/Code Clubs - Volunteer Training Dashboard.png" alt="Volunteer Training dashboard" style={IMG} />
            <img src="/projects/code-club/Code Clubs - Volunteer Training Dashboard-1.png" alt="Volunteer Training detail view" style={IMG} />
          </div>

          {/* Sessions & Attendance */}
          <div className="sec-head">
            <h2>Sessions & Attendance</h2>
            <span>(02)</span>
          </div>
          <div style={{ ...GRID, paddingTop: "1.5rem", paddingBottom: "2.5rem" }}>
            <img src="/projects/code-club/Code Clubs - Sessions Dashboard.png" alt="Sessions dashboard" style={IMG} />
            <img src="/projects/code-club/Code Clubs - Student Attendance Dashboard.png" alt="Student Attendance dashboard" style={IMG} />
          </div>

          {/* Registrations */}
          <div className="sec-head">
            <h2>Registrations</h2>
            <span>(02)</span>
          </div>
          <div style={{ ...GRID, paddingTop: "1.5rem", paddingBottom: "2.5rem" }}>
            <img src="/projects/code-club/Code Clubs - New Registration Dashboard.png" alt="New Registration dashboard" style={IMG} />
            <img src="/projects/code-club/Code Clubs - All Registration Dashboard.png" alt="All Registrations dashboard" style={IMG} />
          </div>

        </div>
      </main>

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
