import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Med-Essence",
  description:
    "Offline-first healthcare app targeting underserved communities — AI/ML-powered counterfeit medicine detection and pregnancy risk assessment.",
  openGraph: {
    title: "Med-Essence — Tharun Devaraja",
    description:
      "Offline-first healthcare app with on-device AI for counterfeit medicine detection and pregnancy risk assessment.",
  },
};

const STACK = [
  "Figma", "Kotlin", "Android", "TensorFlow Lite", "Offline-first architecture",
];

const LINKS = [
  { label: "Figma", href: "https://www.figma.com/design/I7tTWE7eTz6mL41gm6tDv5/Med---Essence-figma-design?node-id=0-1&p=f" },
  { label: "GitHub", href: "https://github.com/Med-Essense" },
];

const COLORS = [
  { name: "Coral Pink", hex: "#FF6B6B", light: false },
  { name: "Soft White", hex: "#FEFEFE", light: true },
  { name: "Deep Navy", hex: "#1A1A2E", light: false },
];

const SCREENS = [
  { src: "/projects/med-essence/Home screen.png", alt: "Med-Essence home screen with feature cards and service overview", label: "Home" },
  { src: "/projects/med-essence/Report.png", alt: "AI-powered health report with medical history and smart suggestions", label: "AI Health Report" },
  { src: "/projects/med-essence/M.Scheduler.png", alt: "Medicine scheduler with calendar and time selection", label: "Medicine Scheduler" },
  { src: "/projects/med-essence/Vitamin.png", alt: "Nutrition tracker with ingredient inventory and recipe suggestions", label: "Nutrition Tracker" },
  { src: "/projects/med-essence/Multi SignIn-20.png", alt: "Pregnancy tracking with fetal development and nutrition guidance", label: "Pregnancy Tracking" },
  { src: "/projects/med-essence/Startup - 18.png", alt: "Med-Essence onboarding — A step closer to a better Earth", label: "Onboarding" },
];

