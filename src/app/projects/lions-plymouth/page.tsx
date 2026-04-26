import type { Metadata } from "next";
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
  Carousel,
  Gallery,
  ComponentGrid,
  PillLink,
  Reflection,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Lions Club Plymouth",
  description:
    "Designing for the members most websites forget — an accessibility-first community platform for Lions Club Plymouth, built around an elderly user base.",
  openGraph: {
    title: "Lions Club Plymouth — Tharun Devaraja",
    description:
      "Designing for the members most websites forget — an accessibility-first community platform. Shipped and live.",
  },
};

const BASE = "/projects/lions-plymouth";

export default function LionsPlymouthProject() {
  return (
    <>
      <PillNav />

      <CaseStudyLayout
        accent="#054583"
        accentSoft="rgba(5, 69, 131, 0.08)"
      >
        {/* ── Hero ────────────────────────────────────────── */}
        <CaseStudyHero
          metaCard
          title="Designing for the members most websites forget"
          links={[
            { label: "Live Site", href: "https://lionsplymouth.org.uk/" },
            {
              label: "Behance",
              href: "https://www.behance.net/gallery/246190855/Lions-Club-Plymouth-Community-Platform-Design",
            },
          ]}
          meta={[
            { label: "Role", value: "Design Engineer / UX Designer" },
            { label: "Client", value: "Lions Club Plymouth (via Team B3)" },
            { label: "Year", value: "2025" },
            { label: "Tools", value: "Figma, FigJam, Pen & Paper" },
          ]}
          images={[
            { src: `${BASE}/hero/01-hero.png`, alt: "Lions Club Plymouth homepage hero composition", label: "Homepage" },
            { src: `${BASE}/hero/02-donate.png`, alt: "Donate page with cause selection", label: "Donate" },
            { src: `${BASE}/hero/03-donate-individual.png`, alt: "Donate — individual cause page", label: "Cause" },
            { src: `${BASE}/hero/04-mission.png`, alt: "Mission page", label: "Mission" },
          ]}
        />

        {/* ── Introduction ────────────────────────────────── */}
        <Section label="Introduction" headline="Project Overview">
          <Paragraph>
            Lions Club Plymouth is part of Lions Clubs International — a global
            volunteer network running community charity projects, raising funds
            for healthcare, education, youth, and environmental causes. The
            Plymouth branch is a senior club, meaning the members themselves
            are mostly elderly.
          </Paragraph>
          <Paragraph>
            The contract came to me through Team B3, who&apos;d won the build. I came
            in on the design side. The brief was a full responsive website with
            a working prototype, but with one constraint that shaped the entire
            project: it had to follow the Lions Clubs International brand
            guidelines exactly.
          </Paragraph>
          <SubBlock title="Timeline">
            2 months · solo design role · B3 handled client conversations
          </SubBlock>
          <SubBlock title="Background">
            Before this project, the club&apos;s entire digital presence was a
            Facebook page and a WhatsApp number for donations.
          </SubBlock>
        </Section>

        {/* ── Problem ─────────────────────────────────────── */}
        <Section
          label="Problem"
          headline="Designing for members who were being left behind"
        >
          <Paragraph>
            Lions Plymouth had no website. Their digital presence was a Facebook
            page with low-quality images, and donations happened by messaging a
            WhatsApp number. For a club whose whole point is fundraising and
            community service, that&apos;s a system that limits how much good they
            can actually do.
          </Paragraph>
          <HMW>
            How might we build a website that an elderly volunteer can use
            confidently the first time, without calling anyone to ask how it
            works?
          </HMW>
          <Figure
            title="Facebook Page"
            src={`${BASE}/problem/facebook-page.png`}
            alt="The Lions Plymouth Facebook page — the club's only digital presence before the project"
            caption="The entire digital presence before the project — a Facebook page with event posts and a WhatsApp number for anything more."
          />
          <FigureRow
            title="Donating via WhatsApp"
            tall
            images={[
              {
                src: `${BASE}/problem/whatsapp-chat-1.png`,
                alt: "Reconstructed WhatsApp chat — donor asks how to give, club replies with sort code, account, and reference",
              },
              {
                src: `${BASE}/problem/whatsapp-chat-2.png`,
                alt: "Reconstructed WhatsApp chat — donor sends transaction screenshot, club replies they will post a thank-you letter",
              },
            ]}
            caption="Reconstructed from the donation pattern that existed before the website. Every donation depended on a club volunteer being available to reply, the donor copying bank details correctly, and a thank-you letter arriving by post."
          />
        </Section>

        {/* ── Research ────────────────────────────────────── */}
        <Section
          label="Research"
          headline="Three sources, one shared problem"
        >
          <Paragraph>
            I never spoke to the club directly — B3 owned that relationship.
            So the research came from three places: the Lions Clubs
            International brand guidelines, a review of existing Lions club
            websites, and the W3C&apos;s Web Accessibility for Older Users
            document. Four iteration rounds with B3 then tightened everything.
          </Paragraph>
          <Figure
            title="Brand Palette"
            src={`${BASE}/research/brand-guidelines-palette.png`}
            alt="The Lions Clubs International brand guidelines colour palette — primary blue, yellow, purple plus a secondary palette of greys and accents"
            caption="The Lions International brand palette — Pantone 287 blue, Pantone 7406 yellow, Pantone 2612 purple, plus a secondary palette. Every colour decision in the project was locked to this page."
          />
          <Figure
            title="Affinity Diagram"
            src={`${BASE}/research/affinity-map.png`}
            alt="Affinity diagram clustering insights from brand guidelines, accessibility research, reference sites, and B3 feedback rounds"
            caption="Insights grouped from brand guidelines, accessibility research, reference sites, and four feedback rounds via Team B3."
          />
        </Section>

        {/* ── Insights ────────────────────────────────────── */}
        <Section
          label="Insights"
          headline="Older users care if the thing works"
        >
          <Paragraph>
            The biggest takeaway from the W3C research: elderly users don&apos;t
            care about elegant interactions. They care about whether the task
            gets done. One moment of confusion and they&apos;re gone.
          </Paragraph>
          <Paragraph>
            This shaped two principles for the project. Every action needs to
            confirm itself — clear success states, visible loading, no
            ambiguity about what just happened. Donation is the product — the
            donate button is the most-protected element in the system, visible
            on every page, with a dedicated path for every cause.
          </Paragraph>
          <Carousel
            title="User Personas"
            fit="contain"
            maxHeight={640}
            slides={[
              {
                src: `${BASE}/research/persona-margaret.png`,
                alt: "Margaret Whitfield, the elderly Lions Club member",
              },
              {
                src: `${BASE}/research/persona-david.png`,
                alt: "David Hargreaves, the local donor",
              },
            ]}
            caption="Two proto-personas built from accessibility research and observed audience patterns. Not based on direct user interviews."
          />
        </Section>

        {/* ── Process ─────────────────────────────────────── */}
        <Section
          label="Process"
          headline="The donation flow was the project"
        >
          <Paragraph>
            Before the website, every donation depended on a member being
            available on WhatsApp. The donor had to copy bank details, send a
            screenshot to prove payment, and wait for a thank-you letter in
            the post. That was the system.
          </Paragraph>
          <Paragraph>
            The new flow had to do all of that automatically — and let donors
            give to a specific cause, not just the club generically.
          </Paragraph>
          <Figure
            title="Donation Flow — Before"
            src={`${BASE}/process/donation-flow-before.png`}
            alt="WhatsApp-based donation user flow — the original manual process"
            caption="9 steps. Multiple wait points. Depends on a volunteer."
          />
          <Figure
            title="Donation Flow — After"
            src={`${BASE}/process/donation-flow-after.png`}
            alt="Website donation user flow — the new self-serve process"
            caption="7 steps. Self-serve. Instant confirmation."
          />
          <Figure
            title="Shipped Donation Page"
            src={`${BASE}/process/donate-page-shipped.png`}
            alt="The shipped donation page with cause-specific entry, amount selection, and SumUp payment"
            caption="The shipped donation flow. Cause-specific entry, amount selection, secure payment via SumUp, automatic email receipt."
          />
        </Section>

        {/* ── Architecture ────────────────────────────────── */}
        <Section label="Architecture" headline="Shallow on purpose">
          <Paragraph>
            For elderly users, IA is accessibility. Fewer levels, more
            predictable navigation, no hidden pages. Every action page is
            reachable in two clicks from the homepage. Every donation path
            leads to a specific cause, not a generic donate-to-the-club flow.
          </Paragraph>
          <Figure
            title="Sitemap"
            src={`${BASE}/architecture/sitemap.png`}
            alt="Sitemap of the Lions Club Plymouth website — 17 screens organised around four user goals"
            caption="17 screens, organised around four things members need to do — find an event, donate to a cause, browse the work, or get in touch."
          />
        </Section>

        {/* ── Solution ────────────────────────────────────── */}
        <Section label="Solution" headline="What shipped">
          <ComponentGrid
            title="Core Components"
            items={[
              { src: `${BASE}/components/Group 10123381.svg`, label: "Action Button" },
              { src: `${BASE}/components/Frame 10123345.svg`, label: "Campaign Progress" },
              { src: `${BASE}/components/Group 10123382.svg`, label: "Content Card" },
              { src: `${BASE}/components/Group 10123383.svg`, label: "Banner Card" },
              { src: `${BASE}/components/Frame 10123207.svg`, label: "Testimonial Card" },
              { src: `${BASE}/components/Pagination Small.svg`, label: "Page Navigation" },
              { src: `${BASE}/components/Input.svg`, label: "Form Input" },
            ]}
          />
          <Gallery
            title="Core Screens"
            images={[
              { src: `${BASE}/screens/Events.png`, alt: "Events page", label: "Events" },
              { src: `${BASE}/screens/Projects.png`, alt: "Projects page", label: "Projects" },
              { src: `${BASE}/screens/Donate.png`, alt: "Donate page", label: "Donate" },
              { src: `${BASE}/screens/Donate Individual page.png`, alt: "Donate — individual cause page", label: "Donate — Cause Detail" },
              { src: `${BASE}/screens/Mission Page.png`, alt: "Mission page", label: "Mission" },
              { src: `${BASE}/screens/Shop Now Page.png`, alt: "Shop Now page", label: "Shop" },
            ]}
            caption="The site shipped with the Lions Clubs International palette and Roboto typeface, larger type sizing for older readers, and the donate CTA visible in the header on every page."
            viewAllHref="/projects/lions-plymouth/screens"
            viewAllLabel="View all screens →"
          />
        </Section>

        {/* ── Outcome ─────────────────────────────────────── */}
        <Section
          label="Outcome"
          headline="Live and serving the community"
        >
          <Paragraph>
            A 17-screen accessibility-first website covering events, donations,
            projects, shop, gallery, and club information. Replaced a Facebook
            page and a WhatsApp donation flow.
          </Paragraph>
          <Paragraph>
            The platform is now live at lionsplymouth.org.uk and the club can
            run donation campaigns, publish events, and showcase work without
            depending on any one member to handle requests manually.
          </Paragraph>
          <div>
            <PillLink href="https://lionsplymouth.org.uk/">
              Visit lionsplymouth.org.uk ↗
            </PillLink>
          </div>
        </Section>

        {/* ── Reflections ─────────────────────────────────── */}
        <Section
          label="Reflections"
          headline="Takeaways from the project"
        >
          <Reflection title="Designing for hesitation is its own discipline.">
            Most UX work assumes users will figure things out. For elderly
            users, that assumption breaks. Every unclear label, every buried
            action, every extra step costs you.
          </Reflection>
          <Reflection title="Constraints make decisions faster.">
            The Lions International brand guidelines removed every conversation
            about colour and type. That left more time for the parts of the
            design that actually affected users — the donation flow, the IA,
            the feedback states.
          </Reflection>
          <Reflection title="Working through a middleman has a cost.">
            B3 owned the client relationship, which meant I never spoke to a
            single Lions member directly. If the project continued, I&apos;d push
            for direct user testing — even one or two sessions with actual
            elderly members would sharpen the next iteration significantly.
          </Reflection>
        </Section>
      </CaseStudyLayout>

      {/* Next project */}
      <nav style={{ borderTop: "1px solid var(--rule)", paddingBlock: "2.5rem" }}>
        <div className="wrap" style={{ maxWidth: 960 }}>
          <p
            style={{
              fontSize: "var(--label)",
              color: "var(--mid)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: ".5rem",
            }}
          >
            Next project
          </p>
          <a
            href="/projects/code-club"
            style={{
              fontSize: "var(--h2)",
              fontWeight: 600,
              letterSpacing: "-.02em",
              color: "var(--black)",
              textDecoration: "none",
            }}
          >
            CodeClub — Admin Portal for StemUp Sri Lanka →
          </a>
        </div>
      </nav>

      <footer style={{ borderTop: "1px solid var(--rule)", paddingBlock: "1.75rem" }}>
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
