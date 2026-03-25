 import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../../services/api'

export default function MarriageBureau() {
  const [form, setForm] = useState({ name: '', phone: '', age: '', gender: '', education: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({ name: form.name, phone: form.phone, service: 'Marriage Bureau', message: form.message, formData: form })
      setSubmitted(true)
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try WhatsApp instead.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">💍</div>
        <h1 className="text-4xl font-black mb-2">Marriage Bureau</h1>
        <p className="text-pink-100 text-lg max-w-xl mx-auto">Find your perfect life partner with our trusted matchmaking service</p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-black text-gray-800 mb-6">Why Choose Us</h2>
          <div className="space-y-4">
            {[
              { icon: 'fa-shield-heart', title: 'Verified Profiles', desc: 'All profiles are manually verified' },
              { icon: 'fa-users', title: '500+ Matches', desc: 'Successfully matched 500+ couples' },
              { icon: 'fa-lock', title: '100% Confidential', desc: 'Your privacy is our priority' },
              { icon: 'fa-handshake', title: 'Personal Assistance', desc: 'Dedicated matchmaker for you' },
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${item.icon} text-pink-500`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Profile Submitted!</h3>
              <p className="text-gray-500">We'll contact you with matching profiles soon.</p>
              <a href={`https://wa.me/919966331389?text=Hi, I want to register for Marriage Bureau. Name: ${form.name}`}
                target="_blank" rel="noreferrer"
                className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition">
                <i className="fa-brands fa-whatsapp mr-2"></i>Chat on WhatsApp
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black text-gray-800 mb-6">Register Your Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Age</label>
                    <input type="number" name="age" value={form.age} onChange={handleChange} required placeholder="Your age" min="18" max="60"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 9999999999"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Education</label>
                  <input type="text" name="education" value={form.education} onChange={handleChange} required placeholder="Your qualification"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Additional Info</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about yourself..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition hover:scale-105 disabled:opacity-50">
                  {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</> : <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Profile</>}
                </button>
                <a href="https://wa.me/919966331389" target="_blank" rel="noreferrer"
                  className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-400 transition flex items-center justify-center gap-2">
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Instead
                </a>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}