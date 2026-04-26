"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

export default function ImageLightbox({ src, alt, style }: Props) {
  const [open, setOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const handleOpen = () => {
    // Check the thumbnail's natural dimensions to determine orientation
    const el = imgRef.current;
    if (el && el.naturalHeight > el.naturalWidth) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
    setOpen(true);
  };

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          ...style,
          cursor: "pointer",
          transition: "transform 250ms cubic-bezier(.16,1,.3,1), box-shadow 250ms ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={handleOpen}
      />

      {open && mounted && createPortal(
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            overflowY: isPortrait ? "hidden" : "auto",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: isPortrait ? "2rem" : "3rem 2rem",
            cursor: "pointer",
            animation: "lightbox-in 200ms ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <style>{`
            @keyframes lightbox-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes lightbox-img-in {
              from { opacity: 0; transform: scale(0.97); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: isPortrait ? "min(380px, 50vw)" : "min(900px, 85vw)",
              maxHeight: isPortrait ? "85vh" : undefined,
              width: isPortrait ? "auto" : "min(900px, 85vw)",
              height: "auto",
              borderRadius: 12,
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.5)",
              cursor: "default",
              animation: "lightbox-img-in 300ms cubic-bezier(.16,1,.3,1)",
              margin: isPortrait ? undefined : "auto",
            }}
          />
        </div>,
        document.body
      )}
    </>
  );
}
