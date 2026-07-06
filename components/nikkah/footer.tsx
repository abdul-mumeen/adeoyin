import { wedding } from "@/lib/wedding"
import { Ornament } from "./ornament"

export function Footer() {
  return (
    <footer className="bg-primary px-6 py-16 text-center text-primary-foreground">
      <p className="font-arabic text-2xl text-gold">اللَّهُمَّ بَارِكْ لَهُمَا</p>
      <p className="mt-3 text-sm italic text-primary-foreground/70">
        &ldquo;O Allah, bless them and unite them in goodness.&rdquo;
      </p>
      <Ornament className="mt-8" tone="gold" />
      <h2 className="mt-8 font-serif text-4xl">
        {wedding.bride}
        <span className="mx-2 text-gold">&amp;</span>
        {wedding.groom}
      </h2>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
        {wedding.dateLabel} &middot; {wedding.city}
      </p>
    </footer>
  )
}
