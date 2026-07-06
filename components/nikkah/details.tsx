import { Clock, MapPin } from "lucide-react"
import { wedding } from "@/lib/wedding"
import { Ornament } from "./ornament"

export function Details() {
  return (
    <section
      id="details"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent-foreground/70">
            Join Our Celebration
          </p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            The Blessed Occasion
          </h2>
          <Ornament className="mt-6" tone="gold" />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {wedding.events.map((event) => (
            <article
              key={event.title}
              className="flex flex-col rounded-sm border border-border bg-card p-8 text-center shadow-sm"
            >
              <h3 className="font-serif text-3xl text-primary">
                {event.title}
              </h3>
              <div className="mx-auto mt-4 mb-6">
                <Ornament tone="emerald" />
              </div>
              <p className="leading-relaxed text-foreground/75">
                {event.description}
              </p>
              <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
                <p className="flex items-center justify-center gap-2 text-foreground/80">
                  <Clock className="size-4 text-gold" aria-hidden="true" />
                  <span>{event.time}</span>
                </p>
                <p className="flex items-center justify-center gap-2 text-foreground/80">
                  <MapPin className="size-4 text-gold" aria-hidden="true" />
                  <span>
                    <span className="font-medium text-primary">
                      {event.venue}
                    </span>
                    {" — "}
                    {event.address}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Lantern feature strip */}
        <div className="relative mt-14 overflow-hidden rounded-sm">
          <img
            src="/images/lanterns.png"
            alt="Ornate golden lanterns glowing warmly, symbolising the light and blessings of the occasion"
            className="h-56 w-full object-cover sm:h-72"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-primary/60 px-6 text-center">
            <p className="max-w-xl font-serif text-xl italic text-primary-foreground sm:text-2xl">
              &ldquo;Your presence and prayers are the greatest gift we could
              ask for.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
