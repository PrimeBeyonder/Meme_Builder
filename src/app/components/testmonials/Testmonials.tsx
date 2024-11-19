'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  image: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    role: "CEO",
    company: "TechCorp",
    content: "This product revolutionized our workflow. It's been an absolute game-changer for our team's productivity.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5
  },
  {
    name: "Samantha Lee",
    role: "Designer",
    company: "CreativeCo",
    content: "The intuitive interface and powerful features have made my job so much easier. I can't imagine working without it now.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4
  },
  {
    name: "Michael Chen",
    role: "Developer",
    company: "InnovateSoft",
    content: "The API is a dream to work with. It's well-documented, flexible, and has dramatically sped up our development process.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    if (currentIndex < testimonials.length - 1) {
      setDirection(1)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prevTestimonial = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < testimonials.length - 1) {
        nextTestimonial()
      } else {
        setCurrentIndex(0)
        setDirection(1)
      }
    }, 10000) // Auto-advance every 10 seconds
    return () => clearInterval(timer)
  }, [currentIndex])

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container relative">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Voices of Success
        </motion.h2>
        <div className="relative w-full max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 300 : -300,
                  opacity: 0,
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                },
                exit: (direction: number) => ({
                  zIndex: 0,
                  x: direction < 0 ? 300 : -300,
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="absolute w-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
                  <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-8">
                    <div className="relative w-32 h-32 mx-auto md:w-full md:h-0 md:pb-[100%] rounded-full overflow-hidden border-4 border-primary">
                      <motion.img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="absolute w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl italic mb-4 text-gray-700 dark:text-gray-300">
                      &quot;{testimonials[currentIndex].content}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              disabled={currentIndex === 0}
              className={`rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              disabled={currentIndex === testimonials.length - 1}
              className={`rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                currentIndex === testimonials.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}