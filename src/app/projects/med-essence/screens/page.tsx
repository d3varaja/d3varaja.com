import type { Metadata } from "next";
import { Sora } from "next/font/google";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Med-Essence, All Screens",
  description:
    "All 57 screens designed for Med-Essence, the offline-first healthcare app. Onboarding, home, AI Health Report, Medicine Scheduler, Nutrition Tracker, Pregnancy Tracking week by week, Mental Health Library, Mood Tracker, Q&A with Staff, X-Ray Comparison, and Schedule.",
  openGraph: {
    title: "Med-Essence, All Screens",
    description:
      "All 57 screens for Med-Essence, organised across onboarding, core features, pregnancy tracking, and supporting flows.",
  },
};

const BASE = "/projects/med-essence/screens";

interface Screen {
  src: string;
  alt: string;
  caption: string;
}

const ONBOARDING: Screen[] = [
  { src: `${BASE}/splash.png`, alt: "Splash screen with Med-Essence logo", caption: "Splash" },
  { src: `${BASE}/welcome.png`, alt: "Welcome screen with Create Account intro", caption: "Welcome" },
  { src: `${BASE}/app-installed.png`, alt: "Phone home screen showing the Med-Essence app installed", caption: "App Installed" },
  { src: `${BASE}/get-started.png`, alt: "Get Started screen with Create Account or Sign In", caption: "Get Started" },
  { src: `${BASE}/signup-options.png`, alt: "Sign up options with Google, Facebook, Email, A step closer to a better Earth", caption: "Sign Up Options" },
  { src: `${BASE}/signup-form.png`, alt: "Sign up form with terms checkbox", caption: "Sign Up Form" },
  { src: `${BASE}/signup-error.png`, alt: "Sign up form with terms not accepted, error state", caption: "Sign Up, Error State" },
];

const CORE: Screen[] = [
  { src: `${BASE}/home.png`, alt: "Home dashboard with feature cards", caption: "Home, dashboard with feature cards" },
];

const AI_REPORT: Screen[] = [
  { src: `${BASE}/ai-report.png`, alt: "AI Health Report screen with digitalised report and on-device suggestions", caption: "AI Health Report, suggestions panel" },
  { src: `${BASE}/ai-report-tabs.png`, alt: "AI Health Report with Suggest and Consult tabs and continuation buttons", caption: "AI Health Report, Suggest and Consult tabs" },
];

const SCHEDULER: Screen[] = [
  { src: `${BASE}/medicine-scheduler.png`, alt: "Medicine Scheduler with calendar, time picker, and reminders", caption: "Medicine Scheduler" },
];

const NUTRITION: Screen[] = [
  { src: `${BASE}/nutrition-tracker.png`, alt: "Nutrition Tracker with ingredient inventory and recipe suggestions", caption: "Nutrition Tracker" },
];

const PREGNANCY_SETUP: Screen[] = [
  { src: `${BASE}/pregnancy-setup.png`, alt: "Pregnancy setup with baby gender and age input", caption: "Setup" },
  { src: `${BASE}/pregnancy-setup-blank.png`, alt: "Pregnancy setup with blank fields", caption: "Setup, Blank State" },
  { src: `${BASE}/pregnancy-setup-error.png`, alt: "Pregnancy setup with missing details error", caption: "Setup, Error State" },
];

const PREGNANCY_WEEKS: Screen[] = Array.from({ length: 34 }, (_, i) => {
  const num = String(i).padStart(2, "0");
  return {
    src: `${BASE}/pregnancy-week-${num}.png`,
    alt: `Pregnancy tracking week-by-week view, sequence ${i}`,
    caption: `Pregnancy Tracker ${num}`,
  };
});

const MENTAL_HEALTH: Screen[] = [
  { src: `${BASE}/mental-health-books.png`, alt: "Mental Health Library, Books tab with reading recommendations", caption: "Mental Health Library, Books" },
  { src: `${BASE}/mental-health-audio.png`, alt: "Mental Health Library, Audio tab with audiobooks", caption: "Mental Health Library, Audio" },
];

const MOOD: Screen[] = [
  { src: `${BASE}/mood-tracker-player.png`, alt: "Mood Tracker, music player with currently playing track", caption: "Mood Tracker, Player" },
  { src: `${BASE}/mood-tracker-recommendations.png`, alt: "Mood Tracker, music recommendations grouped by mood", caption: "Mood Tracker, Recommendations" },
];

const QA: Screen[] = [
  { src: `${BASE}/qa-staff.png`, alt: "Q&A with Staff, chat list with healthcare contacts", caption: "Q&A with Staff" },
];

const XRAY: Screen[] = [
  { src: `${BASE}/xray-comparison.png`, alt: "X-Ray Comparison screen", caption: "X-Ray Comparison" },
];

