import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PillNav from "@/components/PillNav";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on product design, UX, and building digital experiences by Tharun Devaraja.",
  openGraph: {
    title: "Blog — Tharun Devaraja",
    description: "Writing on product design, UX, and building digital experiences.",
  },
};

export default function Blog() {
  const posts = getAllPosts();

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
            <span>({String(posts.length).padStart(2, "0")})</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {posts.map((post) => {
              const formatted = new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              });

              return (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: "2rem",
                    padding: "1.375rem var(--gap)",
                    marginInline: "calc(var(--gap) * -1)",
                    borderTop: "1px solid var(--rule)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "opacity .15s",
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
                      {formatted}
                    </p>
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", letterSpacing: ".04em", marginTop: ".1rem" }}>
                      {post.readTime} read
                    </p>
                  </div>
                </a>
              );
            })}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>

        </div>
      </main>

      <footer style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}>
        <div
          className="wrap"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
        >
          <p style={{ fontSize: "var(--small)", color: "var(--mid)" }}>
            Tharun Devaraja
          </p>
        </div>
      </footer>
    </>
  );
}
