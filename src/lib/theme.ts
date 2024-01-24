import chroma from "chroma-js"
import { ChoiceDefinition } from "../interfaces/choice-definition"
import { ThemeDefinition } from "../interfaces/theme-definition"
import { generateColors } from "./colors"

export const SUPPORTED_THEMES: ThemeDefinition[] = [
  {
    id: "bubblegum",
    label: "Bubblegum",
    class: "from-fuchsia-500 to-pink-600",
    baseColors: ["#d946ef", "#db2777"],
    generatedColors: generateColors(["#d946ef", "#db2777"]),
  },
  {
    id: "custom",
    label: "Custom...",
    class: "from-sky-400 to-blue-500",
    baseColors: [chroma.random().hex(), chroma.random().hex()],
    generatedColors: generateColors(["#38bdf8", "#3b82f6"]),
  },
]

export const SUPPORTED_PADDING_CHOICES: ChoiceDefinition[] = [
  { id: "sm", label: "16", class: "p-4" },
  { id: "md", label: "32", class: "p-8" },
  { id: "lg", label: "64", class: "p-16" },
  { id: "xl", label: "128", class: "p-32" },
]
