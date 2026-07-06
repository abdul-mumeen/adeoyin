"use client"

import { useOptimistic, useTransition } from "react"
import { Heart } from "lucide-react"
import { likeWish } from "@/app/actions/wishes"

type WishHeartProps = {
  id: number
  name: string
  hearts: number
}

export function WishHeart({ id, name, hearts }: WishHeartProps) {
  const [optimisticHearts, addOptimisticHeart] = useOptimistic(
    hearts,
    (current) => current + 1,
  )
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      addOptimisticHeart(null)
      await likeWish(id)
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 transition-colors hover:text-gold disabled:opacity-70"
      aria-label={`Send love to ${name}'s wish`}
    >
      <Heart className="size-4" aria-hidden="true" />
      <span className="tabular-nums">{optimisticHearts}</span>
    </button>
  )
}
