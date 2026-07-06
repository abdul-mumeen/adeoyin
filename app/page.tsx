import { Hero } from "@/components/nikkah/hero"
import { Countdown } from "@/components/nikkah/countdown"
import { Verse } from "@/components/nikkah/verse"
import { Journey } from "@/components/nikkah/journey"
import { Details } from "@/components/nikkah/details"
import { Wishes } from "@/components/nikkah/wishes"
import { Rsvp } from "@/components/nikkah/rsvp"
import { Footer } from "@/components/nikkah/footer"

export default function Page() {
  return (
    <main className="bg-background">
      <Hero />
      <Countdown />
      <Verse />
      <Journey />
      <Details />
      <Wishes />
      <Rsvp />
      <Footer />
    </main>
  )
}
