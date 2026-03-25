 import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

export default function Register() {
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  })
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name
    if (!form.name.trim()) newErrors.name = 'Name is required'
    else if (form.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters'

    // Email
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'

    // Phone
    const digits = form.phone.replace(/\D/g, '')
    if (!form.phone.trim()) newErrors.phone = 'Phone is required'
    else if (digits.length < 7) newErrors.phone = 'Minimum 7 digits required'
    else if (digits.length > 15) newErrors.phone = 'Maximum 15 digits allowed'

    // Password
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 8) newErrors.password = 'Minimum 8 characters'
    else if (!/[A-Z]/.test(form.password)) newErrors.password = 'Add at least one uppercase letter'
    else if (!/[0-9]/.test(form.password)) newErrors.password = 'Add at least one number'

    // Confirm Password
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await register(form.name.trim(), form.email.trim(), form.password)
      navigate('/')
    } catch (err) {
      console.log('Firebase error:', err.code)
      if (err.code === 'auth/email-already-in-use') setError('This email is already registered. Please login.')
      else if (err.code === 'auth/weak-password') setError('Password is too weak.')
      else if (err.code === 'auth/invalid-email') setError('Invalid email address.')
      else setError('Registration failed. Please try again.')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      console.error('Google sign-in error:', error)
      setError('Google sign-in failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 py-10">
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="glass-card rounded-3xl p-8 w-full max-w-md shadow-2xl relative z-10">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="bg-yellow-400 text-blue-900 font-black text-xl px-3 py-1 rounded">GNR²</div>
            <div className="text-left">
              <p className="font-black text-blue-900 text-lg leading-tight">GNR Square</p>
              <p className="text-green-600 text-xs font-semibold">Associates</p>
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join us to access all 7 services</p>
        </div>

        {/* Global error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              <i className="fa-solid fa-user mr-2 text-blue-600"></i>Full Name
            </label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Your full name"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white
                ${formErrors.name ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'}`}/>
            {formErrors.name && <p className="text-red-500 text-xs mt-1"><i className="fa-solid fa-triangle-exclamation mr-1"></i>{formErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              <i className="fa-solid fa-envelope mr-2 text-blue-600"></i>Email Address
            </label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white
                ${formErrors.email ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'}`}/>
            {formErrors.email && <p className="text-red-500 text-xs mt-1"><i className="fa-solid fa-triangle-exclamation mr-1"></i>{formErrors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              <i className="fa-solid fa-phone mr-2 text-blue-600"></i>Phone Number
            </label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              placeholder="+91 9999999999"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white
                ${formErrors.phone ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'}`}/>
            {formErrors.phone && <p className="text-red-500 text-xs mt-1"><i className="fa-solid fa-triangle-exclamation mr-1"></i>{formErrors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              <i className="fa-solid fa-lock mr-2 text-blue-600"></i>Password
            </label>
            <input type="password" name="password" value={form.password} onChange={handleChange}
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white
                ${formErrors.password ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'}`}/>
            {formErrors.password && <p className="text-red-500 text-xs mt-1"><i className="fa-solid fa-triangle-exclamation mr-1"></i>{formErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              <i className="fa-solid fa-lock mr-2 text-blue-600"></i>Confirm Password
            </label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
              placeholder="••••••••"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white
                ${formErrors.confirmPassword ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'}`}/>
            {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1"><i className="fa-solid fa-triangle-exclamation mr-1"></i>{formErrors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading
              ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Creating account...</>
              : <><i className="fa-solid fa-user-plus mr-2"></i>Create Account</>}
          </button>

          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span>or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button type="button" onClick={handleGoogle} disabled={loading}
            className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <i className="fa-brands fa-google text-red-500"></i> Register with Google
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  )
}