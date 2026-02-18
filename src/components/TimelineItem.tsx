export interface TimelineItemProps {
  company: string;
  title: string;
  period: string;
  location?: string;
  bullets: string[];
  type: "work" | "education" | "volunteer" | "internship";
  placeholder?: boolean;
  logo?: string;
}

export default function TimelineItem({
  company,
  title,
  period,
  location,
  bullets,
  type,
  placeholder,
  logo,
}: TimelineItemProps) {
  return (
    <div
      className="timeline-item"
      style={{
        display: "grid",
        gridTemplateColumns: "clamp(9rem,22%,13rem) 1fr",
        gap: "0 3rem",
        padding: "2.25rem 0",
        borderTop: "1px solid var(--rule)",
        opacity: placeholder ? 0.35 : 1,
      }}
    >
      {/* Left */}
      <div className="timeline-left">
        <p
          className="eyebrow"
          style={{ marginBottom: ".5rem" }}
        >
          {type}
        </p>
        <p style={{ fontSize: "var(--small)", color: "var(--mid)", lineHeight: 1.6 }}>
          {period}
        </p>
        {location && (
          <p style={{ fontSize: "var(--label)", color: "var(--mid)", marginTop: ".25rem", letterSpacing: ".04em" }}>
            {location}
          </p>
        )}
      </div>

      {/* Right */}
      <div>
        {/* Logo + title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: ".875rem", marginBottom: ".75rem" }}>
          {/* Logo */}
          {logo ? (
            <img
              src={logo}
              alt={company}
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                objectFit: "contain",
                border: "1px solid var(--rule)",
                background: "transparent",
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                border: "1px solid var(--rule)",
                background: "var(--white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "var(--small)",
                fontWeight: 600,
                color: "var(--mid)",
                flexShrink: 0,
              }}
            >
              {company.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Title + company */}
          <div>
            <p
              style={{
                fontSize: "var(--h2)",
                fontWeight: 600,
                letterSpacing: "-.015em",
                lineHeight: 1.25,
                marginBottom: ".2rem",
              }}
            >
              {title}
            </p>
            <p style={{ fontSize: "var(--body)", color: "var(--mid)" }}>
              {company}
            </p>
          </div>
        </div>
        {bullets.length > 0 && (
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".35rem" }}>
            {bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  fontSize: "var(--small)",
                  color: "var(--mid)",
                  lineHeight: 1.65,
                  paddingLeft: "1rem",
                  position: "relative",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: ".6em",
                    width: "4px",
                    height: "1px",
                    background: "var(--mid)",
                  }}
                />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
