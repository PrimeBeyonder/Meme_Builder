"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DialogTitle } from "@radix-ui/react-dialog" // Import DialogTitle from Radix UI

// Link data
const links = [
  { href: "#explore", label: "Explore", icon: "🌟" },
  { href: "#about", label: "About", icon: "ℹ️" },
  { href: "#features", label: "Features", icon: "🎯" },
  { href: "#contact", label: "Contact", icon: "📞" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false) // Track if component is mounted on the client side

  useEffect(() => {
    // Ensure this is only run on the client side
    setIsClient(true)
  }, [])

  // Don't render anything on SSR (server-side rendering)
  if (!isClient) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden relative overflow-hidden group">
          <Menu className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="sr-only">Toggle menu</span>
          <span className="absolute inset-0 rounded-md bg-primary/10 scale-0 transition-transform group-hover:scale-100" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gray-300">
        {/* Using DialogTitle for accessibility */}
        <DialogTitle className="sr-only">Menu</DialogTitle>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-gray-700">
            Menu
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="space-y-4">
          <AnimatePresence>
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={link.href}
                  className="flex items-center justify-between p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">{link.icon}</span>
                    <span className="text-lg font-medium group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </span>
                  <ChevronRight className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary transition-colors" />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <Button className="w-full bg-gray-800">Get Started</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
