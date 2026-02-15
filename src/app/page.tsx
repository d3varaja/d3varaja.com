import PillNav from "@/components/PillNav";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <PillNav />
      <Hero />

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
            © {new Date().getFullYear()} Tharun Devaraja
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <FootLink href="https://x.com/d3varaja">X</FootLink>
            <FootLink href="https://github.com/d3varaja">GitHub</FootLink>
            <FootLink href="https://linkedin.com/in/d3varaja">LinkedIn</FootLink>
          </div>
        </div>
      </footer>
    </>
  );
}

function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: "var(--small)", color: "var(--mid)", textDecoration: "none" }}
    >
      {children}
    </a>
  );
}
