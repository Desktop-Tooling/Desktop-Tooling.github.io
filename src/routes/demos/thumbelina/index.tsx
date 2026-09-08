import { A } from "@solidjs/router"
import { For } from "solid-js"
import { Title } from "@solidjs/meta"
import { DemoIdentity } from "~/components/DemoIdentity"
import { findDemo } from "~/lib/demos"

export default function ThumbdriveMultibootHub() {
  const demo = () => findDemo("thumbelina")!

  return (
    <main class="container py-12">
      <Title>Thumbelina — Demos</Title>
      <DemoIdentity
        crumbs={[
          { label: "Demos", href: "/demos/" },
          { label: "Thumbelina" },
        ]}
        repoUrl={demo().repoUrl}
      />
      <h1 class="text-3xl font-semibold tracking-tight">{demo().title}</h1>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-foreground/90">{demo().summary}</p>
      <p class="mt-3 max-w-2xl text-sm text-muted-foreground">
        Prefer two specialized sticks when capacity is tight. Hybrid is optional when you have
        room for both ISOs and installs.
      </p>

      <div class="mt-10 grid gap-4 sm:grid-cols-3">
        <For each={demo().variants}>
          {(v) => (
            <A
              href={v.href}
              class="group rounded-lg border border-border bg-card p-3 text-foreground no-underline transition hover:border-foreground/30"
            >
              <img
                src={v.mockSrc}
                alt={v.mockAlt}
                data-themed-svg
                width={1122}
                height={585}
                class="pointer-events-none aspect-[1122/585] w-full rounded-md bg-muted object-cover"
              />
              <h2 class="mt-3 text-base font-semibold group-hover:underline">{v.title}</h2>
              <p class="mt-1 text-sm text-muted-foreground">{v.blurb}</p>
            </A>
          )}
        </For>
      </div>
    </main>
  )
}
