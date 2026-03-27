import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

export const metadata: Metadata = {
  title: "Lions Club Plymouth — All Screens",
  description:
    "Gallery of all 17 designed screens for Lions Club Plymouth — home, events, projects, missions, donations, shop, and gallery.",
  openGraph: {
    title: "Lions Club Plymouth — All Screens",
    description:
      "Gallery of all 17 designed screens for Lions Club Plymouth — community platform design for an elderly user base.",
  },
};

const IMG_STYLE: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid var(--rule)",
};

const GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
};

const BASE = "/projects/lions-plymouth";

export default function LionsPlymouthScreens() {
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
              Lions Club Plymouth
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

          {/* ── Home & About ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Home &amp; About</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Home Page.png`} alt="Home page" style={IMG_STYLE} />
            <img src={`${BASE}/About Us.png`} alt="About Us" style={IMG_STYLE} />
            <img src={`${BASE}/About Us-1.png`} alt="About Us — continued" style={IMG_STYLE} />
          </div>

          {/* ── Events ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Events</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Events.png`} alt="Events listing" style={IMG_STYLE} />
            <img src={`${BASE}/Event Individual page ongoing.png`} alt="Event individual page — ongoing" style={IMG_STYLE} />
            <img src={`${BASE}/Event Individual page done.png`} alt="Event individual page — done" style={IMG_STYLE} />
          </div>

          {/* ── Projects & Missions ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Projects &amp; Missions</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Projects.png`} alt="Projects listing" style={IMG_STYLE} />
            <img src={`${BASE}/Project Individual page Ongoing.png`} alt="Project individual page — ongoing" style={IMG_STYLE} />
            <img src={`${BASE}/Project Individual page Done.png`} alt="Project individual page — done" style={IMG_STYLE} />
            <img src={`${BASE}/Mission Page.png`} alt="Mission page" style={IMG_STYLE} />
            <img src={`${BASE}/Mission Individual page.png`} alt="Mission individual page" style={IMG_STYLE} />
          </div>

          {/* ── Donate ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Donate</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Donate.png`} alt="Donate page" style={IMG_STYLE} />
            <img src={`${BASE}/Donate Individual page.png`} alt="Donate individual page" style={IMG_STYLE} />
          </div>

          {/* ── Shop ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Shop</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img src={`${BASE}/Shop Now Page.png`} alt="Shop page" style={IMG_STYLE} />
            <img src={`${BASE}/Your Cart.png`} alt="Shopping cart" style={IMG_STYLE} />
            <img src={`${BASE}/Your Cart-1.png`} alt="Shopping cart — continued" style={IMG_STYLE} />
            <img src={`${BASE}/Gallery.png`} alt="Gallery" style={IMG_STYLE} />
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
