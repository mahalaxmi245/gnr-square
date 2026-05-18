 import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../../services/api'

const packages = [
  { name: 'Starter', price: '₹5,000', color: 'border-blue-200 bg-blue-50', badge: '', features: ['Facebook & Instagram Ads', '2 Creatives/month', 'Basic Setup', 'Monthly Report', 'WhatsApp Support'] },
  { name: 'Growth', price: '₹15,000', color: 'border-purple-400 bg-purple-50', badge: 'Most Popular', features: ['FB, Instagram & Google', '8 Creatives/month', 'Advanced Targeting', 'Weekly Reports', 'Dedicated Manager', 'SEO Basics'] },
  { name: 'Premium', price: '₹35,000', color: 'border-yellow-400 bg-yellow-50', badge: 'Best Value', features: ['All Platforms', 'Unlimited Creatives', 'Video Ads & Reels', 'Daily Reports', 'Priority Support', 'Full SEO', 'Google My Business'] },
]

export default function DigitalAds() {
  const [form, setForm] = useState({ name: '', phone: '', business: '', platform: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({ name: form.name, phone: form.phone, service: 'Digital Advertising', message: form.message, formData: form })
      setSubmitted(true)
    } catch { alert('Something went wrong. Please try WhatsApp instead.') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">📢</div>
        <h1 className="text-4xl font-black mb-2">Digital Advertising</h1>
        <p className="text-red-100 text-lg max-w-xl mx-auto">Grow your business with powerful campaigns — in collaboration with Andromeda</p>
      </div>
 

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { num: '500+', label: 'Brands Served', icon: 'fa-building' },
            { num: '₹2Cr+', label: 'Ad Spend Managed', icon: 'fa-indian-rupee-sign' },
            { num: '300%', label: 'Avg. ROI', icon: 'fa-chart-line' },
            { num: '98%', label: 'Client Satisfaction', icon: 'fa-star' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <i className={`fa-solid ${stat.icon} text-red-500 text-2xl mb-2`}></i>
              <p className="text-2xl font-black text-gray-800">{stat.num}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Packages */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-gray-800 text-center mb-8">Our Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.name} className={`border-2 ${pkg.color} rounded-2xl p-6 relative`}>
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">{pkg.badge}</span>
                )}
                <h3 className="text-xl font-black text-gray-800 mb-1">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-black text-gray-800">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-check text-green-500 text-xs"></i>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => document.getElementById('ads-form').scrollIntoView({behavior: 'smooth'})}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 rounded-xl hover:opacity-90 transition text-sm">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div id="ads-form" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-4">Our Services</h2>
            <div className="space-y-3">
              {[
                { icon: 'fa-facebook', title: 'Social Media Marketing', desc: 'Facebook, Instagram, LinkedIn campaigns', brand: true },
                { icon: 'fa-google', title: 'Google Ads', desc: 'Search, Display & Shopping campaigns', brand: true },
                { icon: 'fa-magnifying-glass', title: 'SEO Services', desc: 'Rank on top of Google organically', brand: false },
                { icon: 'fa-video', title: 'Video Marketing', desc: 'YouTube ads & Instagram Reels', brand: false },
                { icon: 'fa-envelope', title: 'Email Marketing', desc: 'Targeted email campaigns', brand: false },
                { icon: 'fa-chart-bar', title: 'Analytics & Reporting', desc: 'Detailed performance insights', brand: false },
              ].map(s => (
                <div key={s.title} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`${s.brand ? 'fa-brands' : 'fa-solid'} ${s.icon} text-red-500`}></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{s.title}</p>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-black mb-2">Inquiry Submitted!</h3>
                <a href={`https://wa.me/919966331389?text=Hi, I need Digital Marketing. Business: ${form.business}`}
                  target="_blank" rel="noreferrer" className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
                  <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-gray-800 mb-4">Start Your Campaign</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your Name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"/>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"/>
                  <input type="text" name="business" value={form.business} onChange={handleChange} required placeholder="Business Name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"/>
                  <select name="platform" value={form.platform} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
                    <option value="">Select Platform</option>
                    <option>Facebook & Instagram</option><option>Google Ads</option>
                    <option>YouTube Ads</option><option>SEO</option><option>All Platforms</option>
                  </select>
                  <select name="budget" value={form.budget} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
                    <option value="">Monthly Budget</option>
                    <option>₹5,000 - ₹10,000</option><option>₹10,000 - ₹25,000</option>
                    <option>₹25,000 - ₹50,000</option><option>₹50,000+</option>
                  </select>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Business goals..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"/>
                  <button type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                    {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</> : <><i className="fa-solid fa-rocket mr-2"></i>Start Campaign</>}
                  </button>
                  <a href="https://wa.me/919966331389" target="_blank" rel="noreferrer"
                    className="w-full bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp Instead
                  </a>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}