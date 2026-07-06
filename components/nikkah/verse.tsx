import { Ornament } from "./ornament"

export function Verse() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Ornament tone="emerald" />

        <p className="mt-10 font-arabic text-3xl leading-loose text-primary sm:text-4xl">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>

        <p className="mx-auto mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
          &ldquo;And among His signs is that He created for you mates from among
          yourselves, that you may dwell in tranquillity with them, and He has
          put love and mercy between your hearts.&rdquo;
        </p>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent-foreground/70">
          Surah Ar-Rum &middot; 30:21
        </p>

        <Ornament className="mt-10" tone="emerald" />
      </div>
    </section>
  )
}
