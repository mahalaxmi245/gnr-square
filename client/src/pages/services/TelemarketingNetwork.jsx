import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../../services/api'

const services = [
  { id: 'inbound', icon: '📞', title: 'Inbound Calls', desc: 'Customer support & query handling', price: '₹2,999/mo', color: 'bg-blue-50 border-blue-200' },
  { id: 'outbound', icon: '📢', title: 'Outbound Campaigns', desc: 'Sales & promotional calling', price: '₹3,999/mo', color: 'bg-orange-50 border-orange-200' },
  { id: 'leads', icon: '🎯', title: 'Lead Generation', desc: 'Verified B2B & B2C leads', price: '₹4,999/mo', color: 'bg-green-50 border-green-200' },
  { id: 'appointment', icon: '📅', title: 'Appointment Setting', desc: 'Qualified meetings booked for you', price: '₹3,499/mo', color: 'bg-purple-50 border-purple-200' },
  { id: 'survey', icon: '📊', title: 'Survey & Research', desc: 'Customer feedback & market data', price: '₹2,499/mo', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'retention', icon: '🔁', title: 'Customer Retention', desc: 'Loyalty & win-back campaigns', price: '₹2,999/mo', color: 'bg-pink-50 border-pink-200' },
  { id: 'sms', icon: '💬', title: 'SMS Marketing', desc: 'Bulk SMS for offers & alerts', price: '₹999/mo', color: 'bg-cyan-50 border-cyan-200' },
  { id: 'followup', icon: '🤝', title: 'Follow-up Calls', desc: 'Post-sale & reminder follow-ups', price: '₹1,999/mo', color: 'bg-red-50 border-red-200' },
]

