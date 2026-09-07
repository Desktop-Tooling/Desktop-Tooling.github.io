export type DemoVariant = {
  id: string
  title: string
  blurb: string
  href: string
  mockSrc: string
  mockAlt: string
}

export type DemoEntry = {
  id: string
  title: string
  summary: string
  href: string
  repoUrl: string
  variants: DemoVariant[]
}

export const demos: DemoEntry[] = [
  {
    id: "thumbelina",
    title: "Thumbelina",
    summary:
      "Three ways to prepare a flash drive: live ISOs you drop in Explorer, thin Btrfs-installed Linux systems, or both when the stick is large enough. Windows always sees a branded volume so the drive is not a mystery.",
    href: "/demos/thumbelina/",
    repoUrl: "https://github.com/Desktop-Tooling/thumbelina",
    variants: [
      {
        id: "live-iso",
        title: "Live ISOs",
        blurb: "Toolkit stick — big exFAT drop zone for installer and rescue ISOs.",
        href: "/demos/thumbelina/live-iso/",
        mockSrc: "/demos/thumbelina/mock-live-iso.svg",
        mockAlt: "Partition sketch for live ISO mode",
      },
      {
        id: "installed",
        title: "Installed OSes",
        blurb: "Daily-driver pool — small service exFAT plus a thin Btrfs install volume.",
        href: "/demos/thumbelina/installed/",
        mockSrc: "/demos/thumbelina/mock-installed.svg",
        mockAlt: "Partition sketch for installed mode",
      },
      {
        id: "both",
        title: "Both",
        blurb: "ISO drop zone and install pool on one stick when capacity allows.",
        href: "/demos/thumbelina/both/",
        mockSrc: "/demos/thumbelina/mock-both.svg",
        mockAlt: "Partition sketch for hybrid mode",
      },
    ],
  },
]

export function findDemo(id: string) {
  return demos.find((d) => d.id === id)
}
