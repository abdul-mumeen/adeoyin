"use client"

import { useState } from "react"
import { Check, Copy, Landmark, Mail } from "lucide-react"
import { wedding } from "@/lib/wedding"
import { Ornament } from "./ornament"

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can fail (e.g. insecure context); fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-input px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:border-gold hover:text-gold"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-gold" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" aria-hidden="true" />
          Copy
        </>
      )}
    </button>
  )
}

type NigeriaAccount = {
  bankName: string
  accountName: string
  accountNumber: string
}

export function Gifts({ nigeria }: { nigeria: NigeriaAccount }) {
  const { canada } = wedding.gifts

  return (
    <section id="gifts" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Floral accent */}
      <img
        src="/images/floral-sprig.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 w-40 opacity-40 animate-float-slow sm:w-56"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent-foreground/70">
            With Gratitude
          </p>
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            A Gift for the Couple
          </h2>
          <Ornament className="mt-6" tone="gold" />
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-foreground/75">
            Your presence and prayers are the greatest gift of all.But if you wish to give us a material gift,we have kindly shared our details below.
          </p>
        </div>

        <div className="mt-14 grid gap-6 text-left md:grid-cols-2">
          <article className="flex flex-col rounded-sm border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Landmark className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-2xl text-primary">Nigeria</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70">
                  Bank Transfer
                </p>
              </div>
            </div>

            <dl className="mt-8 space-y-5 border-t border-border pt-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-accent-foreground/70">
                  Bank
                </dt>
                <dd className="mt-1 text-foreground/85">{nigeria.bankName}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-accent-foreground/70">
                  Account Name
                </dt>
                <dd className="mt-1 text-foreground/85">
                  {nigeria.accountName}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-accent-foreground/70">
                  Account Number
                </dt>
                <dd className="mt-1 flex items-center justify-between gap-3">
                  <span className="font-medium tabular-nums text-primary">
                    {nigeria.accountNumber}
                  </span>
                  <CopyButton
                    value={nigeria.accountNumber}
                    label="account number"
                  />
                </dd>
              </div>
            </dl>
          </article>

          <article className="flex flex-col rounded-sm border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-2xl text-primary">Canada</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70">
                  Interac e-Transfer
                </p>
              </div>
            </div>

            <dl className="mt-8 space-y-5 border-t border-border pt-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-accent-foreground/70">
                  Recipient
                </dt>
                <dd className="mt-1 text-foreground/85">
                  {canada.recipientName}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-accent-foreground/70">
                  Interac Email
                </dt>
                <dd className="mt-1 flex items-center justify-between gap-3">
                  <span className="break-all font-medium text-primary">
                    {canada.interacEmail}
                  </span>
                  <CopyButton
                    value={canada.interacEmail}
                    label="Interac email"
                  />
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  )
}
