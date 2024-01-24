import { Listbox, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { Fragment } from "react"
import { LanguageDefinition } from "../interfaces/language-definition"
import { ThemeDefinition } from "../interfaces/theme-definition"

interface SelectProps<T> {
  type: "language" | "theme"
  initialValue: T
  setValue: (_: T) => void
  options: T[]
}

function ThemeBubble({ color }: { color: string }) {
  return (
    <span
      className={clsx("block h-4 w-4 rounded-full bg-gradient-to-br", color)}
    />
  )
}

export default function Select<T extends ThemeDefinition | LanguageDefinition>({
  type,
  initialValue,
  setValue,
  options,
}: SelectProps<T>) {
  return (
    <Listbox
      value={initialValue}
      onChange={setValue}
    >
      <div className="relative">
        <Listbox.Button
          className={clsx(
            "flex select-none justify-center items-center gap-3 rounded-lg p-2 text-xs",
            "border-[1px] border-white/20 bg-black",
            " transition-colors duration-200 ease-in-out",
            "hover:cursor-pointer hover:bg-white/20 focus:outline-none",
          )}
        >
          {type === "language" ? (
            <span>{(initialValue as LanguageDefinition).label}</span>
          ) : (
            <ThemeBubble color={(initialValue as ThemeDefinition).class} />
          )}
          <span className="pointer-events-none">
            <ChevronDownIcon
              className="h-3 w-3"
              aria-hidden="true"
            />
          </span>
          <Transition
            as={Fragment}
            enter="transition-all transform ease-in-out duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 scale-90"
          >
            <Listbox.Options
              className={clsx(
                "absolute z-10 max-h-80 -translate-x-1/4 -translate-y-3/4 space-y-1 overflow-auto rounded-xl p-2",
                "border-[1px] border-white/20 bg-black",
                "focus:outline-none",
              )}
            >
              {options.map((option, i) => (
                <Listbox.Option
                  key={`${type}-${i}`}
                  value={option}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg p-2 text-xs",
                    "cursor-pointer select-none",
                    "transition-colors duration-200 ease-in-out",
                  )}
                >
                  {type === "language" ? (
                    <span className="block truncate pr-9">
                      {(option as LanguageDefinition).label}
                    </span>
                  ) : (
                    <>
                      <ThemeBubble color={(option as ThemeDefinition).class} />
                      <span className="block truncate">
                        {(option as ThemeDefinition).label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox.Button>
      </div>
    </Listbox>
  )
}
