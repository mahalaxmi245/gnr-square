 import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../../services/api'

const ROWS = 10
const COLS = 14

const furniture = [
  { id: 'sofa', label: 'Sofa', icon: '🛋️', color: 'bg-blue-200' },
  { id: 'bed', label: 'Bed', icon: '🛏️', color: 'bg-purple-200' },
  { id: 'table', label: 'Table', icon: '🪑', color: 'bg-yellow-200' },
  { id: 'wardrobe', label: 'Wardrobe', icon: '🗄️', color: 'bg-amber-200' },
  { id: 'tv', label: 'TV Unit', icon: '📺', color: 'bg-gray-200' },
  { id: 'door', label: 'Door', icon: '🚪', color: 'bg-orange-200' },
  { id: 'window', label: 'Window', icon: '🪟', color: 'bg-cyan-200' },
  { id: 'plant', label: 'Plant', icon: '🪴', color: 'bg-green-200' },
  { id: 'dining', label: 'Dining', icon: '🍽️', color: 'bg-red-200' },
  { id: 'bathtub', label: 'Bath', icon: '🛁', color: 'bg-teal-200' },
  { id: 'erase', label: 'Erase', icon: '🗑️', color: 'bg-gray-100' },
]

export default function InteriorDesign() {
  const [grid, setGrid] = useState(() => Array(ROWS).fill(null).map(() => Array(COLS).fill(null)))
  const [selected, setSelected] = useState(null)
  const [roomName, setRoomName] = useState('Living Room')
  const [activeTab, setActiveTab] = useState('designer')
  const [form, setForm] = useState({ name: '', phone: '', spaceType: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCell = (r, c) => {
    if (!selected) return
    const g = grid.map(row => [...row])
    g[r][c] = selected.id === 'erase' ? null : selected
    setGrid(g)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({ name: form.name, phone: form.phone, service: 'Interior Design', message: form.message, formData: form })
      setSubmitted(true)
    } catch { alert('Something went wrong. Please try WhatsApp instead.') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">🛋️</div>
        <h1 className="text-4xl font-black mb-2">Interior Designs</h1>
        <p className="text-purple-100 text-lg max-w-xl mx-auto">Design your space with our 2D room planner & expert consultation</p>
      </div>

      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 py-2">
          {[
            { id: 'designer', label: '2D Room Designer', icon: 'fa-ruler-combined' },
            { id: 'services', label: 'Our Services', icon: 'fa-palette' },
            { id: 'quote', label: 'Get Quote', icon: 'fa-file-invoice' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
                ${activeTab === tab.id ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <i className={`fa-solid ${tab.icon}`}></i>{tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {activeTab === 'designer' && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Toolbar */}
            <div className="w-full md:w-44 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <p className="font-black text-gray-800 text-sm mb-3">
                  <i className="fa-solid fa-couch mr-2 text-purple-500"></i>Furniture
                </p>
                <div className="space-y-1">
                  {furniture.map(item => (
                    <button key={item.id} onClick={() => setSelected(item)}
                      className={`w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold transition border-2
                        ${selected?.id === item.id ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:bg-gray-50'}`}>
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-gray-700">{item.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)))}
                  className="w-full mt-3 bg-red-100 text-red-600 font-bold py-2 rounded-xl text-xs hover:bg-red-200 transition">
                  <i className="fa-solid fa-trash mr-1"></i>Clear All
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <select value={roomName} onChange={e => setRoomName(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option>Living Room</option><option>Bedroom</option><option>Kitchen</option>
                    <option>Dining Room</option><option>Bathroom</option><option>Office</option>
                  </select>
                  <span className="text-xs text-gray-400">{selected ? `Selected: ${selected.label}` : 'Select furniture → click grid'}</span>
                </div>
                <div className="overflow-auto">
                  <div className="border-2 border-gray-700 inline-block bg-gray-50">
                    {grid.map((row, rIdx) => (
                      <div key={rIdx} className="flex">
                        {row.map((cell, cIdx) => (
                          <div key={cIdx} onClick={() => handleCell(rIdx, cIdx)}
                            className={`w-9 h-9 border border-gray-200 flex items-center justify-center text-base cursor-pointer hover:bg-purple-50 transition ${cell ? cell.color : ''}`}>
                            {cell?.icon || ''}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-400"><i className="fa-solid fa-info-circle mr-1"></i>Each cell ≈ 1 sq ft. Click to place furniture.</p>
                  <button onClick={() => setActiveTab('quote')}
                    className="bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-purple-400 transition">
                    Get Quote →
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
          {activeTab === 'services' && (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { icon: 'fa-couch', title: 'Living Room', desc: 'Elegant & modern living spaces', price: 'From ₹50,000', color: 'bg-purple-50 text-purple-600' },
            { icon: 'fa-bed', title: 'Bedroom', desc: 'Cozy & stylish bedroom designs', price: 'From ₹40,000', color: 'bg-pink-50 text-pink-600' },
            { icon: 'fa-utensils', title: 'Modular Kitchen', desc: 'Functional & beautiful kitchens', price: 'From ₹60,000', color: 'bg-yellow-50 text-yellow-600' },
            { icon: 'fa-building-columns', title: 'Office Interior', desc: 'Professional workspace designs', price: 'From ₹70,000', color: 'bg-blue-50 text-blue-600' },
            { icon: 'fa-house', title: 'Full Home', desc: 'Complete home transformation', price: 'From ₹2,00,000', color: 'bg-green-50 text-green-600' },
            { icon: 'fa-store', title: 'Commercial', desc: 'Shops, showrooms & offices', price: 'Custom Quote', color: 'bg-orange-50 text-orange-600' },
          ].map(s => (
            <div key={s.title} className={`${s.color} rounded-2xl p-6 border border-opacity-20 hover:shadow-md transition`}>
              <i className={`fa-solid ${s.icon} text-3xl mb-3`}></i>
              <h3 className="font-black text-gray-800 text-lg mb-1">{s.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{s.desc}</p>
              <p className="font-bold text-sm">{s.price}</p>
              <button onClick={() => setActiveTab('quote')} className="mt-3 bg-white text-gray-700 border border-gray-200 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
    {activeTab === 'quote' && (
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
        {submitted ? (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-black mb-2">Inquiry Submitted!</h3>
            <a href={`https://wa.me/919966331389?text=Hi, I need Interior Design for: ${form.spaceType}`}
              target="_blank" rel="noreferrer" className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
              <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
            </a>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-black text-gray-800 mb-4">Get a Free Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
              <select name="spaceType" value={form.spaceType} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="">Select Space Type</option>
                <option>Living Room</option><option>Bedroom</option><option>Kitchen</option>
                <option>Office</option><option>Full Home</option><option>Commercial</option>
              </select>
              <select name="budget" value={form.budget} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="">Select Budget</option>
                <option>Under ₹50,000</option><option>₹50K - ₹1L</option>
                <option>₹1L - ₹3L</option><option>₹3L - ₹5L</option><option>₹5L+</option>
              </select>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Describe your dream space..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</> : <><i className="fa-solid fa-paper-plane mr-2"></i>Get Free Quote</>}
              </button>
              <a href="https://wa.me/919966331389" target="_blank" rel="noreferrer"
                className="w-full bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Instead
              </a>
            </form>
          </>
        )}
      </div>
    )}
  </div>
  <Footer />
</div>
)
}