import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/auth-context'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import API from '../services/api'

export default function MyServices() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMyLeads = useCallback(async () => {
    try {
      const res = await API.get('/leads')
      const myLeads = res.data.leads.filter(
        l => l.formData?.email === user?.email || l.phone === user?.phoneNumber
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
    fetchMyLeads()
  }, [user, navigate, fetchMyLeads])

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

      <div className="hero-gradient text-white py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-yellow-400 mb-2">My Inquiries</h1>
          <p className="text-blue-200">Track all your service requests</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {loading ? (
          <div className="text-center py-16">
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
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-800">
                Your Inquiries ({leads.length})
              </h2>
              <Link to="/services"
                className="bg-blue-900 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-blue-800 transition">
                <i className="fa-solid fa-plus mr-1"></i>New Inquiry
              </Link>
            </div>

            {leads.map(lead => (
              <div key={lead._id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
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
                  <p className="text-gray-500 text-sm mb-4 bg-gray-50 p-3 rounded-xl">{lead.message}</p>
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
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}