import { A } from "@solidjs/router"
import { Title } from "@solidjs/meta"
import { For } from "solid-js"
import { newsPosts } from "~/lib/news"
import { SITE_NAME } from "~/lib/utils"

export default function NewsIndex() {
  return (
    <main class="container py-16">
      <Title>News · {SITE_NAME}</Title>
      <h1 class="text-3xl font-semibold tracking-tight">News</h1>
      <p class="mt-2 text-muted-foreground">Outward record of catalog and hub changes.</p>
      <ul class="mt-8 space-y-4">
        <For each={newsPosts}>
          {(post) => (
            <li class="rounded-lg border border-border bg-card p-5">
              <A
                href={`/news/${post.slug}`}
                class="text-xl font-semibold text-foreground no-underline hover:underline"
              >
                {post.title}
              </A>
              <p class="mt-1 text-xs text-muted-foreground">{post.date}</p>
              <p class="mt-2 text-sm text-muted-foreground">{post.summary}</p>
            </li>
          )}
        </For>
      </ul>
    </main>
  )
}
