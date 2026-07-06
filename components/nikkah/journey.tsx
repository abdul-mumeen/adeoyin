import { Ornament } from "./ornament"

const milestones = [
 
  {
    label: "Growing together",
    title: "Two Hearts, One Deen",
    text: "We fell in love threading the path of Allah. To establish the idea of completing half of our deen, and seeking the pleasure of our Lord",
  },
  {
    label: "The promise",
    title: "Choosing Forever",
    text: " Seeking the pleasure of Allah, we have choosen forever. Walking this path together, we have chosen love and mercy as the nutrient of our relationship",
  },
]

export function Journey() {
  return (
    <section className="bg-secondary px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent-foreground/70">
            Our Love Story
          </p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            A Journey of Two Souls
          </h2>
          <Ornament className="mt-6" tone="gold" />
        </div>

        <ol className="mt-16 space-y-12">
          {milestones.map((m, i) => (
            <li
              key={m.title}
              className="relative grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-8"
            >
              <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:gap-0">
                <span className="flex size-12 items-center justify-center rounded-full border border-gold bg-background font-serif text-xl text-primary">
                  {i + 1}
                </span>
                {i < milestones.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden w-px flex-1 bg-gold/40 sm:mt-2 sm:block"
                  />
                )}
              </div>
              <div className="rounded-sm border border-border bg-card p-6 shadow-sm sm:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-accent-foreground/70">
                  {m.label}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-primary">
                  {m.title}
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/75">
                  {m.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
