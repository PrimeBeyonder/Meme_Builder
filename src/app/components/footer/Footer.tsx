'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Music, Headphones, Mic2, Radio } from 'lucide-react'

const socialIcons = [
  { icon: <Facebook size={24} />, color: 'hover:text-blue-600' },
  { icon: <Twitter size={24} />, color: 'hover:text-sky-500' },
  { icon: <Instagram size={24} />, color: 'hover:text-pink-600' },
  { icon: <Youtube size={24} />, color: 'hover:text-red-600' },
]

const musicIcons = [
  { icon: <Music size={24} />, label: 'Discover' },
  { icon: <Headphones size={24} />, label: 'Listen' },
  { icon: <Mic2 size={24} />, label: 'Create' },
  { icon: <Radio size={24} />, label: 'Share' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeIcon, setActiveIcon] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribed with email:', email)
    setIsSubmitted(true)
    setEmail('')
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <footer className="bg-card text-card-foreground pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Melody Stream</h2>
            <p className="text-muted-foreground mb-4">Discover, create, and share the music you love. Connect with artists and music enthusiasts from around the world.</p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`text-muted-foreground ${social.color} transition-colors`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay in the Loop</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
              <Button type="submit" className="w-full">
                Subscribe to Newsletter
              </Button>
            </form>
            <AnimatePresence>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-green-500 mt-2"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="border-t border-muted-foreground/20 pt-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Explore Melody Stream</h3>
          <div className="flex justify-center space-x-8">
            {musicIcons.map((item, index) => (
              <motion.div
                key={index}
                className="text-center cursor-pointer"
                onHoverStart={() => setActiveIcon(index)}
                onHoverEnd={() => setActiveIcon(null)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mb-2"
                >
                  {item.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">&copy; 2024 Melody Stream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

