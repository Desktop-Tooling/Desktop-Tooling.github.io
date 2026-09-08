import { Title } from "@solidjs/meta"
import { DemoIdentity } from "~/components/DemoIdentity"
import { findDemo } from "~/lib/demos"

export default function InstalledVariant() {
  const demo = () => findDemo("thumbelina")!
  const variant = () => demo().variants.find((v) => v.id === "installed")!

  return (
    <main class="container py-12">
      <Title>Installed OSes — Thumbelina</Title>
      <DemoIdentity
        crumbs={[
          { label: "Demos", href: "/demos/" },
          { label: "Thumbelina", href: "/demos/thumbelina/" },
          { label: "Installed OSes" },
        ]}
        repoUrl={demo().repoUrl}
      />
      <h1 class="text-3xl font-semibold tracking-tight">{variant().title}</h1>
      <p class="mt-3 max-w-2xl text-base leading-relaxed">{variant().blurb}</p>
      <p class="mt-3 max-w-2xl text-sm text-muted-foreground">
        Linux roots live as Btrfs subvolumes that share free space (optional zstd compression and
        snapshots). Windows only sees the small branded service volume with README, version stamp,
        docs, and tools.
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
          Layout: ESP, service exFAT, and a Btrfs pool for thin installs.
        </figcaption>
      </figure>
    </main>
  )
}
