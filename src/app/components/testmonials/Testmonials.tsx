'use client'

import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

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

const TestimonialCard: React.FC<Testimonial> = ({ name, role, company, content, image, rating }) => (
  <Card className="min-h-56">
    <CardContent className="p-6 flex flex-col justify-between h-full">
      <div className="mb-4">
        <p className="text-muted-foreground italic mb-4">&ldquo;{content}&rdquo;</p>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role} at {company}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function Testimonials() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  return (
    <div className="py-12 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      )}
    </div>
  )
}

