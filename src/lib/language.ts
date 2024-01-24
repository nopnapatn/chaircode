import {
  type LanguageSupport as LS,
  type StreamParser,
} from "@codemirror/language"
import { LanguageDefinition } from "../interfaces/language"

const importLegacy = () =>
  import("@codemirror/language").then(({ LanguageSupport, StreamLanguage }) => {
    return function legacy(parser: StreamParser<unknown>): LS {
      return new LanguageSupport(StreamLanguage.define(parser))
    }
  })

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  {
    id: "typescript",
    label: "Typescript",
    extension: () =>
      import("@codemirror/lang-javascript").then(({ javascript }) =>
        javascript({ jsx: true, typescript: true }),
      ),
  },
  {
    id: "javascript",
    label: "Javascript",
    extension: () =>
      import("@codemirror/lang-javascript").then(({ javascript }) =>
        javascript({ jsx: true }),
      ),
  },
]
