"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Music2, Sun, Moon, Globe} from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


const navItems = ["Explore", "About", "Features", "Contact"]

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [language, setLanguage] = useState("ENG")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "py-2",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music2 className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">Melodify</span>
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary relative group rounded-md hover:bg-accent"
              >
                {item}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="default"
              onClick={() => setLanguage(lang => lang === "ENG" ? "日本" : "ENG")}
              aria-label="Toggle language"
              className="px-4"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-2 text-xs font-medium">{language}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}