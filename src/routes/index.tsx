import { A } from "@solidjs/router"
import { For } from "solid-js"
import { Title } from "@solidjs/meta"
import { Button } from "~/components/ui/button"
import { catalog } from "~/lib/catalog"
import { DOCS_URL, GITHUB_ORG, SITE_NAME } from "~/lib/utils"

export default function Home() {
  return (
    <main class="container py-16">
      <Title>{SITE_NAME}</Title>
      <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
        <img
          src="/logo-mark.svg"
          alt=""
          width={128}
          height={128}
          class="mb-8 size-32"
        />
        <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">{SITE_NAME}</h1>
        <p class="mt-3 text-lg text-muted-foreground">
          OS-level desktop utilities — Explorer, shell extensions, theming, launchers, windowing.
        </p>
        <p class="mt-6 text-pretty text-base leading-relaxed text-foreground/90">
          Graphical tools that sit on the desktop. Not shells, not HCI research, not developer-machine
          catalogs.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={DOCS_URL}>
            <Button>Explore the docs »</Button>
          </a>
          <A href="/demos/">
            <Button variant="outline">Demos</Button>
          </A>
          <A href="/news">
            <Button variant="outline">News</Button>
          </A>
          <a href={GITHUB_ORG} rel="noreferrer" target="_blank">
            <Button variant="ghost">GitHub</Button>
          </a>
        </div>
      </div>

      <section class="mx-auto mt-16 max-w-4xl">
        <h2 class="text-xl font-semibold tracking-tight">Catalog</h2>
        <ul class="mt-4 grid gap-3 sm:grid-cols-2">
          <For each={catalog}>
            {(item) => (
              <li class="rounded-lg border border-border bg-card p-4">
                <a href={item.href} class="font-medium text-foreground no-underline hover:underline">
                  {item.name}
                </a>
                <p class="mt-1 text-sm text-muted-foreground">{item.blurb}</p>
              </li>
            )}
          </For>
        </ul>
      </section>

      <section class="mx-auto mt-12 max-w-3xl text-sm text-muted-foreground">
        <p>
          Siblings:{" "}
          <a href="https://hci-nerdz.github.io/">HCI Nerdz</a> (interaction design),{" "}
          <a href="https://openshellorg.github.io/">OpenShellOrg</a> (shells and CLIs),{" "}
          <a href="https://devcentr.org/">Dev-Centr</a> (developer machines). Cross-link; do not absorb.
        </p>
      </section>
    </main>
  )
}
