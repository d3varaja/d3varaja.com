"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import ImageLightbox from "@/components/ImageLightbox";

/* ──────────────────────────────────────────────────────────────────── */
/* Outer wrapper                                                        */
/* ──────────────────────────────────────────────────────────────────── */

interface CaseStudyLayoutProps {
  children: ReactNode;
  /** Hex like "#054583". Overrides the global burnt-orange accent for this case study only. */
  accent?: string;
  /** Optional rgba tint matching the accent (defaults to a soft alpha derived from accent if omitted). */
  accentSoft?: string;
  /** Page background colour. When set, also forces the body background and hides the global paper-grain overlay. */
  background?: string;
  /** Primary body text colour. Falls back to --black. */
  text?: string;
  /** Headline (H1/H2/H3) colour. Falls back to text, then to --black. */
  headlineText?: string;
  /** Muted text colour for labels, captions, metadata. Falls back to --mid. */
  textMuted?: string;
  /** Border/divider colour. Falls back to --rule. */
  rule?: string;
  /** Surface colour for cards, figures, hero stage, carousel slides. Falls back to --white. */
  surface?: string;
  /** Full font-family stack applied to <main>. Falls back to the global --font (Inter). */
  fontFamily?: string;
  /** Full font-family stack applied to display headlines (H1/H2/H3). Falls back to fontFamily, then to global --font. */
  headlineFontFamily?: string;
}

