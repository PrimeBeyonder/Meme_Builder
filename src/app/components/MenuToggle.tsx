"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface MenuToggleProps {
  items: { title: string; href: string }[]
}

export function MenuToggle({ items }: MenuToggleProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-4">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                "block py-2 px-4 rounded-md hover:bg-accent"
              )}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

