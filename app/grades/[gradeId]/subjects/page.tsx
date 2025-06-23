"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { BookOpen, ArrowRight, Users, Clock } from "lucide-react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

interface Subject {
  id: string
  name: string
  description: string
  grade_id: string
  topic_count?: number
  estimated_hours?: number
}

interface Grade {
  id: string
  name: string
  description: string
}

export default function SubjectsPage() {
  const params = useParams()
  const gradeId = params.gradeId as string

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [grade, setGrade] = useState<Grade | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (gradeId) {
      fetchSubjects()
    }
  }, [gradeId])

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        // Use mock data when Supabase is not configured
        const mockGrade = {
          id: gradeId,
          name: `Grade ${gradeId === "1" ? "10" : gradeId === "2" ? "11" : "12"}`,
          description: "Mock grade description",
        }

        const mockSubjects = [
          {
            id: "1",
            name: "Mathematics",
            description: "Comprehensive mathematics curriculum covering algebra, geometry, and calculus",
            grade_id: gradeId,
            topic_count: 8,
            estimated_hours: 45,
          },
          {
            id: "2",
            name: "Physical Sciences",
            description: "Physics and chemistry fundamentals with practical applications",
            grade_id: gradeId,
            topic_count: 6,
            estimated_hours: 38,
          },
          {
            id: "3",
            name: "Life Sciences",
            description: "Biology covering cells, genetics, ecology and human systems",
            grade_id: gradeId,
            topic_count: 7,
            estimated_hours: 42,
          },
        ]

        setGrade(mockGrade)
        setSubjects(mockSubjects)
        setLoading(false)
        return
      }

      // Fetch grade info
      const { data: gradeData, error: gradeError } = await supabase
        .from("grades")
        .select("id, name, description")
        .eq("id", gradeId)
        .single()

      if (gradeError) throw gradeError
      setGrade(gradeData)

      // Fetch subjects with topic counts
      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select(`
          id,
          name,
          description,
          grade_id,
          topics (count)
        `)
        .eq("grade_id", gradeId)
        .order("name")

      if (subjectsError) throw subjectsError

      // Transform data to include topic counts
      const subjectsWithCounts =
        subjectsData?.map((subject) => ({
          ...subject,
          topic_count: subject.topics?.[0]?.count || 0,
          estimated_hours: Math.floor(Math.random() * 40) + 20, // Placeholder calculation
        })) || []

      setSubjects(subjectsWithCounts)
    } catch (err) {
      console.error("Error fetching subjects:", err)
      setError("Failed to load subjects. Please try again.")
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="h-16 w-16 bg-gray-300 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-6"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
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
            <BookOpen className="h-10 w-10 text-red-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Error Loading Subjects</h3>
          <p className="text-gray-600 text-lg mb-6">{error}</p>
          <button
            onClick={fetchSubjects}
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
            <Link href="/grades" className="text-blue-600 hover:text-blue-800 transition-colors">
              All Grades
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{grade?.name} Subjects</span>
          </nav>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{grade?.name} Subjects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose a subject to explore topics and learning materials designed for your grade level
            </p>
          </div>
        </div>

        {/* Subjects Grid */}
        {subjects.length > 0 ? (
          <div className="grid gap-8 md:gap-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjects.map((subject, index) => (
                <div key={subject.id} className="group">
                  <Link
                    href={`/subjects/${subject.id}/topics`}
                    className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${
                            index % 3 === 0
                              ? "bg-blue-100 text-blue-600"
                              : index % 3 === 1
                                ? "bg-green-100 text-green-600"
                                : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          <BookOpen className="h-8 w-8" />
                        </div>
                        <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {subject.name}
                      </h3>

                      <p className="text-gray-600 mb-6 text-base leading-relaxed line-clamp-3">{subject.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="font-medium">{subject.topic_count} topics</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="font-medium">{subject.estimated_hours}h</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Subjects Available</h3>
            <p className="text-gray-600 text-lg">Subjects will appear here once they are added to {grade?.name}.</p>
          </div>
        )}
      </div>
    </div>
  )
}
