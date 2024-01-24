import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SettingsProvider } from "../contexts/setting-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChairCode",
  description: "Make it more beauty!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>{children}</SettingsProvider>
        <Analytics />
      </body>
    </html>
  )
}
