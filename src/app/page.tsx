"use client";

import dynamic from "next/dynamic";
import ComingSoon from "@/components/ComingSoon";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-[#0a0a0a]" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      <Scene3D />
      <ComingSoon />
    </main>
  );
}
