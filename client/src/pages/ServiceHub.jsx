import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Vastu Consultancy',
    desc: 'Expert Vastu guidance for your home & office for positive energy and prosperity.',
    icon: 'fa-compass',
    path: '/services/vastu',
    gradient: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    features: ['Home Vastu', 'Office Vastu', 'Plot Selection', 'Vastu Remedies']
  },
  {
    title: 'Marriage Bureau',
    desc: 'Find your perfect life partner with our trusted matchmaking service.',
    icon: 'fa-heart',
    path: '/services/marriage',
    gradient: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    features: ['Verified Profiles', 'Personal Matchmaker', '500+ Matches', '100% Confidential']
  },
  {
    title: 'Financial Services',
    desc: 'Loans, investments & smart financial planning for your future.',
    icon: 'fa-indian-rupee-sign',
    path: '/services/finance',
    gradient: 'from-green-400 to-emerald-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    features: ['Home Loans', 'Vehicle Loans', 'Business Loans', 'Education Loans']
  },
  {
    title: 'Real Estate',
    desc: 'Buy, sell & rent premium properties across Hanumakonda & Warangal.',
    icon: 'fa-building',
    path: '/services/realestate',
    gradient: 'from-blue-400 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    features: ['Residential Plots', 'Apartments', 'Commercial Spaces', 'Agricultural Land']
  },
  {
    title: 'Interior Designs',
    desc: 'Transform your space with stunning modern interior designs.',
    icon: 'fa-couch',
    path: '/services/interior',
    gradient: 'from-purple-400 to-violet-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    features: ['Living Room', 'Bedroom Design', 'Modular Kitchen', 'Office Interiors']
  },
  {
    title: 'Home Maintenance',
    desc: 'Complete home care, security & maintenance solutions at your doorstep.',
    icon: 'fa-screwdriver-wrench',
    path: '/services/maintenance',
    gradient: 'from-yellow-400 to-orange-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    features: ['Electrical Work', 'Plumbing', 'Painting', 'Home Security']
  },
  {
    title: 'Digital Advertising',
    desc: 'Grow your business online with powerful digital marketing campaigns.',
    icon: 'fa-bullhorn',
    path: '/services/ads',
    gradient: 'from-red-400 to-pink-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    features: ['Facebook & Instagram Ads', 'Google Ads', 'SEO Services', 'Video Marketing']
  },
  {
    title: 'Telemarketing Network',
    desc: 'Grow your business with professional calling campaigns & lead generation.',
    icon: 'fa-headset',
    path: '/services/telemarketing',
    gradient: 'from-indigo-400 to-purple-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    features: ['Inbound & Outbound Calls', 'Lead Generation', 'Appointment Setting', 'Market Research']
  },
]

export default function ServiceHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="hero-gradient text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-green-400 font-semibold tracking-widest text-sm uppercase mb-2">Everything in one place</p>
          <h1 className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">Our Services</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">Complete Business & Home Solutions Group</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className={`${s.bg} border ${s.border} rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 group`}>
              <div className={`bg-gradient-to-br ${s.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${s.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
              <ul className="space-y-1 mb-5">
                {s.features.map(f => (
                  <li key={f} className="text-gray-600 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-check text-green-500 text-xs"></i>{f}
                  </li>
                ))}
              </ul>
              <Link to={s.path}
                className={`w-full bg-gradient-to-r ${s.gradient} text-white font-bold py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2`}>
                Get Started <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="hero-gradient text-white py-14 px-6 text-center">
        <h3 className="text-3xl font-black text-yellow-400 mb-2">Not Sure Which Service?</h3>
        <p className="text-blue-200 mb-6">Contact us and we'll guide you to the right solution</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/contact"
            className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition">
            <i className="fa-solid fa-phone mr-2"></i>Contact Us
          </Link>
          <a href="https://wa.me/919966331389" target="_blank" rel="noreferrer"
            className="bg-green-500 text-white font-bold px-8 py-3 rounded-full hover:bg-green-400 transition">
            <i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}