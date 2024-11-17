"use client";

import { cn } from "@/lib/utils";
import { Music2 } from "lucide-react";
import { ModeToggle } from "@/app/mode-toggle";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MobileNav } from "./mobile-nav";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("ENG");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 md:py-2">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music2 className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">Melodify</span>
          </div>

          {/* Centered Navigation Links */}
          <nav className="flex-1 hidden md:flex items-center justify-center space-x-8">
            {["Explore", "About", "Features", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Toggle Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-1.5">
                  {language === "ENG" ? "ENG" : "日本語"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24">
                <DropdownMenuItem onClick={() => setLanguage("ENG")}>ENG</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("JP")}>日本語</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <ModeToggle />

            {/* Authentication Dropdown with Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Avatar Icon */}
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://placekitten.com/200/200" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Log in
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button size="sm" className="w-full text-left">
                    Sign up
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
