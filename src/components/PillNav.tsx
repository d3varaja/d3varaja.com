"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import "./PillNav.css";

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

  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const match = items.find((i) => i.href === path);
    setActiveHref(match ? match.href : "");
  }, [pathname, items]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs       = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweens = useRef<(gsap.core.Tween | null)[]>([]);
  const hamburgerRef  = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef   = useRef<HTMLDivElement>(null);
  const logoImgRef   = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);

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

  /* ── GSAP pill hover setup ───────────────────────────── */
  useEffect(() => {
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

    // Debounce resize so heavy getBoundingClientRect work only runs after user stops resizing
    let resizeTimer: ReturnType<typeof setTimeout>;
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

    return () => {
      window.removeEventListener("resize", debouncedLayout);
      clearTimeout(resizeTimer);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
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
      window.location.href = href;
      return;
    }
    const hash = href.includes("#") ? "#" + href.split("#")[1] : href;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const hideMenu = (menu: HTMLDivElement) => {
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

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
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
      if (next) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease, transformOrigin: "top center" }
        );
      } else {
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
      <nav className="pill-nav" aria-label="Primary" style={cssVars}>

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

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
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
                  const hamburger = hamburgerRef.current;
                  if (hamburger) {
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
