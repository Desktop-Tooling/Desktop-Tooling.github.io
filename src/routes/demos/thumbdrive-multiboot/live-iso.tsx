import { Title } from "@solidjs/meta"
import { DemoIdentity } from "~/components/DemoIdentity"
import { findDemo } from "~/lib/demos"

export default function LiveIsoVariant() {
  const demo = () => findDemo("thumbdrive-multiboot")!
  const variant = () => demo().variants.find((v) => v.id === "live-iso")!

  return (
    <main class="container py-12">
      <Title>Live ISOs — Thumbdrive Multiboot</Title>
      <DemoIdentity
        crumbs={[
          { label: "Demos", href: "/demos/" },
          { label: "Thumbdrive Multiboot", href: "/demos/thumbdrive-multiboot/" },
          { label: "Live ISOs" },
        ]}
        repoUrl={demo().repoUrl}
      />
      <h1 class="text-3xl font-semibold tracking-tight">{variant().title}</h1>
      <p class="mt-3 max-w-2xl text-base leading-relaxed">{variant().blurb}</p>
      <p class="mt-3 max-w-2xl text-sm text-muted-foreground">
        Format the stick, then drag installer or live ISOs into the <code>isos</code> folder on the
        branded exFAT volume in Windows File Explorer. Boot the stick and pick an entry from GRUB.
      </p>
      <figure class="pointer-events-none mt-8 max-w-3xl">
        <img
          src={variant().mockSrc}
          alt={variant().mockAlt}
          width={1122}
          height={585}
          class="aspect-[1122/585] w-full rounded-lg border border-border bg-muted"
        />
        <figcaption class="mt-2 text-sm text-muted-foreground">
          Layout: ESP (FAT32) plus a large exFAT volume for ISOs and the service kit.
        </figcaption>
      </figure>
    </main>
  )
}
