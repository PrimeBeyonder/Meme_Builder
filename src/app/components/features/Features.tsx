'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
    Music2, 
    Users, 
    PlaySquare, 
    Laptop,
} from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
    {
      icon: <Music2 className="h-12 w-12" />,
      title: "Upload & Share",
      description: "Share your music with the world. Upload tracks and let others discover your talent."
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Connect",
      description: "Build your network of followers and connect with other musicians and music lovers."
    },
    {
      icon: <PlaySquare className="h-12 w-12" />,
      title: "Create Playlists",
      description: "Curate your perfect playlist. Mix and match tracks to create the perfect vibe."
    },
    {
      icon: <Laptop className="h-12 w-12" />,
      title: "Stream Anywhere",
      description: "Listen to your favorite tracks anywhere, anytime. Our platform works on all devices."
    }
]

const FeatureCard = ({ icon, title, description }: Feature) => (
  <motion.div
    className="bg-card text-card-foreground min-h-60 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
    whileHover={{ y: -5 }}
  >
    <div className="text-primary">{icon}</div>
    <h3 className="mt-4 text-xl font-semibold">
      {title}
    </h3>
    <p className="mt-2 text-muted-foreground">{description}</p>
  </motion.div>
)

export default function Features() {
  return (
    <section className="py-20 relative overflow-hidden my-10 px-10">
      <div className="absolute inset-0 bg-background z-0"></div>
      <div className="absolute inset-0 z-10"></div>
      <div className="container mx-auto relative z-20">
        <motion.h2
          className="text-4xl md:text-5xl mb-20 font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Powerful Features for Your Success
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
         <Button
          size="lg"
          className="font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg group"
        >
         Sign Up for Free
          <ChevronRight
            className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
          />
        </Button>
        </motion.div>
      </div>
    </section>
  )
}

