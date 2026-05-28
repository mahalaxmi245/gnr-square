import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../context/auth-context'
import { useNavigate, Link } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import API from '../services/api'

const CLOUDINARY_CLOUD = 'dgba05ru2'
const CLOUDINARY_PRESET = 'gnr_square_preset'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef()
  const [activeTab, setActiveTab] = useState('profile')
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '')

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_PRESET)
      formData.append('folder', 'gnr-square/profiles')

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await res.json()

      if (data.secure_url) {
        await updateProfile(auth.currentUser, { photoURL: data.secure_url })
        setPhotoURL(data.secure_url)
        alert('Profile picture updated successfully!')
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed. Please try again.')
    }
    setUploading(false)
  }

  const fetchMyLeads = useCallback(async () => {
    setLoading(true)
    try {
      const res = await API.get('/leads')
      const myLeads = res.data.leads.filter(
        l => l.formData?.email === user?.email
      )
      setLeads(myLeads)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (activeTab === 'inquiries') fetchMyLeads()
  }, [activeTab, user, navigate, fetchMyLeads])

  if (!user) return null

  const getStatusColor = (status) => {
    if (status === 'contacted') return 'bg-green-100 text-green-700'
    if (status === 'closed') return 'bg-gray-100 text-gray-600'
    return 'bg-yellow-100 text-yellow-700'
  }

  const getServiceColor = (service) => {
    const colors = {
      'Vastu Consultancy': 'bg-orange-100 text-orange-700',
      'Marriage Bureau': 'bg-pink-100 text-pink-700',
      'Financial Services': 'bg-green-100 text-green-700',
      'Real Estate': 'bg-blue-100 text-blue-700',
      'Interior Design': 'bg-purple-100 text-purple-700',
      'Home Maintenance': 'bg-yellow-100 text-yellow-700',
      'Digital Advertising': 'bg-red-100 text-red-700',
      'Telemarketing Network': 'bg-indigo-100 text-indigo-700', 

    }
    return colors[service] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="hero-gradient text-white py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="relative z-10">

          {/* Avatar with upload button */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl">
              {photoURL ? (
                <img src={photoURL} alt="profile" className="w-full h-full object-cover"/>
              ) : (
                <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
                  <i className="fa-solid fa-user text-blue-900 text-3xl"></i>
                </div>
              )}
            </div>

            {/* Upload button */}
            <button
              onClick={() => fileRef.current.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition">
              {uploading
                ? <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                : <i className="fa-solid fa-camera text-xs"></i>}
            </button>

            {/* Hidden file input */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"/>
          </div>

          <h1 className="text-3xl font-black text-yellow-400">{user.displayName || 'User'}</h1>
          <p className="text-blue-300 mt-1">{user.email}</p>
          {uploading && <p className="text-yellow-300 text-sm mt-2 animate-pulse">Uploading photo...</p>}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="bg-green-500 w-2 h-2 rounded-full"></span>
            <span className="text-green-400 text-sm font-semibold">Active Member</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-2 flex gap-2 mb-8">
          {[
            { id: 'profile', label: 'My Profile', icon: 'fa-user' },
            { id: 'inquiries', label: 'My Inquiries', icon: 'fa-list' },
            { id: 'settings', label: 'Settings', icon: 'fa-gear' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition
                ${activeTab === tab.id ? 'bg-blue-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
              <i className={`fa-solid ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-black text-gray-800 mb-6">
                <i className="fa-solid fa-user mr-2 text-blue-600"></i>Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Full Name</p>
                  <p className="font-semibold text-gray-800">{user.displayName || 'Not set'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Email Address</p>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Phone Number</p>
                  <p className="font-semibold text-gray-800">{user.phoneNumber || 'Not set'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Account Type</p>
                  <p className="font-semibold text-gray-800">
                    {user.providerData[0]?.providerId === 'google.com' ? '🔵 Google Account' : '📧 Email Account'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Member Since</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(user.metadata.creationTime).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Last Login</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(user.metadata.lastSignInTime).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-black text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: 'fa-grid-2', label: 'All Services', path: '/services', color: 'bg-blue-100 text-blue-700' },
                  { icon: 'fa-phone', label: 'Contact Us', path: '/contact', color: 'bg-green-100 text-green-700' },
                  { icon: 'fa-house', label: 'Home', path: '/', color: 'bg-purple-100 text-purple-700' },
                  { icon: 'fa-list', label: 'My Inquiries', action: () => setActiveTab('inquiries'), color: 'bg-orange-100 text-orange-700' },
                ].map(action => (
                  <button key={action.label}
                    onClick={() => action.action ? action.action() : navigate(action.path)}
                    className={`${action.color} p-4 rounded-xl font-semibold text-sm hover:opacity-80 transition flex flex-col items-center gap-2`}>
                    <i className={`fa-solid ${action.icon} text-xl`}></i>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-black text-gray-800">
                <i className="fa-solid fa-list mr-2 text-blue-600"></i>My Inquiries
              </h2>
              <Link to="/services"
                className="bg-blue-900 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-blue-800 transition">
                <i className="fa-solid fa-plus mr-1"></i>New Inquiry
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                <p className="text-gray-500">Loading your inquiries...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <i className="fa-solid fa-inbox text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-black text-gray-700 mb-2">No Inquiries Yet</h3>
                <p className="text-gray-500 mb-6">You haven't submitted any service inquiries yet.</p>
                <Link to="/services"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition inline-block">
                  <i className="fa-solid fa-grid-2 mr-2"></i>Explore Services
                </Link>
              </div>
            ) : (
              leads.map(lead => (
                <div key={lead._id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getServiceColor(lead.service)}`}>
                        {lead.service}
                      </span>
                      <h3 className="font-black text-gray-800 text-lg mt-2">{lead.name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                      {lead.status === 'new' ? '⏳ Pending' : lead.status === 'contacted' ? '✅ Contacted' : '🔒 Closed'}
                    </span>
                  </div>
                  {lead.message && (
                    <p className="text-gray-500 text-sm mb-3 bg-gray-50 p-3 rounded-xl">{lead.message}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      <i className="fa-solid fa-calendar mr-1"></i>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                    </p>
                    <a href={`https://wa.me/919966331389?text=Hi, I'm following up on my ${lead.service} inquiry.`}
                      target="_blank" rel="noreferrer"
                      className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-400 transition">
                      <i className="fa-brands fa-whatsapp mr-1"></i>Follow Up
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-black text-gray-800 mb-6">
                <i className="fa-solid fa-gear mr-2 text-blue-600"></i>Account Settings
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-camera text-blue-600"></i>
                    <div>
                      <p className="font-semibold text-gray-800">Profile Picture</p>
                      <p className="text-xs text-gray-500">Click the camera icon on your profile photo to update</p>
                    </div>
                  </div>
                  <button onClick={() => { setActiveTab('profile'); setTimeout(() => fileRef.current?.click(), 300) }}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-200 transition">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-shield text-green-600"></i>
                    <div>
                      <p className="font-semibold text-gray-800">Email Verified</p>
                      <p className="text-xs text-gray-500">{user.emailVerified ? 'Your email is verified' : 'Email not verified'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.emailVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.emailVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-red-100">
              <h2 className="text-xl font-black text-red-600 mb-4">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>Danger Zone
              </h2>
              <button onClick={handleLogout}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-400 transition flex items-center justify-center gap-2">
                <i className="fa-solid fa-right-from-bracket"></i> Logout from Account
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}