import { listWishes } from "@/lib/wishes"
import { Ornament } from "./ornament"
import { WishForm } from "./wish-form"
import { WishHeart } from "./wish-heart"

export async function Wishes() {
  const wishes = await listWishes()

  return (
    <section id="wishes" className="bg-primary px-6 py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Leave Your Blessing
          </p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            Wishes &amp; Duas Wall
          </h2>
          <Ornament className="mt-6" tone="gold" />
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-primary-foreground/75">
            In place of photographs, we treasure your words. Share a prayer or a
            heartfelt message and watch it join the wall of love below.
          </p>
        </div>

        <WishForm />

        {wishes.length === 0 ? (
          <p className="mt-14 text-center italic text-primary-foreground/60">
            Be the first to leave a blessing for the couple.
          </p>
        ) : (
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wishes.map((wish) => (
              <li
                key={wish.id}
                className="flex flex-col rounded-sm border border-gold/25 bg-primary-foreground/5 p-6 backdrop-blur-sm"
              >
                <p className="flex-1 font-serif text-lg italic leading-relaxed text-primary-foreground/90">
                  &ldquo;{wish.message}&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-gold/20 pt-4">
                  <span className="text-sm font-medium tracking-wide text-gold">
                    {wish.name}
                  </span>
                  <WishHeart id={wish.id} name={wish.name} hearts={wish.hearts} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
