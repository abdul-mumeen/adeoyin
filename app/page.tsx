import { Hero } from "@/components/nikkah/hero"
import { Countdown } from "@/components/nikkah/countdown"
import { Verse } from "@/components/nikkah/verse"
import { Journey } from "@/components/nikkah/journey"
import { Wishes } from "@/components/nikkah/wishes"
import { Gifts } from "@/components/nikkah/gifts"
import { Footer } from "@/components/nikkah/footer"
import { getLivestreamUrl, getNigeriaAccount } from "@/lib/settings"

export const dynamic = "force-dynamic"

export default async function Page() {
  const [livestreamUrl, nigeria] = await Promise.all([
    getLivestreamUrl(),
    getNigeriaAccount(),
  ])

  return (
    <main className="bg-background">
      <Hero />
      <Verse />
      <Journey />
      <Wishes />
      <div className="h-2 w-full bg-white" />
      <Countdown livestreamUrl={livestreamUrl} />
      <Gifts nigeria={nigeria} />
      <Footer />
    </main>
  )
}
