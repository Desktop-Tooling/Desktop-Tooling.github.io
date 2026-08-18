export type NewsPost = {
  slug: string
  title: string
  date: string
  summary: string
  paragraphs: string[]
}

export const newsPosts: NewsPost[] = [
  {
    slug: "os-utilities-catalog-opens",
    title: "OS utilities catalog opens",
    date: "2026-08-18",
    summary:
      "Explorer helpers, shell extensions, theming, launchers, and windowing tools now share a GitHub organization and a GitHub Pages hub.",
    paragraphs: [
      "A cluster of Windows and desktop utilities that had lived on a personal GitHub account now share a public catalog. The first wave includes an activity-map launcher, SVG thumbnail handlers, an Explorer thumbcache command, a dark-mode scheduler, a Nikon webcam bridge, and a desktop assistant.",
      "The split is practical. Interaction-design experiments stay at HCI Nerdz. Shells and CLIs stay at OpenShellOrg. Developer-machine tooling stays at Dev-Centr. Desktop Tooling is the remaining bucket: things that sit on the OS desktop.",
      "The public site and docs hub publish on GitHub Pages. There is no custom domain in this bootstrap.",
    ],
  },
]

export function getNews(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug)
}
