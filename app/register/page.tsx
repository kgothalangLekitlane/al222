"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
      <div className="register-page">
        <div className="container">
          <div className="success-container">
            <div className="success-icon">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1>Registration Successful!</h1>
            <p>Please check your email to verify your account before signing in.</p>
            <Link href="/login" className="success-link">
              Go to Login
            </Link>
          </div>
        </div>

        <style jsx>{`
          .register-page {
            font-family: 'Montserrat', sans-serif;
            background-color: #ffffff;
            color: #333333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }

          .container {
            max-width: 400px;
            margin: auto;
            padding: 24px;
            text-align: center;
          }

          .success-container {
            background: white;
            padding: 32px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .success-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            background-color: #4CAF50;
            color: white;
            border-radius: 50%;
            margin-bottom: 20px;
          }

          h1 {
            font-size: 28px;
            color: #388E3C;
            margin-bottom: 20px;
          }

          p {
            color: #9E9E9E;
            font-size: 14px;
            margin-bottom: 24px;
          }

          .success-link {
            background-color: #4CAF50;
            color: white;
            padding: 14px 24px;
            border-radius: 8px;
            font-size: 16px;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
          }

          .success-link:hover {
            background-color: #45a049;
          }

          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        `}</style>
      </div>
    )
  }

  return (
    <div className="register-page">
      <div className="container">
        <h1>Create Account</h1>
        <p>Join Alameda Learn and start your educational journey</p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <AlertCircle className="h-5 w-5" />
              <small>{error}</small>
            </div>
          )}

          {/* Name Field */}
          <input
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Password Field */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Role Selection */}
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="role-select"
          >
            <option value="student">I am a Student</option>
            <option value="teacher">I am a Teacher</option>
          </select>

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="footer-text">
          Already have an account?{" "}
          <Link href="/login" className="login-link">
            Sign in here
          </Link>
        </p>
      </div>

      <style jsx>{`
        .register-page {
          font-family: 'Montserrat', sans-serif;
          background-color: #ffffff;
          color: #333333;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
        }

        .container {
          max-width: 400px;
          margin: auto;
          padding: 24px;
          text-align: center;
        }

        h1 {
          font-size: 28px;
          color: #388E3C;
          margin-bottom: 20px;
        }

        p {
          color: #9E9E9E;
          font-size: 14px;
          margin-bottom: 24px;
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
          font-family: 'Montserrat', sans-serif;
        }

        input:focus {
          outline: none;
          background-color: #e8f5e8;
          box-shadow: 0 0 0 2px #4CAF50;
        }

        .password-container {
          position: relative;
          margin-bottom: 12px;
        }

        .password-container input {
          margin-bottom: 0;
          padding-right: 50px;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9E9E9E;
          padding: 0;
          width: auto;
          margin: 0;
        }

        .password-toggle:hover {
          color: #4CAF50;
        }

        .role-select {
          width: 100%;
          padding: 14px;
          margin-bottom: 12px;
          border: none;
          border-radius: 8px;
          background-color: #f5f5f5;
          font-size: 16px;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
        }

        .role-select:focus {
          outline: none;
          background-color: #e8f5e8;
          box-shadow: 0 0 0 2px #4CAF50;
        }

        button {
          background-color: #4CAF50;
          color: white;
          padding: 14px;
          width: 100%;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          font-family: 'Montserrat', sans-serif;
          transition: background-color 0.3s ease;
          margin-bottom: 20px;
        }

        button:hover:not(:disabled) {
          background-color: #45a049;
        }

        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .error-message {
          background-color: #ffebee;
          border: 1px solid #f44336;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          color: #d32f2f;
        }

        .error-message svg {
          margin-right: 8px;
          flex-shrink: 0;
        }

        .error-message small {
          margin: 0;
          font-size: 14px;
          color: #d32f2f;
        }

        .footer-text {
          margin-top: 20px;
        }

        .login-link {
          color: #4CAF50;
          text-decoration: none;
          font-weight: 500;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        small {
          color: #9E9E9E;
          font-size: 14px;
        }

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  )
}
