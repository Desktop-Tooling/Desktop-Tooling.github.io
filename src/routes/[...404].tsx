import { A } from "@solidjs/router"
import { SITE_NAME } from "~/lib/utils"

export default function NotFound() {
  return (
    <main class="container py-24 text-center">
      <h1 class="text-3xl font-semibold">404</h1>
      <p class="mt-4 text-muted-foreground">
        <A href="/" class="text-primary underline-offset-4 hover:underline">
          {SITE_NAME}
        </A>
      </p>
    </main>
  )
}
