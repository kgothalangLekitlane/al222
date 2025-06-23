"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Search, Menu, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { isSupabaseConfigured } from "@/lib/supabase"

interface Video {
  id: string
  title: string
  description: string
  url: string
  duration: string
  thumbnail: string
  topic_id: string
}

interface Topic {
  id: string
  name: string
  description: string
  subject: {
    name: string
    grade: {
      name: string
    }
  }
}

export default function TopicVideosPage() {
  const params = useParams()
  const topicId = params.topicId as string

  const [videos, setVideos] = useState<Video[]>([])
  const [topic, setTopic] = useState<Topic | null>(null)
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (topicId) {
      fetchTopicAndVideos()
    }
  }, [topicId])

  const fetchTopicAndVideos = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!isSupabaseConfigured()) {
        // Mock data matching the design
        const mockTopic = {
          id: topicId,
          name: "Rational and Irrational Numbers",
          description:
            "This video will help you to grasp basic rational numbers and what real and more and more numbers are and how they are used.",
          subject: {
            name: "Mathematics",
            grade: {
              name: "Grade 10",
            },
          },
        }

        const mockVideos = [
          {
            id: "1",
            title: "Rational and Irrational Numbers",
            description:
              "This video will help you to grasp basic rational numbers and what real and more and more numbers are and how they are used.",
            url: "/placeholder.svg?height=200&width=350",
            duration: "12:45",
            thumbnail: "/placeholder.svg?height=200&width=350",
            topic_id: topicId,
          },
          {
            id: "2",
            title: "Trigonometry",
            description: "Learn the basics of trigonometry and its applications",
            url: "/placeholder.svg?height=120&width=160",
            duration: "15:30",
            thumbnail: "/placeholder.svg?height=120&width=160",
            topic_id: topicId,
          },
          {
            id: "3",
            title: "Mathematics > Grade 10",
            description: "Advanced mathematical concepts for grade 10 students",
            url: "/placeholder.svg?height=120&width=160",
            duration: "18:20",
            thumbnail: "/placeholder.svg?height=120&width=160",
            topic_id: topicId,
          },
        ]

        setTopic(mockTopic)
        setVideos(mockVideos)
        setCurrentVideo(mockVideos[0])
        setLoading(false)
        return
      }

      // Supabase implementation would go here
    } catch (err) {
      console.error("Error fetching topic and videos:", err)
      setError("Failed to load videos. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchTopicAndVideos} className="bg-teal-500 hover:bg-teal-600">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-teal-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-teal-600 text-lg">ALAMEDALAB</span>
            </div>
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5 text-teal-600" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search videos, subjects, grades"
              className="pl-10 bg-gray-50 border-gray-200 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {currentVideo && (
          <div className="space-y-4">
            {/* Main Video */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src={currentVideo.thumbnail || "/placeholder.svg"}
                  alt={currentVideo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white bg-opacity-90 hover:bg-white text-teal-600 rounded-full w-16 h-16"
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {currentVideo.duration}
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{currentVideo.title}</h1>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                  {topic?.subject.name}
                </Badge>
                <span className="text-gray-400">></span>
                <Badge variant="outline" className="border-teal-200 text-teal-600">
                  {topic?.subject.grade.name}
                </Badge>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{currentVideo.description}</p>
            </div>

            {/* Next Video Lesson */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Next Video Lesson</h2>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {videos.slice(1, 3).map((video) => (
                  <div key={video.id} className="cursor-pointer group" onClick={() => setCurrentVideo(video)}>
                    <div className="relative mb-2">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-20 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white px-1 py-0.5 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs border-teal-200 text-teal-600">
                        {topic?.subject.name}
                      </Badge>
                      <span className="text-gray-400 text-xs">></span>
                      <span className="text-gray-500 text-xs">{topic?.subject.grade.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
