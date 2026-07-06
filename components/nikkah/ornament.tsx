type OrnamentProps = {
  className?: string
  tone?: "gold" | "emerald"
}

/**
 * A small, symmetrical decorative divider inspired by Islamic geometric
 * motifs. Purely decorative, so it is hidden from assistive tech.
 */
export function Ornament({ className, tone = "gold" }: OrnamentProps) {
  const color = tone === "gold" ? "var(--gold)" : "var(--primary)"

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className ?? ""}`}
    >
      <span
        className="h-px w-16 sm:w-24"
        style={{
          background: `linear-gradient(to right, transparent, ${color})`,
        }}
      />
      <svg
        width="46"
        height="20"
        viewBox="0 0 46 20"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M23 1 L28 10 L23 19 L18 10 Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <circle cx="23" cy="10" r="2.2" fill={color} />
        <path d="M18 10 L4 10" stroke={color} strokeWidth="1" />
        <path d="M28 10 L42 10" stroke={color} strokeWidth="1" />
        <circle cx="4" cy="10" r="1.6" fill={color} />
        <circle cx="42" cy="10" r="1.6" fill={color} />
      </svg>
      <span
        className="h-px w-16 sm:w-24"
        style={{
          background: `linear-gradient(to left, transparent, ${color})`,
        }}
      />
    </div>
  )
}
