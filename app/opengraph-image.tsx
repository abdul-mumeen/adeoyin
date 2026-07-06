import { ImageResponse } from "next/og"
import { wedding } from "@/lib/wedding"

// Route-based Open Graph image. Next.js auto-injects og:image and
// twitter:image tags pointing here. Regenerated on demand and cached.
export const alt = `${wedding.bride} & ${wedding.groom} — Nikkah Invitation`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const NAVY = "#1f4e7a"
const GOLD = "#c9a24b"
const CREAM = "#fbf8f0"

// Load a Google Font as TTF (a server-side fetch without a browser User-Agent
// returns TrueType, which Satori/ImageResponse supports). Falls back to the
// built-in font if the fetch fails.
async function loadFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+",
    )}:wght@${weight}`
    const css = await (await fetch(cssUrl)).text()
    const match = css.match(
      /src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/,
    )
    if (!match) return null
    const res = await fetch(match[1])
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const [serif600, serif500] = await Promise.all([
    loadFont("Cormorant Garamond", 600),
    loadFont("Cormorant Garamond", 500),
  ])

  const fonts: {
    name: string
    data: ArrayBuffer
    weight: 500 | 600
    style: "normal"
  }[] = []
  if (serif600)
    fonts.push({ name: "Cormorant", data: serif600, weight: 600, style: "normal" })
  if (serif500)
    fonts.push({ name: "Cormorant", data: serif500, weight: 500, style: "normal" })

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: NAVY,
          color: CREAM,
          fontFamily: "Cormorant",
          position: "relative",
        }}
      >
        {/* Gold frame */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: `2px solid ${GOLD}`,
            borderRadius: 8,
          }}
        />

        <div
          style={{
            fontSize: 28,
            letterSpacing: 10,
            color: GOLD,
            fontWeight: 500,
          }}
        >
          AQDU NIKKAH
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            fontSize: 104,
            fontWeight: 600,
          }}
        >
          <span>{wedding.bride}</span>
          <span style={{ color: GOLD, margin: "0 28px" }}>{"&"}</span>
          <span>{wedding.groom}</span>
        </div>

        {/* Ornament */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
          <div
            style={{ width: 150, height: 2, backgroundColor: GOLD, opacity: 0.7 }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              margin: "0 16px",
              backgroundColor: GOLD,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{ width: 150, height: 2, backgroundColor: GOLD, opacity: 0.7 }}
          />
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            fontStyle: "italic",
            color: "rgba(251,248,240,0.9)",
          }}
        >
          {wedding.dateLabel}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 24,
            letterSpacing: 4,
            color: "rgba(251,248,240,0.7)",
          }}
        >
          {wedding.hijriLabel}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  )
}
