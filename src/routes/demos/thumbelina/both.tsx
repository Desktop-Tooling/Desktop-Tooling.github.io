import { Title } from "@solidjs/meta"
import { DemoIdentity } from "~/components/DemoIdentity"
import { findDemo } from "~/lib/demos"

export default function BothVariant() {
  const demo = () => findDemo("thumbelina")!
  const variant = () => demo().variants.find((v) => v.id === "both")!

  return (
    <main class="container py-12">
      <Title>Both — Thumbelina</Title>
      <DemoIdentity
        crumbs={[
          { label: "Demos", href: "/demos/" },
          { label: "Thumbelina", href: "/demos/thumbelina/" },
          { label: "Both" },
        ]}
        repoUrl={demo().repoUrl}
      />
      <h1 class="text-3xl font-semibold tracking-tight">{variant().title}</h1>
      <p class="mt-3 max-w-2xl text-base leading-relaxed">{variant().blurb}</p>
      <p class="mt-3 max-w-2xl text-sm text-muted-foreground">
        Choose how large the ISO partition should be; the rest becomes the Btrfs install pool. Use
        this when one stick must do both jobs and you have enough capacity (often 128&nbsp;GiB+).
      </p>
      <figure class="pointer-events-none mt-8 max-w-3xl">
        <img
          src={variant().mockSrc}
          alt={variant().mockAlt}
          data-themed-svg
          width={1122}
          height={585}
          class="aspect-[1122/585] w-full rounded-lg border border-border bg-muted"
        />
        <figcaption class="mt-2 text-sm text-muted-foreground">
          Layout: ESP, sized exFAT for ISOs, remaining Btrfs for installs.
        </figcaption>
      </figure>
    </main>
  )
}
