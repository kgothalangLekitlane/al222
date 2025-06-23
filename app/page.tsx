import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Calculator, Atom, ChevronLeft, ChevronRight } from "lucide-react"

export default function HomePage() {
  const subjects = [
    {
      name: "Mathematics",
      icon: Calculator,
      href: "/subjects/mathematics",
    },
    {
      name: "Life Sciences",
      icon: Atom,
      href: "/subjects/life-sciences",
    },
  ]

  const latestVideos = [
    {
      id: 1,
      title: "Rational and Irrational Numbers",
      subject: "Mathematics",
      grade: "Grade 10",
      image: "/images/math-blocks.jpg",
      href: "/videos/rational-irrational-numbers",
    },
    {
      id: 2,
      title: "Biodiversity of Microorganisms",
      subject: "Life Sciences",
      grade: "Grade 10",
      image: "/images/lab-equipment.jpg",
      href: "/videos/biodiversity-microorganisms",
    },
  ]

  const examPreparation = [
    {
      id: 1,
      title: "Study Resources",
      image: "/images/library-books.jpg",
      href: "/exam-prep/resources",
    },
    {
      id: 2,
      title: "Practice Tests",
      image: "/images/students-studying.jpg",
      href: "/exam-prep/practice-tests",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search videos, subjects, grades"
              className="w-full h-14 pl-6 pr-14 text-lg border-2 border-gray-300 rounded-full focus:border-cyan-500 focus:ring-cyan-500"
            />
            <Button
              size="icon"
              className="absolute right-2 top-2 h-10 w-10 rounded-full bg-transparent hover:bg-gray-100"
              variant="ghost"
            >
              <Search className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Subjects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-cyan-600 mb-6">Subjects</h2>
          <div className="flex flex-wrap gap-4">
            {subjects.map((subject) => (
              <Button
                key={subject.name}
                asChild
                className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-full text-base font-medium"
              >
                <Link href={subject.href} className="flex items-center gap-2">
                  <subject.icon className="h-5 w-5" />
                  {subject.name}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        {/* Latest Videos Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-600">Latest Videos</h2>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {latestVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <Link href={video.href}>
                  <div className="aspect-video relative">
                    <Image src={video.image || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600">
                      {video.subject} • {video.grade}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Exam Preparation Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-600">Exam Preparation</h2>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {examPreparation.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <Link href={item.href}>
                  <div className="aspect-video relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
