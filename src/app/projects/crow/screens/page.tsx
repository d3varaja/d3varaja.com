import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

export const metadata: Metadata = {
  title: "CROW — All Screens",
  description:
    "Gallery of all designed screens for CROW — the unified interaction intelligence platform. Covers landing, authentication, onboarding, data sources, and dashboard flows.",
  openGraph: {
    title: "CROW — All Screens",
    description:
      "Gallery of all designed screens for CROW — landing, authentication, onboarding, data sources, and dashboard flows.",
  },
};

const IMG_STYLE: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid var(--rule)",
};

const LANDING_STYLE: React.CSSProperties = {
  ...IMG_STYLE,
  maxHeight: 500,
  objectFit: "cover",
  objectPosition: "top",
};

const GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

export default function CrowScreens() {
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
              CROW
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

          {/* ── Landing ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Landing</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img
              src="/projects/crow/Landing Page.png"
              alt="CROW landing page — hero section with platform overview"
              style={LANDING_STYLE}
            />
            <img
              src="/projects/crow/Landing Page-1.png"
              alt="CROW landing page — features and call-to-action section"
              style={LANDING_STYLE}
            />
          </div>

          {/* ── Authentication & Onboarding ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Authentication &amp; Onboarding</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img
              src="/projects/crow/CROW - User Sign Up.png"
              alt="User sign-up form with email and password fields"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/CROW - Organization Sign Up.png"
              alt="Organization sign-up form for team registration"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/CROW - Select Plan.png"
              alt="Plan selection screen with Web, CCTV, and Social tiers"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/CROW - Checkout.png"
              alt="Checkout screen with payment details"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/CROW - Payment Successful.png"
              alt="Payment successful confirmation screen"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/Invite teams.png"
              alt="Team invitation screen to add collaborators"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/Accept Invitation.png"
              alt="Accept invitation screen for new team members"
              style={IMG_STYLE}
            />
          </div>

          {/* ── Data Sources ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Data Sources</h2>
          </div>
          <div style={{ ...GRID, paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <img
              src="/projects/crow/Connect Sources.png"
              alt="Connect data sources overview with available integrations"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/Connect Web.png"
              alt="Connect web analytics source configuration"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/Connect CCTV.png"
              alt="Connect CCTV feed source configuration"
              style={IMG_STYLE}
            />
            <img
              src="/projects/crow/Connect Social.png"
              alt="Connect social media source configuration"
              style={IMG_STYLE}
            />
          </div>

          {/* ── Dashboard ── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Dashboard</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "2rem", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            {/* Full-width overview */}
            <img
              src="/projects/crow/Dashboard - Overview.png"
              alt="Dashboard overview with key metrics, recent queries, and interaction summary"
              style={IMG_STYLE}
            />

            {/* 2-column grid for remaining dashboard screens */}
            <div style={GRID}>
              <img
                src="/projects/crow/Dashboard - Ask CROW.png"
                alt="Ask CROW natural-language query interface"
                style={IMG_STYLE}
              />
              <img
                src="/projects/crow/Dashboard Analysis Interactions.png"
                alt="Interaction analysis table with sentiment and source data"
                style={IMG_STYLE}
              />
              <img
                src="/projects/crow/Dashboard Analytics Patterns.png"
                alt="Analytics patterns view showing trends and behavioural insights"
                style={IMG_STYLE}
              />
              <img
                src="/projects/crow/Dashboard Team.png"
                alt="Team management screen with member roles and permissions"
                style={IMG_STYLE}
              />
              <img
                src="/projects/crow/Dashboard Settings Card.png"
                alt="Dashboard settings card for account and preferences"
                style={IMG_STYLE}
              />
              <img
                src="/projects/crow/Dashboard Settings Card-1.png"
                alt="Dashboard settings card for notification and integration preferences"
                style={IMG_STYLE}
              />
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
