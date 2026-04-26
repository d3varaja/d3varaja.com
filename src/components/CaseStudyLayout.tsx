"use client";

import {
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
}

export function CaseStudyLayout({
  children,
  accent,
  accentSoft,
}: CaseStudyLayoutProps) {
  const themeVars: Record<string, string> = {};
  if (accent) themeVars["--cs-accent"] = accent;
  if (accentSoft) themeVars["--cs-accent-soft"] = accentSoft;

  return (
    <main
      style={{
        minHeight: "100svh",
        paddingTop: "clamp(5rem, 10vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
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
        }}
      >
        {children}
      </div>
    </main>
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
}

interface HeroLink {
  label: string;
  href: string;
}

interface HeroProps {
  title: string;
  meta: HeroMeta[];
  images: HeroImage[];
  /** Optional black-pill links shown directly under the title (e.g. Live Site, Behance, GitHub) */
  links?: HeroLink[];
}

export function CaseStudyHero({ title, meta, images, links }: HeroProps) {
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
          letterSpacing: "-.035em",
          lineHeight: 1.05,
          maxWidth: "20ch",
          color: "var(--black)",
          margin: 0,
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
              style={{
                fontSize: "var(--small)",
                fontWeight: 600,
                color: "var(--white)",
                background: "var(--black)",
                textDecoration: "none",
                padding: ".5rem 1.25rem",
                borderRadius: "99px",
                display: "inline-flex",
                alignItems: "center",
                gap: ".4rem",
                transition: "opacity .15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      <HeroShowcase slides={images} />

      <dl
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem 2.25rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--rule)",
          margin: 0,
        }}
      >
        {meta.map((m) => (
          <div
            key={m.label}
            style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}
          >
            <dt
              style={{
                fontSize: "var(--label)",
                fontWeight: 500,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--mid)",
              }}
            >
              {m.label}
            </dt>
            <dd
              style={{
                fontSize: "var(--small)",
                fontWeight: 600,
                color: "var(--black)",
                margin: 0,
                lineHeight: 1.45,
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
          border: "1px solid var(--rule)",
          background: "var(--white)",
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
                    : "1px solid var(--rule)",
                padding: 0,
                overflow: "hidden",
                background: "var(--white)",
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
          color: "var(--mid)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span key={`num-${active}`} className="cs-counter-num">
          <span style={{ color: "var(--black)", fontWeight: 700 }}>
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
              color: "var(--mid)",
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
                  border: "1px solid var(--rule)",
                  background: "var(--white)",
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
                    : "rgba(12,12,12,.18)",
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
        background: "var(--black)",
        color: "var(--white)",
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
      style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
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
        <h2
          style={{
            fontSize: "clamp(1.625rem, 3.2vw, 2.375rem)",
            fontWeight: 700,
            letterSpacing: "-.03em",
            lineHeight: 1.15,
            color: "var(--black)",
            margin: 0,
            maxWidth: "22ch",
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
        color: "var(--black)",
        maxWidth: "62ch",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

export function HMW({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)",
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: 1.55,
        color: "var(--black)",
        borderLeft: "3px solid var(--black)",
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
          color: "var(--mid)",
          margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: "var(--body)",
          lineHeight: 1.65,
          color: "var(--black)",
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
          border: "1px solid var(--rule)",
          display: "block",
        }}
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

interface FigureRowProps {
  images: { src: string; alt: string; caption?: string }[];
  caption?: string;
  /** Clear name for the artifact — e.g. "User Personas", "Donating via WhatsApp" */
  title?: string;
  /** For portrait / phone-screenshot style images: caps height and centers each image in its column */
  tall?: boolean;
}

export function FigureRow({ images, caption, title, tall }: FigureRowProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
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
            <ImageLightbox
              src={img.src}
              alt={img.alt}
              style={{
                width: tall ? "auto" : "100%",
                maxWidth: "100%",
                height: "auto",
                maxHeight: tall ? 540 : undefined,
                borderRadius: 10,
                border: "1px solid var(--rule)",
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
        color: "var(--accent-purple)",
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
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: "1.25rem",
        rowGap: ".5rem",
        alignItems: "start",
        maxWidth: "64ch",
        margin: 0,
        paddingTop: ".85rem",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <span
        aria-hidden
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "var(--cs-accent, var(--accent))",
          fontFamily:
            "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
          paddingTop: ".18rem",
          whiteSpace: "nowrap",
        }}
      >
        FIG ―
      </span>
      <span
        style={{
          fontSize: "0.9375rem",
          fontWeight: 500,
          lineHeight: 1.55,
          color: "rgba(12,12,12,.78)",
        }}
      >
        {children}
      </span>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
          }
          .cs-gallery-fig img:hover {
            transform: scale(1.06) !important;
            box-shadow: 0 24px 60px -12px rgba(12,12,12,.28) !important;
            z-index: 2;
            position: relative;
          }
          .cs-gallery-cap {
            font-size: var(--small);
            font-weight: 500;
            color: var(--mid);
            text-align: center;
            margin: 0;
            letter-spacing: .01em;
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
                border: "1px solid var(--rule)",
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
        color: "var(--white)",
        background: "var(--black)",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
            border: 1px solid var(--rule);
            border-radius: 10px;
            background: var(--white);
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
            color: var(--mid);
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
          letterSpacing: "-.02em",
          lineHeight: 1.3,
          color: "var(--black)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "var(--body)",
          lineHeight: 1.7,
          color: "var(--black)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}
