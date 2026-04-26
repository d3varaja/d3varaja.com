"use client";

import { useMemo, useRef, useState } from "react";
import PillNav from "@/components/PillNav";
import ProjectListRow, {
  type ProjectListRowItem,
} from "@/components/ProjectListRow";
import CursorPreview from "@/components/CursorPreview";
import SegmentedFilter from "@/components/SegmentedFilter";

type Category = "case-study" | "project" | "exploration";

const CATEGORY_TAG: Record<Category, string> = {
  "case-study": "Case Study",
  project: "Project",
  exploration: "Exploration",
};

interface Project extends ProjectListRowItem {
  blurb?: string;
  category: Category;
  accentBg: string;
  preview: { src: string; alt: string };
}

const PROJECTS: Project[] = [
  {
    n: "01",
    slug: "lions-plymouth",
    title: "Designing for the members most websites forget",
    subtitle: "Lions Club Plymouth",
    tags: ["Accessibility", "UX", "Web"],
    year: "2025",
    category: "case-study",
    accent: "#054583",
    accentBg: "rgba(5, 69, 131, 0.12)",
    preview: {
      src: "/projects/lions-plymouth/hero/Preview.png",
      alt: "Lions Club Plymouth — project preview",
    },
    href: "/projects/lions-plymouth",
  },
  {
    n: "02",
    slug: "crow",
    title: "Designing brand, UI, and a marketing film for a B2B AI product",
    subtitle: "Project CROW",
    tags: ["Platform", "AI", "Frontend"],
    year: "2025–2026",
    category: "case-study",
    accent: "#7C3AED",
    accentBg: "rgba(124, 58, 237, 0.14)",
    preview: {
      src: "/projects/crow/hero/Preview.png",
      alt: "CROW landing page on a laptop with the CROW wordmark behind it",
    },
    href: "/projects/crow",
  },
  {
    n: "03",
    slug: "med-essence",
    title: "Med-Essence",
    subtitle: "Offline-First Healthcare App",
    tags: ["Mobile", "AI/ML", "Health"],
    year: "2025",
    category: "project",
    accent: "#FF6B6B",
    accentBg: "rgba(255, 107, 107, 0.14)",
    preview: {
      src: "/projects/med-essence/Home screen.png",
      alt: "Med-Essence home screen",
    },
    href: "/projects/med-essence",
  },
  {
    n: "04",
    slug: "orator",
    title: "Orator",
    subtitle: "Accessibility-First Reading Companion",
    tags: ["Accessibility", "Reading", "A11y"],
    year: "2025",
    category: "project",
    accent: "#1a1a2e",
    accentBg: "rgba(26, 26, 46, 0.10)",
    preview: {
      src: "/projects/orator/Orator-ss-1.png",
      alt: "Orator app screenshot",
    },
    href: "/projects/orator",
  },
  {
    n: "05",
    slug: "code-club",
    title: "CodeClub",
    subtitle: "Admin Portal for StemUp Sri Lanka",
    tags: ["Education", "Admin", "UX"],
    year: "2025",
    category: "project",
    accent: "#41B553",
    accentBg: "rgba(65, 181, 83, 0.14)",
    preview: {
      src: "/projects/code-club/Code Clubs - Code Clubs Dashboard.png",
      alt: "CodeClub admin dashboard",
    },
    href: "/projects/code-club",
  },
  {
    n: "06",
    slug: "olo",
    title: "The story of OLO",
    subtitle: "An exploration in playful AI companions",
    tags: ["AI", "Character", "Web"],
    year: "2026",
    category: "exploration",
    accent: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.14)",
    preview: {
      src: "/olo/olo-animations/big-eye/olo-puppet.png",
      alt: "OLO, the puppet AI companion",
    },
    href: "/projects/olo",
  },
];

const CATEGORY_LABELS: Record<Category | "all", string> = {
  all: "All Work",
  "case-study": "Case Studies",
  project: "Projects",
  exploration: "Explorations",
};

export default function ProjectsListClient() {
  const [active, setActive] = useState<Category | "all">("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === active),
    [active]
  );

  const categories = useMemo(() => {
    const counts: Record<Category, number> = {
      "case-study": 0,
      project: 0,
      exploration: 0,
    };
    PROJECTS.forEach((p) => {
      counts[p.category] += 1;
    });
    return [
      { id: "all", label: CATEGORY_LABELS.all, count: PROJECTS.length },
      { id: "case-study", label: CATEGORY_LABELS["case-study"], count: counts["case-study"] },
      { id: "project", label: CATEGORY_LABELS.project, count: counts.project },
      { id: "exploration", label: CATEGORY_LABELS.exploration, count: counts.exploration },
    ];
  }, []);

  const hovered = hoveredSlug
    ? PROJECTS.find((p) => p.slug === hoveredSlug) ?? null
    : null;

  const onMouseMove = (e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const headerLabel =
    active === "all"
      ? CATEGORY_LABELS.all
      : CATEGORY_LABELS[active as Category];

  return (
    <>
      <PillNav />

      <main
        ref={wrapRef}
        onMouseMove={onMouseMove}
        style={{
          minHeight: "100svh",
          paddingTop: "clamp(5rem, 10vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
          position: "relative",
        }}
      >
        <div className="wrap">
          {/* ─── Hero ─── */}
          <div style={{ paddingBottom: "clamp(1.25rem, 2.5vw, 2rem)" }}>
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
              Selected Work
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
              Projects
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--mid)",
                maxWidth: "44ch",
                margin: "1.25rem 0 0",
                lineHeight: 1.55,
              }}
            >
              Case studies, shipped products, and the small things in
              between — 2024 to now.
            </p>
          </div>

          {/* ─── Optional category filter ─── */}
          <SegmentedFilter
            active={active}
            categories={categories}
            onChange={(id) => setActive(id as Category | "all")}
          />

          {/* ─── List head ─── */}
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <h2>{headerLabel}</h2>
            <span>({String(filtered.length).padStart(2, "0")})</span>
          </div>

          {/* ─── List ─── */}
          {filtered.length > 0 ? (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {filtered.map((p, i) => (
                <ProjectListRow
                  key={p.slug}
                  item={p}
                  index={i}
                  onHoverChange={setHoveredSlug}
                  categoryLabel={
                    active === "all" ? CATEGORY_TAG[p.category] : undefined
                  }
                />
              ))}
            </ul>
          ) : (
            <div
              style={{
                padding: "clamp(3rem, 8vw, 5rem) 0",
                textAlign: "center",
                color: "var(--mid)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--label)",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  margin: "0 0 .65rem",
                }}
              >
                Coming soon
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  margin: 0,
                  maxWidth: "32ch",
                  marginInline: "auto",
                  lineHeight: 1.55,
                }}
              >
                Nothing in this category yet — explorations and side
                projects are on the way.
              </p>
            </div>
          )}

        </div>

        {/* Floating cursor preview (desktop only, gated inside the component) */}
        <CursorPreview
          src={hovered?.preview.src ?? null}
          alt={hovered?.preview.alt ?? ""}
          accentBg={hovered?.accentBg ?? "rgba(0,0,0,0)"}
          accent={hovered?.accent ?? "#000"}
          position={cursor}
        />
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
