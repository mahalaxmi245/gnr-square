import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../../services/api'

const services = [
  { id: 'electrician', icon: '⚡', title: 'Electrician', desc: 'Wiring, repairs & installations', price: '₹299/visit', time: '2-4 hrs', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'plumber', icon: '🔧', title: 'Plumber', desc: 'Pipe repairs & installations', price: '₹249/visit', time: '2-3 hrs', color: 'bg-blue-50 border-blue-200' },
  { id: 'cleaning', icon: '🧹', title: 'Deep Cleaning', desc: 'Complete home deep clean', price: '₹999/session', time: '4-6 hrs', color: 'bg-green-50 border-green-200' },
  { id: 'painting', icon: '🎨', title: 'Painting', desc: 'Interior & exterior painting', price: '₹8/sq ft', time: 'Custom', color: 'bg-purple-50 border-purple-200' },
  { id: 'security', icon: '🔒', title: 'Home Security', desc: 'CCTV & alarm installation', price: '₹4,999+', time: '1 day', color: 'bg-red-50 border-red-200' },
  { id: 'carpentry', icon: '🪚', title: 'Carpentry', desc: 'Furniture repair & making', price: '₹399/visit', time: '3-5 hrs', color: 'bg-amber-50 border-amber-200' },
  { id: 'ac', icon: '❄️', title: 'AC Service', desc: 'AC repair, cleaning & gas', price: '₹499/unit', time: '1-2 hrs', color: 'bg-cyan-50 border-cyan-200' },
  { id: 'pest', icon: '🐛', title: 'Pest Control', desc: 'Complete pest elimination', price: '₹1,499+', time: '2-3 hrs', color: 'bg-orange-50 border-orange-200' },
]

export default function HomeMaintenance() {
  const [selectedService, setSelectedService] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', address: '', date: '', time: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({
        name: form.name, phone: form.phone,
        service: 'Home Maintenance',
        message: `Service: ${selectedService?.title || 'General'} | ${form.message}`,
        formData: { ...form, service: selectedService?.title }
      })
      setSubmitted(true)
    } catch { alert('Something went wrong. Please try WhatsApp instead.') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">🔧</div>
        <h1 className="text-4xl font-black mb-2">Home Maintenance</h1>
        <p className="text-yellow-100 text-lg max-w-xl mx-auto">Professional home services at your doorstep — Book in 60 seconds!</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Service Selection */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-gray-800 mb-2 text-center">Select a Service</h2>
          <p className="text-gray-500 text-center mb-6">Choose what you need and we'll send the right professional</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map(s => (
              <div key={s.id} onClick={() => setSelectedService(s)}
                className={`border-2 ${s.color} rounded-2xl p-4 cursor-pointer hover:shadow-md transition
                  ${selectedService?.id === s.id ? 'ring-2 ring-yellow-500 ring-offset-2 scale-105' : ''}`}>
                <div className="text-4xl mb-2">{s.icon}</div>
                <h3 className="font-black text-gray-800 text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{s.desc}</p>
                <p className="text-xs font-bold text-orange-600">{s.price}</p>
                <p className="text-xs text-gray-400">⏱ {s.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Choose a Service', desc: 'Select from our list of professional services' },
                { step: '2', title: 'Book a Slot', desc: 'Pick your preferred date and time' },
                { step: '3', title: 'Get Confirmed', desc: 'We confirm within 30 minutes' },
                { step: '4', title: 'Professional Arrives', desc: 'Trained professional at your doorstep' },
              ].map(item => (
                <div key={item.step} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-yellow-400 text-blue-900 font-black w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
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

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-black mb-2">Booking Confirmed!</h3>
                <p className="text-gray-500 mb-4">We'll contact you within 30 minutes.</p>
                <a href={`https://wa.me/919966331389?text=Hi, I booked ${selectedService?.title} service. Name: ${form.name}`}
                  target="_blank" rel="noreferrer" className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
                  <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-gray-800 mb-1">Book a Service</h3>
                {selectedService && (
                  <div className={`${selectedService.color} border rounded-xl p-3 mb-4 flex items-center gap-3`}>
                    <span className="text-2xl">{selectedService.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{selectedService.title}</p>
                      <p className="text-xs text-gray-500">{selectedService.price} · {selectedService.time}</p>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                  <input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="Your Address"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Preferred Date</label>
                      <input type="date" name="date" value={form.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Preferred Time</label>
                      <select name="time" value={form.time} onChange={handleChange} required
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        <option value="">Select</option>
                        <option>9AM - 11AM</option><option>11AM - 1PM</option>
                        <option>2PM - 4PM</option><option>4PM - 6PM</option>
                      </select>
                    </div>
                  </div>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Describe the issue..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                  <button type="submit" disabled={loading || !selectedService}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                    {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Booking...</> : <><i className="fa-solid fa-calendar-check mr-2"></i>Book Now</>}
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
