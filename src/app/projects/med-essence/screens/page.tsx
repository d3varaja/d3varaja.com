import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

export const metadata: Metadata = {
  title: "Med-Essence — All Screens",
  description:
    "Gallery of all designed screens for Med-Essence — an offline-first healthcare app. Covers onboarding, home, health reports, wellness, mental health, and pregnancy tracking flows.",
  openGraph: {
    title: "Med-Essence — All Screens",
    description:
      "Gallery of all designed screens for Med-Essence — onboarding, home, health reports, wellness, mental health, and pregnancy tracking flows.",
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

const BASE = "/projects/med-essence";

export default function MedEssenceScreens() {
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
              Med-Essence
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

          {/* ── Onboarding ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Onboarding</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Startup - 16.png`} alt="Onboarding startup screen 1" style={IMG_STYLE} />
            <img src={`${BASE}/Startup - 17.png`} alt="Onboarding startup screen 2" style={IMG_STYLE} />
            <img src={`${BASE}/Startup - 18.png`} alt="Onboarding startup screen 3" style={IMG_STYLE} />
            <img src={`${BASE}/Welcome Screen4.png`} alt="Welcome screen" style={IMG_STYLE} />
            <img src={`${BASE}/Welcome Screen4-1.png`} alt="Welcome screen — step 2" style={IMG_STYLE} />
            <img src={`${BASE}/Welcome Screen4-2.png`} alt="Welcome screen — step 3" style={IMG_STYLE} />
          </div>

          {/* ── Home ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Home</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Home screen.png`} alt="Home screen — main view" style={IMG_STYLE} />
            <img src={`${BASE}/Home screen-1.png`} alt="Home screen — alternate state" style={IMG_STYLE} />
          </div>

          {/* ── Health Reports & AI ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Health Reports &amp; AI</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Report.png`} alt="Health report overview" style={IMG_STYLE} />
            <img src={`${BASE}/Report-1.png`} alt="Health report detail" style={IMG_STYLE} />
            <img src={`${BASE}/x-ray.png`} alt="AI X-ray analysis" style={IMG_STYLE} />
            <img src={`${BASE}/x-ray-1.png`} alt="AI X-ray analysis — results" style={IMG_STYLE} />
          </div>

          {/* ── Health & Wellness ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Health &amp; Wellness</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/M.Scheduler.png`} alt="Medication scheduler" style={IMG_STYLE} />
            <img src={`${BASE}/Vitamin.png`} alt="Vitamin tracker" style={IMG_STYLE} />
            <img src={`${BASE}/Vitamin-1.png`} alt="Vitamin tracker — detail" style={IMG_STYLE} />
            <img src={`${BASE}/mood tracker.png`} alt="Mood tracker — main view" style={IMG_STYLE} />
            <img src={`${BASE}/mood tracker-1.png`} alt="Mood tracker — logging" style={IMG_STYLE} />
            <img src={`${BASE}/mood tracker-2.png`} alt="Mood tracker — history" style={IMG_STYLE} />
            <img src={`${BASE}/Q&A Staff.png`} alt="Q&A staff — main view" style={IMG_STYLE} />
            <img src={`${BASE}/Q&A Staff-1.png`} alt="Q&A staff — question detail" style={IMG_STYLE} />
            <img src={`${BASE}/Q&A Staff-2.png`} alt="Q&A staff — response" style={IMG_STYLE} />
            <img src={`${BASE}/Meditation Card.png`} alt="Meditation card" style={IMG_STYLE} />
          </div>

          {/* ── Mental Health ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Mental Health</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Mental Health-Home.png`} alt="Mental health — home" style={IMG_STYLE} />
            <img src={`${BASE}/Mental Health-Home-1.png`} alt="Mental health — resources" style={IMG_STYLE} />
            <img src={`${BASE}/Mental Health-Home-2.png`} alt="Mental health — tracking" style={IMG_STYLE} />
          </div>

          {/* ── Pregnancy Tracking ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Pregnancy Tracking</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Multi SignIn.png`} alt="Pregnancy tracking — screen 1" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-5.png`} alt="Pregnancy tracking — screen 6" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-10.png`} alt="Pregnancy tracking — screen 11" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-20.png`} alt="Pregnancy tracking — screen 21" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-30.png`} alt="Pregnancy tracking — screen 31" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-40.png`} alt="Pregnancy tracking — screen 41" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-50.png`} alt="Pregnancy tracking — screen 51" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-60.png`} alt="Pregnancy tracking — screen 61" style={IMG_STYLE} />
            <img src={`${BASE}/Multi SignIn-68.png`} alt="Pregnancy tracking — screen 69" style={IMG_STYLE} />
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
