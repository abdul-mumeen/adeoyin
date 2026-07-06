"use client"

import { useState } from "react"
import { Heart, Send } from "lucide-react"
import { Ornament } from "./ornament"

type Wish = {
  id: number
  name: string
  message: string
  hearts: number
}

const seeded: Wish[] = [
  {
    id: 1,
    name: "Fatima & Family",
    message:
      "May Allah bless your union with sabr, love, and countless joyful years. Barakallahu lakuma!",
    hearts: 24,
  },
  {
    id: 2,
    name: "Uncle Yusuf",
    message:
      "So proud of you both. May your home always be filled with light, laughter, and the remembrance of Allah.",
    hearts: 18,
  },
  {
    id: 3,
    name: "Zainab",
    message:
      "Two of the kindest souls, finally together. Wishing you a lifetime of tranquillity. Ameen.",
    hearts: 31,
  },
]

let nextId = 100

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(seeded)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setWishes((prev) => [
      { id: nextId++, name: name.trim(), message: message.trim(), hearts: 0 },
      ...prev,
    ])
    setName("")
    setMessage("")
  }

  function addHeart(id: number) {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, hearts: w.hearts + 1 } : w)),
    )
  }

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

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-xl rounded-sm border border-gold/30 bg-primary-foreground/5 p-6 backdrop-blur-sm sm:p-8"
        >
          <label className="block text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
              Your Name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="e.g. The Rahman Family"
              className="mt-2 w-full rounded-sm border border-gold/40 bg-background/95 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </label>
          <label className="mt-4 block text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
              Your Dua or Message
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              placeholder="Write your blessing for the couple..."
              className="mt-2 w-full resize-none rounded-sm border border-gold/40 bg-background/95 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </label>
          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-foreground transition-opacity hover:opacity-90"
          >
            <Send className="size-4" aria-hidden="true" />
            Post Your Wish
          </button>
        </form>

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
                <button
                  onClick={() => addHeart(wish.id)}
                  className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 transition-colors hover:text-gold"
                  aria-label={`Send love to ${wish.name}'s wish`}
                >
                  <Heart className="size-4" aria-hidden="true" />
                  <span className="tabular-nums">{wish.hearts}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
