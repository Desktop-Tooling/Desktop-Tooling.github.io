import { A } from "@solidjs/router"
import { For } from "solid-js"
import { Title } from "@solidjs/meta"
import { demos } from "~/lib/demos"

export default function DemosIndex() {
  return (
    <main class="container py-12">
      <Title>Demos — Desktop Tooling</Title>
      <h1 class="text-3xl font-semibold tracking-tight">Demos</h1>
      <p class="mt-3 max-w-2xl text-muted-foreground">
        Interactive explainers for Desktop Tooling product ideas. Pick a desk to see how the
        workflow fits a real flash drive or desktop utility.
      </p>
      <ul class="mt-10 grid gap-4 sm:grid-cols-2">
        <For each={demos}>
          {(demo) => (
            <li class="rounded-lg border border-border bg-card p-5">
              <A href={demo.href} class="text-lg font-medium text-foreground no-underline hover:underline">
                {demo.title}
              </A>
              <p class="mt-2 text-sm text-muted-foreground">{demo.summary}</p>
            </li>
          )}
        </For>
      </ul>
    </main>
  )
}
