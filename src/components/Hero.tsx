"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GlareHover from "./GlareHover";

const TICKER_ITEMS = [
  "Product Design", "UX Research", "Design Systems",
  "Figma", "Prototyping", "Interaction Design",
  "Visual Design", "User Testing", "Brand Identity",
];
const TICKER_TEXT = [...TICKER_ITEMS, ...TICKER_ITEMS].map((t) => `${t}  ·`).join("  ");

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Set initial hidden state before first paint
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    // Wait one tick, then use rAF so transition starts on the correct paint frame
    const id = setTimeout(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          "opacity 600ms cubic-bezier(.16,1,.3,1), transform 600ms cubic-bezier(.16,1,.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, 80);
    return () => clearTimeout(id);
  }, []);

  const handleMailMe = () => {
    navigator.clipboard.writeText("tharun@d3varaja.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: "var(--gap)",
        position: "relative",
      }}
    >
      {/* ── Business Card ─────────────────────────── */}
      <GlareHover
        ref={cardRef}
        glareColor="#000000"
        glareOpacity={0.07}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={1600}
        delay={700}
        style={{
          width: "100%",
          maxWidth: "655px",
          background: "#ffffff",
          border: "1px solid rgba(12,12,12,.12)",
          borderRadius: "19px",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(12,12,12,.04), 0 4px 16px rgba(12,12,12,.06)",
          padding: "clamp(1rem, 3.8vw, 1.75rem) clamp(1rem, 3.8vw, 1.75rem) clamp(1rem, 3.8vw, 1.75rem) clamp(1.25rem, 4.9vw, 2.3125rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.25rem, 6.5vw, 3.1875rem)",
        }}
      >
        {/* ── Main row: text + photo ──────────────── */}
        <div
          style={{
            display: "flex",
            gap: "clamp(.5rem, 1.6vw, .75rem)",
            alignItems: "flex-start",
          }}
        >
          {/* Left — text */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(.875rem, 1.8vw, 1rem)",
            }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontSize: "clamp(9px, 1.98vw, 13px)",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#838383",
                lineHeight: 1,
              }}
            >
              Product Designer
            </p>

            {/* Name */}
            <h1
              style={{
                fontSize: "clamp(1.75rem, 6.14vw, 46px)",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "#000000",
              }}
            >
              Tharun
              <br />
              Devaraja
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(11px, 2.44vw, 16px)",
                fontWeight: 400,
                lineHeight: 1.13,
                color: "#000000",
              }}
            >
              2+ years of experience designing thoughtful, scalable products
              that solve real user problems through design and development.
            </p>
          </div>

          {/* Right — profile photo */}
          <div
            style={{
              width: "clamp(110px, 33.1vw, 217px)",
              aspectRatio: "217 / 247",
              borderRadius: "12px",
              border: "3px solid #000000",
              flexShrink: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Tharun Devaraja"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          </div>
        </div>

        {/* ── Bottom CTA bar ──────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(.75rem, 2.7vw, 1.25rem)",
            flexWrap: "wrap",
            paddingTop: "clamp(.625rem, 2.7vw, 1.3125rem)",
            borderTop: "1px solid var(--rule)",
          }}
        >
          {/* Hire me */}
          <a
            href="mailto:tharun@d3varaja.com"
            aria-label="Send email to hire Tharun"
            style={{ width: 108 }}
            className="relative bg-zinc-200 rounded-full overflow-hidden hover:bg-zinc-300 transition-colors duration-200 local-focus-ring flex items-center justify-center h-10 px-3.5 whitespace-nowrap no-underline touch-manipulation"
          >
            <span className="flex gap-1.5 items-center h-6 text-base font-medium text-zinc-600">
              Hire me
            </span>
          </a>

          {/* Mail me — label slide on hover */}
          <button
            onClick={handleMailMe}
            aria-label="Copy email address"
            className="group bg-zinc-200 h-10 px-3.5 w-[110px] hover:w-[130px] rounded-full hover:bg-zinc-300 transition-[width,background-color] duration-200 ease-out local-focus-ring relative overflow-hidden border-0 touch-manipulation"
          >
            <span className="flex items-center justify-center w-full h-full">
              {copied ? (
                <span className="flex gap-1.5 items-center h-6 text-base font-medium text-zinc-600">
                  Copied ✓
                </span>
              ) : (
                <span className="h-6 overflow-hidden">
                  <span className="flex flex-col items-center transition-transform duration-200 ease-out group-hover:-translate-y-6">
                    <span className="flex gap-1.5 items-center justify-center h-6 text-base font-medium text-zinc-600 w-full">
                      <MailIcon />
                      Mail me
                    </span>
                    <span className="flex gap-1.5 items-center justify-center h-6 text-base font-medium text-zinc-600 w-full">
                      <CopyIcon />
                      Copy email
                    </span>
                  </span>
                </span>
              )}
            </span>
          </button>

          {/* Social icons — pushed right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(.75rem, 2.7vw, 1.25rem)",
              marginLeft: "auto",
            }}
          >
            <SocialLink href="https://github.com/d3varaja" label="GitHub">
              <GitHubIcon />
            </SocialLink>
            <SocialLink href="https://www.behance.net/d3varaja" label="Behance">
              <BehanceIcon />
            </SocialLink>
            <SocialLink href="https://dribbble.com/d3varaja" label="Dribbble">
              <DribbbleIcon />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/d3varaja" label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
          </div>
        </div>
      </GlareHover>

      {/* ── Ticker ────────────────────────────────── */}
      <div
        className="ticker-wrap"
        style={{ width: "100vw", position: "absolute", bottom: 0, left: 0 }}
      >
        <div className="ticker-track">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: "var(--label)",
                fontWeight: 500,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--mid)",
                paddingRight: "3rem",
              }}
            >
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Social link wrapper ───────────────────────── */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: "flex",
        alignItems: "center",
        color: "#000000",
        textDecoration: "none",
        opacity: 0.75,
        transition: "opacity 120ms ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
    >
      {children}
    </a>
  );
}

