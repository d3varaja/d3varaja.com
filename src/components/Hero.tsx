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
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "37px",
              minWidth: "clamp(80px, 13.1vw, 98px)",
              padding: "0 clamp(.75rem, 2vw, 1.25rem)",
              background: "#000000",
              color: "#ffffff",
              fontSize: "clamp(10px, 1.87vw, 14px)",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "25px",
              whiteSpace: "nowrap",
            }}
          >
            Hire me
          </a>

          {/* Mail me */}
          <button
            onClick={handleMailMe}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "37px",
              minWidth: "clamp(80px, 13.1vw, 98px)",
              padding: "0 clamp(.75rem, 2vw, 1.25rem)",
              background: "#ffffff",
              color: "#000000",
              fontSize: "clamp(10px, 1.87vw, 14px)",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              border: "1px solid #000000",
              borderRadius: "25px",
              cursor: "none",
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "Copied ✓" : "Mail me"}
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
    <svg width="43" height="28" viewBox="0 0 43 28" fill="none" aria-hidden="true">
      <g clipPath="url(#be-clip)">
        <path d="M12.2789-3.05139e-05C13.4301-3.05139e-05 14.5813.109773 15.6776.32938C16.6095.548988 17.4865.933301 18.3088 1.48232C19.0214 2.03134 19.6244 2.74507 20.0081 3.5686C20.4466 4.61173 20.6659 5.70977 20.6111 6.80781C20.6659 8.01566 20.337 9.2235 19.734 10.2666C19.0762 11.2549 18.1443 12.0235 17.1028 12.5176C18.5829 12.9019 19.8437 13.8353 20.6659 15.0431C21.4882 16.3608 21.8719 17.898 21.8719 19.4353C21.8719 20.698 21.6526 21.9058 21.1044 23.0039C20.6111 23.9921 19.8985 24.8157 19.0762 25.5294C18.1992 26.1882 17.1576 26.6823 16.1161 26.9568C15.0198 27.2862 13.8686 27.396 12.7175 27.396H0V-.0549316H12.2789V-3.05139e-05ZM11.5115 11.0902C12.3886 11.1451 13.3205 10.8706 14.0331 10.3215C14.7457 9.71762 15.1294 8.78428 15.0198 7.79605C15.0198 7.24703 14.9102 6.69801 14.6909 6.20389C14.4716 5.81958 14.1975 5.49017 13.8138 5.27056C13.4301 5.05095 12.9916 4.83134 12.553 4.77644C12.0597 4.66663 11.5663 4.66664 11.073 4.66664H5.70094V11.0902H11.5115ZM11.8404 22.8392C12.3886 22.8392 12.9367 22.7843 13.4301 22.6745C13.9235 22.5647 14.362 22.3451 14.8005 22.0706C15.1842 21.796 15.5131 21.4117 15.7324 20.9725C16.0065 20.4235 16.1161 19.8196 16.0613 19.2157C16.1709 18.0627 15.7324 16.9647 14.9102 16.196C14.0331 15.5372 12.9916 15.2627 11.8952 15.3176H5.70094V22.8941H11.8404V22.8392Z" fill="#191919"/>
        <path d="M29.9848 22.7294C30.9167 23.5529 32.1226 23.9921 33.3286 23.9372C34.3153 23.9372 35.2472 23.6627 36.0146 23.1137C36.6724 22.6745 37.111 22.0705 37.385 21.3568H41.9348C41.4415 23.3882 40.2355 25.1999 38.591 26.4627C37.0013 27.5607 35.0827 28.0549 33.1093 28C31.7389 28 30.3685 27.7803 29.0529 27.2313C27.9017 26.7372 26.8602 26.0235 26.038 25.0901C25.2157 24.1019 24.5579 23.0039 24.1194 21.796C23.626 20.4235 23.4068 18.996 23.4616 17.5686C23.4616 16.1411 23.6809 14.7686 24.1742 13.396C25.4898 9.55289 29.1077 6.9725 33.1642 7.0274C34.6442 6.9725 36.0694 7.35681 37.385 8.01564C38.5362 8.67446 39.5777 9.55289 40.3451 10.6509C41.1126 11.8039 41.7156 13.0666 41.9896 14.4392C42.3185 15.8666 42.4282 17.4039 42.3734 18.8862H28.7788C28.6144 20.2588 29.0529 21.6313 29.9848 22.7294ZM35.905 12.2431C35.1376 11.4745 34.096 11.0901 32.9997 11.1451C32.2871 11.1451 31.5745 11.2549 30.9715 11.5843C30.4781 11.8588 30.0396 12.2431 29.6559 12.6823C29.327 13.1215 29.1077 13.5607 28.9433 14.1098C28.8336 14.549 28.724 14.9882 28.724 15.4274H37.1658C37.0561 14.2745 36.6176 13.1764 35.905 12.2431Z" fill="#191919"/>
        <path d="M38.1525 1.81171H27.6277V4.5019H38.1525V1.81171Z" fill="#191919"/>
      </g>
      <defs>
        <clipPath id="be-clip">
          <rect width="42.3733" height="28" fill="white"/>
        </clipPath>
      </defs>
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
