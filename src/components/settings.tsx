"use client"

import { DragHandleDots2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { motion, useAnimationControls, useDragControls } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useSettingsContext } from "../contexts/setting-context"
import { DimensionsDefinition } from "../interfaces/dimension-definition"
import { SUPPORTED_LANGUAGES } from "../lib/language"
import { SUPPORTED_PADDING_CHOICES, SUPPORTED_THEMES } from "../lib/theme"
import Choices from "./choice"
import Select from "./select"
import Toggle from "./toggle"

export default function Settings() {
  const main = useRef<HTMLDivElement>(null)
  const settings = useRef<HTMLDivElement>(null)
  const [mainDimensions, setMainDimensions] = useState<DimensionsDefinition>({
    height: 0,
    width: 0,
  })
  const [constraints, setConstraints] = useState<{
    top: number
    left: number
    right: number
    bottom: number
  }>({ top: 0, left: 0, right: 0, bottom: 0 })
  const {
    language,
    theme,
    lineNumbers,
    padding,
    setLanguage,
    setTheme,
    setLineNumbers,
    setPadding,
  } = useSettingsContext()
  const dragControls = useDragControls()
  const animationControls = useAnimationControls()
  const handleResize = () => {
    if (main.current) {
      setMainDimensions({
        height: main.current.offsetHeight,
        width: main.current.offsetWidth,
      })
    }
  }

  useEffect(() => {
    if (main.current) {
      setMainDimensions({
        height: main.current.offsetHeight,
        width: main.current.offsetWidth,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      animationControls.start({
        x: 0,
        y: 0,
      })
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainDimensions])

  useEffect(() => {
    if (main.current && settings.current) {
      setConstraints({
        top: -settings.current.offsetTop + 24,
        left:
          -mainDimensions.width +
          settings.current.offsetWidth +
          settings.current.offsetLeft +
          24,
        right:
          mainDimensions.width -
          settings.current.offsetWidth -
          settings.current.offsetLeft -
          24,
        bottom:
          mainDimensions.height -
          settings.current.offsetHeight -
          settings.current.offsetTop -
          24,
      })
    }
  }, [mainDimensions.height, mainDimensions.width])

  return (
    <motion.section
      id="settings"
      drag
      dragListener={false}
      dragMomentum={false}
      dragControls={dragControls}
      dragConstraints={constraints}
      animate={animationControls}
      className={clsx(
        "fixed bottom-32 z-10 rounded-xl p-5 text-xs",
        "transition-opacity duration-200 ease-in-out will-change-transform",
        "border-[1px] border-white/20 bg-black text-white/70 opacity-50 shadow-xl",
        "focus-within:opacity-100 hover:opacity-100",
      )}
    >
      <motion.div
        onPointerDown={(e) => dragControls.start(e, { snapToCursor: false })}
        whileTap={{
          cursor: "grabbing",
        }}
        className={clsx(
          "absolute -top-[10px] left-1/2 py-[1px] px-[6px]",
          "rounded-md border-[1px] border-white/20 bg-black",
          "transition-all duration-200 ease-in-out will-change-transform",
          "hover:scale-150 hover:cursor-grab hover:bg-gray-800 focus:outline-none",
        )}
      >
        <DragHandleDots2Icon className="rotate-90" />
      </motion.div>
      <div className={clsx("flex gap-8", "")}>
        <div>
          <label htmlFor="language">Language</label>
          <Select
            type="language"
            initialValue={language}
            setValue={setLanguage}
            options={SUPPORTED_LANGUAGES}
          />
        </div>
        <div>
          <label htmlFor="theme">Theme</label>
          <Select
            type="theme"
            initialValue={theme}
            setValue={setTheme}
            options={SUPPORTED_THEMES}
          />
        </div>
        <div>
          <label htmlFor="lineNumbers">Line Numbers</label>
          <Toggle
            initialValue={lineNumbers}
            setValue={setLineNumbers}
          />
        </div>
        <div>
          <label htmlFor="padding">Padding</label>
          <Choices
            initialValue={padding}
            setValue={setPadding}
            choices={SUPPORTED_PADDING_CHOICES}
          />
        </div>
      </div>
    </motion.section>
  )
}
