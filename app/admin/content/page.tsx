"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Upload,
  BookOpen,
  Database,
  Download,
  Video,
  Play,
  FileVideo,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminContentPage() {
  const [user] = useState({ role: "admin" }) // Mock user
  const [grades] = useState([
    { id: "1", name: "Grade 10", description: "Foundation year" },
    { id: "2", name: "Grade 11", description: "Intermediate year" },
    { id: "3", name: "Grade 12", description: "Final year" },
  ])
  const [subjects] = useState([])
  const [topics] = useState([])
  const [videos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [seedingProgress, setSeedingProgress] = useState(0)
  const [isSeeding, setIsSeeding] = useState(false)

  // Form states
  const [gradeForm, setGradeForm] = useState({ name: "", description: "" })
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    url: "",
    topic_id: "",
    file: null as File | null,
  })

  const seedSampleCurriculum = async () => {
    setIsSeeding(true)
    setSeedingProgress(0)
    setError(null)
    setSuccess(null)

    try {
      // Simulate seeding process
      for (let i = 0; i <= 100; i += 10) {
        setSeedingProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      setSuccess("Sample curriculum seeded successfully!")
    } catch (error) {
      setError("Seeding failed. Please try again.")
    } finally {
      setIsSeeding(false)
      setSeedingProgress(0)
    }
  }

  const handleCreateGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Mock grade creation
      console.log("Creating grade:", gradeForm)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Grade created successfully!")
      setGradeForm({ name: "", description: "" })
    } catch (error) {
      setError("Failed to create grade")
    } finally {
      setLoading(false)
    }
  }

  const handleVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Mock video upload
      console.log("Uploading video:", videoForm)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess("Video uploaded successfully!")
      setVideoForm({ title: "", description: "", url: "", topic_id: "", file: null })
    } catch (error) {
      setError("Failed to upload video")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoForm({ ...videoForm, file })
    }
  }

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      console.log(`Deleting ${table} with id ${id}`)
      setSuccess("Item deleted successfully!")
    } catch (error) {
      setError("Failed to delete item")
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Access denied. Admin privileges required to view this page.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage grades, subjects, topics, and videos</p>
        </div>
        <Badge variant="destructive" className="flex items-center gap-1">
          <Upload className="h-3 w-3" />
          Admin Access
        </Badge>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Bulk operations and data management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={seedSampleCurriculum} disabled={isSeeding} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {isSeeding ? "Seeding..." : "Seed Sample Curriculum"}
            </Button>

            {isSeeding && (
              <div className="flex-1 min-w-64">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Seeding Progress</span>
                  <span className="text-sm font-medium">{Math.round(seedingProgress)}%</span>
                </div>
                <Progress value={seedingProgress} className="h-2" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{grades.length}</div>
              <div className="text-sm text-muted-foreground">Grades</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{subjects.length}</div>
              <div className="text-sm text-muted-foreground">Subjects</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{topics.length}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{videos.length}</div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Management Tabs */}
      <Tabs defaultValue="grades" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Grade
                </CardTitle>
                <CardDescription>Create a new grade level</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateGrade} className="space-y-4">
                  <div>
                    <Label htmlFor="grade-name">Grade Name</Label>
                    <Input
                      id="grade-name"
                      placeholder="e.g., Grade 1, Grade 2"
                      value={gradeForm.name}
                      onChange={(e) => setGradeForm({ ...gradeForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="grade-description">Description</Label>
                    <Textarea
                      id="grade-description"
                      placeholder="Grade description..."
                      value={gradeForm.description}
                      onChange={(e) => setGradeForm({ ...gradeForm, description: e.target.value })}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Creating..." : "Create Grade"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Existing Grades ({grades.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {grades.map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{grade.name}</p>
                        {grade.description && <p className="text-sm text-muted-foreground">{grade.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete("grades", grade.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Subjects management will be available here.</p>
          </div>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Topics management will be available here.</p>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New Video
                </CardTitle>
                <CardDescription>Upload educational videos for topics</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVideoUpload} className="space-y-4">
                  <div>
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input
                      id="video-title"
                      placeholder="e.g., Introduction to Algebra"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea
                      id="video-description"
                      placeholder="Video description..."
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-url">Video URL (Optional)</Label>
                    <Input
                      id="video-url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={videoForm.url}
                      onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-file">Upload Video File</Label>
                    <Input
                      id="video-file"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {videoForm.file && (
                      <p className="text-sm text-muted-foreground mt-1">Selected: {videoForm.file.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="topic-select">Topic</Label>
                    <Input
                      id="topic-select"
                      placeholder="Select or enter topic ID"
                      value={videoForm.topic_id}
                      onChange={(e) => setVideoForm({ ...videoForm, topic_id: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Uploading..." : "Upload Video"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Existing Videos ({videos.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {videos.length > 0 ? (
                    videos.map((video) => (
                      <div key={video.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileVideo className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{video.title}</p>
                            <p className="text-sm text-muted-foreground">Topic ID: {video.topic_id}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete("videos", video.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FileVideo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No videos uploaded yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
