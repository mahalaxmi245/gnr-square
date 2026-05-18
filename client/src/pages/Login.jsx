import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

const ADMIN_EMAIL = 'maddychityala@gmail.com'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      if (form.email === ADMIN_EMAIL) {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      if (err.code === 'auth/user-not-found') setError('No account found with this email.')
      else if (err.code === 'auth/wrong-password') setError('Incorrect password. Try again.')
      else if (err.code === 'auth/invalid-credential') setError('Invalid email or password.')
      else setError('Login failed. Please try again.')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await loginWithGoogle()
      const email = result?.user?.email
      if (email === ADMIN_EMAIL) {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      setError('Google login failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="glass-card rounded-3xl p-8 w-full max-w-md shadow-2xl relative z-10">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="bg-yellow-400 text-blue-900 font-black text-xl px-3 py-1 rounded">GNR²</div>
            <div className="text-left">
              <p className="font-black text-blue-900 text-lg leading-tight">GNR Square</p>
              <p className="text-green-600 text-xs font-semibold">Associates</p>
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-1">Login to access all services</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              <i className="fa-solid fa-envelope mr-2 text-blue-600"></i>Email Address
            </label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com" required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              <i className="fa-solid fa-lock mr-2 text-blue-600"></i>Password
            </label>
            <input type="password" name="password" value={form.password} onChange={handleChange}
              placeholder="••••••••" required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded"/> Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition hover:scale-105 shadow-lg disabled:opacity-50">
            {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Logging in...</> : <><i className="fa-solid fa-right-to-bracket mr-2"></i>Login</>}
          </button>

          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span>or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button type="button" onClick={handleGoogle} disabled={loading}
            className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:opacity-50">
            <i className="fa-brands fa-google text-red-500"></i> Login with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}
