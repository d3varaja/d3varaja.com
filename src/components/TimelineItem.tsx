export interface TimelineItemProps {
  company: string;
  title: string;
  period: string;
  location?: string;
  bullets: string[];
  type: "work" | "education" | "volunteer";
  placeholder?: boolean;
}

export default function TimelineItem({
  company,
  title,
  period,
  location,
  bullets,
  type,
  placeholder,
}: TimelineItemProps) {
  return (
    <div
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
      <div>
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
        <p
          style={{
            fontSize: "var(--body)",
            color: "var(--mid)",
            marginBottom: bullets.length ? "1rem" : 0,
          }}
        >
          {company}
        </p>
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
