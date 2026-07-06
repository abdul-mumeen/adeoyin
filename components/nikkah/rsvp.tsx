"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { wedding } from "@/lib/wedding"
import { Ornament } from "./ornament"

export function Rsvp() {
  const [submitted, setSubmitted] = useState(false)
  const [attending, setAttending] = useState<"yes" | "no">("yes")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* Floral accent */}
      <img
        src="/images/floral-sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 w-40 opacity-40 sm:w-56 animate-float-slow"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-accent-foreground/70">
          Kindly Respond
        </p>
        <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
          Will You Join Us?
        </h2>
        <Ornament className="mt-6" tone="gold" />

        {submitted ? (
          <div className="mt-12 rounded-sm border border-gold/50 bg-card p-10 shadow-sm">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-serif text-2xl text-primary">
              JazakAllah Khair!
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/75">
              {attending === "yes"
                ? "Your response has been noted. We cannot wait to celebrate this blessed day with you, insha'Allah."
                : "Thank you for letting us know. You will be in our duas, and we hope to see you again soon."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-12 rounded-sm border border-border bg-card p-6 text-left shadow-sm sm:p-8"
          >
            <label className="block">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70">
                Full Name
              </span>
              <input
                type="text"
                required
                placeholder="Your name"
                className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </label>

            <fieldset className="mt-5">
              <legend className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70">
                Will you attend?
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["yes", "no"] as const).map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setAttending(option)}
                    className={`rounded-sm border px-4 py-3 text-sm font-medium capitalize transition-colors ${
                      attending === option
                        ? "border-gold bg-primary text-primary-foreground"
                        : "border-input bg-background text-foreground/70 hover:border-gold"
                    }`}
                  >
                    {option === "yes" ? "Joyfully accepts" : "Regretfully declines"}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70">
                Number of Guests
              </span>
              <select className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40">
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="mt-7 w-full rounded-sm bg-primary px-6 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send RSVP
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Kindly respond before 20th July 2026
            </p>
          </form>
        )}

        <p className="mt-10 font-arabic text-xl text-primary">
          {wedding.brideFull} &amp; {wedding.groomFull}
        </p>
      </div>
    </section>
  )
}