/* ── Button icons ───────────────────────────────── */

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="4.5" y="1" width="8.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="4.5" width="8.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ── SVG icons (exact from Figma assets) ────────── */

function GitHubIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0116 0C6.26354 0 0 6.41664 0 14.3549C0 20.7004 4.01327 26.0717 9.58073 27.9728C10.2768 28.1157 10.5318 27.6639 10.5318 27.2838C10.5318 26.9511 10.5088 25.8104 10.5088 24.6218C6.61115 25.4776 5.79949 22.9106 5.79949 22.9106C5.17311 21.247 4.245 20.8194 4.245 20.8194C2.96929 19.94 4.33793 19.94 4.33793 19.94C5.75303 20.0351 6.49557 21.4135 6.49557 21.4135C7.74804 23.5998 9.76629 22.9821 10.5782 22.6017C10.6941 21.6748 11.0655 21.0332 11.4599 20.6767C8.3512 20.344 5.08047 19.1082 5.08047 13.5942C5.08047 12.0257 5.63687 10.7423 6.51851 9.74425C6.37941 9.38784 5.89213 7.91405 6.6579 5.94152C6.6579 5.94152 7.84097 5.56119 10.5085 7.41501C11.6506 7.10079 12.8284 6.94094 14.0116 6.9396C15.1947 6.9396 16.4007 7.10614 17.5143 7.41501C20.1822 5.56119 21.3653 5.94152 21.3653 5.94152C22.131 7.91405 21.6435 9.38784 21.5044 9.74425C22.4092 10.7423 22.9427 12.0257 22.9427 13.5942C22.9427 19.1082 19.672 20.32 16.5401 20.6767C17.0506 21.1282 17.4911 21.9837 17.4911 23.3385C17.4911 25.2635 17.4682 26.8084 17.4682 27.2836C17.4682 27.6639 17.7234 28.1157 18.4192 27.9731C23.9867 26.0714 27.9999 20.7004 27.9999 14.3549C28.0229 6.41664 21.7364 0 14.0116 0Z"
        fill="#24292F"
      />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg width="36" height="24" viewBox="0 0 36.0114 24.0506" fill="none" aria-hidden="true">
      <path d="M10.4321 0.0470581C11.4101 0.0470581 12.3881 0.141175 13.3195 0.32941C14.1113 0.517646 14.8564 0.847057 15.555 1.31764C16.1604 1.78823 16.6727 2.4 16.9987 3.10588C17.3713 4 17.5576 4.94118 17.511 5.88235C17.5576 6.91765 17.2781 7.95294 16.7658 8.84706C16.207 9.69411 15.4153 10.3529 14.5304 10.7765C15.7878 11.1059 16.859 11.9059 17.5576 12.9412C18.2561 14.0706 18.5821 15.3882 18.5821 16.7059C18.5821 17.7882 18.3959 18.8235 17.9301 19.7647C17.511 20.6118 16.9056 21.3176 16.207 21.9294C15.4618 22.4941 14.577 22.9176 13.6921 23.1529C12.7607 23.4353 11.7827 23.5294 10.8047 23.5294H0V0H10.4321V0.0470581ZM9.78008 9.55294C10.5252 9.6 11.3169 9.36471 11.9224 8.89412C12.5278 8.37647 12.8538 7.57647 12.7607 6.72941C12.7607 6.25882 12.6675 5.78824 12.4812 5.36471C12.295 5.03529 12.0621 4.75294 11.7361 4.5647C11.4101 4.37647 11.0375 4.18823 10.6649 4.14117C10.2458 4.04706 9.82665 4.04706 9.4075 4.04706H4.84347V9.55294H9.78008ZM10.0595 19.6235C10.5252 19.6235 10.9909 19.5765 11.4101 19.4824C11.8292 19.3882 12.2018 19.2 12.5744 18.9647C12.9004 18.7294 13.1798 18.4 13.3661 18.0235C13.599 17.5529 13.6921 17.0353 13.6455 16.5176C13.7387 15.5294 13.3661 14.5882 12.6675 13.9294C11.9224 13.3647 11.0375 13.1294 10.1061 13.1765H4.84347V19.6706H10.0595V19.6235Z" fill="currentColor"/>
      <path d="M25.4748 19.5294C26.2665 20.2353 27.2911 20.6118 28.3157 20.5647C29.1539 20.5647 29.9457 20.3294 30.5977 19.8588C31.1565 19.4824 31.5291 18.9647 31.762 18.3529H35.6274C35.2083 20.0941 34.1837 21.6471 32.7865 22.7294C31.436 23.6706 29.806 24.0941 28.1294 24.0471C26.9651 24.0471 25.8008 23.8588 24.6831 23.3882C23.705 22.9647 22.8202 22.3529 22.1216 21.5529C21.423 20.7059 20.8642 19.7647 20.4916 18.7294C20.0724 17.5529 19.8862 16.3294 19.9327 15.1059C19.9327 13.8824 20.119 12.7059 20.5382 11.5294C21.6559 8.23529 24.7296 6.02353 28.1759 6.07059C29.4334 6.02353 30.6442 6.35294 31.762 6.91764C32.74 7.48235 33.6248 8.23529 34.2768 9.17647C34.9289 10.1647 35.4411 11.2471 35.674 12.4235C35.9534 13.6471 36.0466 14.9647 36 16.2353H24.4502C24.3105 17.4118 24.6831 18.5882 25.4748 19.5294ZM30.5045 10.5412C29.8525 9.88235 28.9677 9.55294 28.0362 9.6C27.4308 9.6 26.8254 9.69411 26.3131 9.97647C25.8939 10.2118 25.5213 10.5412 25.1953 10.9176C24.9159 11.2941 24.7296 11.6706 24.5899 12.1412C24.4968 12.5176 24.4036 12.8941 24.4036 13.2706H31.5757C31.4825 12.2824 31.11 11.3412 30.5045 10.5412Z" fill="currentColor"/>
      <path d="M32.414 1.6H23.4722V3.90588H32.414V1.6Z" fill="currentColor"/>
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <g clipPath="url(#dr-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 13.9975C0 6.27073 6.26618 0 14 0C21.7344 0 28 6.27637 28 14.0025C28 21.7293 21.7338 28 14 28H12.8644V27.9495C5.66646 27.371 0 21.3423 0 13.9975ZM14.3482 25.7241C20.6659 25.5399 25.7288 20.3594 25.7288 14.0025C25.7288 7.52872 20.4783 2.2708 14 2.2708C7.52115 2.2708 2.27121 7.52426 2.27121 13.9975C2.27121 20.4704 7.52592 25.7241 14 25.7241H14.3482Z" fill="#060318"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.33195 3.74082C8.17625 3.69182 8.01485 3.64103 7.84668 3.58399L8.57643 1.43359C8.64346 1.45634 8.76416 1.49483 8.90508 1.53976C9.15826 1.62049 9.47667 1.72202 9.66633 1.79041L9.67652 1.79408L9.68663 1.79795C9.73852 1.81779 9.79412 1.83882 9.85244 1.86088C10.1462 1.97199 10.5087 2.10907 10.8114 2.25064L10.8249 2.25693L10.8849 2.28692C11.0273 2.35334 11.2412 2.4553 11.4194 2.54022C11.5194 2.5879 11.6082 2.63021 11.6668 2.65784L11.6938 2.67063L11.7202 2.68484C11.7263 2.68814 11.7336 2.69199 11.7417 2.69635C11.8031 2.72922 11.9176 2.79048 12.0274 2.8576L12.0576 2.87602L12.0661 2.88199C12.0785 2.8892 12.0955 2.89883 12.1165 2.91051C12.1348 2.92072 12.1524 2.93043 12.1701 2.94013C12.1735 2.94203 12.177 2.94394 12.1804 2.94585C12.1901 2.95119 12.2012 2.95728 12.2111 2.96281L12.2118 2.9632C12.2168 2.966 12.2297 2.97316 12.2445 2.98183C12.2579 2.98954 12.2786 3.00131 12.3044 3.01605C12.3833 3.06112 12.511 3.13394 12.6294 3.20332C12.7515 3.2748 12.9378 3.38489 13.0756 3.48153C13.2233 3.57222 13.3857 3.68469 13.4938 3.75957C13.5133 3.77306 13.531 3.78533 13.5465 3.79604C13.6296 3.84665 13.711 3.90404 13.7676 3.94462C13.8487 4.00267 13.9369 4.06844 14.0173 4.12891C14.0545 4.15684 14.0884 4.18247 14.1205 4.2067C14.1632 4.23891 14.2025 4.26864 14.2418 4.298C14.2742 4.32225 14.3012 4.34223 14.3229 4.35806C14.3337 4.36588 14.3421 4.37189 14.3484 4.37634C14.3538 4.38014 14.3563 4.38185 14.3565 4.38194L14.386 4.40167L14.4146 4.42337C15.6679 5.37812 16.7841 6.49983 17.7367 7.75003L17.7376 7.75117L17.7385 7.75235C18.7917 9.14181 19.6232 10.6842 20.1998 12.3256C21.9179 17.1246 21.4127 22.6687 18.7123 27.0452L16.7793 25.8529C19.1065 22.0813 19.5545 17.2584 18.0605 13.0881L18.0592 13.0846L18.0581 13.0812C17.5603 11.6635 16.8415 10.3289 15.9292 9.12492C15.1037 8.04197 14.1397 7.07212 13.061 6.24713C13.0013 6.20574 12.9352 6.15661 12.8811 6.11614C12.8401 6.08552 12.792 6.04921 12.7445 6.01337C12.7126 5.98931 12.6811 5.96551 12.6522 5.94381C12.5743 5.88519 12.5034 5.83247 12.4448 5.79047C12.3925 5.75302 12.3707 5.73919 12.3709 5.73897C12.3707 5.73889 12.3709 5.73897 12.3709 5.73897L12.3374 5.72007L12.2979 5.69334C12.2399 5.65397 12.1883 5.61822 12.1409 5.58546C12.037 5.51353 11.9537 5.45591 11.8692 5.40577L11.8139 5.37292L11.7627 5.33407C11.7658 5.33647 11.7656 5.33634 11.7611 5.33332C11.7527 5.32772 11.7293 5.31219 11.6856 5.28502C11.6279 5.24928 11.5572 5.20706 11.4816 5.16279C11.3745 5.10005 11.2769 5.04436 11.1996 5.0003C11.1636 4.97974 11.132 4.96171 11.106 4.94671L11.1036 4.94535C11.0997 4.94316 11.0938 4.93988 11.085 4.93502C11.0823 4.93354 11.0793 4.93192 11.0761 4.93017C11.0586 4.92054 11.0352 4.90764 11.0113 4.89438C10.9834 4.87885 10.9496 4.85977 10.9166 4.84048C10.8986 4.82994 10.865 4.81016 10.8274 4.78575C10.7811 4.75819 10.7315 4.73154 10.6724 4.69982C10.6716 4.69934 10.6707 4.69886 10.6698 4.69838C10.5992 4.66496 10.5112 4.62304 10.4179 4.57851C10.2423 4.49477 10.0474 4.40189 9.91221 4.33899L9.89764 4.33222L9.83652 4.30167C9.6221 4.20226 9.36537 4.10494 9.07785 3.99593C9.01533 3.97223 8.95137 3.94798 8.88605 3.92303C8.70882 3.85942 8.52476 3.8015 8.33195 3.74082ZM11.106 4.94671C11.1072 4.94741 11.108 4.9478 11.108 4.9478L11.106 4.94671Z" fill="#060318"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.1142 9.14509C16.5417 8.52625 19.7046 6.60378 21.8678 3.86731L23.6497 5.2754C21.1498 8.43778 17.5004 10.6607 13.5175 11.3798C11.5344 11.7374 9.49652 11.7495 7.50756 11.3848C5.52402 11.0313 3.61001 10.3192 1.87891 9.27962L3.04833 7.33301C4.54004 8.22879 6.19331 8.84431 7.90883 9.14973L7.91181 9.15025L7.91478 9.15082C9.62501 9.46468 11.3881 9.45628 13.1142 9.14509Z" fill="#060318"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.04639 25.5111C8.98539 15.617 19.0686 10.1527 27.3151 12.4003L26.7177 14.5912C19.7175 12.6833 10.9553 17.3749 9.27523 25.9477L7.04639 25.5111Z" fill="#060318"/>
      </g>
      <defs>
        <clipPath id="dr-clip">
          <rect width="28" height="28" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M23.8573 23.8579H19.7086V17.3606C19.7086 15.8112 19.681 13.8168 17.5508 13.8168C15.39 13.8168 15.0594 15.5048 15.0594 17.2478V23.8575H10.9107V10.4964H14.8935V12.3223H14.9492C15.3478 11.6408 15.9238 11.0801 16.6158 10.7001C17.3078 10.32 18.0899 10.1348 18.8789 10.164C23.0838 10.164 23.8591 12.9299 23.8591 16.5282L23.8573 23.8579ZM6.22956 8.67001C5.75339 8.6701 5.28788 8.52898 4.89191 8.26449C4.49594 8.00001 4.18732 7.62404 4.00502 7.18413C3.82271 6.74423 3.77494 6.26014 3.86775 5.79309C3.96056 5.32604 4.18979 4.897 4.52643 4.56022C4.86308 4.22345 5.29202 3.99406 5.75903 3.90108C6.22603 3.8081 6.71011 3.85569 7.15006 4.03784C7.59002 4.21999 7.96608 4.52851 8.2307 4.9244C8.49532 5.32029 8.63661 5.78576 8.63669 6.26194C8.63675 6.57812 8.57452 6.89121 8.45358 7.18334C8.33265 7.47547 8.15537 7.74091 7.93185 7.96453C7.70833 8.18814 7.44293 8.36553 7.15086 8.48657C6.85878 8.60762 6.54573 8.66996 6.22956 8.67001ZM8.30392 23.8579H4.15088V10.4964H8.30392V23.8579ZM25.9256 0.00190769H2.06616C1.52461-0.00420383 1.00277.204941.615347.583383C.227922.961825.00660924 1.4786 0 2.02016V25.9794C.00638303 26.5212.227566 27.0384.614977 27.4172C1.00239 27.796 1.52434 28.0056 2.06616 27.9998H25.9256C26.4685 28.0066 26.9919 27.7977 27.3809 27.4189C27.7698 27.04 27.9925 26.5223 28 25.9794V2.01843C27.9923 1.4758 27.7694.958434 27.3805.580001C26.9915.201569 26.4683-.00697834 25.9256.000178292" fill="black"/>
    </svg>
  );
}