export default function MedEssenceProject() {
  return (
    <>
      <PillNav />

      <main
        style={{
          minHeight: "100svh",
          paddingTop: "clamp(5rem, 10vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div className="wrap" style={{ maxWidth: 720 }}>

          {/* Header */}
          <header style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <p
              style={{
                fontSize: "var(--label)",
                fontWeight: 500,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--mid)",
                marginBottom: ".75rem",
              }}
            >
              Jun — Sep 2025 · UX Design · AI/ML Development
            </p>
            <h1
              style={{
                fontSize: "var(--h1)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Med-Essence — Offline-First Healthcare App
            </h1>
            <p style={{ fontSize: "var(--h2)", fontWeight: 300, lineHeight: 1.55, color: "var(--mid)", maxWidth: "42ch" }}>
              AI-powered health diagnostics that work entirely on-device — designed for communities where internet isn't a given.
            </p>

            {/* Links */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem" }}>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "var(--small)", color: "var(--mid)", textDecoration: "none", fontWeight: 500 }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </header>

          {/* Stack pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            {STACK.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: "var(--label)",
                  fontWeight: 500,
                  letterSpacing: ".02em",
                  padding: ".35rem .75rem",
                  border: "1px solid var(--rule)",
                  borderRadius: "99px",
                  color: "var(--mid)",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Story */}
          <article className="prose">

            <h2>The Problem</h2>
            <p>
              In many underserved communities, the combination of unreliable internet and counterfeit medicines creates a silent healthcare crisis. People can't verify what they're taking. Health workers can't screen patients without cloud-based tools that simply don't work where they operate.
            </p>
            <p>
              Most health tech assumes constant connectivity. Med-Essence was designed from the opposite end — what if every critical feature worked without a single byte of data?
            </p>

            <h2>Designing for Constraints</h2>
            <p>
              I solely led the UX design, working from research into how healthcare workers in low-connectivity areas actually operate. The interface had to be intuitive for users with limited technical literacy — no onboarding walls, no complex navigation trees. Every screen was designed to get out of the way and let the tool do its job.
            </p>
            <p>
              The design process ran through Figma, starting from user flows and low-fidelity wireframes, then moving to high-fidelity prototypes that I tested against real usage scenarios in offline environments.
            </p>

            <h2>On-Device AI</h2>
            <p>
              The core of Med-Essence is two TensorFlow Lite models running entirely on the Android device. The first analyses images to detect counterfeit medicines — a user points their camera at a tablet or packaging, and the model flags potential counterfeits in real time. The second performs pregnancy risk assessments based on input health metrics.
            </p>
            <p>
              Both models were optimised for mobile inference using TFLite's quantisation, keeping the app lightweight enough to run on budget Android devices common in the target communities. No server round-trips, no loading spinners, no failed requests.
            </p>

            <h2>Beyond Diagnostics</h2>
            <p>
              The app goes beyond detection. It includes a medicine scheduler for managing dosages, a nutrition tracker that suggests recipes based on available ingredients, and specialised pregnancy tracking with week-by-week guidance — all working offline.
            </p>

            <h2>Building It</h2>
            <p>
              The Android app was built in Kotlin with a fully offline-first architecture. Data persistence, model inference, and result storage all happen locally. When connectivity becomes available, the app can sync — but it never depends on it. This wasn't a progressive enhancement; offline was the default.
            </p>

          </article>

          {/* ── Design System ── */}
          <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div className="sec-head">
              <h2>Design System</h2>
            </div>

            <div style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
              {/* Typography */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Typography
              </p>
              <p className={poppins.className} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1 }}>
                Poppins
              </p>
              <div className={poppins.className} style={{ display: "flex", gap: "1.5rem", marginTop: ".75rem", marginBottom: "2rem" }}>
                <span style={{ fontSize: "var(--body)", fontWeight: 700 }}>Bold</span>
                <span style={{ fontSize: "var(--body)", fontWeight: 500 }}>Medium</span>
                <span style={{ fontSize: "var(--body)", fontWeight: 400 }}>Regular</span>
              </div>

              {/* Color Palette */}
              <p style={{ fontSize: "var(--label)", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--mid)", marginBottom: "1rem" }}>
                Color Palette
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                {COLORS.map((c) => (
                  <div key={c.name}>
                    <div style={{ aspectRatio: "4/3", borderRadius: 8, background: c.hex, border: c.light ? "1px solid var(--rule)" : "none" }} />
                    <p style={{ fontSize: "var(--small)", fontWeight: 600, marginTop: ".5rem" }}>{c.name}</p>
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", fontFamily: "monospace" }}>{c.hex}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "var(--small)", color: "var(--mid)", lineHeight: 1.6 }}>
                The app uses a warm, approachable color palette designed to feel non-clinical and welcoming for underserved communities.
              </p>
            </div>
          </div>

          {/* ── Interfaces ── */}
          <div>
            <div className="sec-head">
              <h2>Interfaces</h2>
            </div>

            <div style={{ paddingTop: "2rem", paddingBottom: "2.5rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  maxWidth: 580,
                  margin: "0 auto",
                }}
              >
                {SCREENS.map((s) => (
                  <div key={s.label}>
                    <ImageLightbox src={s.src} alt={s.alt} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--rule)" }} />
                    <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".5rem", textAlign: "center" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Technical Architecture ── */}
          <div>
            <div className="sec-head">
              <h2>Technical Architecture</h2>
            </div>

            <article className="prose" style={{ paddingTop: "2rem" }}>
              <h3>Android App — Kotlin</h3>
              <p>
                Built the native Android application in Kotlin with offline-first architecture. All data persistence, model inference, and result storage happen locally on-device.
              </p>

              <h3>On-Device ML — TensorFlow Lite</h3>
              <p>
                Two TFLite models run entirely on-device. Counterfeit medicine detection through image analysis and pregnancy risk assessment from health metrics. Models optimised with quantisation for budget Android devices.
              </p>

              <h3>Offline-First Architecture</h3>
              <p>
                The app never depends on connectivity. Data syncs when available but all critical features — AI inference, scheduling, tracking — function without internet. This was the default, not a fallback.
              </p>

              <hr />

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                  textAlign: "center",
                  padding: "1.5rem 0",
                }}
              >
                <Stat value="2" label="On-device ML models" />
                <Stat value="100%" label="Offline capable" />
                <Stat value="0" label="Server dependencies" />
              </div>

              <hr />

              <a href="/projects/med-essence/screens" style={{ display: "block", textAlign: "center", padding: "2rem", border: "1px solid var(--rule)", borderRadius: 8, textDecoration: "none", color: "var(--black)", fontWeight: 600, fontSize: "var(--body)" }}>
                View all screens →
              </a>

              <h2>Outcome</h2>
              <p>
                Med-Essence is a working Android app that puts real diagnostic capability into the hands of healthcare workers who operate beyond reliable infrastructure. It proves that meaningful AI-powered health tools don't require cloud connectivity — they just require thoughtful design and engineering.
              </p>

            </article>
          </div>

        </div>
      </main>

      {/* Next project */}
      <nav style={{ borderTop: "1px solid var(--rule)", paddingBlock: "2.5rem" }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: "var(--label)", color: "var(--mid)", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 500, marginBottom: ".5rem" }}>
            Next project
          </p>
          <a
            href="/projects/orator"
            style={{ fontSize: "var(--h2)", fontWeight: 600, letterSpacing: "-.02em", color: "var(--black)", textDecoration: "none" }}
          >
            Orator — Accessibility-First Reading Companion →
          </a>
        </div>
      </nav>

      <footer style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}>
        <div
          className="wrap"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
        >
          <p style={{ fontSize: "var(--small)", color: "var(--mid)" }}>Tharun Devaraja</p>
        </div>
      </footer>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".25rem" }}>{label}</p>
    </div>
  );
}
