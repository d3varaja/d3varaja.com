import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

export const metadata: Metadata = {
  title: "Orator — All Screens",
  description:
    "Gallery of all designed screens for Orator — a mobile reading app. Covers home, library, reading experience, and settings.",
  openGraph: {
    title: "Orator — All Screens",
    description:
      "Gallery of all designed screens for Orator — home, library, reading experience, and settings.",
  },
};

const IMG_STYLE: React.CSSProperties = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid var(--rule)",
};

const GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
};

const LABEL: React.CSSProperties = {
  fontSize: "var(--small)",
  color: "var(--mid)",
  textAlign: "center",
  marginTop: ".5rem",
};

const BASE = "/projects/orator";

export default function OratorScreens() {
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
        <div className="wrap" style={{ maxWidth: 900 }}>

          {/* Header */}
          <header style={{ marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
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
              Orator
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
          </header>

          {/* ── Home & Library ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Home &amp; Library</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div>
              <img src={`${BASE}/Orator-ss-1.png`} alt="Home" style={IMG_STYLE} />
              <p style={LABEL}>Home</p>
            </div>
            <div>
              <img src={`${BASE}/Orator-ss-2.png`} alt="Library" style={IMG_STYLE} />
              <p style={LABEL}>Library</p>
            </div>
          </div>

          {/* ── Reading Experience ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Reading Experience</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div>
              <img src={`${BASE}/Orator-ss-4.png`} alt="Book Details" style={IMG_STYLE} />
              <p style={LABEL}>Book Details</p>
            </div>
            <div>
              <img src={`${BASE}/Orator-ss-5.png`} alt="Reading" style={IMG_STYLE} />
              <p style={LABEL}>Reading</p>
            </div>
            <div>
              <img src={`${BASE}/Orator-ss-6.png`} alt="Bookmarks" style={IMG_STYLE} />
              <p style={LABEL}>Bookmarks</p>
            </div>
          </div>

          {/* ── Settings ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Settings</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div>
              <img src={`${BASE}/Orator-ss-3.png`} alt="Settings" style={IMG_STYLE} />
              <p style={LABEL}>Settings</p>
            </div>
          </div>

        </div>
      </main>

      <footer style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}>
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
