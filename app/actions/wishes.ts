"use server"

import { revalidatePath } from "next/cache"
import { createWish, heartWish } from "@/lib/wishes"

export type PostWishState = {
  ok: boolean
  error?: string
}

export async function postWish(
  _prevState: PostWishState,
  formData: FormData,
): Promise<PostWishState> {
  const name = String(formData.get("name") ?? "")
  const message = String(formData.get("message") ?? "")

  try {
    await createWish({ name, message })
    revalidatePath("/")
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    }
  }
}

export async function likeWish(id: number): Promise<void> {
  await heartWish(id)
  revalidatePath("/")
}
