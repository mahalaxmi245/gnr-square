import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState, useEffect } from 'react'
import { submitLead } from '../../services/api'
import API from '../../services/api'
import { useAuth } from '../../context/auth-context'

const ADMIN_EMAIL = 'maddychityala@gmail.com'
const CLOUD_NAME = 'dgba05ru2'
const UPLOAD_PRESET = 'public_id'

export default function RealEstate() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('listings')
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', type: '', budget: '', location: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [propForm, setPropForm] = useState({ title: '', listingType: 'buy', propertyType: '', price: '', location: '', area: '', bedrooms: '', bathrooms: '', description: '', amenities: '' })
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [propSubmitted, setPropSubmitted] = useState(false)

  const isAdmin = user?.email === ADMIN_EMAIL

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => { fetchProperties() }, [typeFilter])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/properties${typeFilter !== 'all' ? `?type=${typeFilter}` : ''}`)
      setProperties(res.data.properties || [])
    } catch { setProperties([]) }
    setLoading(false)
  }

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files)
    setUploading(true)
    const urls = []
    for (const file of files) {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', UPLOAD_PRESET)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: data })
      const json = await res.json()
      if (json.secure_url) urls.push(json.secure_url)
    }
    setPhotos(prev => [...prev, ...urls])
    setUploading(false)
  }

  const handlePropSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await API.post('/properties', { ...propForm, photos, bedrooms: Number(propForm.bedrooms), bathrooms: Number(propForm.bathrooms), amenities: propForm.amenities.split(',').map(a => a.trim()) })
      setPropSubmitted(true)
      fetchProperties()
    } catch { alert('Failed to add property.') }
    setSubmitting(false)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleInquiry = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitLead({ name: form.name, phone: form.phone, service: 'Real Estate', message: form.message, formData: form })
      setSubmitted(true)
    } catch { alert('Something went wrong.') }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">🏢</div>
        <h1 className="text-4xl font-black mb-2">Real Estate</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">Find your dream property in Hanumakonda & Warangal</p>
      </div>

      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 py-2 overflow-x-auto">
          {[
            { id: 'listings', label: 'Properties', icon: 'fa-building' },
            { id: 'inquiry', label: 'Inquiry', icon: 'fa-paper-plane' },
            ...(isAdmin ? [{ id: 'add', label: 'Add Property', icon: 'fa-plus' }] : []),
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition
                ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <i className={`fa-solid ${tab.icon}`}></i>{tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {activeTab === 'listings' && (
          <div>
            {/* Filters */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {['all', 'buy', 'sell', 'rent'].map(t => (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition
                    ${typeFilter === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                  {t === 'all' ? 'All Properties' : t === 'buy' ? '🏠 Buy' : t === 'sell' ? '💰 Sell' : '🔑 Rent'}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-16"><i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500"></i></div>
            ) : properties.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-black text-gray-700 mb-2">No Properties Listed Yet</h3>
                <p className="text-gray-500 mb-4">Contact us for available properties in your budget</p>
                <button onClick={() => setActiveTab('inquiry')}
                  className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-500 transition">
                  Make an Inquiry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(p => (
                  <div key={p._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
                    onClick={() => setSelected(p)}>
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative">
                      {p.photos?.[0] ? (
                        <img src={p.photos[0]} alt={p.title} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fa-solid fa-building text-blue-300 text-6xl"></i>
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white
                        ${p.listingType === 'buy' ? 'bg-green-500' : p.listingType === 'rent' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                        {p.listingType?.toUpperCase()}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-gray-800 mb-1">{p.title}</h3>
                      <p className="text-blue-600 font-black text-xl mb-2">{p.price}</p>
                      <div className="flex gap-3 text-xs text-gray-500 mb-2">
                        {p.bedrooms && <span><i className="fa-solid fa-bed mr-1"></i>{p.bedrooms} BHK</span>}
                        {p.area && <span><i className="fa-solid fa-ruler-combined mr-1"></i>{p.area}</span>}
                        <span><i className="fa-solid fa-location-dot mr-1"></i>{p.location}</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl text-sm hover:bg-blue-500 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Property Modal */}
            {selected && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                onClick={() => setSelected(null)}>
                <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
                  onClick={e => e.stopPropagation()}>
                  {selected.photos?.[0] && <img src={selected.photos[0]} alt={selected.title} className="w-full h-48 object-cover rounded-2xl mb-4"/>}
                  <h2 className="text-2xl font-black text-gray-800 mb-1">{selected.title}</h2>
                  <p className="text-blue-600 font-black text-2xl mb-3">{selected.price}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {selected.bedrooms && <div className="bg-gray-50 p-2 rounded-lg text-sm"><i className="fa-solid fa-bed mr-1 text-blue-500"></i>{selected.bedrooms} Bedrooms</div>}
                    {selected.bathrooms && <div className="bg-gray-50 p-2 rounded-lg text-sm"><i className="fa-solid fa-bath mr-1 text-blue-500"></i>{selected.bathrooms} Bathrooms</div>}
                    {selected.area && <div className="bg-gray-50 p-2 rounded-lg text-sm"><i className="fa-solid fa-ruler-combined mr-1 text-blue-500"></i>{selected.area}</div>}
                    {selected.location && <div className="bg-gray-50 p-2 rounded-lg text-sm"><i className="fa-solid fa-location-dot mr-1 text-blue-500"></i>{selected.location}</div>}
                  </div>
                  {selected.description && <p className="text-gray-500 text-sm mb-4">{selected.description}</p>}
                  <div className="flex gap-3">
                    <a href={`https://wa.me/919966331389?text=Hi, I'm interested in ${selected.title} priced at ${selected.price}`}
                      target="_blank" rel="noreferrer"
                      className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-green-400 transition text-center">
                      <i className="fa-brands fa-whatsapp mr-1"></i>WhatsApp
                    </a>
                    <button onClick={() => { setSelected(null); setActiveTab('inquiry') }}
                      className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-500 transition">
                      Send Inquiry
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'inquiry' && (
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-black mb-2">Inquiry Submitted!</h3>
                <a href="https://wa.me/919966331389" target="_blank" rel="noreferrer"
                  className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
                  <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-gray-800 mb-4">Property Inquiry</h3>
                <form onSubmit={handleInquiry} className="space-y-3">
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  <select name="type" value={form.type} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Property Type</option>
                    <option>Buy Property</option><option>Sell Property</option><option>Rent Property</option>
                  </select>
                  <input type="text" name="budget" value={form.budget} onChange={handleChange} required placeholder="Budget (e.g. ₹20 Lakhs)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="Preferred Location"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Additional requirements..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  <button type="submit" disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                    {submitting ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</> : <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Inquiry</>}
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

        {activeTab === 'add' && isAdmin && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            {propSubmitted ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-black mb-2">Property Added!</h3>
                <button onClick={() => { setPropSubmitted(false); setPhotos([]); setPropForm({ title: '', listingType: 'buy', propertyType: '', price: '', location: '', area: '', bedrooms: '', bathrooms: '', description: '', amenities: '' }); setActiveTab('listings') }}
                  className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-500 transition">
                  View Listings
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-gray-800 mb-6">
                  <i className="fa-solid fa-plus mr-2 text-blue-600"></i>Add New Property
                </h3>
                <form onSubmit={handlePropSubmit} className="space-y-3">
                  <input type="text" value={propForm.title} onChange={e => setPropForm({...propForm, title: e.target.value})} required placeholder="Property Title"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  <div className="grid grid-cols-2 gap-3">
                    <select value={propForm.listingType} onChange={e => setPropForm({...propForm, listingType: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option value="buy">For Sale</option><option value="rent">For Rent</option><option value="sell">Selling</option>
                    </select>
                    <input type="text" value={propForm.propertyType} onChange={e => setPropForm({...propForm, propertyType: e.target.value})} placeholder="Type (Apartment, Villa...)"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" value={propForm.price} onChange={e => setPropForm({...propForm, price: e.target.value})} required placeholder="Price (e.g. ₹25 Lakhs)"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    <input type="text" value={propForm.location} onChange={e => setPropForm({...propForm, location: e.target.value})} required placeholder="Location"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="text" value={propForm.area} onChange={e => setPropForm({...propForm, area: e.target.value})} placeholder="Area (sq ft)"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    <input type="number" value={propForm.bedrooms} onChange={e => setPropForm({...propForm, bedrooms: e.target.value})} placeholder="Bedrooms"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    <input type="number" value={propForm.bathrooms} onChange={e => setPropForm({...propForm, bathrooms: e.target.value})} placeholder="Bathrooms"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>
                  <textarea value={propForm.description} onChange={e => setPropForm({...propForm, description: e.target.value})} rows={3} placeholder="Description"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  <input type="text" value={propForm.amenities} onChange={e => setPropForm({...propForm, amenities: e.target.value})} placeholder="Amenities (comma separated: Parking, Gym, Pool)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                  {/* Photo Upload */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Property Photos</label>
                    <label className="cursor-pointer border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 hover:border-blue-400 transition">
                      {uploading ? <><i className="fa-solid fa-spinner fa-spin text-blue-500"></i><span className="text-sm text-gray-500">Uploading...</span></> :
                        <><i className="fa-solid fa-cloud-upload text-blue-400 text-xl"></i><span className="text-sm text-gray-500">Click to upload photos</span></>}
                      <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden"/>
                    </label>
                    {photos.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {photos.map((url, i) => (
                          <img key={i} src={url} alt={`photo ${i}`} className="w-16 h-16 rounded-lg object-cover"/>
                        ))}
                      </div>
                    )}
                  </div>

                  <button type="submit" disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                    {submitting ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Adding...</> : <><i className="fa-solid fa-plus mr-2"></i>Add Property</>}
                  </button>
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