export function CaseStudyLayout({
  children,
  accent,
  accentSoft,
  background,
  text,
  headlineText,
  textMuted,
  rule,
  surface,
  fontFamily,
  headlineFontFamily,
}: CaseStudyLayoutProps) {
  const themeVars: Record<string, string> = {};
  if (accent) themeVars["--cs-accent"] = accent;
  if (accentSoft) themeVars["--cs-accent-soft"] = accentSoft;
  if (background) themeVars["--cs-bg"] = background;
  if (text) themeVars["--cs-text"] = text;
  if (headlineText) themeVars["--cs-headline"] = headlineText;
  if (textMuted) themeVars["--cs-text-muted"] = textMuted;
  if (rule) themeVars["--cs-rule"] = rule;
  if (surface) themeVars["--cs-surface"] = surface;
  if (fontFamily) themeVars["--cs-font"] = fontFamily;
  if (headlineFontFamily) themeVars["--cs-headline-font"] = headlineFontFamily;

  // Scroll-reveal: fade + translate visual blocks (.cs-reveal) into view once.
  // Respects prefers-reduced-motion. Hero is exempt — it has its own fade-in animation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>(".cs-reveal");
    if (reduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {background && (
        <style>{`
          body {
            background: ${background} !important;
            background-attachment: fixed !important;
          }
          body::before { display: none !important; }
        `}</style>
      )}
      <style>{`
        /* Scroll-reveal */
        .cs-reveal {
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity .8s cubic-bezier(.16,1,.3,1),
            transform .8s cubic-bezier(.16,1,.3,1);
          will-change: opacity, transform;
        }
        .cs-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-reveal { opacity: 1; transform: none; transition: none; }
        }

        /* Hero pill link soft hover lift */
        .cs-pill-link {
          transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s ease;
          will-change: transform;
        }
        .cs-pill-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -12px rgba(0,0,0,.45);
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-pill-link, .cs-pill-link:hover { transform: none; }
        }

        /* Section serial number — auto-numbered via CSS counter on .wrap */
        .cs-section-num::before {
          counter-increment: cs-section;
          content: counter(cs-section, decimal-leading-zero);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: .14em;
          color: var(--cs-text-muted, var(--mid));
          opacity: .9;
        }
        .cs-section-rule {
          flex: 0 0 28px;
          height: 1px;
          background: var(--cs-text-muted, var(--mid));
          opacity: .35;
        }
        @media (max-width: 480px) {
          .cs-section-num::before, .cs-section-rule { display: none; }
          .cs-section-head { gap: 0 !important; }
        }
      `}</style>
      <main
        style={{
          minHeight: "100svh",
          paddingTop: "clamp(5rem, 10vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
          background: "var(--cs-bg, transparent)",
          color: "var(--cs-text, var(--black))",
          fontFamily: "var(--cs-font, var(--font))",
          ...(themeVars as CSSProperties),
        }}
      >
        <div
          className="wrap"
          style={{
            maxWidth: 960,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(3.5rem, 7vw, 6rem)",
            counterReset: "cs-section",
          }}
        >
          {children}
        </div>
      </main>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Hero                                                                 */
/* ──────────────────────────────────────────────────────────────────── */

interface HeroImage {
  src: string;
  alt: string;
  /** Optional short label shown in the hero meta line — e.g. "Homepage" */
  label?: string;
}

interface HeroMeta {
  label: string;
  value: string;
  href?: string;
  /** When the hero uses metaCard layout, this entry spans 2 grid columns (good for long values). */
  wide?: boolean;
}

interface HeroLink {
  label: string;
  href: string;
}

interface HeroVideoSource {
  src: string;
  /** Optional poster image shown before/over the video. */
  poster?: string;
  /** Aspect ratio override; defaults to "1440 / 808" to match the image hero stage. */
  aspectRatio?: string;
}

interface HeroProps {
  title: string;
  meta: HeroMeta[];
  /** Image carousel hero. Mutually exclusive with `heroVideo`; if both are passed, video wins. */
  images?: HeroImage[];
  /** Auto-loop muted video hero (no controls). Mutually exclusive with `images`. */
  heroVideo?: HeroVideoSource;
  /** Optional pill links shown directly under the title (e.g. Live Site, Behance, GitHub) */
  links?: HeroLink[];
  /** When true, render metadata inside a bordered card with a CSS grid layout instead of the default flex-wrap line. */
  metaCard?: boolean;
}

export function CaseStudyHero({ title, meta, images, heroVideo, links, metaCard }: HeroProps) {
  return (
    <header
      className="cs-hero-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(2rem, 4vw, 3rem)",
      }}
    >
      <style>{`
        @keyframes cs-hero-fade-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-hero-fade-in {
          animation: cs-hero-fade-in 700ms cubic-bezier(.16,1,.3,1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-hero-fade-in { animation: none; }
        }
      `}</style>
      <h1
        style={{
          fontSize: "var(--display)",
          fontWeight: 800,
          letterSpacing: "-.04em",
          lineHeight: 1.02,
          maxWidth: "20ch",
          color: "var(--cs-headline, var(--cs-text, var(--black)))",
          margin: 0,
          fontFamily: "var(--cs-headline-font, var(--cs-font, var(--font)))",
          fontOpticalSizing: "auto",
        }}
      >
        {title}
      </h1>

      {links && links.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".75rem",
            marginTop: "-.75rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-pill-link"
              style={{
                fontSize: "var(--small)",
                fontWeight: 600,
                color: "var(--cs-surface, var(--white))",
                background: "var(--cs-text, var(--black))",
                textDecoration: "none",
                padding: ".5rem 1.25rem",
                borderRadius: "99px",
                display: "inline-flex",
                alignItems: "center",
                gap: ".4rem",
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      {heroVideo ? (
        <HeroVideo source={heroVideo} />
      ) : images && images.length > 0 ? (
        <HeroShowcase slides={images} />
      ) : null}

      {metaCard ? (
        <dl
          className="cs-meta-card"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${meta.length}, minmax(0, 1fr))`,
            gridTemplateRows: "auto auto",
            columnGap: "2.25rem",
            rowGap: ".75rem",
            padding: "1.75rem 2rem 1.85rem",
            background:
              "var(--cs-accent-soft, var(--accent-soft, rgba(12,12,12,.03)))",
            border: "1px solid var(--cs-rule, var(--rule))",
            borderRadius: 14,
            margin: 0,
            position: "relative",
          }}
        >
          <style>{`
            .cs-meta-card { --cs-meta-cols: ${meta.length}; }
            .cs-meta-card::before {
              content: "";
              position: absolute;
              top: -1px;
              left: 1.85rem;
              width: 36px;
              height: 2px;
              background: var(--cs-accent, var(--accent));
              border-radius: 0 0 4px 4px;
            }
            @media (max-width: 900px) {
              .cs-meta-card {
                grid-template-columns: repeat(min(var(--cs-meta-cols), 3), minmax(0, 1fr)) !important;
              }
              .cs-meta-card dt, .cs-meta-card dd { grid-column: auto !important; grid-row: auto !important; }
              .cs-meta-card .cs-meta-pair { display: contents; }
            }
            @media (max-width: 560px) {
              .cs-meta-card {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
            }
            @media (max-width: 380px) {
              .cs-meta-card {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          {meta.map((m, i) => (
            <Fragment key={m.label}>
              <dt
                style={{
                  gridRow: 1,
                  gridColumn: i + 1,
                  fontSize: "var(--label)",
                  fontWeight: 600,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--cs-text-muted, var(--mid))",
                  margin: 0,
                  alignSelf: "end",
                }}
              >
                {m.label}
              </dt>
              <dd
                style={{
                  gridRow: 2,
                  gridColumn: i + 1,
                  fontSize: "var(--small)",
                  fontWeight: 600,
                  color: "var(--cs-text, var(--black))",
                  margin: 0,
                  lineHeight: 1.5,
                  fontVariantNumeric: "tabular-nums",
                  minWidth: 0,
                  hyphens: "auto",
                  overflowWrap: "break-word",
                }}
              >
                {m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "inherit",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textDecorationThickness: 1,
                    }}
                  >
                    {m.value} ↗
                  </a>
                ) : (
                  m.value
                )}
              </dd>
            </Fragment>
          ))}
        </dl>
      ) : (
        <dl
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem 2.25rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--cs-rule, var(--rule))",
            margin: 0,
          }}
        >
          {meta.map((m) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".4rem",
                minWidth: 0,
              }}
            >
              <dt
                style={{
                  fontSize: "var(--label)",
                  fontWeight: 500,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--cs-text-muted, var(--mid))",
                }}
              >
                {m.label}
              </dt>
              <dd
                style={{
                  fontSize: "var(--small)",
                  fontWeight: 600,
                  color: "var(--cs-text, var(--black))",
                  margin: 0,
                  lineHeight: 1.45,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "inherit",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textDecorationThickness: 1,
                    }}
                  >
                    {m.value} ↗
                  </a>
                ) : (
                  m.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* HeroShowcase — looping crossfade carousel with autoplay + thumbs     */
/* ──────────────────────────────────────────────────────────────────── */

const AUTOPLAY_MS = 5000;

function HeroShowcase({ slides }: { slides: HeroImage[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const count = slides.length;

  // Respect prefers-reduced-motion (disable autoplay)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAutoplay(!mql.matches);
    const onChange = () => setAutoplay(!mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Autoplay tick — re-runs on `active` change so manual nav resets the clock
  useEffect(() => {
    if (count <= 1 || !autoplay || paused) return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, count, autoplay, paused]);

  const goTo = (i: number) => {
    setActive(((i % count) + count) % count);
  };

  const current = slides[active];
  const showProgress = count > 1 && autoplay && !paused;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <style>{`
        .cs-hero-thumbs::-webkit-scrollbar { display: none; }

        /* Crossfade slide transition */
        .cs-hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: scale(1.04);
          transition:
            opacity 800ms cubic-bezier(.16,1,.3,1),
            transform 1200ms cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .cs-hero-slide.is-active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
          pointer-events: auto;
        }

        /* Autoplay progress bar — re-mounts each slide via key, replaying the animation */
        @keyframes cs-hero-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .cs-hero-progress {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 100%;
          background: var(--cs-accent, var(--accent));
          transform: scaleX(0);
          transform-origin: left;
          z-index: 5;
          animation: cs-hero-progress ${AUTOPLAY_MS}ms linear forwards;
        }

        /* Thumb hover */
        .cs-hero-thumb {
          transition: opacity .25s ease, transform .35s cubic-bezier(.16,1,.3,1), border-color .25s ease;
        }
        .cs-hero-thumb:hover { opacity: 1 !important; transform: translateY(-2px); }

        /* Arrows */
        .cs-hero-arrow {
          transition: transform .2s cubic-bezier(.16,1,.3,1), opacity .2s ease, background .2s ease, outline-color .2s ease;
          outline: 1px solid transparent;
          outline-offset: 3px;
        }
        .cs-hero-arrow:hover {
          transform: translateY(-50%) scale(1.08);
          outline-color: var(--cs-accent, var(--accent));
        }

        /* Counter number / label swap */
        @keyframes cs-counter-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-counter-num { animation: cs-counter-in 350ms cubic-bezier(.16,1,.3,1); }
        .cs-counter-label { animation: cs-counter-in 450ms cubic-bezier(.16,1,.3,1); }

        @media (max-width: 640px) {
          .cs-hero-arrow { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-hero-slide {
            transition: opacity 200ms ease;
            transform: none !important;
          }
          .cs-hero-progress { display: none; }
          .cs-counter-num, .cs-counter-label { animation: none; }
        }
      `}</style>

      {/* Stage */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          position: "relative",
          borderRadius: 14,
          border: "1px solid var(--cs-rule, var(--rule))",
          background: "var(--cs-surface, var(--white))",
          overflow: "hidden",
          width: "100%",
          aspectRatio: "1440 / 808",
          boxShadow:
            "0 30px 60px -24px rgba(12,12,12,.18), 0 12px 24px -16px rgba(12,12,12,.10)",
        }}
      >
        {slides.map((s, i) => {
          const isActive = i === active;
          return (
            <div
              key={s.src + i}
              className={`cs-hero-slide${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
            >
              {isActive ? (
                <ImageLightbox
                  src={s.src}
                  alt={s.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 0%",
                    display: "block",
                  }}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={s.src}
                  alt=""
                  aria-hidden
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 0%",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          );
        })}

        {showProgress && (
          <div key={`progress-${active}`} className="cs-hero-progress" />
        )}

        {count > 1 && (
          <>
            <HeroArrow direction="prev" onClick={() => goTo(active - 1)} />
            <HeroArrow direction="next" onClick={() => goTo(active + 1)} />
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {count > 1 && (
        <div
          className="cs-hero-thumbs"
          style={{
            display: "flex",
            gap: ".5rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: 2,
          }}
        >
          {slides.map((s, i) => (
            <button
              key={s.src + "-thumb"}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}${s.label ? ` — ${s.label}` : ""}`}
              className="cs-hero-thumb"
              style={{
                flex: "1 1 0",
                minWidth: 64,
                aspectRatio: "16 / 11",
                borderRadius: 8,
                border:
                  i === active
                    ? "2px solid var(--cs-accent, var(--accent))"
                    : "1px solid var(--cs-rule, var(--rule))",
                padding: 0,
                overflow: "hidden",
                background: "var(--cs-surface, var(--white))",
                opacity: i === active ? 1 : 0.5,
                cursor: "pointer",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 0%",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Meta line */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: "var(--small)",
          color: "var(--cs-text-muted, var(--mid))",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span key={`num-${active}`} className="cs-counter-num">
          <span style={{ color: "var(--cs-text, var(--black))", fontWeight: 700 }}>
            {String(active + 1).padStart(2, "0")}
          </span>
          <span style={{ opacity: 0.55 }}>
            {" / "}
            {String(count).padStart(2, "0")}
          </span>
        </span>
        {current.label && (
          <span
            key={`lbl-${active}`}
            className="cs-counter-label"
            style={{
              fontSize: "var(--label)",
              fontWeight: 500,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--cs-text-muted, var(--mid))",
            }}
          >
            {current.label}
          </span>
        )}
      </div>
    </div>
  );
}

function HeroArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      className="cs-hero-arrow"
      style={{
        position: "absolute",
        top: "50%",
        [isPrev ? "left" : "right"]: "1rem",
        transform: "translateY(-50%)",
        width: 42,
        height: 42,
        borderRadius: "50%",
        border: "none",
        background: "rgba(12,12,12,.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: "var(--white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,.18)",
        zIndex: 6,
      } as CSSProperties}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isPrev ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* HeroVideo — auto-loop muted hero (no controls)                       */
/* ──────────────────────────────────────────────────────────────────── */

function HeroVideo({ source }: { source: HeroVideoSource }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 14,
        border: "1px solid var(--cs-rule, var(--rule))",
        background: "var(--cs-surface, var(--white))",
        overflow: "hidden",
        width: "100%",
        aspectRatio: source.aspectRatio ?? "1440 / 808",
        boxShadow:
          "0 30px 60px -24px rgba(12,12,12,.18), 0 12px 24px -16px rgba(12,12,12,.10)",
      }}
    >
      <video
        src={source.src}
        poster={source.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* VideoEmbed — full-width video with native controls                   */
/* ──────────────────────────────────────────────────────────────────── */

interface VideoEmbedProps {
  /** Direct video file URL (mp4/webm). Mutually exclusive with `youtubeId`. */
  src?: string;
  /** YouTube video ID (e.g. "FJOhz6GuBeo"). When set, renders a YouTube iframe. */
  youtubeId?: string;
  poster?: string;
  /** Optional title shown above the video as a FigureTitle. */
  title?: string;
  /** Optional caption shown below the video. */
  caption?: string;
  /** Aspect ratio (defaults to "16 / 9"). */
  aspectRatio?: string;
}

export function VideoEmbed({
  src,
  youtubeId,
  poster,
  title,
  caption,
  aspectRatio = "16 / 9",
}: VideoEmbedProps) {
  return (
    <figure className="cs-reveal" style={{ margin: 0, display: "flex", flexDirection: "column", gap: ".75rem" }}>
      {title && <FigureTitle align="start">{title}</FigureTitle>}
      <div
        style={{
          width: "100%",
          aspectRatio,
          borderRadius: 10,
          border: "1px solid var(--cs-rule, var(--rule))",
          background: "var(--cs-surface, var(--white))",
          overflow: "hidden",
        }}
      >
        {youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title={title ?? "Embedded video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              background: "#000",
            }}
          />
        ) : src ? (
          <video
            src={src}
            poster={poster}
            controls
            preload="metadata"
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              background: "#000",
            }}
          />
        ) : null}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Carousel                                                             */
/* ──────────────────────────────────────────────────────────────────── */

interface CarouselSlide {
  src: string;
  alt: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  /** "cover" crops to aspectRatio (good for hero shots). "contain" preserves the image's natural aspect within a fixed-height frame. */
  fit?: "cover" | "contain";
  /** Used when fit="cover" */
  aspectRatio?: string;
  /** Used when fit="contain" — frame height in px */
  maxHeight?: number;
  /** Optional artifact title shown above the track */
  title?: string;
  /** Optional caption shown below the track */
  caption?: string;
}

export function Carousel({
  slides,
  fit = "cover",
  aspectRatio = "16 / 10",
  maxHeight = 640,
  title,
  caption,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = slides.length;
  const isCover = fit === "cover";

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setActive((prev) => (prev === i ? prev : i));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(count - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
      {title && <FigureTitle align="start">{title}</FigureTitle>}

      <div style={{ position: "relative" }}>
        <div
          ref={trackRef}
          className="cs-carousel-track"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            borderRadius: 12,
          }}
        >
          <style>{`
            .cs-carousel-track::-webkit-scrollbar { display: none; }
            @media (max-width: 640px) {
              .cs-carousel-arrow { display: none !important; }
            }
          `}</style>
          {slides.map((s, i) => (
            <div
              key={s.src + i}
              style={{
                flex: "0 0 100%",
                scrollSnapAlign: "start",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  ...(isCover
                    ? { aspectRatio }
                    : {
                        height: maxHeight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1.5rem",
                      }),
                  borderRadius: 12,
                  border: "1px solid var(--cs-rule, var(--rule))",
                  background: "var(--cs-surface, var(--white))",
                  overflow: "hidden",
                }}
              >
                <ImageLightbox
                  src={s.src}
                  alt={s.alt}
                  style={{
                    width: isCover ? "100%" : "auto",
                    height: isCover ? "100%" : "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: isCover ? "cover" : "contain",
                    display: "block",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <ArrowButton
              direction="prev"
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
            />
            <ArrowButton
              direction="next"
              onClick={() => scrollTo(active + 1)}
              disabled={active === count - 1}
            />
          </>
        )}
      </div>

      {count > 1 && (
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            justifyContent: "center",
            marginTop: ".5rem",
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                border: "none",
                borderRadius: 4,
                background:
                  i === active
                    ? "var(--cs-accent, var(--accent))"
                    : "var(--cs-rule, rgba(12,12,12,.18))",
                padding: 0,
                transition: "all .25s",
              }}
            />
          ))}
        </div>
      )}

      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const isPrev = direction === "prev";
  const positionStyle: CSSProperties = isPrev ? { left: "1rem" } : { right: "1rem" };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      className="cs-carousel-arrow"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "none",
        background: "var(--cs-text, var(--black))",
        color: "var(--cs-surface, var(--white))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.35 : 1,
        transition: "opacity .15s",
        boxShadow: "0 2px 12px rgba(0,0,0,.15)",
        ...positionStyle,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isPrev ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Section — generic labelled section                                   */
/* ──────────────────────────────────────────────────────────────────── */

interface SectionProps {
  label: string;
  headline: string;
  children?: ReactNode;
}

export function Section({ label, headline, children }: SectionProps) {
  return (
    <section
      className="cs-reveal"
      style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          className="cs-section-head"
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
          }}
        >
          <span className="cs-section-num" aria-hidden />
          <span className="cs-section-rule" aria-hidden />
          <p
            style={{
              fontSize: "var(--label)",
              fontWeight: 500,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--cs-accent, var(--accent))",
              margin: 0,
            }}
          >
            {label}
          </p>
        </div>
        <h2
          style={{
            fontSize: "clamp(1.625rem, 3.2vw, 2.375rem)",
            fontWeight: 700,
            letterSpacing: "-.035em",
            lineHeight: 1.12,
            color: "var(--cs-headline, var(--cs-text, var(--black)))",
            margin: 0,
            maxWidth: "22ch",
            fontFamily: "var(--cs-headline-font, var(--cs-font, var(--font)))",
            fontOpticalSizing: "auto",
          }}
        >
          {headline}
        </h2>
      </div>

      {children}
    </section>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "var(--body)",
        lineHeight: 1.7,
        color: "var(--cs-text, var(--black))",
        maxWidth: "62ch",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

interface HMWProps {
  children: ReactNode;
  /** When true, the quote uses the page accent colour for both border and text — used for italicised pull quotes (CROW). */
  accentText?: boolean;
}

export function HMW({ children, accentText }: HMWProps) {
  const colour = accentText
    ? "var(--cs-accent, var(--accent))"
    : "var(--cs-text, var(--black))";
  return (
    <p
      style={{
        fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)",
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: 1.55,
        color: colour,
        borderLeft: `3px solid ${colour}`,
        paddingLeft: "1.25rem",
        maxWidth: "52ch",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

interface SubBlockProps {
  title: string;
  children: ReactNode;
}

export function SubBlock({ title, children }: SubBlockProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        maxWidth: "62ch",
      }}
    >
      <p
        style={{
          fontSize: "var(--label)",
          fontWeight: 600,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          color: "var(--cs-text-muted, var(--mid))",
          margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: "var(--body)",
          lineHeight: 1.65,
          color: "var(--cs-text, var(--black))",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Figure — single image with optional caption                          */
/* ──────────────────────────────────────────────────────────────────── */

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  /** Clear name for the artifact — e.g. "Affinity Diagram", "Sitemap" */
  title?: string;
  size?: "wide" | "narrow";
  /** For portrait / phone-screenshot style images: caps height and centers */
  tall?: boolean;
}

export function Figure({ src, alt, caption, title, size = "wide", tall }: FigureProps) {
  return (
    <figure
      className="cs-reveal"
      style={{
        margin: 0,
        maxWidth: size === "narrow" ? 720 : "100%",
        display: "flex",
        flexDirection: "column",
        gap: ".75rem",
        alignItems: tall ? "center" : "stretch",
      }}
    >
      {title && <FigureTitle align={tall ? "center" : "start"}>{title}</FigureTitle>}
      <ImageLightbox
        src={src}
        alt={alt}
        style={{
          width: tall ? "auto" : "100%",
          maxWidth: "100%",
          height: "auto",
          maxHeight: tall ? 600 : undefined,
          borderRadius: 10,
          border: "1px solid var(--cs-rule, var(--rule))",
          display: "block",
        }}
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

interface FigureRowProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
    /** Short uppercase label rendered above this individual image (e.g. "BEFORE", "WITH CROW", "ROUND 1"). */
    label?: string;
  }[];
  caption?: string;
  /** Clear name for the artifact — e.g. "User Personas", "Donating via WhatsApp" */
  title?: string;
  /** For portrait / phone-screenshot style images: caps height and centers each image in its column */
  tall?: boolean;
}

export function FigureRow({ images, caption, title, tall }: FigureRowProps) {
  return (
    <div className="cs-reveal" style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
      {title && <FigureTitle align="start">{title}</FigureTitle>}
      <div
        className="cs-figure-row"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${images.length}, 1fr)`,
          gap: "1rem",
          alignItems: "start",
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .cs-figure-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
        {images.map((img, i) => (
          <figure
            key={img.src + i}
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              alignItems: tall ? "center" : "stretch",
            }}
          >
            {img.label && <FigureTitle align="start">{img.label}</FigureTitle>}
            <ImageLightbox
              src={img.src}
              alt={img.alt}
              style={{
                width: tall ? "auto" : "100%",
                maxWidth: "100%",
                height: "auto",
                maxHeight: tall ? 540 : undefined,
                borderRadius: 10,
                border: "1px solid var(--cs-rule, var(--rule))",
                display: "block",
              }}
            />
            {img.caption && <Caption>{img.caption}</Caption>}
          </figure>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}

function FigureTitle({
  children,
  align = "start",
}: {
  children: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <p
      style={{
        fontSize: "var(--label)",
        fontWeight: 800,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "var(--cs-accent, var(--accent-purple))",
        margin: 0,
        textAlign: align === "center" ? "center" : "left",
      }}
    >
      {children}
    </p>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption
      style={{
        maxWidth: "64ch",
        margin: ".25rem 0 0",
        padding: ".25rem 0 .25rem 1.1rem",
        borderLeft: "2px solid var(--cs-accent, var(--accent))",
        fontSize: "1rem",
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: 1.55,
        letterSpacing: ".005em",
        color: "var(--cs-text, rgba(12,12,12,.82))",
      }}
    >
      {children}
    </figcaption>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Gallery — Solution screens                                           */
/* ──────────────────────────────────────────────────────────────────── */

interface GalleryImage {
  src: string;
  alt: string;
  /** Optional caption shown below the thumbnail (e.g. "Events", "Donate") */
  label?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  caption?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Optional purple FigureTitle shown above the grid (e.g. "Core Screens") */
  title?: string;
}

export function Gallery({
  images,
  caption,
  viewAllHref,
  viewAllLabel = "View all screens →",
  title,
}: GalleryProps) {
  return (
    <div className="cs-reveal" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {title && <FigureTitle align="start">{title}</FigureTitle>}
      <div
        className="cs-gallery"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem 1.25rem",
          alignItems: "start",
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .cs-gallery { grid-template-columns: 1fr !important; }
          }
          .cs-gallery-fig {
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: .65rem;
          }
          .cs-gallery img {
            transform-origin: center center;
            transition:
              transform .5s cubic-bezier(.16,1,.3,1),
              box-shadow .5s ease,
              outline-color .3s ease !important;
            outline: 1px solid transparent;
            outline-offset: 4px;
          }
          .cs-gallery-fig:hover img {
            transform: scale(1.04) translateY(-3px) !important;
            box-shadow: 0 28px 60px -16px rgba(12,12,12,.34) !important;
            outline-color: var(--cs-accent, var(--accent));
            z-index: 2;
            position: relative;
          }
          .cs-gallery-cap {
            font-size: var(--small);
            font-weight: 500;
            color: var(--cs-text-muted, var(--mid));
            text-align: center;
            margin: 0;
            letter-spacing: .01em;
            transition: transform .35s cubic-bezier(.16,1,.3,1), color .25s ease;
          }
          .cs-gallery-fig:hover .cs-gallery-cap {
            transform: translateY(-2px);
            color: var(--cs-text, var(--black));
          }
          @media (prefers-reduced-motion: reduce) {
            .cs-gallery img,
            .cs-gallery-fig:hover img,
            .cs-gallery-cap,
            .cs-gallery-fig:hover .cs-gallery-cap {
              transform: none !important;
              transition: none !important;
            }
          }
        `}</style>
        {images.map((img, i) => (
          <figure key={img.src + i} className="cs-gallery-fig">
            <ImageLightbox
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 10,
                border: "1px solid var(--cs-rule, var(--rule))",
                display: "block",
              }}
            />
            {img.label && (
              <figcaption className="cs-gallery-cap">{img.label}</figcaption>
            )}
          </figure>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
      {viewAllHref && (
        <div style={{ marginTop: ".5rem" }}>
          <PillLink href={viewAllHref}>{viewAllLabel}</PillLink>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* PillLink                                                             */
/* ──────────────────────────────────────────────────────────────────── */

interface PillLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
}

export function PillLink({ href, children, external }: PillLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".4rem",
        fontSize: "var(--small)",
        fontWeight: 600,
        color: "var(--cs-surface, var(--white))",
        background: "var(--cs-text, var(--black))",
        textDecoration: "none",
        padding: ".5rem 1.25rem",
        borderRadius: "99px",
      }}
    >
      {children}
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* ComponentGrid — design-system component tiles                        */
/* ──────────────────────────────────────────────────────────────────── */

interface ComponentGridItem {
  src: string;
  label: string;
}

interface ComponentGridProps {
  items: ComponentGridItem[];
  title?: string;
}

export function ComponentGrid({ items, title }: ComponentGridProps) {
  return (
    <div className="cs-reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {title && <FigureTitle align="start">{title}</FigureTitle>}
      <div className="cs-comp-grid">
        <style>{`
          .cs-comp-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          @media (max-width: 760px) { .cs-comp-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 460px) { .cs-comp-grid { grid-template-columns: 1fr; } }
          .cs-comp-tile {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            padding: 1.5rem 1rem 1.25rem;
            border: 1px solid var(--cs-rule, var(--rule));
            border-radius: 10px;
            background: var(--cs-surface, var(--white));
            min-height: 140px;
            transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, border-color .25s ease;
          }
          .cs-comp-tile:hover {
            transform: translateY(-3px);
            box-shadow: 0 18px 32px -22px rgba(12,12,12,.18);
            border-color: var(--cs-accent, var(--accent));
          }
          .cs-comp-tile-img {
            max-width: 100%;
            max-height: 90px;
            width: auto;
            height: auto;
            display: block;
          }
          .cs-comp-tile-label {
            font-size: var(--label);
            font-weight: 600;
            letter-spacing: .12em;
            text-transform: uppercase;
            color: var(--cs-text-muted, var(--mid));
            text-align: center;
            margin: 0;
          }
        `}</style>
        {items.map((item) => (
          <div key={item.label} className="cs-comp-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.label}
              className="cs-comp-tile-img"
            />
            <p className="cs-comp-tile-label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Reflection — sub-headed paragraph block                              */
/* ──────────────────────────────────────────────────────────────────── */

interface ReflectionProps {
  title: string;
  children: ReactNode;
}

export function Reflection({ title, children }: ReflectionProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        maxWidth: "62ch",
        borderLeft: "2px solid var(--cs-accent, var(--accent))",
        paddingLeft: "1rem",
      }}
    >
      <h3
        style={{
          fontSize: "clamp(1.0625rem, 1.8vw, 1.25rem)",
          fontWeight: 700,
          letterSpacing: "-.025em",
          lineHeight: 1.28,
          color: "var(--cs-headline, var(--cs-text, var(--black)))",
          margin: 0,
          fontFamily: "var(--cs-headline-font, var(--cs-font, var(--font)))",
          fontOpticalSizing: "auto",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "var(--body)",
          lineHeight: 1.7,
          color: "var(--cs-text, var(--black))",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}
