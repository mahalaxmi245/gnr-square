 import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useState } from 'react'
import { submitLead } from '../../services/api'


export default function Finance() {
  const [form, setForm] = useState({ name: '', phone: '', loanType: '', amount: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loanAmount, setLoanAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitLead({ name: form.name, phone: form.phone, service: 'Finance Services', message: form.message, formData: form })
      setSubmitted(true)
    } catch { alert('Something went wrong. Please try WhatsApp instead.') }
    setLoading(false)
  }

  const r = interestRate / 12 / 100
  const n = tenure * 12
  const emi = Math.round(loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
  const totalPayment = emi * n
  const totalInterest = totalPayment - loanAmount

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16 px-6 text-center">
        <div className="text-6xl mb-4">💰</div>
        <h1 className="text-4xl font-black mb-2">Financial Services</h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto">Trusted financial solutions in partnership with Andromeda</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Loan Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">Our Loan Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: 'fa-house', title: 'Home Loan', rate: '8.5%', color: 'bg-green-50 border-green-200 text-green-700' },
              { icon: 'fa-car', title: 'Car Loan', rate: '9.0%', color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { icon: 'fa-briefcase', title: 'Business Loan', rate: '10.5%', color: 'bg-purple-50 border-purple-200 text-purple-700' },
              { icon: 'fa-graduation-cap', title: 'Education Loan', rate: '9.5%', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
              { icon: 'fa-user', title: 'Personal Loan', rate: '12.0%', color: 'bg-orange-50 border-orange-200 text-orange-700' },
              { icon: 'fa-seedling', title: 'Land Loan', rate: '11.0%', color: 'bg-red-50 border-red-200 text-red-700' },
            ].map(loan => (
              <div key={loan.title} className={`${loan.color} border rounded-2xl p-4 text-center`}>
                <i className={`fa-solid ${loan.icon} text-2xl mb-2`}></i>
                <p className="font-bold text-sm">{loan.title}</p>
                <p className="text-xs mt-1">From {loan.rate} p.a.</p>
              </div>
            ))}
          </div>
        </div>

        {/* EMI Calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-black text-gray-800 mb-6">
            <i className="fa-solid fa-calculator mr-2 text-green-600"></i>EMI Calculator
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Loan Amount</label>
                  <span className="text-green-600 font-bold">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <input type="range" min="100000" max="10000000" step="50000" value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))} className="w-full accent-green-500"/>
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>₹1L</span><span>₹1Cr</span></div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Interest Rate (p.a.)</label>
                  <span className="text-green-600 font-bold">{interestRate}%</span>
                </div>
                <input type="range" min="6" max="20" step="0.5" value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))} className="w-full accent-green-500"/>
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>6%</span><span>20%</span></div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Tenure</label>
                  <span className="text-green-600 font-bold">{tenure} years</span>
                </div>
                <input type="range" min="1" max="30" step="1" value={tenure}
                  onChange={e => setTenure(Number(e.target.value))} className="w-full accent-green-500"/>
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 yr</span><span>30 yrs</span></div>
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-6">
              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm mb-1">Monthly EMI</p>
                <p className="text-5xl font-black text-green-600">₹{emi.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Principal Amount', value: `₹${loanAmount.toLocaleString('en-IN')}`, color: 'text-gray-800' },
                  { label: 'Total Interest', value: `₹${totalInterest.toLocaleString('en-IN')}`, color: 'text-red-500' },
                  { label: 'Total Payment', value: `₹${totalPayment.toLocaleString('en-IN')}`, color: 'text-green-600' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between p-3 bg-white rounded-xl">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => document.getElementById('finance-form').scrollIntoView({behavior: 'smooth'})}
                className="w-full mt-4 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-400 transition">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div id="finance-form" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-4">Why Choose Us?</h2>
            <div className="space-y-4">
              {[
                { icon: 'fa-percent', title: 'Best Interest Rates', desc: 'Lowest rates from 50+ banks & NBFCs' },
                { icon: 'fa-bolt', title: 'Quick Approval', desc: 'Get approval in 24-48 hours' },
                { icon: 'fa-file-check', title: 'Minimal Documents', desc: 'Simple documentation process' },
                { icon: 'fa-handshake', title: 'Andromeda Network', desc: "India's largest loan distributor" },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`fa-solid ${item.icon} text-green-600`}></i>
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
                <h3 className="text-xl font-black mb-2">Application Submitted!</h3>
                <a href={`https://wa.me/919966331389?text=Hi, I need Finance help. Name: ${form.name}, Loan: ${form.loanType}`}
                  target="_blank" rel="noreferrer" className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-bold">
                  <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-gray-800 mb-4">Apply for a Loan</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full Name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
                  <select name="loanType" value={form.loanType} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                    <option value="">Select Loan Type</option>
                    <option>Home Loan</option><option>Car Loan</option><option>Business Loan</option>
                    <option>Education Loan</option><option>Personal Loan</option><option>Land Loan</option>
                  </select>
                  <input type="text" name="amount" value={form.amount} onChange={handleChange} required placeholder="Loan Amount (e.g. ₹10 Lakhs)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Additional details..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
                  <button type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50">
                    {loading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</> : <><i className="fa-solid fa-paper-plane mr-2"></i>Apply Now</>}
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