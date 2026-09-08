import { spawnSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { basename, join, resolve } from "node:path"
import { prepareThemedMermaidSvgDualOutput } from "@dev-centr/mermaid-svg-css-vars"

const check = process.argv.includes("--check")
const root = resolve(import.meta.dirname, "..")
const diagramDir = join(root, "public", "demos", "thumbelina")
const configPath = join(diagramDir, "mermaid-config.json")
const diagrams = [
  { name: "partition-layout-live-iso", legacy: "mock-live-iso.svg" },
  { name: "partition-layout-installed", legacy: "mock-installed.svg" },
  { name: "partition-layout-hybrid", legacy: "mock-both.svg" },
]

const temporaryDirectory = mkdtempSync(join(tmpdir(), "desktop-tooling-diagrams-"))
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm"
let stale = false

function updateOrCheck(path, content) {
  if (check) {
    if (!existsSync(path) || readFileSync(path, "utf8") !== content) {
      console.error(`Stale generated diagram: ${path.slice(root.length + 1)}`)
      stale = true
    }
    return
  }
  writeFileSync(path, content, "utf8")
}

try {
  for (const diagram of diagrams) {
    const sourcePath = join(diagramDir, `${diagram.name}.mmd`)
    const manifestPath = join(diagramDir, `${diagram.name}.theme.json`)
    const rawPath = join(temporaryDirectory, `${diagram.name}.raw.svg`)
    const legacyPath = join(diagramDir, diagram.legacy)

    if (!existsSync(legacyPath)) {
      throw new Error(`Missing fixed compatibility artifact: ${basename(legacyPath)}`)
    }

    const render = spawnSync(
      pnpm,
      [
        "exec",
        "mmdc",
        "--quiet",
        "--input",
        sourcePath,
        "--output",
        rawPath,
        "--configFile",
        configPath,
        "--backgroundColor",
        "transparent",
        "--svgId",
        diagram.name,
      ],
      { cwd: root, encoding: "utf8" },
    )
    if (render.status !== 0) {
      throw new Error(render.stderr || render.stdout || `Mermaid failed for ${diagram.name}`)
    }

    const rawSvg = readFileSync(rawPath, "utf8")
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
    const result = prepareThemedMermaidSvgDualOutput(rawSvg, manifest)
    const errors = result.diagnostics.filter((diagnostic) => diagnostic.level === "error")
    if (errors.length || !result.standaloneSvg || !result.hostSvg) {
      throw new Error(
        `${diagram.name} transform failed:\n${errors.map((error) => `- ${error.message}`).join("\n")}`,
      )
    }

    updateOrCheck(join(diagramDir, `${diagram.name}.svg`), result.standaloneSvg)
    updateOrCheck(join(diagramDir, `${diagram.name}.host.svg`), result.hostSvg)
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true })
}

if (stale) process.exitCode = 1
else console.log(check ? "Diagram artifacts are current." : "Generated diagram artifacts.")
