"use client"

import clsx from "clsx"
import { Highlight, themes } from "prism-react-renderer"
import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function Pane() {
  const [value, setValue] = useState("")
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(true)

  const preRef = useRef<HTMLPreElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus
    }
  }, [])

  useEffect(() => {
    if (preRef.current && textAreaRef.current && divRef.current) {
      const preHeight = preRef.current.clientHeight
      const divHeight = divRef.current.clientHeight

      textAreaRef.current.style.height = `${Math.max(preHeight, divHeight)}px`
    }
  }, [preRef.current?.clientHeight, divRef.current?.clientHeight])

  return (
    <div
      className={clsx(
        isTextAreaFocused
          ? "border-x-4 border-y-4 border-pink-400"
          : "border-x-4 border-y-4 border-white/20",
        "h-2/3 w-2/3 max-w-4xl rounded-xl border-[1px] py-4",
        "transition-colors duration-300 ease-in-out",
      )}
    >
      <div
        ref={divRef}
        className="relative h-full w-full overflow-auto"
      >
        <Highlight
          theme={themes.nightOwl}
          code={value}
          language="jsx"
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <>
              <textarea
                ref={textAreaRef}
                value={value}
                placeholder="Write here!"
                onChange={handleChange}
                spellCheck={false}
                onFocus={() => setIsTextAreaFocused(true)}
                onBlur={() => setIsTextAreaFocused(false)}
                className={clsx(
                  className,
                  "absolute w-full resize-none overflow-hidden whitespace-pre-wrap",
                  "break-words break-keep bg-transparent pl-16 pr-3 font-mono",
                  "text-transparent caret-pink-500 selection:bg-pink-500/30 placeholder:text-white/20 focus:outline-none",
                )}
              />
              <pre
                ref={preRef}
                aria-hidden={true}
                className={clsx(
                  className,
                  "pointer-events-none absolute w-full select-none pr-3",
                )}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="table-row"
                  >
                    <span className="table-cell w-10 select-none text-right opacity-50">
                      {i + 1}
                    </span>
                    <code className="table-cell whitespace-pre-wrap break-words break-keep pl-6">
                      {line.map((token, key) => (
                        <span
                          key={key}
                          {...getTokenProps({ token, key })}
                        />
                      ))}
                    </code>
                  </div>
                ))}
              </pre>
            </>
          )}
        </Highlight>
      </div>
    </div>
  )
}
