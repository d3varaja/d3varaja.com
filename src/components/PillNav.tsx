"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./PillNav.css";

type GsapTween    = { kill: () => void };
type GsapTimeline = { duration: () => number; tweenTo: (...a: unknown[]) => GsapTween; kill: () => void };

// Module-level GSAP loader — imports the library once on first use,
// then reuses the cached instance. Keeps GSAP out of the initial JS bundle.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _gsapCache: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _gsapLoading: Promise<any> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadGsap(): Promise<any> {
  if (_gsapCache) return Promise.resolve(_gsapCache);
  if (!_gsapLoading) {
    _gsapLoading = import("gsap").then((m) => {
      _gsapCache = m.gsap;
      return m.gsap;
    });
  }
  return _gsapLoading;
}

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items?: NavItem[];
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
];

export default function PillNav({
  items = DEFAULT_ITEMS,
  ease = "power3.easeOut",
  baseColor = "#000000",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor,
  initialLoadAnimation = true,
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? baseColor;

  const router = useRouter();
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const match = items.find((i) => i.href === path);
    setActiveHref(match ? match.href : "");
  }, [pathname, items]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs       = useRef<(GsapTimeline | null)[]>([]);
  const activeTweens = useRef<(GsapTween | null)[]>([]);
  const hamburgerRef  = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef   = useRef<HTMLDivElement>(null);
  const logoImgRef   = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<GsapTween | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapRef      = useRef<any>(null);

  /* ── Active section via IntersectionObserver ─────────── */
  useEffect(() => {
    const sectionIds = items.map((i) => i.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  /* ── GSAP pill hover setup — loaded lazily ───────────── */
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    let removeResize: (() => void) | undefined;

    loadGsap().then((gsap) => {
      gsapRef.current = gsap;

      const layout = () => {
        circleRefs.current.forEach((circle, index) => {
          if (!circle?.parentElement) return;

          const pill = circle.parentElement;
          const rect = pill.getBoundingClientRect();
          const { width: w, height: h } = rect;
          const R = ((w * w) / 4 + h * h) / (2 * h);
          const D = Math.ceil(2 * R) + 2;
          const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
          const originY = D - delta;

          circle.style.width  = `${D}px`;
          circle.style.height = `${D}px`;
          circle.style.bottom = `-${delta}px`;

          gsap.set(circle, {
            xPercent: -50,
            scale: 0,
            transformOrigin: `50% ${originY}px`,
          });

          const label = pill.querySelector<HTMLElement>(".pill-label");
          const white = pill.querySelector<HTMLElement>(".pill-label-hover");

          if (label) gsap.set(label, { y: 0 });
          if (white) gsap.set(white, { y: h + 12, opacity: 0 });

          tlRefs.current[index]?.kill();
          const tl = gsap.timeline({ paused: true });

          tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
          if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
          if (white) {
            gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
            tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
          }

          tlRefs.current[index] = tl;
        });
      };

      layout();

      const debouncedLayout = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layout, 150);
      };
      window.addEventListener("resize", debouncedLayout, { passive: true });
      document.fonts?.ready?.then(layout).catch(() => {});

      const menu = mobileMenuRef.current;
      if (menu) gsap.set(menu, { visibility: "hidden", opacity: 0 });

      const isHome = typeof window !== "undefined" && window.location.pathname === "/";
      if (initialLoadAnimation && isHome && navItemsRef.current) {
        gsap.set(navItemsRef.current, { width: 0, overflow: "hidden" });
        gsap.to(navItemsRef.current, { width: "auto", duration: 0.6, ease });
      }

      removeResize = () => {
        window.removeEventListener("resize", debouncedLayout);
      };
    });

    return () => {
      removeResize?.();
      clearTimeout(resizeTimer);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleLogoEnter = () => {
    const gsap = gsapRef.current;
    const img = logoImgRef.current;
    if (!gsap || !img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.5,
      ease,
      overwrite: "auto",
    });
  };

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweens.current[i]?.kill();
    activeTweens.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3, ease, overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweens.current[i]?.kill();
    activeTweens.current[i] = tl.tweenTo(0, {
      duration: 0.2, ease, overwrite: "auto",
    });
  };

  const handleClick = (href: string) => {
    setActiveHref(href);
    if (href.startsWith("/") && !href.startsWith("/#")) {
      if (typeof document !== "undefined" && "startViewTransition" in document) {
        (document as Document & { startViewTransition: (cb: () => void) => void })
          .startViewTransition(() => router.push(href));
      } else {
        router.push(href);
      }
      return;
    }
    const hash = href.includes("#") ? "#" + href.split("#")[1] : href;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const hideMenu = (menu: HTMLDivElement) => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    gsap.to(menu, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease,
      transformOrigin: "top center",
      onComplete() { gsap.set(menu, { visibility: "hidden" }); },
    });
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);

    const gsap = gsapRef.current;
    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (gsap && hamburger) {
      const lines = hamburger.querySelectorAll<HTMLElement>(".hamburger-line");
      if (next) {
        gsap.to(lines[0], { rotation: 45,  y:  3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (gsap && next) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease, transformOrigin: "top center" }
        );
      } else if (!next) {
        hideMenu(menu);
      }
    }
  };

  const cssVars = {
    ["--base"]:       baseColor,
    ["--pill-bg"]:    pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]:  resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav${isMobileMenuOpen ? " is-open" : ""}`} aria-label="Primary" style={cssVars}>

        {/* Logo */}
        <a href="/" className="pill-nav-logo" aria-label="Home" onMouseEnter={handleLogoEnter}>
          <img ref={logoImgRef} src="/navbar-icon.svg" alt="Logo" className="pill-nav-logo-img" />
        </a>

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? " is-active" : ""}`}
                  aria-label={item.label}
                  onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile close button — visible only when menu is open */}
        <button
          className={`mobile-close-button mobile-only${isMobileMenuOpen ? " is-visible" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4L16 16M16 4L4 16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <img src="/navbar-icon.svg" alt="Menu" className="hamburger-icon-img" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {/* HOME always first on mobile since the logo link is hidden */}
          <li>
            <a
              href="/"
              className={`mobile-menu-link${activeHref === "/" ? " is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick("/");
                setIsMobileMenuOpen(false);
                const menu = mobileMenuRef.current;
                if (menu) hideMenu(menu);
                const gsap = gsapRef.current;
                const hamburger = hamburgerRef.current;
                if (gsap && hamburger) {
                  const lines = hamburger.querySelectorAll<HTMLElement>(".hamburger-line");
                  gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                  gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
                }
              }}
            >
              Home
            </a>
          </li>
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                  setIsMobileMenuOpen(false);
                  const menu = mobileMenuRef.current;
                  if (menu) hideMenu(menu);
                  const gsap = gsapRef.current;
                  const hamburger = hamburgerRef.current;
                  if (gsap && hamburger) {
                    const lines = hamburger.querySelectorAll<HTMLElement>(".hamburger-line");
                    gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                    gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
