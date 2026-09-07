import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE_NAME = "Desktop Tooling"
export const SITE_URL = "https://desktop-tooling.github.io"
export const DOCS_URL = "https://desktop-tooling.github.io/docs"
export const GITHUB_ORG = "https://github.com/Desktop-Tooling"
