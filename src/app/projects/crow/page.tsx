import type { Metadata } from "next";
import { Sora } from "next/font/google";
import PillNav from "@/components/PillNav";
import {
  CaseStudyLayout,
  CaseStudyHero,
  Section,
  Paragraph,
  HMW,
  SubBlock,
  Figure,
  FigureRow,
  Gallery,
  Reflection,
  VideoEmbed,
} from "@/components/CaseStudyLayout";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CROW",
  description:
    "Designing brand, UI, frontend, and a marketing film for CROW, a B2B AI platform for retail. Two signed beta clients in production from April 16, 2026.",
  openGraph: {
    title: "CROW — Tharun Devaraja",
    description:
      "Designing brand, UI, frontend, and a marketing film for a B2B AI retail platform. Built by Team B3, six engineers.",
  },
};

const BASE = "/projects/crow";

export default function CrowProject() {
  return (
    <>
      <PillNav />

      <CaseStudyLayout
        accent="#7C3AED"
        accentSoft="rgba(124, 58, 237, 0.14)"
        background="radial-gradient(900px 450px at 50% -120px, #362362, transparent 65%), radial-gradient(700px 500px at 100% 70vh, rgba(54,35,98,.45), transparent 70%), #04040A"
        text="#E8E4F0"
        headlineText="#FFFFFF"
        textMuted="#856FBB"
        rule="rgba(232, 228, 240, 0.12)"
        surface="#04040A"
        fontFamily={sora.style.fontFamily}
      >
        {/* ── Hero ────────────────────────────────────────── */}
        <CaseStudyHero
          title="Designing brand, UI, and a marketing film for a B2B AI product"
          links={[
            { label: "Live Site", href: "https://crowai.dev/" },
            { label: "Docs", href: "https://docs.crow.bbyb.dev/" },
            { label: "GitHub", href: "https://github.com/CROW-B3" },
            {
              label: "Figma",
              href: "https://www.figma.com/design/ivrc5MYJvZv8zTatZXWjU9/CROW---Unified-Customer-Interaction-Intelligence-Platform?node-id=0-1&p=f",
            },
          ]}
          metaCard
          meta={[
            {
              label: "Client",
              value:
                "Two signed beta clients, Nadda Maana Productions (vtickets.lk) and Serendiv (serendivtravel.com)",
              wide: true,
            },
            {
              label: "Role",
              value: "Design Lead, Frontend, Brand and Creative Direction",
              wide: true,
            },
            {
              label: "Team",
              value: "Team B3, six engineers, second-year SDGP coursework",
              wide: true,
            },
            { label: "Year", value: "2025, 2026" },
            {
              label: "Tools",
              value:
                "Figma, FigJam, React, Next.js 15, Cloudflare, Sora, a notebook full of storyboards",
              wide: true,
            },
          ]}
          images={[
            {
              src: `${BASE}/hero/01-landing.png`,
              alt: "CROW landing page hero, dark theme with the CROW wordmark and Ask CROW search bar",
              label: "Landing",
            },
            {
              src: `${BASE}/hero/02-dashboard.png`,
              alt: "CROW dashboard overview, key metrics and recent interactions across Web, CCTV, and Social",
              label: "Dashboard",
            },
            {
              src: `${BASE}/hero/03-ask-crow.png`,
              alt: "Ask CROW workspace, the CROW Engine session view with prior chat history in the sidebar",
              label: "Ask CROW",
            },
          ]}
        />

        {/* ── Introduction ────────────────────────────────── */}
        <Section label="Introduction" headline="Project Overview">
          <Paragraph>
            CROW, Cognitive Reasoning Observation Watcher, is a unified customer
            interaction intelligence platform for brand-owned retail. It fuses
            three sources (Web, CCTV, Social) into one feed so analysts and
            product teams can ask plain-language questions across every channel.
          </Paragraph>
          <Paragraph>
            Built by Team B3, a six-person engineering team, against 200+ teams
            in the SDGP showcase. I led design and frontend, and shaped the
            brand identity and marketing campaign that introduced the product.
          </Paragraph>
          <SubBlock title="Timeline">8 months, alongside coursework</SubBlock>
          <SubBlock title="Outcome">
            2 signed beta clients, in production from April 16, 2026
          </SubBlock>
        </Section>

        {/* ── Problem ─────────────────────────────────────── */}
        <Section
          label="Problem"
          headline="Most enterprise software is dead by default"
        >
          <Paragraph>
            CROW couldn&apos;t be. The category, B2B AI, retail analytics, CCTV
            intelligence, has a gravitational pull toward soulless. Cold
            dashboards, stock photo websites, demos with corporate music.
          </Paragraph>
          <Paragraph>
            The product was genuinely advanced. The design problem was making
            people care about it.
          </Paragraph>
          <FigureRow
            images={[
              {
                src: `${BASE}/problem/workflow-comparison-before.png`,
                alt: "Before CROW: the analyst's workflow stitched across multiple tools and a data team",
                label: "Without CROW",
              },
              {
                src: `${BASE}/problem/workflow-comparison-after.png`,
                alt: "With CROW: a single feed and a single plain-language query",
                label: "With CROW",
              },
            ]}
            caption="From four tools and a data team, to one feed and one query."
          />
          <Paragraph>
            The retail analyst&apos;s most common task, understanding why a
            metric moved, currently requires correlating data from multiple
            tools and waiting on a data team. CROW fuses Web, CCTV, and Social
            signals into one feed so the analyst can ask the question directly
            and see correlated evidence without manual stitching.
          </Paragraph>
        </Section>

        {/* ── Research ────────────────────────────────────── */}
        <Section
          label="Research"
          headline="What makes enterprise software feel alive"
        >
          <Paragraph>
            Three sources informed the direction. ISO 9241-11 and Nielsen
            Norman Group on cognitive load and progressive disclosure. SAP
            Fiori on role-based design. IBM Carbon and W3C on form patterns
            and contrast.
          </Paragraph>
          <Paragraph>
            The recurring principle: enterprise UX isn&apos;t about looking
            good. It&apos;s about reducing friction without reducing
            information.
          </Paragraph>
          <HMW accentText>
            {`Effectiveness, efficiency, satisfaction. None of those words are "gorgeous." None of them are "clean aesthetic."`}
          </HMW>
        </Section>

        {/* ── Insights ────────────────────────────────────── */}
        <Section
          label="Insights"
          headline="Two users, two different reasons to be there"
        >
          <Paragraph>
            Sarah asks the questions. Dave makes the integration possible.
            Every major design decision in CROW serves one of them: the
            conversational query interface for Sarah, the CLI agent and dark
            theme for Dave, the confidence scoring on every signal for both.
          </Paragraph>
          <FigureRow
            images={[
              {
                src: `${BASE}/insights/persona-sarah.png`,
                alt: "Sarah, the retail analyst persona who asks the questions",
                label: "Sarah, the analyst",
              },
              {
                src: `${BASE}/insights/persona-dave.png`,
                alt: "Dave, the engineer persona who makes the integration possible",
                label: "Dave, the engineer",
              },
            ]}
            caption="Two proto-personas representing CROW's primary user (the analyst who asks the questions) and the secondary user (the engineer who integrates the platform). Built from observed retail-team workflows and developer integration patterns. Not based on direct user interviews."
          />
        </Section>

        {/* ── Creative Direction ──────────────────────────── */}
        <Section
          label="Creative Direction"
          headline="The brand does the work before the UI loads"
        >
          <Paragraph>
            CROW, Cognitive Reasoning Observation Watcher. Named after the bird
            because of how ravens see, remember, and connect signals across
            time and space. The same job the platform does for retail data.
          </Paragraph>
          <Paragraph>
            The palette: Core Purple (#7C3AED), Background Deep (#0D0617),
            Accent Lavender (#856FBB). The typeface: Sora, futuristic,
            technical, readable at every scale.
          </Paragraph>
          <Paragraph>
            Dark mode by default. Most CROW users are developers and operations
            people running long focused sessions. A light theme is planned for
            future audience expansion.
          </Paragraph>
          <Figure
            src={`${BASE}/creative-direction/brand-identity-board.png`}
            alt="The CROW brand identity board: palette, typography, and core elements"
            caption="The CROW design system, palette, typography, and core elements."
          />
          <Figure
            src={`${BASE}/creative-direction/core-components.png`}
            alt="The CROW core component set: action buttons, billing toggle, search bar, content cards, stat cards, configuration cards"
            caption="Core components, action buttons, billing toggle, the Ask CROW search bar, content cards, stat cards, feature configuration cards."
          />
        </Section>

        {/* ── Process ─────────────────────────────────────── */}
        <Section label="Process" headline="Designing for invisible work">
          <Paragraph>
            The hardest UX problem in CROW is what happens between the user
            typing a question and seeing an answer. Every stage in between is
            a design decision: what to show, what to hide, when to wait, when
            to surface partial results.
          </Paragraph>
          <Figure
            src={`${BASE}/process/query-flow-diagram.png`}
            alt="Diagram of the five hidden stages between a user's question and CROW's answer"
            caption="The five hidden stages between a user's question and CROW's answer."
          />
          <HMW accentText>
            A query goes through five hidden stages before the user sees an
            answer. Each stage was a UX decision, not just an engineering one.
          </HMW>
          <Paragraph>
            The Ask CROW interface itself went through three rounds before it
            stopped feeling like a chatbot wrapper.
          </Paragraph>
          <FigureRow
            images={[
              {
                src: `${BASE}/process/ask-crow-before.png`,
                alt: "Round 1 of Ask CROW: a standalone chatbot with its own login, logo, and conversational area",
                label: "Round 1, standalone chatbot",
              },
              {
                src: `${BASE}/process/ask-crow-after.png`,
                alt: "Final version of Ask CROW: one workspace inside the CROW dashboard, alongside Overview, Analysis, and Team",
                label: "Final, workspace in dashboard",
              },
            ]}
            caption="Round 1 (left) treated Ask CROW as a standalone chatbot. The final version (right) restructures it as one workspace inside the CROW dashboard."
          />
          <HMW accentText>
            Ask CROW didn&apos;t become better-looking, it became part of the
            product.
          </HMW>
          <Paragraph>
            Round one positioned Ask CROW as a standalone chatbot, its own
            login, its own logo, its own conversational area. The final version
            restructures it as one workspace inside the CROW dashboard, sitting
            alongside Overview, Analysis, and Team. The shift wasn&apos;t
            visual. It was a decision about whether Ask CROW was the product,
            or a feature within the product.
          </Paragraph>
        </Section>

        {/* ── Marketing ───────────────────────────────────── */}
        <Section
          label="Marketing"
          headline="When the product can't explain itself, build a story instead"
        >
          <Paragraph>
            200+ teams in the SDGP showcase. A standard demo video would have
            disappeared in the lineup. The team needed something that made
            people feel something about a product that, on paper, sounds like
            enterprise software.
          </Paragraph>
          <Paragraph>
            I wrote the script across three iterations, storyboarded every
            scene in a notebook, planned shots over two days at O2 Cafe, and
            directed an 11-hour shoot for a five-minute film. Three weeks from
            script to finished cut. Engineers acted, voiced, and dubbed, with
            a narrator on top to carry the emotional weight.
          </Paragraph>
          <FigureRow
            images={[
              {
                src: `${BASE}/marketing/storyboard-sketch.jpeg`,
                alt: "Notebook storyboard sketches for the marketing film",
                label: "Notebook sketch",
              },
              {
                src: `${BASE}/marketing/storyboard-frame.png`,
                alt: "The actual scene from the marketing film, matching the notebook storyboard",
                label: "Scene from the film",
              },
            ]}
            caption="Notebook sketch (left) vs the actual scene from the film (right)."
          />
          <VideoEmbed
            youtubeId="FJOhz6GuBeo"
            caption="The five-minute marketing film. Three weeks from script to finished cut. Engineers acted, voiced, and dubbed."
          />
          <Paragraph>
            The product earned a soul because every layer was designed to give
            it one. Research, brand, UI, film.
          </Paragraph>
        </Section>

        {/* ── Architecture ────────────────────────────────── */}
        <Section
          label="Architecture"
          headline="Twenty screens organised around three jobs"
        >
          <Paragraph>
            Get connected, ask questions, manage the platform. The information
            architecture stays shallow on purpose so analysts and engineers
            each land where they need to be.
          </Paragraph>
          <Figure
            src={`${BASE}/architecture/sitemap.png`}
            alt="The CROW sitemap: 20 screens organised around four user goals"
            caption="20 screens organised around four user goals: get connected, ask questions, run analysis, manage the platform."
          />
          <HMW accentText>
            The Connect Sources flow gates the dashboard. Without at least one
            source connected, CROW has nothing to analyse.
          </HMW>
        </Section>

        {/* ── Solution ────────────────────────────────────── */}
        <Section label="Solution" headline="What shipped">
          <Gallery
            images={[
              {
                src: `${BASE}/screens/dashboard-overview.png`,
                alt: "Dashboard Overview screen with key metrics and recent queries",
              },
              {
                src: `${BASE}/screens/ask-crow.png`,
                alt: "Ask CROW workspace inside the dashboard, sitting alongside Overview, Analysis, and Team",
              },
              {
                src: `${BASE}/screens/connect-sources.png`,
                alt: "Connect Sources overview with available integrations",
              },
              {
                src: `${BASE}/screens/connect-cctv.png`,
                alt: "Connect CCTV source configuration",
              },
              {
                src: `${BASE}/screens/patterns.png`,
                alt: "Analytics Patterns view showing trends across signals",
              },
              {
                src: `${BASE}/screens/interactions.png`,
                alt: "Interactions analysis view with sentiment and source data",
              },
              {
                src: `${BASE}/screens/plan-selection.png`,
                alt: "Plan selection screen with modular per-source pricing",
              },
              {
                src: `${BASE}/screens/team.png`,
                alt: "Team management screen with member roles and permissions",
              },
            ]}
            caption="The platform shipped in dark mode with the CROW palette and Sora typeface throughout. Confidence scoring on every signal, source-specific entry points, role-based default views, modular per-source pricing."
            viewAllHref="/projects/crow/screens"
            viewAllLabel="View all 20 screens →"
          />
        </Section>

        {/* ── Outcome ─────────────────────────────────────── */}
        <Section label="Outcome" headline="Coursework to signed clients">
          <Paragraph>
            Two beta agreements signed for production rollout in April 2026.
            Nadda Maana Productions for vtickets.lk, Serendiv for
            serendivtravel.com, both brand-owned retail sites running CROW&apos;s
            SDK in dev, going live April 16th.
          </Paragraph>
          <Paragraph>
            The platform is deployed, the documentation is public at
            docs.crow.bbyb.dev, and the natural-language query layer became
            the primary way the team accesses customer interaction data. The
            marketing campaign reached people. The product earned the
            attention it asked for.
          </Paragraph>
        </Section>

        {/* ── Reflection ──────────────────────────────────── */}
        <Section label="Reflection" headline="Takeaways">
          <Reflection title="Brand isn't decoration on technical work.">
            It&apos;s how the work gets seen for the first time. Every hour
            spent on the raven, the purple, Sora, and the film paid off the
            moment a stranger had to decide whether to care about CROW.
          </Reflection>
          <Reflection title="AI products have a UX problem most people don't name.">
            The user types one question and waits while invisible work happens.
            Designing for that wait, what to show, when to confirm, how to
            build trust, is the actual job.
          </Reflection>
          <Reflection title="Owning every layer teaches you what each layer is for.">
            Research, brand, UI, frontend, marketing: they reinforce each
            other when one person holds the whole picture.
          </Reflection>
        </Section>
      </CaseStudyLayout>

      {/* Next project */}
      <nav
        style={{
          borderTop: "1px solid rgba(232, 228, 240, 0.12)",
          paddingBlock: "2.5rem",
          background: "#04040A",
        }}
      >
        <div className="wrap" style={{ maxWidth: 960 }}>
          <p
            style={{
              fontSize: "var(--label)",
              color: "#856FBB",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: ".5rem",
            }}
          >
            Next project
          </p>
          <a
            href="/projects/med-essence"
            style={{
              fontSize: "var(--h2)",
              fontWeight: 600,
              letterSpacing: "-.02em",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            Med-Essence, Offline-First Healthcare App →
          </a>
        </div>
      </nav>

      <footer
        style={{
          borderTop: "1px solid rgba(232, 228, 240, 0.12)",
          paddingBlock: "1.75rem",
          background: "#04040A",
        }}
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
          <p style={{ fontSize: "var(--small)", color: "#856FBB" }}>
            Tharun Devaraja
          </p>
        </div>
      </footer>
    </>
  );
}
