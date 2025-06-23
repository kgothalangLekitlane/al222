import Link from "next/link"
import { BookOpen, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Alameda Lab</span>
            </div>
            <p className="text-cyan-100 mb-4 max-w-md">
              Comprehensive educational platform for grades 10-12. Excel in Mathematics, Physical Sciences, and Life
              Sciences with Alameda Lab's structured curriculum and expert guidance.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-cyan-100">
                <Mail className="h-4 w-4 mr-2" />
                info@alamedalab.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-cyan-100 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/grades" className="text-cyan-100 hover:text-white transition-colors">
                  Grades
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cyan-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cyan-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subjects</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/subjects/1/topics" className="text-cyan-100 hover:text-white transition-colors">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link href="/subjects/2/topics" className="text-cyan-100 hover:text-white transition-colors">
                  Physical Sciences
                </Link>
              </li>
              <li>
                <Link href="/subjects/3/topics" className="text-cyan-100 hover:text-white transition-colors">
                  Life Sciences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyan-100 text-sm">© 2024 Alameda Lab. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-cyan-100 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-cyan-100 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
