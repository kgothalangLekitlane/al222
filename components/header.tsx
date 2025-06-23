"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Grades", href: "/grades" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Main A shape - scaled down version of login logo */}
                <div className="w-10 h-10 bg-teal-500 rounded-t-full relative flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-200">
                  {/* White dots on the A */}
                  <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute top-1.5 left-3 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute top-2 right-3 w-1 h-1 bg-white rounded-full"></div>

                  {/* Lab coat/shirt icon in center */}
                  <div className="bg-white w-2.5 h-2 rounded-t-sm relative mt-1">
                    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-t-full"></div>
                  </div>
                </div>

                {/* Bottom part of A */}
                <div className="flex justify-between -mt-1">
                  <div className="w-3 h-2 bg-teal-500 rounded-b-sm group-hover:bg-teal-600 transition-colors duration-200"></div>
                  <div className="w-3 h-2 bg-teal-500 rounded-b-sm group-hover:bg-teal-600 transition-colors duration-200"></div>
                </div>
              </div>
              <span className="text-xl font-black text-teal-600 tracking-tight uppercase group-hover:text-teal-700 transition-colors duration-200">
                ALAMEDALAB
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="hover:bg-teal-50 hover:text-teal-700 transition-colors">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoggedIn(false)}
                  className="hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild variant="ghost" className="hover:bg-teal-50 hover:text-teal-700 transition-colors">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="hover:bg-teal-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-teal-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 hover:text-teal-600 transition-colors" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t bg-gradient-to-r from-teal-50 to-white">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-teal-100">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:bg-teal-50 hover:text-teal-700"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:bg-teal-50 hover:text-teal-700"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start hover:bg-teal-50 hover:text-teal-700"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                    >
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
