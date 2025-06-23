"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Play, Clock, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Video {
  id: string
  title: string
  description: string
  url: string
  topic_id: string
  duration?: string
  thumbnail?: string
  completed?: boolean
}

interface Topic {
  id: string
  name: string
  description: string
  subjects: {
    id: string
    name: string
    grades: {
      id: string
      name: string
    }
  }
}

export default function VideosPage() {
  const params = useParams()
  const topicId = params.topicId as string

  const [videos, setVideos] = useState<Video[]>([])
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (topicId) {
      fetchVideos()
    }
  }, [topicId])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch topic info with subject and grade
      const { data: topicData, error: topicError } = await supabase
        .from("topics")
        .select(`
          id,
          name,
          description,
          subjects (
            id,
            name,
            grades (
              id,
              name
            )
          )
        `)
        .eq("id", topicId)
        .single()

      if (topicError) throw topicError
      setTopic(topicData)

      // Fetch videos for this topic
      const { data: videosData, error: videosError } = await supabase
        .from("videos")
        .select("*")
        .eq("topic_id", topicId)
        .order("title")

      if (videosError) throw videosError

      // Add placeholder data for missing fields
      const videosWithExtras =
        videosData?.map((video, index) => ({
          ...video,
          duration: `${Math.floor(Math.random() * 15) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
          thumbnail: `/placeholder.svg?height=180&width=320&text=Video+${index + 1}`,
          completed: Math.random() > 0.7, // Random completion status
        })) || []

      setVideos(videosWithExtras)
    } catch (err) {
      console.error("Error fetching videos:", err)
      setError("Failed to load videos. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse mb-12">
            <div className="h-4 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-lg lg:flex">
                  <div className="lg:w-96 h-64 bg-gray-300"></div>
                  <div className="flex-1 p-8">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-6"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                      <div className="h-10 bg-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <Play className="h-10 w-10 text-red-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Error Loading Videos</h3>
          <p className="text-gray-600 text-lg mb-6">{error}</p>
          <button
            onClick={fetchVideos}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <nav className="text-sm breadcrumbs mb-6">
            <Link href="/courses" className="text-blue-600 hover:text-blue-800 transition-colors">
              All Courses
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href={`/grades/${topic?.subjects?.grades?.id}/subjects`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {topic?.subjects?.grades?.name} Subjects
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href={`/subjects/${topic?.subjects?.id}/topics`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {topic?.subjects?.name} Topics
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{topic?.name} Videos</span>
          </nav>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{topic?.name} Videos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch comprehensive video lessons to master {topic?.name.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Videos List */}
        {videos.length > 0 ? (
          <div className="space-y-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="lg:flex">
                  {/* Video Thumbnail */}
                  <div className="lg:w-96 relative group cursor-pointer">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all cursor-pointer transform group-hover:scale-110">
                        <Play className="h-10 w-10 text-blue-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded-full">
                      {video.duration}
                    </div>
                    {video.completed && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mr-3">
                            Lesson #{index + 1}
                          </span>
                          {video.completed && (
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{video.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{video.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="font-medium">{video.duration}</span>
                        </div>
                        {video.completed && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="font-medium">Completed</span>
                          </div>
                        )}
                      </div>

                      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-3 font-medium">
                        <Play className="h-5 w-5" />
                        {video.completed ? "Watch Again" : "Watch Now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Play className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Videos Available</h3>
            <p className="text-gray-600 text-lg">Videos for {topic?.name} will appear here once they are added.</p>
          </div>
        )}
      </div>
    </div>
  )
}
