import PillNav from "@/components/PillNav";
import TimelineItem, { type TimelineItemProps } from "@/components/TimelineItem";

const EXPERIENCE: TimelineItemProps[] = [
  {
    company: "Lankans",
    title: "Founder",
    period: "Nov 2023 — Present · 2 yrs",
    location: "Sri Lanka",
    type: "work",
    logo: "/logos/lankans.jpeg",
    bullets: [],
  },
  {
    company: "BitByBit · Part-time",
    title: "UX R&D Contributor",
    period: "Jul 2025 — Present · 8 mos",
    type: "work",
    logo: "/logos/bitbybit.png",
    bullets: [],
  },
  {
    company: "RE24 · Internship",
    title: "Software Developer Intern",
    period: "Jul 2025 — Oct 2025 · 4 mos",
    location: "London, United Kingdom · Remote",
    type: "internship",
    logo: "/logos/re24.png",
    bullets: [
      "Started my summer internship as a software developer intern at RE24, actively contributing and learning while collaborating with the team to support software development efforts.",
    ],
  },
  {
    company: "University of Westminster",
    title: "BSc Computer Science",
    period: "2024 — 2028",
    type: "education",
    logo: "/logos/uow.jpeg",
    bullets: [],
  },
];

const CERTS = [
  { name: "Foundations of User Experience (UX) Design", issuer: "Google", year: "Feb 2026", credentialId: "VOPJ9SQ0295C", href: "https://www.coursera.org/account/accomplishments/verify/VOPJ9SQ0295C" },
];

export default function About() {
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
              About
            </p>
            <h1
              style={{
                fontSize: "var(--display)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.0,
              }}
            >
              Tharun<br />Devaraja
            </h1>
          </div>

          {/* Bio + Info grid */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>Bio</h2>
          </div>

          <div
            className="about-bio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr clamp(0px, 35%, 380px)",
              gap: "0 5rem",
              alignItems: "start",
              paddingTop: "2.5rem",
            }}
          >
            {/* Bio */}
            <div>
              <p
                style={{
                  fontSize: "var(--h2)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  letterSpacing: "-.01em",
                  marginBottom: "1.5rem",
                  maxWidth: "38ch",
                }}
              >
                I'm focused on developing human experiences not just interfaces. I care about how people move through a product, how it feels, and how every detail shapes that journey.
              </p>
              <p
                style={{
                  fontSize: "var(--body)",
                  color: "var(--mid)",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                I work across the full product flow from thinking and strategy to design, development, testing, and refinement. I don't see these as separate roles, but as connected parts of one system.
              </p>
              <p style={{ fontSize: "var(--body)", color: "var(--mid)", lineHeight: 1.8 }}>
                What differentiates me is that I build what I design. I think end-to-end, which allows me to shape experiences with both vision and execution in mind.
              </p>
            </div>

            {/* Info card */}
            <div>
              <InfoRow label="Based"     value="Western Province, Sri Lanka" />
              <InfoRow label="Status"    value="Open to work" />
              <InfoRow label="Education" value="University of Westminster" />
              <InfoRow label="Email"     value="tharunrandiv@gmail.com" href="mailto:tharunrandiv@gmail.com" />

              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {CERTS.map((c, i) => (
                  <div key={i}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "var(--small)", fontWeight: 500, color: "var(--black)", textDecoration: "none", borderBottom: "1px solid var(--rule)" }}
                      >
                        {c.name} ↗
                      </a>
                    ) : (
                      <p style={{ fontSize: "var(--small)", fontWeight: 500 }}>{c.name}</p>
                    )}
                    <p
                      style={{
                        fontSize: "var(--label)",
                        color: "var(--mid)",
                        letterSpacing: ".04em",
                        marginTop: ".1rem",
                      }}
                    >
                      {c.issuer} · {c.year}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ marginTop: "2.5rem", display: "flex", gap: "1.5rem" }}>
                <SocialLink href="https://x.com/d3varaja">X</SocialLink>
                <SocialLink href="https://github.com/d3varaja">GitHub</SocialLink>
                <SocialLink href="https://linkedin.com/in/d3varaja">LinkedIn</SocialLink>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginTop: "clamp(3.5rem, 7vw, 6rem)" }}>
            <div className="sec-head" style={{ paddingTop: 0 }}>
              <h2>Experience</h2>
            </div>
            {EXPERIENCE.map((e, i) => (
              <TimelineItem key={i} {...e} />
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
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
          <a
            href="/"
            style={{ fontSize: "var(--small)", color: "var(--mid)", textDecoration: "none" }}
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

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: ".7rem 0",
        borderBottom: "1px solid var(--rule)",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontSize: "var(--label)",
          color: "var(--mid)",
          letterSpacing: ".08em",
          textTransform: "uppercase",
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      {href ? (
        <a
          href={href}
          style={{
            fontSize: "var(--small)",
            color: "var(--black)",
            textDecoration: "none",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          {value}
        </a>
      ) : (
        <span style={{ fontSize: "var(--small)", color: "var(--black)", textAlign: "right" }}>
          {value}
        </span>
      )}
    </div>
  );
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "var(--small)",
        color: "var(--mid)",
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      {children} ↗
    </a>
  );
}
