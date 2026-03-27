import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lions Club Plymouth",
  description:
    "Accessibility-focused community platform design for Lions Club Plymouth — 17 screens built for an elderly user base with WCAG compliance.",
  openGraph: {
    title: "Lions Club Plymouth — Tharun Devaraja",
    description:
      "Accessibility-focused community platform design for an elderly user base. Shipped and live.",
  },
};

const STACK = [
  "Figma", "Web Design", "Accessibility", "WCAG",
];

const LINKS = [
  { label: "Behance", href: "https://www.behance.net/gallery/246190855/Lions-Club-Plymouth-Community-Platform-Design" },
];

const COLORS = [
  { name: "Core Blue", hex: "#054583", light: false },
  { name: "Accent Gold", hex: "#C6A610", light: false },
  { name: "Secondary Blue", hex: "#375995", light: false },
];

const COMP_IMAGES = [
  { src: "/projects/lions-plymouth/components/Group 10123381.png", label: "Action Button" },
  { src: "/projects/lions-plymouth/components/Frame 10123345.png", label: "Campaign Progress" },
  { src: "/projects/lions-plymouth/components/Group 10123382.png", label: "Content Card" },
  { src: "/projects/lions-plymouth/components/Pagination Small.png", label: "Page Navigation" },
  { src: "/projects/lions-plymouth/components/Frame 10123207.png", label: "Testimonial Card" },
  { src: "/projects/lions-plymouth/components/Input.png", label: "Form Input" },
];

const INTERFACES = [
  { src: "/projects/lions-plymouth/Home Page.png", label: "Home" },
  { src: "/projects/lions-plymouth/Events.png", label: "Events" },
  { src: "/projects/lions-plymouth/Donate.png", label: "Donate" },
  { src: "/projects/lions-plymouth/About Us.png", label: "About Us" },
  { src: "/projects/lions-plymouth/Shop Now Page.png", label: "Shop" },
  { src: "/projects/lions-plymouth/Gallery.png", label: "Gallery" },
];

export default function LionsPlymouthProject() {
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
              Jul — Sep 2025 · UX Design · Client Project
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
              Lions Club Plymouth — Community Platform Design
            </h1>
            <p style={{ fontSize: "var(--h2)", fontWeight: 300, lineHeight: 1.55, color: "var(--mid)", maxWidth: "42ch" }}>
              Accessibility-focused UX for an elderly community — clear, readable, and built to serve every user.
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

            <h2>The Problem</h2>
            <p>
              Lions Club Plymouth needed a website that actually worked for its members — most of whom are elderly. The existing digital presence wasn't cutting it. Navigation was confusing, text was too small, and critical information about events, projects, and donations was buried. For a community organisation that relies on member engagement, inaccessibility meant invisibility.
            </p>
            <p>
              The brief was clear: design a platform that any member could use comfortably, regardless of their technical confidence or physical ability. That meant rethinking the entire experience from an accessibility-first perspective.
            </p>

            <h2>Designing for Accessibility</h2>
            <p>
              Every design decision was filtered through one question: can an elderly user navigate this without frustration? That meant generous touch targets, high-contrast text, readable type scales, and a flat information architecture with no more than two clicks to reach any page.
            </p>

            <p>
              I kept the navigation predictable — a consistent top bar with clearly labelled sections. Pages follow a uniform layout rhythm so users build spatial memory quickly. Colour is used to support meaning, never as the sole indicator. The entire design targets WCAG compliance for contrast, readability, and navigability.
            </p>

            <h2>Key Pages</h2>
            <p>
              The platform covers everything the club needs: a welcoming homepage with upcoming events and calls to action, an events section with individual event pages showing status and details, a projects area tracking ongoing and completed community initiatives, a missions page, a donation flow with individual cause pages, a shop for club merchandise, and a gallery to showcase the community's work.
            </p>

            <p>
              Each page was designed to stand on its own while maintaining a cohesive system. The donation flow, for example, had to be simple enough that someone unfamiliar with online payments could complete it confidently. The shop needed to feel familiar — cart, checkout, nothing unexpected.
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
              <p className={roboto.className} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1 }}>
                Roboto
              </p>
              <div className={roboto.className} style={{ display: "flex", gap: "1.5rem", marginTop: ".75rem", marginBottom: "2rem" }}>
                <span style={{ fontSize: "var(--body)", fontWeight: 700 }}>Bold</span>
                <span style={{ fontSize: "var(--body)", fontWeight: 500 }}>Medium</span>
                <span style={{ fontSize: "var(--body)", fontWeight: 400 }}>Regular</span>
              </div>

              {/* Color Palette */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Color Palette
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
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

          {/* ── Core Components ── */}
          <div>
            <div className="sec-head">
              <h2>Core Components</h2>
            </div>

            <div style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {COMP_IMAGES.map((c) => (
                  <div key={c.label}>
                    <img src={c.src} alt={c.label} style={{ width: "100%", borderRadius: 8, border: "1px solid var(--rule)" }} />
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>{c.label}</p>
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
                {INTERFACES.map((item) => (
                  <div key={item.label}>
                    <ImageLightbox
                      src={item.src}
                      alt={`${item.label} page`}
                      style={{ width: "100%", borderRadius: 8, border: "1px solid var(--rule)" }}
                    />
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats + Outcome (inside prose for consistent styling) */}
          <article className="prose">

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
              <Stat value="17" label="Screens designed" />
              <Stat value="WCAG" label="Compliant" />
              <Stat value="Shipped" label="& live" />
            </div>

            <hr />

            <a href="/projects/lions-plymouth/screens" style={{ display: "block", textAlign: "center", padding: "2rem", border: "1px solid var(--rule)", borderRadius: 8, textDecoration: "none", color: "var(--black)", fontWeight: 600, fontSize: "var(--body)" }}>
              View all screens →
            </a>

            <h2>Outcome</h2>
            <p>
              The platform shipped and went live. Lions Club Plymouth now has a digital home that reflects its values — inclusive, welcoming, and usable by everyone. Members can find events, donate to causes, browse the shop, and stay connected with the community, all through an interface designed with their needs at the centre.
            </p>

          </article>

        </div>
      </main>

      {/* Next project */}
      <nav style={{ borderTop: "1px solid var(--rule)", paddingBlock: "2.5rem" }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: "var(--label)", color: "var(--mid)", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 500, marginBottom: ".5rem" }}>
            Next project
          </p>
          <a
            href="/projects/code-club"
            style={{ fontSize: "var(--h2)", fontWeight: 600, letterSpacing: "-.02em", color: "var(--black)", textDecoration: "none" }}
          >
            CodeClub — Admin Portal for StemUp Sri Lanka →
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