export default function TelemarketingNetwork() {
  const [activeTab, setActiveTab] = useState('services')
  const [selectedService, setSelectedService] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', business: '', campaign: '', budget: '', callTime: '', message: '' })
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
        service: 'Telemarketing Network',
        message: `Campaign: ${selectedService?.title || form.campaign} | Business: ${form.business} | Budget: ${form.budget} | ${form.message}`,
        formData: { ...form, service: selectedService?.title }
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try WhatsApp instead.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">📡</div>
        <h1 className="text-4xl font-black mb-2">Telemarketing Network</h1>
        <p className="text-indigo-100 text-lg max-w-xl mx-auto">Grow your business with professional calling campaigns — serving Hanumakonda & beyond!</p>
      </div>

      {/* Sticky Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 py-2 overflow-x-auto">
          {[
            { id: 'services', label: 'Our Services', icon: 'fa-headset' },
            { id: 'booking', label: 'Get Started', icon: 'fa-paper-plane' },
            { id: 'howitworks', label: 'How It Works', icon: 'fa-circle-info' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition
                ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <i className={`fa-solid ${tab.icon}`}></i>{tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Services Tab ── */}
        {activeTab === 'services' && (
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-2 text-center">Select a Service</h2>
            <p className="text-gray-500 text-center mb-6">Choose your campaign type and we'll build it for you</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {services.map(s => (
                <div key={s.id} onClick={() => { setSelectedService(s); setActiveTab('booking') }}
                  className={`border-2 ${s.color} rounded-2xl p-4 cursor-pointer hover:shadow-md transition
                    ${selectedService?.id === s.id ? 'ring-2 ring-indigo-500 ring-offset-2 scale-105' : ''}`}>
                  <div className="text-4xl mb-2">{s.icon}</div>
                  <h3 className="font-black text-gray-800 text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{s.desc}</p>
                  <p className="text-xs font-bold text-indigo-600">{s.price}</p>
                </div>
              ))}
            </div>

            {/* Why choose us */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">Why GNR Telemarketing?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: '🗣️', title: 'Bilingual Agents', desc: 'Telugu, Hindi & English — we connect with your local audience naturally.' },
                  { icon: '📈', title: 'Real Results', desc: 'Tracked campaigns with daily call reports & conversion analytics.' },
                  { icon: '🔒', title: 'Data Privacy', desc: 'Your customer data is handled with strict confidentiality & security.' },
                  { icon: '⚡', title: 'Quick Launch', desc: 'Campaign goes live within 48 hours of onboarding.' },
                  { icon: '💰', title: 'Affordable Plans', desc: 'Flexible pricing for startups, SMEs & large enterprises.' },
                  { icon: '🧑‍💼', title: 'Dedicated Manager', desc: 'A personal account manager for every client — always reachable.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[['500+', 'Calls/Day'], ['50+', 'Businesses Served'], ['98%', 'Client Satisfaction'], ['5+', 'Years Experience']].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-3xl font-black text-yellow-300">{num}</div>
                    <div className="text-indigo-100 text-sm mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Booking Tab ── */}
        {activeTab === 'booking' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Service picker */}
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-4">Choose Your Campaign</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {services.map(s => (
                  <div key={s.id} onClick={() => setSelectedService(s)}
                    className={`border-2 ${s.color} rounded-2xl p-3 cursor-pointer hover:shadow-sm transition
                      ${selectedService?.id === s.id ? 'ring-2 ring-indigo-500 ring-offset-2 scale-105' : ''}`}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <h3 className="font-black text-gray-800 text-xs mb-0.5">{s.title}</h3>
                    <p className="text-xs font-bold text-indigo-600">{s.price}</p>
                  </div>
                ))}
              </div>

              {/* What's included */}
              {selectedService && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                  <h3 className="font-black text-indigo-800 text-sm mb-3">
                    <i className="fa-solid fa-circle-check mr-2 text-indigo-500"></i>
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-xs text-indigo-700">
                    {['Dedicated calling team', 'Custom script writing', 'Daily call reports', 'WhatsApp lead updates', 'Monthly performance review'].map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-indigo-500"></i>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-black mb-2">Request Submitted!</h3>
                  <p className="text-gray-500 mb-4">Our team will contact you within 2 hours.</p>
                  <a href={`https://wa.me/919966331389?text=Hi, I'm interested in ${selectedService?.title || 'Telemarketing'} service. Name: ${form.name}, Business: ${form.business}`}
                    target="_blank" rel="noreferrer"
                    className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
                    <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-gray-800 mb-1">Get Started</h3>
                  <p className="text-gray-500 text-sm mb-4">Fill in your details and we'll call you back</p>

                  {selectedService && (
                    <div className={`${selectedService.color} border rounded-xl p-3 mb-4 flex items-center gap-3`}>
                      <span className="text-2xl">{selectedService.icon}</span>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{selectedService.title}</p>
                        <p className="text-xs text-gray-500">{selectedService.price} · {selectedService.desc}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your Full Name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <input type="text" name="business" value={form.business} onChange={handleChange} required placeholder="Business / Company Name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <select name="campaign" value={form.campaign} onChange={handleChange} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                      <option value="">Campaign Type</option>
                      {services.map(s => <option key={s.id}>{s.title}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Monthly Budget</label>
                        <select name="budget" value={form.budget} onChange={handleChange} required
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                          <option value="">Select</option>
                          <option>Below ₹5,000</option>
                          <option>₹5,000 – ₹10,000</option>
                          <option>₹10,000 – ₹25,000</option>
                          <option>₹25,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Best Time to Call</label>
                        <select name="callTime" value={form.callTime} onChange={handleChange} required
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                          <option value="">Select</option>
                          <option>9AM – 11AM</option>
                          <option>11AM – 1PM</option>
                          <option>2PM – 4PM</option>
                          <option>4PM – 6PM</option>
                        </select>
                      </div>
                    </div>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Tell us about your target audience or goals..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <button type="submit" disabled={loading}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                      {loading
                        ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</>
                        : <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Request</>}
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
        )}

        {/* ── How It Works Tab ── */}
        {activeTab === 'howitworks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-4">How It Works</h2>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Free Consultation', desc: 'We understand your business, target audience & campaign goals.' },
                  { step: '2', title: 'Campaign Setup', desc: 'We write scripts, prepare call lists & train your dedicated team.' },
                  { step: '3', title: 'Campaign Goes Live', desc: 'Calling starts within 48 hrs. You receive live WhatsApp lead alerts.' },
                  { step: '4', title: 'Reports & Optimization', desc: 'Daily reports & weekly review calls to improve performance.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="bg-indigo-500 text-white font-black w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-800 mb-4">Industries We Serve</h2>
              {[
                { icon: '🏠', name: 'Real Estate', desc: 'Property enquiries, site visit bookings & follow-ups' },
                { icon: '🏥', name: 'Healthcare', desc: 'Appointment reminders & health package promotions' },
                { icon: '🎓', name: 'Education', desc: 'Admissions calling, course inquiries & lead nurturing' },
                { icon: '🛒', name: 'Retail & E-Commerce', desc: 'Abandoned cart recovery & customer win-back' },
                { icon: '🏦', name: 'Finance & Insurance', desc: 'Loan inquiries, policy renewals & upselling' },
                { icon: '🍽️', name: 'Restaurants & Hotels', desc: 'Table reservations & promotional offers' },
              ].map(item => (
                <div key={item.name} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}

              <button onClick={() => setActiveTab('booking')}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition mt-2">
                <i className="fa-solid fa-rocket mr-2"></i>Start Your Campaign
              </button>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}
