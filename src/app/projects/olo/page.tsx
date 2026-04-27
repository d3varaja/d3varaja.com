import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import ImageLightbox from "@/components/ImageLightbox";
import OloHeroPuppet from "@/components/OloHeroPuppet";
import OloPointer from "@/components/OloPointer";

export const metadata: Metadata = {
  title: "The story of OLO",
  description:
    "An exploration in playful AI companion. The story behind OLO, the puppet that lives on this site.",
  openGraph: {
    title: "The story of OLO — Tharun Devaraja",
    description:
      "An exploration in playful AI companion. The story behind OLO, the puppet that lives on this site.",
  },
};

const BASE = "/projects/olo";

const labelStyle = {
  fontSize: "var(--label)",
  fontWeight: 600,
  letterSpacing: ".16em",
  textTransform: "uppercase" as const,
  color: "var(--mid)",
  margin: 0,
};

const headlineStyle = {
  fontSize: "var(--h1)",
  fontWeight: 700,
  letterSpacing: "-.03em",
  lineHeight: 1.18,
  color: "var(--black)",
  margin: 0,
};

const paragraphStyle = {
  fontSize: "var(--body)",
  lineHeight: 1.75,
  color: "var(--black)",
  margin: 0,
};

const figureStyle = {
  width: "100%",
  height: "auto",
  borderRadius: 12,
  border: "1px solid var(--rule)",
  display: "block",
};

