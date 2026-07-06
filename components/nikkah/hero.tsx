import { wedding } from "@/lib/wedding"
import { Ornament } from "./ornament"

export function Hero() {
  return (
    <header className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Decorative arabesque backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/arabesque-hero.png)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-primary/85"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-sm border border-gold/40 sm:inset-6"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-primary-foreground">
        <p className="font-arabic text-2xl text-gold sm:text-3xl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-primary-foreground/70">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>

        <Ornament className="mt-8" tone="gold" />

        <p className="mt-8 font-serif text-lg italic text-primary-foreground/80">
          Together with their families, we joyfully invite you to the Nikkah of
        </p>

        <h1 className="mt-6 font-serif text-6xl leading-none text-primary-foreground sm:text-7xl md:text-8xl">
          {wedding.bride}
          <span className="mx-3 inline-block text-gold">&amp;</span>
          {wedding.groom}
        </h1>

        <div className="mt-10 flex flex-col items-center gap-1 text-primary-foreground/85">
          <p className="text-sm uppercase tracking-[0.3em]">
            {wedding.dateLabel}
          </p>
          <p className="font-arabic text-base text-gold">{wedding.hijriLabel}</p>
          <p className="mt-1 text-sm tracking-wide">{wedding.city}</p>
        </div>

        <Ornament className="mt-10" tone="gold" />

        <a
          href="#rsvp"
          className="mt-10 inline-block rounded-sm border border-gold bg-gold/95 px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-foreground transition-colors hover:bg-transparent hover:text-gold"
        >
          Confirm Your Presence
        </a>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60">
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </header>
  )
}
