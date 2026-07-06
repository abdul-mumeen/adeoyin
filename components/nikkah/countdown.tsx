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

export function Countdown() {
  const target = new Date(wedding.date).getTime()
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(target))
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Minutes", value: time?.minutes ?? 0 },
    { label: "Seconds", value: time?.seconds ?? 0 },
  ]

  const arrived =
    time && time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0

  return (
    <section className="bg-primary px-6 py-20 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">
          Counting every moment
        </p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
          {arrived ? "Today We Become One" : "Until We Say Qabool Hai"}
        </h2>

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
      </div>
    </section>
  )
}
