"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Mock registration for now
      console.log("Registration attempt:", form)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
    } catch (error) {
      setError("An error occurred during registration.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-8">
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

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-teal-600 mb-2">Success!</h1>
              <p className="text-gray-600 mb-6">Please check your email to verify your account before signing in.</p>
              <Link
                href="/login"
                className="inline-block w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium rounded-full border-0 transition-colors text-center leading-[3.5rem]"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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

          {/* Sign Up text */}
          <h1 className="text-3xl font-bold text-teal-600">Create Account</h1>
          <p className="text-gray-600 text-center">Join Alameda Lab and start your educational journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-full px-6 py-3 text-center">
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}

          <div>
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full h-14 px-6 bg-teal-200/50 border-0 rounded-full text-gray-700 placeholder-gray-500 text-center text-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full h-14 px-6 bg-teal-200/50 border-0 rounded-full text-gray-700 placeholder-gray-500 text-center text-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <Input
              name="password"
              type="password"
              placeholder="Create Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full h-14 px-6 bg-teal-200/50 border-0 rounded-full text-gray-700 placeholder-gray-500 text-center text-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full h-14 px-6 bg-teal-200/50 border-0 rounded-full text-gray-700 text-center text-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors appearance-none cursor-pointer"
            >
              <option value="student">I am a Student</option>
              <option value="teacher">I am a Teacher</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium rounded-full border-0 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Additional links */}
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
