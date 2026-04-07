"use client";

import { useEffect, useRef, useState } from "react";

const IDLE = "/olo/chat/olo-puppet.svg";

const BLINK = [
  "/olo/olo-animations/blinking/blinking-01.svg",
  "/olo/olo-animations/blinking/blinking-02.svg",
  "/olo/olo-animations/blinking/blinking-03.svg",
];

const EYE_ROLL = [
  "/olo/olo-animations/eye-up-scrolls/eye-up-scroll-01.svg",
  "/olo/olo-animations/eye-up-scrolls/eye-up-scroll-02.svg",
  "/olo/olo-animations/eye-up-scrolls/eye-up-scroll-03.svg",
  "/olo/olo-animations/eye-up-scrolls/eye-up-scroll-04.svg",
  "/olo/olo-animations/eye-up-scrolls/eye-up-scroll-05.svg",
  "/olo/olo-animations/eye-up-scrolls/eye-up-scroll-06.svg",
];

interface Props {
  chatOpen: boolean;
  onToggle: () => void;
}

export default function OloPuppet({ chatOpen, onToggle }: Props) {
  const [src, setSrc]   = useState(IDLE);
  const [pulse, setPulse] = useState(false); // #9 attention pulse on first visit
  const genRef = useRef(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem("olo-seen")) {
        setPulse(true);
        const t = setTimeout(() => {
          setPulse(false);
          localStorage.setItem("olo-seen", "1");
        }, 3500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  // Preload all frames once on mount
  useEffect(() => {
    [...BLINK, ...EYE_ROLL].forEach((s) => {
      const img = new Image();
      img.src = s;
    });
  }, []);

  useEffect(() => {
    const gen = ++genRef.current;

    if (chatOpen) {
      setSrc(IDLE);
      return;
    }

    function after(ms: number, fn: () => void) {
      setTimeout(() => {
        if (genRef.current === gen) fn();
      }, ms);
    }

    function playFrames(frames: string[], ms: number, onDone: () => void) {
      let i = 0;
      function tick() {
        if (genRef.current !== gen) return;
        if (i >= frames.length) { onDone(); return; }
        setSrc(frames[i++]);
        setTimeout(tick, ms);
      }
      tick();
    }

    function playFramesTimed(frames: [string, number][], onDone: () => void) {
      let i = 0;
      function tick() {
        if (genRef.current !== gen) return;
        if (i >= frames.length) { onDone(); return; }
        const [s, ms] = frames[i++];
        setSrc(s);
        setTimeout(tick, ms);
      }
      tick();
    }

    // One blink: 01(50ms) → 02(50ms) → 03(1500ms hold) → 02(50ms) → 01(50ms)
    const blinkSeq: [string, number][] = [
      [BLINK[0], 50],
      [BLINK[1], 50],
      [BLINK[2], 1500],
      [BLINK[1], 50],
      [BLINK[0], 50],
    ];

    // Eye roll: per-frame timing = Figma delay + 300ms duration (all 6 interactions confirmed)
    const eyeRollSeq: [string, number][] = [
      [EYE_ROLL[0], 3565],  // 01: 1565 + 2000
      [EYE_ROLL[1], 3580],  // 02: 1580 + 2000
      [EYE_ROLL[2], 3505],  // 03: 1505 + 2000
      [EYE_ROLL[3], 3760],  // 04: 1760 + 2000
      [EYE_ROLL[4], 3630],  // 05: 1630 + 2000
      [EYE_ROLL[5], 3760],  // 06: 1760 + 2000, hold before snap to idle
    ];

    function scheduleNext() {
      after(2000 + Math.random() * 5000, () => {
        if (Math.random() < 0.4) {
          // Eye roll: 01→06 with Figma timing, then snap to idle
          playFramesTimed(eyeRollSeq, () => {
            setSrc(IDLE);
            scheduleNext();
          });
        } else {
          // Double blink with short pause between
          playFramesTimed(blinkSeq, () =>
            after(150, () =>
              playFramesTimed(blinkSeq, () => {
                setSrc(IDLE);
                scheduleNext();
              })
            )
          );
        }
      });
    }

    scheduleNext();

    return () => {
      genRef.current++;
      setSrc(IDLE);
    };
  }, [chatOpen]);

  return (
    <button
      onClick={onToggle}
      aria-label={chatOpen ? "Close OLO" : "Chat with OLO"}
      style={{
        opacity:        chatOpen ? 0 : 1,
        transform:      chatOpen ? "scale(0.85)" : "scale(1)",
        pointerEvents:  chatOpen ? "none" : "auto",
        transition:     "opacity 0.25s ease, transform 0.25s ease",
        background:     "#fff",
        border:         "none",
        // pulse handles box-shadow via keyframe; static shadow when not pulsing
        boxShadow:      pulse ? undefined : "2px 2px 4px rgba(0,0,0,0.27)",
        animation:      pulse ? "olo-puppet-pulse 1.2s ease-out infinite" : undefined,
        borderRadius:   "50%",
        overflow:       "hidden",
        padding:        0,
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          45,
        height:         45,
        margin:         0,
      }}
    >
      <img
        src={src}
        width={45}
        height={45}
        alt=""
        draggable={false}
        style={{ display: "block", pointerEvents: "none" }}
      />
    </button>
  );
}