const SCHEDULE: Screen[] = [
  { src: `${BASE}/schedule-overview.png`, alt: "Schedule with to-do list, shopping list, and important cards", caption: "Schedule, Overview" },
  { src: `${BASE}/schedule-note.png`, alt: "Schedule note view with rich text editor", caption: "Schedule, Note Detail" },
];

const IMG_STYLE: React.CSSProperties = {
  width: "100%",
  borderRadius: 4,
  border: "1px solid var(--rule)",
  display: "block",
};

const GRID_2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1.25rem 1rem",
};

const GRID_3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
};

function ScreenCard({ s }: { s: Screen }) {
  return (
    <figure style={{ margin: 0 }}>
      <ImageLightbox src={s.src} alt={s.alt} style={IMG_STYLE} />
      <figcaption
        style={{
          fontSize: "var(--label)",
          color: "var(--mid)",
          marginTop: ".5rem",
          textAlign: "center",
          letterSpacing: ".02em",
          lineHeight: 1.4,
        }}
      >
        {s.caption}
      </figcaption>
    </figure>
  );
}

function SectionBlock({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
      <div
        className="sec-head"
        style={{ paddingTop: 0, marginBottom: "1.5rem" }}
      >
        <h2>{label}</h2>
        <span>({String(count).padStart(2, "0")})</span>
      </div>
      {children}
    </div>
  );
}

export default function MedEssenceScreens() {
  return (
    <>
      <PillNav />

      <main
        className={sora.className}
        style={
          {
            minHeight: "100svh",
            paddingTop: "clamp(5rem, 10vw, 7rem)",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
            ["--accent" as string]: "#FF6B6B",
            ["--accent-soft" as string]: "rgba(255, 107, 107, 0.10)",
            ["--black" as string]: "#1A1A2E",
          } as React.CSSProperties
        }
      >
        <div className="wrap" style={{ maxWidth: 720 }}>
          {/* Header */}
          <header style={{ marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
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
              Med-Essence
            </p>
            <h1
              style={{
                fontSize: "var(--h1)",
                fontWeight: 800,
                letterSpacing: "-.035em",
                lineHeight: 1.1,
                color: "var(--black)",
              }}
            >
              All Screens
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--mid)",
                lineHeight: 1.55,
                marginTop: "1rem",
                maxWidth: "52ch",
              }}
            >
              57 screens covering onboarding, the home dashboard, AI report
              digitalisation, medicine scheduling, nutrition tracking,
              pregnancy week-by-week guidance, mental health library, mood
              tracker, Q&amp;A with healthcare staff, X-ray comparison, and
              the schedule view.
            </p>
          </header>

          <SectionBlock label="Onboarding" count={ONBOARDING.length}>
            <div style={GRID_2}>
              {ONBOARDING.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="Home" count={CORE.length}>
            <div style={GRID_2}>
              {CORE.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="AI Health Report" count={AI_REPORT.length}>
            <div style={GRID_2}>
              {AI_REPORT.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="Medicine Scheduler" count={SCHEDULER.length}>
            <div style={GRID_2}>
              {SCHEDULER.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="Nutrition Tracker" count={NUTRITION.length}>
            <div style={GRID_2}>
              {NUTRITION.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock
            label="Pregnancy Tracking, Setup"
            count={PREGNANCY_SETUP.length}
          >
            <div style={GRID_2}>
              {PREGNANCY_SETUP.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock
            label="Pregnancy Tracking, Week by Week"
            count={PREGNANCY_WEEKS.length}
          >
            <div style={GRID_3}>
              {PREGNANCY_WEEKS.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock
            label="Mental Health Library"
            count={MENTAL_HEALTH.length}
          >
            <div style={GRID_2}>
              {MENTAL_HEALTH.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="Mood Tracker" count={MOOD.length}>
            <div style={GRID_2}>
              {MOOD.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="Q&A with Staff" count={QA.length}>
            <div style={GRID_2}>
              {QA.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="X-Ray Comparison" count={XRAY.length}>
            <div style={GRID_2}>
              {XRAY.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="Schedule" count={SCHEDULE.length}>
            <div style={GRID_2}>
              {SCHEDULE.map((s) => (
                <ScreenCard key={s.src} s={s} />
              ))}
            </div>
          </SectionBlock>

          {/* Back link */}
          <div style={{ paddingTop: "1rem" }}>
            <a
              href="/projects/med-essence"
              style={{
                fontSize: "var(--small)",
                fontWeight: 600,
                color: "var(--white)",
                background: "var(--black)",
                textDecoration: "none",
                padding: ".5rem 1.25rem",
                borderRadius: "99px",
                display: "inline-flex",
                alignItems: "center",
                gap: ".4rem",
              }}
            >
              ← Back to project
            </a>
          </div>
        </div>
      </main>

      <footer
        style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "var(--small)", color: "var(--mid)" }}>
            Tharun Devaraja
          </p>
        </div>
      </footer>
    </>
  );
}
