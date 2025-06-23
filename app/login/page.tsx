"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, BookOpen } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
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
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="container">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Alameda Lab</span>
          </div>
        </div>

        <h1>Welcome Back</h1>
        <p className="mb-6">Sign in to continue your learning journey</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up here
          </Link>
        </p>

        <small className="block mt-4">
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
            Forgot your password?
          </Link>
        </small>

        <style jsx>{`
          .container {
            max-width: 400px;
            margin: auto;
            padding: 24px;
            text-align: center;
          }

          h1 {
            font-size: 28px;
            color: #388e3c;
            margin-bottom: 20px;
            font-family: "Montserrat", sans-serif;
          }

          input {
            width: 100%;
            padding: 14px;
            margin-bottom: 12px;
            border: none;
            border-radius: 8px;
            background-color: #f5f5f5;
            font-size: 16px;
            box-sizing: border-box;
          }

          button[type="submit"] {
            background-color: #4caf50;
            color: white;
            padding: 14px;
            width: 100%;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            border: none;
          }

          button[type="submit"]:hover {
            background-color: #45a049;
          }

          button[type="submit"]:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }

          p,
          small {
            color: #9e9e9e;
            font-size: 14px;
          }

          input:focus {
            outline: 2px solid #4caf50;
            outline-offset: 2px;
          }
        `}</style>
      </div>
    </div>
  )
}
