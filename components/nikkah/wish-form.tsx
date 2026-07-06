"use client"

import { useActionState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { postWish, type PostWishState } from "@/app/actions/wishes"

const initialState: PostWishState = { ok: false }

export function WishForm() {
  const [state, formAction, isPending] = useActionState(postWish, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mx-auto mt-12 max-w-xl rounded-sm border border-gold/30 bg-primary-foreground/5 p-6 backdrop-blur-sm sm:p-8"
    >
      <label className="block text-left">
        <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
          Your Name
        </span>
        <input
          name="name"
          type="text"
          required
          maxLength={80}
          placeholder="e.g. The Rahman Family"
          className="mt-2 w-full rounded-sm border border-gold/40 bg-background/95 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </label>
      <label className="mt-4 block text-left">
        <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
          Your Dua or Message
        </span>
        <textarea
          name="message"
          required
          rows={3}
          maxLength={500}
          placeholder="Write your blessing for the couple..."
          className="mt-2 w-full resize-none rounded-sm border border-gold/40 bg-background/95 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </label>

      {state.error ? (
        <p className="mt-3 text-sm text-red-300">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="size-4" aria-hidden="true" />
        {isPending ? "Posting..." : "Post Your Wish"}
      </button>
    </form>
  )
}
