"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log("Login attempt:", formData)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 relative">
      {/* Decorative dots in corners */}
      <div className="absolute top-8 left-8 flex space-x-2">
        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
      </div>
      <div className="absolute top-8 right-8 flex space-x-2">
        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
      </div>

      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            {/* Main A shape */}
            <div className="w-32 h-32 bg-teal-500 rounded-t-full relative flex items-center justify-center">
              {/* White dots on the A */}
              <div className="absolute top-4 left-8 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-6 left-12 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-8 right-12 w-2 h-2 bg-white rounded-full"></div>

              {/* Lab coat/shirt icon in center */}
              <div className="bg-white w-8 h-6 rounded-t-lg relative mt-4">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-white rounded-t-full"></div>
              </div>
            </div>

            {/* Bottom part of A */}
            <div className="flex justify-between -mt-4">
              <div className="w-12 h-8 bg-teal-500 rounded-b-lg"></div>
              <div className="w-12 h-8 bg-teal-500 rounded-b-lg"></div>
            </div>
          </div>

          {/* Login text */}
          <h1 className="text-3xl font-bold text-teal-600">Login</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full h-14 px-6 bg-teal-200/50 border-0 rounded-full text-gray-700 placeholder-gray-500 text-center text-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full h-14 px-6 bg-teal-200/50 border-0 rounded-full text-gray-700 placeholder-gray-500 text-center text-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium rounded-full border-0 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        {/* Additional links */}
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
              Sign up here
            </Link>
          </p>
          <Link href="/forgot-password" className="block text-teal-600 hover:text-teal-700 text-sm">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}
