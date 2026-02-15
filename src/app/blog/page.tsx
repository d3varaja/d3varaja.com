import PillNav from "@/components/PillNav";

const POSTS = [
  { title: "Article title goes here", date: "Month 2025", readTime: "— min", href: "#" },
  { title: "Article title goes here", date: "Month 2025", readTime: "— min", href: "#" },
  { title: "Article title goes here", date: "Month 2025", readTime: "— min", href: "#" },
];

export default function Blog() {
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
              Writing
            </p>
            <h1
              style={{
                fontSize: "var(--display)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.0,
              }}
            >
              Blog
            </h1>
          </div>

          {/* Post list */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>All Posts</h2>
            <span>({String(POSTS.length).padStart(2, "0")})</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {POSTS.map((post, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  gap: "2rem",
                  padding: "1.375rem var(--gap)",
                  marginInline: "calc(var(--gap) * -1)",
                  borderTop: "1px solid var(--rule)",
                  opacity: 0.28,
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(1.0625rem, 2vw, 1.375rem)",
                    fontWeight: 600,
                    letterSpacing: "-.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {post.title}
                </span>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: "var(--small)", color: "var(--mid)", whiteSpace: "nowrap" }}>
                    {post.date}
                  </p>
                  <p style={{ fontSize: "var(--label)", color: "var(--mid)", letterSpacing: ".04em", marginTop: ".1rem" }}>
                    {post.readTime} read
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>

          {/* Coming soon note */}
          <p
            style={{
              marginTop: "2rem",
              fontSize: "var(--small)",
              color: "var(--mid)",
              fontStyle: "italic",
            }}
          >
            Writing coming soon — check back later.
          </p>

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
