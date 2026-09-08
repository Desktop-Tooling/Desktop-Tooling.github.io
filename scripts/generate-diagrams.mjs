import { spawnSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { basename, dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { prepareThemedMermaidSvgDualOutput } from "@dev-centr/mermaid-svg-css-vars"

const check = process.argv.includes("--check")
const root = resolve(import.meta.dirname, "..")
const diagramDir = join(root, "public", "demos", "thumbelina")
const configPath = join(diagramDir, "mermaid-config.json")
const diagrams = [
  { name: "mock-live-iso", legacy: "mock-live-iso.legacy-fixed.svg" },
  { name: "mock-installed", legacy: "mock-installed.legacy-fixed.svg" },
  { name: "mock-both", legacy: "mock-both.legacy-fixed.svg" },
]

const temporaryDirectory = mkdtempSync(join(tmpdir(), "desktop-tooling-diagrams-"))
const mermaidModulePath = fileURLToPath(import.meta.resolve("@mermaid-js/mermaid-cli"))
const mermaidCli = join(dirname(mermaidModulePath), "cli.js")
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

function decodeText(value) {
  return value
    .replace(/<br\s*\/?>/gi, " / ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
}

function normalizeMermaidSvg(svg) {
  return svg
    .replace(
      /<foreignObject\b[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/foreignObject>/g,
      (_, label) =>
        `<text class="nodeLabel" text-anchor="middle" dominant-baseline="central"><tspan>${decodeText(label)}</tspan></text>`,
    )
    .replace('role="graphics-document document"', 'role="img"')
    .replace(/\saria-roledescription="[^"]*"/, "")
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
      process.execPath,
      [
        mermaidCli,
        "--quiet",
        "--input",
        sourcePath,
        "--output",
        rawPath,
        "--configFile",
        configPath,
        "--backgroundColor",
        "transparent",
      ],
      { cwd: root, encoding: "utf8" },
    )
    if (render.error || render.status !== 0) {
      const diagnostics = [
        `spawn.error=${render.error?.message ?? "none"}`,
        `status=${String(render.status)}`,
        `signal=${render.signal ?? "none"}`,
        render.stderr?.trim() ? `stderr=${render.stderr.trim()}` : "",
        render.stdout?.trim() ? `stdout=${render.stdout.trim()}` : "",
      ].filter(Boolean)
      throw new Error(`Mermaid failed for ${diagram.name}: ${diagnostics.join("; ")}`)
    }

    const rawSvg = normalizeMermaidSvg(readFileSync(rawPath, "utf8"))
    if (rawSvg.includes("<foreignObject")) {
      throw new Error(`Mermaid normalization left forbidden foreignObject markup in ${diagram.name}`)
    }
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
    const result = prepareThemedMermaidSvgDualOutput(rawSvg, manifest)
    const errors = result.diagnostics.filter((diagnostic) => diagnostic.severity === "error")
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
