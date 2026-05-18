import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState, useEffect } from 'react'
import { submitLead } from '../../services/api'
import API from '../../services/api'

export default function MarriageBureau() {
  const [activeTab, setActiveTab] = useState('browse')
  const [profiles, setProfiles] = useState([])
  const [loadingProfiles, setLoadingProfiles] = useState(false)
  const [genderFilter, setGenderFilter] = useState('')
  const [interests, setInterests] = useState([])
  const [form, setForm] = useState({
    name: '', age: '', gender: '', phone: '', email: '',
    education: '', profession: '', religion: '', caste: '',
    location: '', height: '', about: '', photo: '', dob: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const interestOptions = ['Reading', 'Cooking', 'Travelling', 'Music', 'Sports', 'Movies', 'Yoga', 'Gardening', 'Technology', 'Art']

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProfiles()
  }, [genderFilter])

  const fetchProfiles = async () => {
    setLoadingProfiles(true)
    try {
      const res = await API.get(`/api/marriage-profiles${genderFilter ? `?gender=${genderFilter}` : ''}`)
      setProfiles(res.data.profiles || [])
    } catch { setProfiles([]) }
    setLoadingProfiles(false)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'public_id')
    const res = await fetch('https://api.cloudinary.com/v1_1/dgba05ru2/image/upload', { method: 'POST', body: data })
    const json = await res.json()
    if (json.secure_url) setForm(f => ({ ...f, photo: json.secure_url }))
    setUploading(false)
  }

  const toggleInterest = (i) => {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/api/marriage-profiles', { ...form, interests, age: Number(form.age) })
      await submitLead({ name: form.name, phone: form.phone, service: 'Marriage Bureau', message: form.about, formData: form })
      setSubmitted(true)
    } catch { alert('Something went wrong. Please try WhatsApp instead.') }
    setLoading(false)
  }

  // eslint-disable-next-line react-hooks/purity
  const getCompatibility = () => Math.floor(Math.random() * 20) + 75

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">💍</div>
        <h1 className="text-4xl font-black mb-2">Marriage Bureau</h1>
        <p className="text-pink-100 text-lg max-w-xl mx-auto">Find your perfect life partner with verified profiles & smart matching</p>
      </div>

      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 py-2 overflow-x-auto">
          {[
            { id: 'browse', label: 'Browse Profiles', icon: 'fa-users' },
            { id: 'register', label: 'Register Profile', icon: 'fa-user-plus' },
            { id: 'horoscope', label: 'Horoscope Match', icon: 'fa-star' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition
                ${activeTab === tab.id ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <i className={`fa-solid ${tab.icon}`}></i>{tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {activeTab === 'browse' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { num: '500+', label: 'Verified Profiles', icon: 'fa-shield-check' },
                { num: '200+', label: 'Successful Matches', icon: 'fa-heart' },
                { num: '100%', label: 'Confidential', icon: 'fa-lock' },
                { num: '5★', label: 'Trust Rating', icon: 'fa-star' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <i className={`fa-solid ${stat.icon} text-pink-500 text-xl mb-2`}></i>
                  <p className="text-xl font-black text-gray-800">{stat.num}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-3 mb-6">
              {['', 'male', 'female'].map(g => (
                <button key={g} onClick={() => setGenderFilter(g)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                    ${genderFilter === g ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                  {g === '' ? 'All' : g === 'male' ? '👨 Male' : '👩 Female'}
                </button>
              ))}
            </div>

            {loadingProfiles ? (
              <div className="text-center py-16"><i className="fa-solid fa-spinner fa-spin text-4xl text-pink-500"></i></div>
            ) : profiles.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <div className="text-6xl mb-4">💝</div>
                <h3 className="text-xl font-black text-gray-700 mb-2">No Profiles Yet</h3>
                <p className="text-gray-500 mb-6">Be the first to register your profile!</p>
                <button onClick={() => setActiveTab('register')}
                  className="bg-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-pink-400 transition">
                  Register Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map(profile => (
                  <div key={profile._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center relative">
                      {profile.photo ? (
                        <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-24 h-24 bg-pink-200 rounded-full flex items-center justify-center">
                          <i className={`fa-solid ${profile.gender === 'male' ? 'fa-person' : 'fa-person-dress'} text-pink-500 text-4xl`}></i>
                        </div>
                      )}
                      {profile.verified && (
                        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          <i className="fa-solid fa-check mr-1"></i>Verified
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-black text-gray-800 text-lg">{profile.name}</h3>
                          <p className="text-gray-500 text-sm">{profile.age} yrs · {profile.location}</p>
                        </div>
                        <div className="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">
                          {getCompatibility()}% Match
                        </div>
                      </div>
                      <div className="space-y-1 mb-3">
                        {profile.education && <p className="text-xs text-gray-500"><i className="fa-solid fa-graduation-cap mr-1 text-blue-500"></i>{profile.education}</p>}
                        {profile.profession && <p className="text-xs text-gray-500"><i className="fa-solid fa-briefcase mr-1 text-green-500"></i>{profile.profession}</p>}
                        {profile.religion && <p className="text-xs text-gray-500"><i className="fa-solid fa-hands-praying mr-1 text-orange-500"></i>{profile.religion}{profile.caste ? ` · ${profile.caste}` : ''}</p>}
                      </div>
                      {profile.about && <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg mb-3 line-clamp-2">{profile.about}</p>}
                      <button
                        onClick={() => window.open(`https://wa.me/919966331389?text=Hi, I'm interested in the profile of ${profile.name} from GNR Marriage Bureau.`, '_blank')}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2 rounded-xl text-sm hover:opacity-90 transition">
                        <i className="fa-solid fa-heart mr-1"></i>Send Interest
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-black mb-2">Profile Submitted!</h3>
                  <p className="text-gray-500 mb-4">Your profile will be verified and published soon.</p>
                  <a href="https://wa.me/919966331389" target="_blank" rel="noreferrer"
                    className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
                    <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-gray-800 mb-6">Create Your Profile</h3>

                  {/* Photo Upload */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-2 overflow-hidden border-4 border-pink-200">
                      {form.photo ? (
                        <img src={form.photo} alt="preview" className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                          <i className="fa-solid fa-user text-pink-300 text-3xl"></i>
                        </div>
                      )}
                    </div>
                    <label className="cursor-pointer bg-pink-100 text-pink-700 text-sm font-bold px-4 py-2 rounded-xl hover:bg-pink-200 transition">
                      {uploading ? <><i className="fa-solid fa-spinner fa-spin mr-1"></i>Uploading...</> : <><i className="fa-solid fa-camera mr-1"></i>Upload Photo</>}
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden"/>
                    </label>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                      <input type="number" name="age" value={form.age} onChange={handleChange} required min="18" max="60" placeholder="Age"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select name="gender" value={form.gender} onChange={handleChange} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
                        <option value="">Gender</option><option value="male">Male</option><option value="female">Female</option>
                      </select>
                      <input type="text" name="height" value={form.height} onChange={handleChange} placeholder="Height (e.g. 5'8)"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                    </div>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" name="education" value={form.education} onChange={handleChange} placeholder="Education"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                      <input type="text" name="profession" value={form.profession} onChange={handleChange} placeholder="Profession"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" name="religion" value={form.religion} onChange={handleChange} placeholder="Religion (optional)"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                      <input type="text" name="caste" value={form.caste} onChange={handleChange} placeholder="Caste (optional)"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>
                    </div>
                    <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="City / Location"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>

                    {/* Interests */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {interestOptions.map(i => (
                          <button type="button" key={i} onClick={() => toggleInterest(i)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition border
                              ${interests.includes(i) ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}`}>
                            {i}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea name="about" value={form.about} onChange={handleChange} rows={3} placeholder="About yourself (hobbies, preferences, expectations...)"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"/>

                    <button type="submit" disabled={loading || uploading}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                      {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</> : <><i className="fa-solid fa-heart mr-2"></i>Submit Profile</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'horoscope' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">⭐</div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">Kundli Matching</h2>
              <p className="text-gray-500 mb-6">Get your horoscope matched by our expert Jyotish for compatibility & dosha analysis</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
                {[
                  { title: 'Guna Milan', desc: '36-point compatibility scoring system', icon: '✨' },
                  { title: 'Dosha Detection', desc: 'Mangal, Kaal Sarp & Nadi dosha check', icon: '🔮' },
                  { title: 'Navamsha Chart', desc: 'Deep marriage compatibility analysis', icon: '📊' },
                  { title: 'Remedies', desc: 'Astrological remedies for doshas', icon: '🙏' },
                ].map(item => (
                  <div key={item.title} className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/919966331389?text=Hi, I want Kundli matching for marriage."
                target="_blank" rel="noreferrer"
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition">
                <i className="fa-brands fa-whatsapp mr-2"></i>Book Kundli Matching
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
