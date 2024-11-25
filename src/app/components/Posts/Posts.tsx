'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Bookmark } from 'lucide-react'

interface MusicPost {
  id: number
  title: string
  singer: string
  tags: string[]
  coverImage: string
  uploadedBy: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
  description: string
}

const musicPosts: MusicPost[] = [
  {
    id: 1,
    title: "Summer Vibes",
    singer: "Sarah Johnson",
    tags: ["Pop", "Summer", "Feel Good"],
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "Sarah J",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    likes: 1234,
    comments: 89,
    description: "This song captures the essence of summer fun and good vibes. Perfect for your beach playlist!"
  },
  {
    id: 2,
    title: "Midnight Serenade",
    singer: "Alex Rivera",
    tags: ["Jazz", "Romantic", "Smooth"],
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "Alex R",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    likes: 987,
    comments: 56,
    description: "A smooth jazz piece perfect for those late-night moments of reflection and relaxation."
  },
  {
    id: 3,
    title: "Electric Dreams",
    singer: "Techno Twins",
    tags: ["Electronic", "Dance", "Upbeat"],
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "TT Official",
      avatar: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100&h=100&fit=crop"
    },
    likes: 2345,
    comments: 120,
    description: "Get ready to hit the dance floor with this electrifying beat that will keep you moving all night!"
  },
  {
    id: 4,
    title: "Acoustic Memories",
    singer: "Emma Woods",
    tags: ["Folk", "Acoustic", "Mellow"],
    coverImage: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "Emma W",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    likes: 876,
    comments: 67,
    description: "A heartwarming acoustic melody that brings back cherished memories and touches the soul."
  },
  {
    id: 5,
    title: "Rock Revolution",
    singer: "The Rebels",
    tags: ["Rock", "Alternative", "Energetic"],
    coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "Rebel Leader",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop"
    },
    likes: 3456,
    comments: 234,
    description: "Unleash your inner rebel with this hard-hitting rock anthem that challenges the status quo!"
  },
  {
    id: 6,
    title: "Chill Waves",
    singer: "Ocean Breeze",
    tags: ["Ambient", "Relaxation", "Nature"],
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "OB Music",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
    },
    likes: 1543,
    comments: 78,
    description: "Let the soothing sounds of gentle waves wash over you and transport you to a state of pure relaxation."
  },
  {
    id: 7,
    title: "Urban Rhythm",
    singer: "Street Beats Crew",
    tags: ["Hip Hop", "Urban", "Rap"],
    coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "SBC Official",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop"
    },
    likes: 2987,
    comments: 176,
    description: "Experience the pulse of the city with this dynamic hip hop track that speaks to the urban soul."
  },
  {
    id: 8,
    title: "Classical Journey",
    singer: "Harmony Orchestra",
    tags: ["Classical", "Orchestral", "Epic"],
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&h=500&fit=crop",
    uploadedBy: {
      name: "Harmony",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    likes: 1876,
    comments: 103,
    description: "Embark on a majestic musical journey with this sweeping orchestral piece that stirs the imagination."
  }
]

function MusicPostCard({ post }: { post: MusicPost }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="relative p-0">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
        <Avatar className="absolute top-4 left-4 border-2 border-background">
          <AvatarImage src={post.uploadedBy.avatar} alt={post.uploadedBy.name} />
          <AvatarFallback>{post.uploadedBy.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-1">{post.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{post.singer}</p>
        <p className="text-sm text-foreground mb-2 line-clamp-2">{post.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsLiked(!isLiked)}
          className={isLiked ? 'text-destructive hover:text-destructive/90' : 'text-muted-foreground hover:text-foreground'}
        >
          <Heart className="mr-1 h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
          {post.likes}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-1 h-4 w-4" />
              {post.comments}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <h4 className="font-semibold mb-2">Comments</h4>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
            </ScrollArea>
            <div className="flex items-center mt-4">
              <Input placeholder="Add a comment..." className="flex-grow mr-2" />
              <Button size="sm">Post</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsSaved(!isSaved)}
          className={isSaved ? 'text-primary hover:text-primary/90' : 'text-muted-foreground hover:text-foreground'}
        >
          <Bookmark className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
        </Button>
      </CardFooter>
    </Card>
  )
}
export default function MusicAppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="lg:w-1/2 lg:sticky md:py-24 lg:top-0 lg:h-screen overflow-auto p-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Melody Stream
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Discover, share, and enjoy music like never before. Melody Stream brings you the latest tracks, hottest playlists, and a vibrant community of music lovers. Dive into a world of endless melodies and rhythms that move your soul.
          </p>
          <Button size="lg">
            Start Listening Now
          </Button>
        </div>
        <div className="lg:w-1/2 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicPosts.map((post) => (
              <MusicPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}