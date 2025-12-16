'use client'

import { useState, useEffect, useRef } from 'react'
import { Heart, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface Video {
  id: number
  title: string
  description: string | null
  videoUrl: string
  thumbnailUrl: string | null
  likesCount: number
  isActive: boolean
  createdAt: string
  _count: {
    likes: number
  }
}

interface VideoPlayerProps {
  video: Video
  isActive: boolean
  onLike: (videoId: number) => void
  isLiked: boolean
}

function VideoPlayer({ video, isActive, onLike, isLiked }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isActive) {
      // Reset video to start and play
      videoElement.currentTime = 0
      videoElement.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.error('Video play failed:', error)
        setIsPlaying(false)
      })
    } else {
      videoElement.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  const togglePlay = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVideoEnd = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.currentTime = 0
    videoElement.play().catch(console.error)
  }

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* Mobile-sized video container */}
      <div className="relative w-[375px] h-[667px] max-w-[90vw] max-h-[80vh] bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-600">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay={false}
          controls={false}
          preload="metadata"
          onEnded={handleVideoEnd}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onClick={togglePlay}
          onLoadedData={() => {
            // Ensure video is ready to play
            const videoElement = videoRef.current
            if (videoElement && isActive) {
              videoElement.play().catch(console.error)
            }
          }}
        />

        {/* Video Controls Overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors"
            >
              <Play className="h-12 w-12" />
            </button>
          )}
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-between items-end">
            <div className="flex-1 mr-3">
              <h3 className="text-white text-lg font-bold mb-1">{video.title}</h3>
              {video.description && (
                <p className="text-white/90 text-xs line-clamp-2">{video.description}</p>
              )}
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              {/* Like Button */}
              <button
                onClick={() => onLike(video.id)}
                className={`p-2 rounded-full transition-colors ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-black/50 text-white hover:bg-red-500/20'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <span className="text-white text-xs font-medium">{video.likesCount}</span>

              {/* Sound Toggle */}
              <button
                onClick={toggleMute}
                className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Loading Thumbnail */}
        {video.thumbnailUrl && (
          <div className="absolute inset-0 bg-black">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReelsPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos')
      if (response.ok) {
        const data = await response.json()
        setVideos(data)
        
        // Check like status for all videos
        data.forEach((video: Video) => {
          checkLikeStatus(video.id)
        })
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkLikeStatus = async (videoId: number) => {
    try {
      const response = await fetch(`/api/videos/${videoId}/like`)
      if (response.ok) {
        const data = await response.json()
        if (data.liked) {
          setLikedVideos(prev => new Set(prev).add(videoId))
        }
      }
    } catch (error) {
      console.error('Error checking like status:', error)
    }
  }

  const handleLike = async (videoId: number) => {
    try {
      const response = await fetch(`/api/videos/${videoId}/like`, {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update like status
        setLikedVideos(prev => {
          const newSet = new Set(prev)
          if (data.liked) {
            newSet.add(videoId)
          } else {
            newSet.delete(videoId)
          }
          return newSet
        })

        // Update likes count
        setVideos(prev => prev.map(video => 
          video.id === videoId 
            ? { ...video, likesCount: video.likesCount + (data.liked ? 1 : -1) }
            : video
        ))
      }
    } catch (error) {
      console.error('Error liking video:', error)
    }
  }

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault()
    
    if (e.deltaY > 0 && currentVideoIndex < videos.length - 1) {
      // Scroll down - next video
      setCurrentVideoIndex(prev => prev + 1)
    } else if (e.deltaY < 0 && currentVideoIndex > 0) {
      // Scroll up - previous video
      setCurrentVideoIndex(prev => prev - 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (currentVideoIndex < videos.length - 1) {
          setCurrentVideoIndex(prev => prev + 1)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (currentVideoIndex > 0) {
          setCurrentVideoIndex(prev => prev - 1)
        }
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentVideoIndex, videos.length])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Videos Yet</h2>
            <p className="text-gray-600">Check back soon for amazing goat videos!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800" onWheel={handleScroll}>
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Video Container */}
      <div className="relative h-full">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-transform duration-500 ${
              index === currentVideoIndex 
                ? 'translate-y-0' 
                : index < currentVideoIndex 
                  ? '-translate-y-full' 
                  : 'translate-y-full'
            }`}
          >
            <VideoPlayer
              video={video}
              isActive={index === currentVideoIndex}
              onLike={handleLike}
              isLiked={likedVideos.has(video.id)}
            />
          </div>
        ))}
      </div>

      {/* Video Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded-full text-sm z-40">
        {currentVideoIndex + 1} / {videos.length}
      </div>

      {/* Navigation Hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center z-40">
        <p>Scroll or use ↑↓ arrows to navigate</p>
      </div>

      {/* Mobile Frame Indicator */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-full text-xs z-40">
        📱 Mobile View
      </div>
    </div>
  )
}
