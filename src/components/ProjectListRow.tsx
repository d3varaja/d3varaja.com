"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ProjectListRowItem {
  n: string;
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: string;
  accent: string;
  href: string;
}

interface ProjectListRowProps {
  item: ProjectListRowItem;
  index: number;
  onHoverChange: (slug: string | null) => void;
  /** Optional small uppercase chip rendered before the title (e.g. "Case Study", "Project"). */
  categoryLabel?: string;
}

export default function ProjectListRow({
  item,
  index,
  onHoverChange,
  categoryLabel,
}: ProjectListRowProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & {
        startViewTransition: (cb: () => void) => void;
      }).startViewTransition(() => router.push(item.href));
    } else {
      router.push(item.href);
    }
  };

  return (
    <li
      className="cs-lrow"
      onMouseEnter={() => onHoverChange(item.slug)}
      onMouseLeave={() => onHoverChange(null)}
      style={
        {
          ["--cs-row-accent" as string]: item.accent,
          ["--cs-delay" as string]: `${index * 50}ms`,
        } as React.CSSProperties
      }
    >
      <style>{`
        .cs-lrow {
          list-style: none;
          border-bottom: 1px solid var(--rule);
          position: relative;
          animation: cs-lrow-rise .55s var(--cs-delay, 0ms) both cubic-bezier(.2,.7,.2,1);
        }
        @keyframes cs-lrow-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-lrow-link {
          display: grid;
          grid-template-columns: 36px 1fr auto auto 26px;
          gap: 1.5rem;
          align-items: center;
          padding: 1.4rem 0;
          transition: padding .25s ease;
          color: var(--black);
          text-decoration: none;
        }
        .cs-lrow:hover .cs-lrow-link {
          padding-left: 12px;
        }
        .cs-lrow-n {
          font-size: var(--label);
          color: var(--mid);
          letter-spacing: .12em;
          font-variant-numeric: tabular-nums;
        }
        .cs-lrow-title {
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 700;
          letter-spacing: -.012em;
          line-height: 1.3;
          transition: color .2s ease;
        }
        .cs-lrow-em {
          color: var(--mid);
          font-weight: 500;
        }
        .cs-lrow-tag {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--mid);
          font-variant-numeric: tabular-nums;
          line-height: 1;
          white-space: nowrap;
          text-align: right;
        }
        @media (max-width: 700px) {
          .cs-lrow-tag { display: none; }
        }
        .cs-lrow-year {
          font-size: var(--label);
          color: var(--mid);
          letter-spacing: .08em;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .cs-lrow-arr {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          color: var(--mid);
          transition: color .2s ease, transform .25s cubic-bezier(.16,1,.3,1);
        }
        .cs-lrow:hover .cs-lrow-arr {
          color: var(--cs-row-accent, var(--accent));
          transform: translate(3px, -3px);
        }
        .cs-lrow:hover .cs-lrow-title {
          color: var(--black);
        }
        @media (max-width: 700px) {
          .cs-lrow-link {
            grid-template-columns: 28px 1fr 22px;
            gap: 1rem;
            padding: 1.1rem 0;
          }
          .cs-lrow-year, .cs-lrow-tag { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-lrow { animation: none !important; }
          .cs-lrow:hover .cs-lrow-link { padding-left: 0 !important; }
          .cs-lrow:hover .cs-lrow-arr { transform: none !important; }
        }
      `}</style>

      <Link
        href={item.href}
        className="cs-lrow-link"
        onClick={handleClick}
        aria-label={`${item.title} — ${item.subtitle}, ${item.year}`}
      >
        <span className="cs-lrow-n">{item.n}</span>
        <span className="cs-lrow-title">
          {item.title}{" "}
          <span className="cs-lrow-em">— {item.subtitle}</span>
        </span>
        <span className="cs-lrow-tag" aria-hidden>
          {categoryLabel ?? ""}
        </span>
        <span className="cs-lrow-year">{item.year}</span>
        <span className="cs-lrow-arr" aria-hidden>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </span>
      </Link>
    </li>
  );
}
