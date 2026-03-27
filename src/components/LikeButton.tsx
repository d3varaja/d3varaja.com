"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({ slug }: { slug: string }) {
  const localKey = `liked:${slug}`;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [flashing, setFlashing] = useState(false);
  const [pop, setPop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLiked(localStorage.getItem(localKey) === "1");
    fetch(`/api/likes?slug=${slug}`)
      .then((r) => r.json())
      .then((d: { count: number }) => setCount(d.count));
  }, [slug, localKey]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  async function toggle() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(localKey, next ? "1" : "0");

    if (next) {
      setFlashing(true);
      setPop(true);
      setTimeout(() => setFlashing(false), 350);
      setTimeout(() => setPop(false), 250);
    }

    const res = await fetch(`/api/likes?slug=${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unlike: !next }),
    });
    const data = await res.json() as { count: number };
    setCount(data.count);
  }

  const heartFill = liked ? (flashing ? "#ff2d55" : "#fff") : "none";
  const heartColor = liked ? (flashing ? "#ff2d55" : "#fff") : "#fff";

  const label = liked
    ? `made ${count} ${count === 1 ? "person" : "people"} feel something`
    : hovered
    ? "go on then"
    : visible
    ? "wow. you read the whole thing."
    : "";

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={liked ? "Unlike this post" : "Like this post"}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#141414",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: pop ? "scale(1.22)" : "scale(1)",
          transition: "transform 0.2s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <Heart
          size={22}
          strokeWidth={1.75}
          fill={heartFill}
          color={heartColor}
          style={{ transition: "fill 0.35s ease, color 0.35s ease" }}
        />
      </button>

      <span
        style={{
          fontSize: "var(--small)",
          color: "var(--mid)",
          textAlign: "center",
          minHeight: "1.2em",
          opacity: label ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {label}
      </span>
    </div>
  );
}
