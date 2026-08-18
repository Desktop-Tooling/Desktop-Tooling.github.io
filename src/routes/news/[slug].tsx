import { A, useParams } from "@solidjs/router"
import { Title } from "@solidjs/meta"
import { For, Show } from "solid-js"
import { getNews } from "~/lib/news"
import { SITE_NAME } from "~/lib/utils"

export default function NewsArticle() {
  const params = useParams()
  const post = () => getNews(params.slug)
  return (
    <main class="container py-16">
      <Show
        when={post()}
        fallback={
          <div>
            <Title>Not found · {SITE_NAME}</Title>
            <p class="text-muted-foreground">No such news item.</p>
            <A href="/news">Back to news</A>
          </div>
        }
      >
        {(item) => (
          <article class="mx-auto max-w-2xl">
            <Title>
              {item().title} · {SITE_NAME}
            </Title>
            <p class="text-xs text-muted-foreground">{item().date}</p>
            <h1 class="mt-2 text-3xl font-semibold tracking-tight">{item().title}</h1>
            <div class="mt-6 space-y-4 text-pretty leading-relaxed text-foreground/90">
              <For each={item().paragraphs}>{(p) => <p>{p}</p>}</For>
            </div>
            <p class="mt-10 text-sm">
              <A href="/news">← News</A>
            </p>
          </article>
        )}
      </Show>
    </main>
  )
}
