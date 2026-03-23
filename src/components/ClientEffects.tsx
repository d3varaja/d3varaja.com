"use client";

import dynamic from "next/dynamic";

// Decorative browser-only components — loaded after hydration so they
// don't add anything to the static HTML or block Time-to-Interactive
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
const ClickSpark = dynamic(() => import("./ClickSpark"), { ssr: false });

export default function ClientEffects() {
  return (
    <>
      <Cursor />
      <ClickSpark />
    </>
  );
}
