"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Music2, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { MenuToggle } from "../MenuToggle";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("ENG");
  const [navbarData, setNavbarData] = useState({
    title: "",
    explore: "",
    about: "",
    features: "",
    contact: "",
  });
  const { theme, setTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch navigation data based on selected language
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await fetch("/lang/data.json");
        const data = await response.json();
        setNavbarData(data[language]?.navbar || {});
      } catch (error) {
        console.error("Failed to load navbar data:", error);
      }
    };

    fetchNavbarData();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ENG" ? "日本" : "ENG"));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Music2 className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">{navbarData.title}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-1">
            <Link
              href="#explore"
              className="px-3 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary relative group rounded-md hover:bg-accent"
            >
              {navbarData.explore}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="#about"
              className="px-3 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary relative group rounded-md hover:bg-accent"
            >
              {navbarData.about}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="#features"
              className="px-3 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary relative group rounded-md hover:bg-accent"
            >
              {navbarData.features}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="#contact"
              className="px-3 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary relative group rounded-md hover:bg-accent"
            >
              {navbarData.contact}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 transition-all duration-300 group-hover:scale-x-100" />
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="px-3"
            >
              <Globe className="h-5 w-5 mr-2" />
              <span className="text-xs font-medium">{language}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu */}
            {/* <MenuToggle items={Object.values(navbarData).slice(1)} /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
