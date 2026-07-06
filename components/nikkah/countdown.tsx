"use client"

import { useEffect, useState } from "react"
import { wedding } from "@/lib/wedding"
import { Ornament } from "./ornament"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function Countdown({ livestreamUrl }: { livestreamUrl?: string | null }) {
  const eventDate = new Date(wedding.date)
  const target = eventDate.getTime()
  const [time, setTime] = useState<TimeLeft | null>(null)
  // Computed on the client so the link appears only on the wedding day
  // (kept false during SSR/first render to avoid hydration mismatches).
  const [isEventDay, setIsEventDay] = useState(false)

  useEffect(() => {
    const tick = () => {
      setTime(getTimeLeft(target))
      setIsEventDay(isSameDay(new Date(), eventDate))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Minutes", value: time?.minutes ?? 0 },
    { label: "Seconds", value: time?.seconds ?? 0 },
  ]

  return (
    <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 font-serif text-4xl sm:text-5xl">Until We Say</h2>
        <p
          dir="rtl"
          lang="ar"
          className="font-serif text-3xl leading-relaxed text-gold sm:text-4xl"
        >
          بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
        <p className="mt-6 font-serif text-lg italic text-primary-foreground/80 sm:text-xl">
          &ldquo;Allah&rsquo;s blessing for you and blessings upon you. May you be
          joined together in goodness.&rdquo;
        </p>

        <Ornament className="mt-6" tone="gold" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="rounded-sm border border-gold/30 bg-primary-foreground/5 px-2 py-6 backdrop-blur-sm"
            >
              <div
                className="font-serif text-5xl tabular-nums text-gold sm:text-6xl"
                aria-hidden={time === null}
              >
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground/70">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-serif text-lg italic text-primary-foreground/80">
          {wedding.dateLabel}
        </p>

        {isEventDay && livestreamUrl ? (
          <p className="mt-6 font-serif text-lg text-primary-foreground/90 sm:text-xl">
            Join us online{" "}
            <a
              href={livestreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold"
            >
              here
            </a>
          </p>
        ) : null}
      </div>
    </section>
  )
}
