import type { Metadata } from "next";
import PillNav from "@/components/PillNav";

export const metadata: Metadata = {
  title: "The story of OLO",
  description:
    "The story behind OLO, the playful AI companion puppet that lives on this portfolio.",
  openGraph: {
    title: "The story of OLO — Tharun Devaraja",
    description:
      "An exploration in playful AI companions. The story behind OLO, the puppet that lives on this site.",
  },
};

export default function OloProject() {
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
              Exploration · 2026
            </p>
            <h1
              style={{
                fontSize: "var(--display)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.0,
                margin: 0,
                color: "var(--black)",
              }}
            >
              The story of OLO
            </h1>
            <p
              style={{
                fontSize: "var(--h2)",
                fontWeight: 300,
                lineHeight: 1.55,
                color: "var(--mid)",
                maxWidth: "44ch",
                marginTop: "1.25rem",
              }}
            >
              The puppet AI companion that lives on this site.
            </p>
          </header>

          {/* OLO portrait */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "clamp(2rem, 6vw, 4rem) 0",
              marginBottom: "clamp(2rem, 5vw, 3rem)",
              background: "rgba(245, 158, 11, 0.06)",
              border: "1px solid var(--rule)",
              borderRadius: 16,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/olo/olo-animations/big-eye/olo-puppet.png"
              alt="OLO, the puppet AI companion"
              style={{
                maxWidth: "min(360px, 70%)",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Coming-soon state */}
          <div
            style={{
              padding: "clamp(2.5rem, 6vw, 4rem) 0",
              textAlign: "center",
              borderTop: "1px solid var(--rule)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <p
              style={{
                fontSize: "var(--label)",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#F59E0B",
                margin: "0 0 .85rem",
              }}
            >
              Coming soon
            </p>
            <h2
              style={{
                fontSize: "clamp(1.375rem, 2.6vw, 1.75rem)",
                fontWeight: 700,
                letterSpacing: "-.025em",
                lineHeight: 1.2,
                margin: "0 0 1rem",
                color: "var(--black)",
              }}
            >
              The full story is being written.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--mid)",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "44ch",
                marginInline: "auto",
              }}
            >
              How OLO got its name, why it has only one big eye, the rig
              behind the animations, and what it&apos;s like to design a
              character that has to live on every page of a portfolio site.
            </p>
          </div>
        </div>
      </main>

      {/* Next project */}
      <nav style={{ borderTop: "1px solid var(--rule)", paddingBlock: "2.5rem" }}>
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
            Back to
          </p>
          <a
            href="/projects"
            style={{
              fontSize: "var(--h2)",
              fontWeight: 600,
              letterSpacing: "-.02em",
              color: "var(--black)",
              textDecoration: "none",
            }}
          >
            All projects →
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
