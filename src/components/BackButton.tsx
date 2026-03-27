"use client";

import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  const isHome = cleanPath === "/";

  if (isHome) return null;

  // Navigate to parent path: /projects/crow/screens → /projects/crow → /projects → /
  const parentPath = cleanPath.includes("/")
    ? cleanPath.substring(0, cleanPath.lastIndexOf("/")) || "/"
    : "/";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(() => router.push(parentPath));
    } else {
      router.push(parentPath);
    }
  };

  return (
    <a
      href={parentPath}
      onClick={handleClick}
      aria-label="Go home"
      className="back-button"
      style={{
        position: "fixed",
        top: "1.15rem",
        left: "1.5rem",
        zIndex: 90,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#0c0c0c",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        cursor: "none",
        lineHeight: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,.15)",
        transition: "opacity .15s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5" />
        <path d="M12 19L5 12L12 5" />
      </svg>
    </a>
  );
}
