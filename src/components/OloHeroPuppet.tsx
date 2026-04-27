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
  size?: number;
}

export default function OloHeroPuppet({ size = 220 }: Props) {
  const [src, setSrc] = useState(IDLE);
  const genRef = useRef(0);

  useEffect(() => {
    [...BLINK, ...EYE_ROLL].forEach((s) => {
      const img = new Image();
      img.src = s;
    });
  }, []);

  useEffect(() => {
    const gen = ++genRef.current;

    function after(ms: number, fn: () => void) {
      setTimeout(() => {
        if (genRef.current === gen) fn();
      }, ms);
    }

    function playFramesTimed(
      frames: [string, number][],
      onDone: () => void
    ) {
      let i = 0;
      function tick() {
        if (genRef.current !== gen) return;
        if (i >= frames.length) {
          onDone();
          return;
        }
        const [s, ms] = frames[i++];
        setSrc(s);
        setTimeout(tick, ms);
      }
      tick();
    }

    const blinkSeq: [string, number][] = [
      [BLINK[0], 50],
      [BLINK[1], 50],
      [BLINK[2], 1500],
      [BLINK[1], 50],
      [BLINK[0], 50],
    ];

    const eyeRollSeq: [string, number][] = [
      [EYE_ROLL[0], 3565],
      [EYE_ROLL[1], 3580],
      [EYE_ROLL[2], 3505],
      [EYE_ROLL[3], 3760],
      [EYE_ROLL[4], 3630],
      [EYE_ROLL[5], 3760],
    ];

    function scheduleNext() {
      after(2000 + Math.random() * 5000, () => {
        if (Math.random() < 0.4) {
          playFramesTimed(eyeRollSeq, () => {
            setSrc(IDLE);
            scheduleNext();
          });
        } else {
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
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        width={size}
        height={size}
        alt=""
        draggable={false}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
