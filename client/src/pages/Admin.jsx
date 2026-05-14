import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/auth-context'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

const ADMIN_EMAIL = 'maddychityala@gmail.com'

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const services = ['All', 'Vastu Consultancy', 'Marriage Bureau', 'Finance Services', 'Real Estate', 'Interior Design', 'Home Maintenance', 'Digital Advertising']

  const fetchLeads = useCallback(async () => {
    try {
      const res = await API.get('/leads')
      setLeads(res.data.leads)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (user.email !== ADMIN_EMAIL) {
      navigate('/')
      return
    }
    fetchLeads()
  }, [user, navigate, fetchLeads])

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, { status })
      await fetchLeads()
      setSelected(null)
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = filter === 'All' ? leads : leads.filter(l => l.service === filter)

  const getStatusColor = (status) => {
    if (status === 'contacted') return 'bg-green-100 text-green-700'
    if (status === 'closed') return 'bg-gray-100 text-gray-600'
    return 'bg-yellow-100 text-yellow-700'
  }

  const getServiceColor = (service) => {
    const colors = {
      'Vastu Consultancy': 'bg-orange-100 text-orange-700',
      'Marriage Bureau': 'bg-pink-100 text-pink-700',
      'Finance Services': 'bg-green-100 text-green-700',
      'Real Estate': 'bg-blue-100 text-blue-700',
      'Interior Design': 'bg-purple-100 text-purple-700',
      'Home Maintenance': 'bg-yellow-100 text-yellow-700',
      'Digital Advertising': 'bg-red-100 text-red-700',
    }
    return colors[service] || 'bg-gray-100 text-gray-700'
  }

  if (loading) return (
    <div className="min-h-screen hero-gradient flex items-center justify-center">
      <div className="text-white text-center">
        <i className="fa-solid fa-spinner fa-spin text-4xl mb-4"></i>
        <p className="text-xl font-bold">Loading dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 text-blue-900 font-black text-xl px-3 py-1 rounded">GNR²</div>
          <div>
            <p className="font-bold text-yellow-400">Admin Panel</p>
            <p className="text-blue-300 text-xs">GNR Square Associates</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-blue-300">
            <i className="fa-solid fa-user mr-1"></i>{user?.email}
          </span>
          <button onClick={() => navigate('/')}
            className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition">
            <i className="fa-solid fa-house mr-1"></i>Website
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Total Leads</p>
            <p className="text-3xl font-black text-blue-900">{leads.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">New</p>
            <p className="text-3xl font-black text-yellow-500">{leads.filter(l => l.status === 'new').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Contacted</p>
            <p className="text-3xl font-black text-green-500">{leads.filter(l => l.status === 'contacted').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Closed</p>
            <p className="text-3xl font-black text-gray-500">{leads.filter(l => l.status === 'closed').length}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex gap-2 flex-wrap">
          {services.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === s ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s} ({s === 'All' ? leads.length : leads.filter(l => l.service === s).length})
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-800">
              <i className="fa-solid fa-list mr-2 text-blue-600"></i>
              All Leads ({filtered.length})
            </h2>
            <button onClick={fetchLeads}
              className="text-blue-600 hover:text-blue-800 transition text-sm font-semibold">
              <i className="fa-solid fa-rotate-right mr-1"></i>Refresh
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <i className="fa-solid fa-inbox text-4xl mb-3"></i>
              <p>No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold">Name</th>
                    <th className="text-left px-6 py-3 font-semibold">Phone</th>
                    <th className="text-left px-6 py-3 font-semibold">Service</th>
                    <th className="text-left px-6 py-3 font-semibold">Status</th>
                    <th className="text-left px-6 py-3 font-semibold">Date</th>
                    <th className="text-left px-6 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(lead => (
                    <tr key={lead._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{lead.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline text-sm">
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getServiceColor(lead.service)}`}>
                          {lead.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => setSelected(lead)}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-200 transition">
                            <i className="fa-solid fa-eye mr-1"></i>View
                          </button>
                          <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hi ${lead.name}, this is GNR Square Associates regarding your ${lead.service} inquiry.`}
                            target="_blank" rel="noreferrer"
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-green-200 transition">
                            <i className="fa-brands fa-whatsapp mr-1"></i>WhatsApp
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-800">{selected.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getServiceColor(selected.service)}`}>
                  {selected.service}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex gap-3 items-center p-3 bg-gray-50 rounded-xl">
                <i className="fa-solid fa-phone text-blue-600"></i>
                <a href={`tel:${selected.phone}`} className="text-blue-600 font-semibold">{selected.phone}</a>
              </div>
              {selected.message && (
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Message</p>
                  <p className="text-gray-800">{selected.message}</p>
                </div>
              )}
              {selected.formData && Object.entries(selected.formData).map(([key, value]) => (
                value && key !== 'message' && (
                  <div key={key} className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-400 capitalize">{key}</p>
                    <p className="text-gray-800 font-medium">{value}</p>
                  </div>
                )
              ))}
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400">Submitted on</p>
                <p className="text-gray-800 font-medium">{new Date(selected.createdAt).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button onClick={() => updateStatus(selected._id, 'contacted')}
                className="flex-1 bg-green-500 text-white font-bold py-2 rounded-xl hover:bg-green-400 transition text-sm">
                <i className="fa-solid fa-check mr-1"></i>Mark Contacted
              </button>
              <button onClick={() => updateStatus(selected._id, 'closed')}
                className="flex-1 bg-gray-500 text-white font-bold py-2 rounded-xl hover:bg-gray-400 transition text-sm">
                <i className="fa-solid fa-xmark mr-1"></i>Mark Closed
              </button>
            </div>

            <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hi ${selected.name}, this is GNR Square Associates regarding your ${selected.service} inquiry.`}
              target="_blank" rel="noreferrer"
              className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-400 transition flex items-center justify-center gap-2">
              <i className="fa-brands fa-whatsapp"></i> WhatsApp {selected.name}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
