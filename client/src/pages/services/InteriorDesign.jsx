 import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../../services/api'

export default function InteriorDesign() {
  const [form, setForm] = useState({ name: '', phone: '', spaceType: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({ name: form.name, phone: form.phone, service: 'Interior Design', message: form.message, formData: form })
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
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">🛋️</div>
        <h1 className="text-4xl font-black mb-2">Interior Designs</h1>
        <p className="text-purple-100 text-lg max-w-xl mx-auto">Transform your space with stunning modern interior designs</p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-black text-gray-800 mb-6">Our Design Services</h2>
          <div className="space-y-4">
            {[
              { icon: 'fa-couch', title: 'Living Room Design', desc: 'Modern & elegant living spaces' },
              { icon: 'fa-bed', title: 'Bedroom Design', desc: 'Comfortable & stylish bedrooms' },
              { icon: 'fa-utensils', title: 'Kitchen & Modular', desc: 'Functional modular kitchens' },
              { icon: 'fa-building-columns', title: 'Office Interiors', desc: 'Professional workspace design' },
            ].map(item => (
              <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${item.icon} text-purple-500`}></i>
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
              <h3 className="text-2xl font-black text-gray-800 mb-2">Inquiry Submitted!</h3>
              <p className="text-gray-500">Our designer will contact you soon.</p>
              <a href={`https://wa.me/919966331389?text=Hi, I need Interior Design. Name: ${form.name}, Space: ${form.spaceType}`}
                target="_blank" rel="noreferrer"
                className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
                <i className="fa-brands fa-whatsapp mr-2"></i>Chat on WhatsApp
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black text-gray-800 mb-6">Get a Free Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 9999999999"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Space Type</label>
                  <select name="spaceType" value={form.spaceType} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option value="">Select space</option>
                    <option value="living">Living Room</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="office">Office</option>
                    <option value="fullhome">Full Home</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Budget</label>
                  <input type="text" name="budget" value={form.budget} onChange={handleChange} required placeholder="e.g. ₹2 Lakhs"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Describe your dream space..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition hover:scale-105 disabled:opacity-50">
                  {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</> : <><i className="fa-solid fa-paper-plane mr-2"></i>Get Free Quote</>}
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