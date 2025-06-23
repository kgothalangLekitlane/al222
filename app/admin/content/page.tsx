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
import { AlertCircle, Plus, Edit, Trash2, Upload, BookOpen, Database, Download } from "lucide-react"
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
          <div className="text-center py-12">
            <p className="text-muted-foreground">Videos management will be available here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