export default function OloProject() {
  return (
    <>
      <PillNav />

      <style>{`
        .olo-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .olo-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          align-items: start;
        }
        @media (max-width: 640px) {
          .olo-pair { grid-template-columns: 1fr; }
        }
        .olo-callout {
          border-left: 2px solid var(--accent);
          padding: .25rem 0 .25rem 1.1rem;
        }
        .olo-bullets {
          display: flex;
          flex-direction: column;
          gap: .85rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .olo-bullets li {
          font-size: var(--body);
          line-height: 1.65;
          color: var(--black);
          padding-left: 1.1rem;
          position: relative;
        }
        .olo-bullets li::before {
          content: "";
          position: absolute;
          left: 0;
          top: .7em;
          width: .35rem;
          height: .35rem;
          border-radius: 999px;
          background: var(--accent);
        }
        .olo-bullets b {
          font-weight: 600;
          color: var(--black);
        }
      `}</style>

      <main
        style={{
          minHeight: "100svh",
          paddingTop: "clamp(5rem, 10vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div
          className="wrap"
          style={{
            maxWidth: 720,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(3.5rem, 7vw, 5.5rem)",
          }}
        >
          {/* ── Hero ─────────────────────────────────────────── */}
          <header
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1.5rem, 3.5vw, 2.5rem)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <p style={labelStyle}>Exploration</p>
              <h1
                style={{
                  fontSize: "var(--h1)",
                  fontWeight: 800,
                  letterSpacing: "-.035em",
                  lineHeight: 1.1,
                  margin: 0,
                  color: "var(--black)",
                }}
              >
                The story of OLO
              </h1>
              <p
                style={{
                  fontSize: "var(--h2)",
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: "var(--mid)",
                  maxWidth: "44ch",
                  margin: 0,
                }}
              >
                An exploration in playful AI companion.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                paddingBlock: "clamp(1rem, 3vw, 2rem)",
              }}
            >
              <OloHeroPuppet size={220} />
            </div>
          </header>

          {/* ── The Find ─────────────────────────────────────── */}
          <section className="olo-section">
            <p style={labelStyle}>The find</p>
            <h2 style={headlineStyle}>It started with biscuits</h2>
            <p style={paragraphStyle}>
              I was at Cargills one afternoon, picking up groceries, when I
              saw a box of biscuits called Magic OLO. The wordmark had two
              big eyes drawn straight into the O letters, looking out from
              the shelf. I stopped, picked it up, and stood there for too
              long with a tub of yoghurt in my other hand. The logo was the
              whole thing. Three letters and a face.
            </p>

            <div className="olo-pair">
              <ImageLightbox
                src={`${BASE}/olo-supermarket-box.png`}
                alt="The front of the Magic OLO box, the wordmark with two eyes drawn into the O letters"
                style={figureStyle}
              />
              <ImageLightbox
                src={`${BASE}/olo-cardboard-cutout.png`}
                alt="The back of the box, a flat-pack cardboard cutout you punch out and assemble"
                style={figureStyle}
              />
            </div>

            <p
              style={{
                ...paragraphStyle,
                fontStyle: "italic",
                color: "var(--mid)",
              }}
            >
              Then I turned the box around. The whole back was a flat-pack
              cardboard cutout you punch out and fold into shape. A
              biscuit company giving you a tiny papercraft toy with your
              biscuits. I bought it for the box.
            </p>
          </section>

          {/* ── The Sketch ───────────────────────────────────── */}
          <section className="olo-section">
            <p style={labelStyle}>The sketch</p>
            <h2 style={headlineStyle}>Two O&apos;s, two eyes</h2>
            <p style={paragraphStyle}>
              The whole design move is right there in the name. O, L, O. Two
              circles with a pole between them. Drop pupils into the two
              O&apos;s and the wordmark becomes a face. That was the entire
              brief I gave myself: keep the letters, let the letters do the
              acting.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <ImageLightbox
                src={`${BASE}/olo-notebook-sketches.png`}
                alt="A page of notebook sketches working out OLO's states, the send button, the stop button, and a peeking pose from the side of the page"
                style={{
                  width: "auto",
                  maxWidth: "100%",
                  maxHeight: "min(60vh, 520px)",
                  height: "auto",
                  borderRadius: 12,
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />
            </div>
            <p style={paragraphStyle}>
              The notebook page is mostly variations. OLO with both eyes
              forward. OLO peeking from the edge of the page. A version of
              him squashed into a send button, a version squashed into a
              stop button, a thinking state with one eye closed. The
              question I kept coming back to was how few moving parts I
              could get away with before he stopped feeling alive.
            </p>
          </section>

          {/* ── The Build ────────────────────────────────────── */}
          <section className="olo-section">
            <p style={labelStyle}>The build</p>
            <h2 style={headlineStyle}>
              Animations, eyes, and a little personality
            </h2>
            <p style={paragraphStyle}>
              In Figma, OLO is one component with variants for every state.
              Each animation is a short sequence of frames the site cycles
              through, so I can drop him into any page and he behaves the
              same way. There are three animations doing almost all of the
              personality work.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <ImageLightbox
                src={`${BASE}/olo-animations.png`}
                alt="The OLO animation set, frames for eye-up scroll, eye scroll, and blink"
                style={{
                  width: "auto",
                  maxWidth: "min(100%, 460px)",
                  height: "auto",
                  borderRadius: 12,
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />
            </div>
            <ul className="olo-bullets">
              <li>
                <b>Eye-up scroll.</b> OLO looks up when you scroll past him.
              </li>
              <li>
                <b>Eye scroll.</b>{" "}
                OLO&apos;s eyes follow as you move down the page.
              </li>
              <li>
                <b>Blink.</b> OLO blinks every few seconds when idle.
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <ImageLightbox
                src={`${BASE}/olo-control-buttons.png`}
                alt="OLO's chat controls, the send button and the stop button, both built from the OLO mark"
                style={{
                  width: "auto",
                  maxWidth: "min(100%, 280px)",
                  height: "auto",
                  borderRadius: 12,
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />
            </div>
            <OloPointer />
            <p style={paragraphStyle}>
              The send and stop buttons are OLO too, the same wordmark
              compressed into round controls so the chat feels like one
              continuous character. Behind it sits a small knowledge base
              about me and my work, so when you ask him something he can
              answer in his own voice instead of a generic chatbot voice.
            </p>
          </section>

          {/* ── The Live Thing ───────────────────────────────── */}
          <section className="olo-section olo-live">
            <p style={labelStyle}>The live thing</p>
            <h2 style={headlineStyle}>He&apos;s right there</h2>
            <div className="olo-callout">
              <p style={paragraphStyle}>
                That is him, in the bottom-right corner of every page on
                this site.
              </p>
              <p style={{ ...paragraphStyle, marginTop: ".5rem" }}>
                Open the chat, ask him anything, see how he answers.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "1.5rem",
              }}
            >
              <ImageLightbox
                src={`${BASE}/olo-chat-screen.svg`}
                alt="OLO's chat screen, showing the conversation interface with OLO's wordmark and controls"
                style={{
                  width: "auto",
                  maxWidth: "min(100%, 320px)",
                  height: "auto",
                  borderRadius: 12,
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />
            </div>
          </section>

          {/* ── Reflection ───────────────────────────────────── */}
          <section className="olo-section">
            <p style={labelStyle}>Reflection</p>
            <h2 style={headlineStyle}>
              What I learned from a biscuit box
            </h2>
            <p style={paragraphStyle}>
              The thing I underestimated was how much warmth a small,
              useless character adds to a portfolio. OLO doesn&apos;t sell
              anything. He doesn&apos;t lead to a CTA. He just exists, and
              somehow that makes the whole site feel less like a
              transaction and more like a place.
            </p>
            <p style={paragraphStyle}>
              The other thing was how cheap the win was. The whole story
              started with a wordmark on a biscuit box. A lot of the
              design moments I am proudest of started somewhere just as
              small: a notebook, a bus, a queue at the till. I want to
              keep noticing them.
            </p>
          </section>
        </div>
      </main>

      <div id="olo-pointer-end" aria-hidden="true" style={{ height: 1 }} />

      {/* Back to Work */}
      <nav
        style={{ borderTop: "1px solid var(--rule)", paddingBlock: "2.5rem" }}
      >
        <div className="wrap" style={{ maxWidth: 720 }}>
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
            Back to
          </p>
          <a
            href="/projects"
            style={{
              fontSize: "var(--h2)",
              fontWeight: 600,
              letterSpacing: "-.02em",
              color: "var(--black)",
              textDecoration: "none",
            }}
          >
            All projects →
          </a>
        </div>
      </nav>

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
