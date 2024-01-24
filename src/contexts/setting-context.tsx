"use client"

import { FC, ReactNode, createContext, useContext, useState } from "react"
import { ChoiceDefinition } from "../interfaces/choice-definition"
import { LanguageDefinition } from "../interfaces/language-definition"
import { ThemeDefinition } from "../interfaces/theme-definition"
import { SUPPORTED_LANGUAGES } from "../lib/language"
import { SUPPORTED_PADDING_CHOICES, SUPPORTED_THEMES } from "../lib/theme"

interface SettingsContextProps {
  language: LanguageDefinition
  theme: ThemeDefinition
  lineNumbers: boolean
  padding: ChoiceDefinition
  setLanguage: (_: LanguageDefinition) => void
  setTheme: (_: ThemeDefinition) => void
  setLineNumbers: (_: boolean) => void
  setPadding: (_: ChoiceDefinition) => void
}

interface SettingsProviderProps {
  children: ReactNode
}

const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps,
)
const useSettingsContext = () => useContext(SettingsContext)

const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageDefinition>(
    SUPPORTED_LANGUAGES[0],
  )

  const [theme, setTheme] = useState<ThemeDefinition>(SUPPORTED_THEMES[0])
  const [lineNumbers, setLineNumbers] = useState<boolean>(true)
  const [padding, setPadding] = useState<ChoiceDefinition>(
    SUPPORTED_PADDING_CHOICES[1],
  )

  return (
    <SettingsContext.Provider
      value={{
        language,
        theme,
        lineNumbers,
        padding,
        setLanguage,
        setTheme,
        setLineNumbers,
        setPadding,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider, useSettingsContext }
