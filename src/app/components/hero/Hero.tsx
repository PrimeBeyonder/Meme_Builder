"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search, Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const featuredSongs = [
  { id: 1, title: "Love YourSelf", artist: "Justin Bieber", cover: "/song_cover/LoveYourself.png", audio: "/simple_mp3/loveUrSelf.mp3" },
  { id: 2, title: "All Girl Are The Same", artist: "Jucice", cover: "/song_cover/allGirlAreTheSame.jpg", audio: "/simple_mp3/allGirlAreTheSame.mp3" },
  { id: 3, title: "About You", artist: "The 1975", cover: "/song_cover/aboutYou.jpg", audio: "/simple_mp3/aboutYou.mp3" },
  { id: 4, title: "Watermelon Sugar", artist: "Harry Styles", cover: "/song_cover/watermelon-sugar.jpg", audio: "/simple_mp3/watermelon-sugar.mp3" },
  { id: 5, title: "Don't Start Now", artist: "Dua Lipa", cover: "/song_cover/dont-start-now.jpg", audio: "/simple_mp3/dont-start-now.mp3" },
]

const relatedArtists = [
  { name: "Juice WRLD", image: "/artists/juceWrld.png" },
  { name: "The 1975", image: "/artists/the1975.jpg" },
  { name: "Tyler, The Creator", image: "/artists/tyler-the-creator.jpg" },
  { name: "Playboi Carti", image: "/artists/playboi-carti.jpg" },
  { name: "Travis Scott", image: "/artists/travis-scott.jpg" },
  { name: "Lil Uzi Vert", image: "/artists/lil-uzi-vert.jpg" },
  { name: "Kanye West", image: "/artists/kanye-west.jpg" },
  { name: "Lil Peep", image: "/artists/lil-peep.jpg" },
  { name: "Post Malone", image: "/artists/post-malone.jpg" },
  { name: "Future", image: "/artists/future.jpg" },
  { name: "Ski Mask The Slump God", image: "/artists/ski-mask-the-slump-god.jpg" },
  { name: "XXXTentacion", image: "/artists/xxxtentacion.jpg" }
];


export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const initializeAudio = async () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      
      audioRef.current = new Audio(featuredSongs[currentSongIndex].audio)
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration)
      })
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current!.currentTime)
      })
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
        setCurrentTime(0)
        handleNext()
      })

      audioRef.current.volume = volume
    }

    initializeAudio()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [currentSongIndex, isClient])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        await audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error('Playback error:', error)
    }
  }

  const handleVolumeChange = ([value]: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value
      setVolume(value)
    }
  }

  const handlePrevious = () => {
    const newIndex = (currentSongIndex - 1 + featuredSongs.length) % featuredSongs.length
    setCurrentSongIndex(newIndex)
    setIsPlaying(false)
  }

  const handleNext = () => {
    const newIndex = (currentSongIndex + 1) % featuredSongs.length
    setCurrentSongIndex(newIndex)
    setIsPlaying(false)
  }

  const playSong = (index: number) => {
    setCurrentSongIndex(index)
    setIsPlaying(true)
  }
  const handleTimeChange = ([value]: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  const currentSong = featuredSongs[currentSongIndex]

  const filteredSongs = featuredSongs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isClient) return null

  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <div className="container relative">
        <motion.div 
          className="flex flex-col items-center text-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-800">
            Discover and Share the Music You Love!
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Upload your tracks, connect with music lovers, and build your playlists.
          </p>
          
          <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 mx-5">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search for songs, artists, or genres..." 
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="">
              <Button 
                size="lg"
                className="w-2/3 mt-1  md:w-auto bg-gray-900"
                >
                Explore Now
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white rounded-xl p-4 h-[400px]"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-4 h-full">
              <h2 className="text-xl font-semibold">Now Playing</h2>
              <div className="w-40 h-40 relative rounded-lg overflow-hidden">
                <Image
                  src={currentSong.cover}
                  alt={`${currentSong.title} cover`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  animate={{ opacity: isPlaying ? 0 : 1 }}
                >
                  <Button size="icon" className="h-12 w-12 rounded-full" onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                </motion.div>
              </div>
              <div className="w-full text-center">
                <h3 className="font-semibold">{currentSong.title}</h3>
                <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
              </div>
              <div className="w-full max-w-[250px]">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.1}
                  className="w-full"
                  onValueChange={handleTimeChange}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost" onClick={handlePrevious}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={handleNext}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-full max-w-[250px] flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.01}
                  className="w-full"
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-4 h-[400px] overflow-y-auto"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Featured Playlist</h2>
            <ul className="space-y-2">
              {filteredSongs.map((song, index) => (
                <li 
                  key={song.id} 
                  className={`flex items-center gap-4 p-2 rounded-md hover:bg-gray-50 transition-colors ${
                    currentSongIndex === index ? 'bg-gray-50' : ''
                  }`}
                >
                  <Image
                    src={song.cover}
                    alt={`${song.title} cover`}
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">{song.title}</h3>
                    <p className="text-xs text-muted-foreground">{song.artist}</p>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8" 
                    onClick={() => playSong(index)}
                  >
                    {currentSongIndex === index && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 md:px-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold my-10 md:ms-14">Related Artists</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {relatedArtists.map((artist) => (
              <SwiperSlide key={artist.name}>
                <div className="flex flex-col items-center p-2">
                  <div className="w-24 h-24 relative rounded-full overflow-hidden mb-2">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-center">{artist.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}