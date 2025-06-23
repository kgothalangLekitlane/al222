import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Clock, Users, Star, ArrowRight } from "lucide-react"

export default function CoursesPage() {
  const courses = [
    {
      id: "math-grade-10",
      title: "Grade 10 Mathematics",
      description: "Complete mathematics curriculum covering algebra, geometry, and trigonometry",
      grade: "Grade 10",
      subject: "Mathematics",
      duration: "45 hours",
      students: 1200,
      rating: 4.8,
      topics: 8,
      image: "📐",
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "physics-grade-11",
      title: "Grade 11 Physical Sciences",
      description: "Physics and chemistry fundamentals with practical applications",
      grade: "Grade 11",
      subject: "Physical Sciences",
      duration: "38 hours",
      students: 950,
      rating: 4.7,
      topics: 6,
      image: "⚛️",
      color: "bg-green-50 border-green-200",
    },
    {
      id: "biology-grade-12",
      title: "Grade 12 Life Sciences",
      description: "Advanced biology covering genetics, evolution, and human systems",
      grade: "Grade 12",
      subject: "Life Sciences",
      duration: "42 hours",
      students: 800,
      rating: 4.9,
      topics: 7,
      image: "🧬",
      color: "bg-purple-50 border-purple-200",
    },
    {
      id: "math-grade-11",
      title: "Grade 11 Mathematics",
      description: "Advanced mathematical concepts building on Grade 10 knowledge",
      grade: "Grade 11",
      subject: "Mathematics",
      duration: "48 hours",
      students: 1100,
      rating: 4.8,
      topics: 9,
      image: "📊",
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "chemistry-grade-12",
      title: "Grade 12 Physical Sciences",
      description: "Advanced chemistry and physics for university preparation",
      grade: "Grade 12",
      subject: "Physical Sciences",
      duration: "50 hours",
      students: 750,
      rating: 4.6,
      topics: 8,
      image: "🧪",
      color: "bg-green-50 border-green-200",
    },
    {
      id: "biology-grade-10",
      title: "Grade 10 Life Sciences",
      description: "Introduction to biology and life sciences fundamentals",
      grade: "Grade 10",
      subject: "Life Sciences",
      duration: "35 hours",
      students: 1000,
      rating: 4.7,
      topics: 6,
      image: "🌱",
      color: "bg-purple-50 border-purple-200",
    },
  ]

  const filters = [
    { name: "All Grades", value: "all" },
    { name: "Grade 10", value: "grade-10" },
    { name: "Grade 11", value: "grade-11" },
    { name: "Grade 12", value: "grade-12" },
  ]

  const subjects = [
    { name: "All Subjects", value: "all" },
    { name: "Mathematics", value: "mathematics" },
    { name: "Physical Sciences", value: "physical-sciences" },
    { name: "Life Sciences", value: "life-sciences" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of courses designed to help you excel in your studies
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Badge key={filter.value} variant="outline" className="cursor-pointer hover:bg-blue-50">
                  {filter.name}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Badge key={subject.value} variant="outline" className="cursor-pointer hover:bg-green-50">
                  {subject.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className={`${course.color} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{course.image}</div>
                    <Badge variant="secondary">{course.grade}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{course.topics} topics</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/grades">
                      Start Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse all our grades and subjects to find the perfect course for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/grades">
                Browse All Grades
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
