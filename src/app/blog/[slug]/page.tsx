import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import PillNav from "@/components/PillNav";
import LikeButton from "@/components/LikeButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} — Tharun Devaraja`,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          {/* Article header */}
          <header style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <h1
              style={{
                fontSize: "var(--h1)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: "var(--small)",
                color: "var(--mid)",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <span>{formattedDate}</span>
              <span>{post.readTime} read</span>
            </p>
          </header>

          {/* Article body */}
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Like button */}
          <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)", display: "flex", justifyContent: "center" }}>
            <LikeButton slug={slug} />
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
