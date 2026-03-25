import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({
        name: form.name,
        phone: form.phone,
        service: 'General Inquiry',
        message: form.message,
        formData: form
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try WhatsApp instead.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="hero-gradient text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-yellow-400 mb-2">Contact Us</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">We're here to help! Reach out to us anytime.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left - Contact Info */}
        <div>
          <h2 className="text-2xl font-black text-gray-800 mb-6">Get In Touch</h2>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-location-dot text-blue-600 text-lg"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Our Address</h3>
                <p className="text-gray-500 text-sm">Near Adalath, GampaPeddanna Lane,<br/>Opposite D-Mart, Hanumakonda,<br/>Telangana, India</p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-phone text-green-600 text-lg"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Phone & WhatsApp</h3>
                <a href="tel:+919966331389" className="text-blue-600 font-semibold hover:underline">+91 9966331389</a>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm">
              <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-clock text-yellow-600 text-lg"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Working Hours</h3>
                <p className="text-gray-500 text-sm">Monday - Saturday: 9AM - 7PM<br/>Sunday: 10AM - 4PM</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="bg-blue-600 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition text-white">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-500 w-10 h-10 rounded-full flex items-center justify-center transition text-white">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://wa.me/919966331389" className="bg-green-600 hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition text-white">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="#" className="bg-blue-400 hover:bg-blue-300 w-10 h-10 rounded-full flex items-center justify-center transition text-white">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="mt-4 rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.5!2d79.5941!3d18.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSGFudW1ha29uZGE!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="220" style={{border: 0}} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="GNR Square Location">
            </iframe>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
              <a href="https://wa.me/919966331389"
                target="_blank" rel="noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition">
                <i className="fa-brands fa-whatsapp mr-2"></i>Chat on WhatsApp
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black text-gray-800 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                      placeholder="+91 9999999999"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required
                    placeholder="How can we help?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition hover:scale-105 disabled:opacity-50">
                  {loading
                    ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Sending...</>
                    : <><i className="fa-solid fa-paper-plane mr-2"></i>Send Message</>}
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