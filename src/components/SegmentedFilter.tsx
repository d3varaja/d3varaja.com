"use client";

interface Category {
  id: string;
  label: string;
  count: number;
}

interface SegmentedFilterProps {
  active: string;
  categories: Category[];
  onChange: (id: string) => void;
}

export default function SegmentedFilter({
  active,
  categories,
  onChange,
}: SegmentedFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div style={{ margin: "0 0 1.25rem" }}>
      <style>{`
        .cs-seg-track {
          display: inline-flex;
          gap: 4px;
          background: #fff;
          border: 1px solid var(--rule);
          border-radius: 999px;
          padding: 4px;
        }
        .cs-seg-tab {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          border: none;
          background: transparent;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .02em;
          padding: .55rem 1rem;
          border-radius: 999px;
          color: var(--mid);
          cursor: pointer;
          transition: background .2s ease, color .2s ease;
          font-family: inherit;
        }
        .cs-seg-tab:hover { color: var(--black); }
        .cs-seg-tab.is-active {
          background: var(--black);
          color: var(--white);
        }
        .cs-seg-count {
          font-size: 10px;
          opacity: .6;
          letter-spacing: .05em;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
      <div className="cs-seg-track">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`cs-seg-tab${active === c.id ? " is-active" : ""}`}
            onClick={() => onChange(c.id)}
          >
            {c.label}
            <span className="cs-seg-count">
              {String(c.count).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
