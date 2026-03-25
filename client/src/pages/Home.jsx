import Navbar from '../components/common/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/common/Footer'
const services = [
  {
    title: 'Vastu Consultancy',
    desc: 'Expert Vastu guidance for your home & office for positive energy.',
    icon: 'fa-solid fa-compass',
    path: '/services/vastu',
    gradient: 'from-orange-400 to-red-500',
    shadow: 'shadow-orange-200',
  },
  {
    title: 'Marriage Bureau',
    desc: 'Find your perfect life partner with our trusted matchmaking.',
    icon: 'fa-solid fa-heart',
    path: '/services/marriage',
    gradient: 'from-pink-400 to-rose-500',
    shadow: 'shadow-pink-200',
  },
  {
    title: 'Finance Services',
    desc: 'Loans, investments & smart financial planning for your future.',
    icon: 'fa-solid fa-indian-rupee-sign',
    path: '/services/finance',
    gradient: 'from-green-400 to-emerald-600',
    shadow: 'shadow-green-200',
  },
  {
    title: 'Real Estate',
    desc: 'Buy, sell & rent premium properties across the region.',
    icon: 'fa-solid fa-building',
    path: '/services/realestate',
    gradient: 'from-blue-400 to-indigo-600',
    shadow: 'shadow-blue-200',
  },
  {
    title: 'Interior Designs',
    desc: 'Transform your space with stunning modern interior designs.',
    icon: 'fa-solid fa-couch',
    path: '/services/interior',
    gradient: 'from-purple-400 to-violet-600',
    shadow: 'shadow-purple-200',
  },
  {
    title: 'Home Maintenance',
    desc: 'Complete home care, security & maintenance solutions.',
    icon: 'fa-solid fa-screwdriver-wrench',
    path: '/services/maintenance',
    gradient: 'from-yellow-400 to-orange-500',
    shadow: 'shadow-yellow-200',
  },
  {
    title: 'Digital Advertising',
    desc: 'Grow your business online with powerful digital campaigns.',
    icon: 'fa-solid fa-bullhorn',
    path: '/services/ads',
    gradient: 'from-red-400 to-pink-600',
    shadow: 'shadow-red-200',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-gradient text-white py-28 px-6 text-center relative overflow-hidden">

        {/* Background blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <p className="text-green-400 font-semibold tracking-widest text-sm mb-3 uppercase">
            Welcome to
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-yellow-400 mb-2 drop-shadow-lg">
            GNR SQUARE
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            associates
          </h2>
          <p className="text-lg md:text-xl text-blue-200 mb-3 max-w-xl mx-auto">
            Complete Business & Home Solutions Group
          </p>
          <p className="text-sm text-blue-300 mb-10">
            <i className="fa-solid fa-location-dot mr-1 text-yellow-400"></i>
            Near Adalath, GampaPeddanna Lane, Opposite D-Mart, Hanumakonda
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/services"
              className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-all hover:scale-105 text-lg shadow-lg">
              <i className="fa-solid fa-grid-2 mr-2"></i>Explore Services
            </Link>
            <a href="https://wa.me/919966331389" target="_blank"
              className="glass font-bold px-8 py-4 rounded-full hover:bg-white hover:text-blue-900 transition-all hover:scale-105 text-lg">
              <i className="fa-brands fa-whatsapp mr-2 text-green-400"></i>WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-yellow-400 py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-black text-blue-900">7+</p>
            <p className="text-sm font-semibold text-blue-800">Services</p>
          </div>
          <div>
            <p className="text-2xl font-black text-blue-900">500+</p>
            <p className="text-sm font-semibold text-blue-800">Happy Clients</p>
          </div>
          <div>
            <p className="text-2xl font-black text-blue-900">10+</p>
            <p className="text-sm font-semibold text-blue-800">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-6 max-w-6xl mx-auto">
        <p className="text-center text-blue-600 font-semibold tracking-widest text-sm uppercase mb-2">What We Offer</p>
        <h2 className="text-4xl font-black text-blue-900 text-center mb-2">Our Services</h2>
        <p className="text-center text-gray-500 mb-12">Everything you need, all in one place</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Link to={s.path} key={s.title}
              className={`glass-card card-hover rounded-2xl shadow-lg ${s.shadow} p-6 group`}>
              <div className={`bg-gradient-to-br ${s.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${s.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              <p className="text-blue-600 text-sm font-semibold mt-4 group-hover:translate-x-2 transition-transform inline-block">
                Learn more <i className="fa-solid fa-arrow-right ml-1"></i>
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Strip */}
      {/* Contact Strip */}
      <div className="hero-gradient text-white py-14 px-6 text-center">
        <h3 className="text-3xl font-black text-yellow-400 mb-2">Get In Touch</h3>
        <p className="text-blue-200 mb-4">We're here to help you with all your needs</p>
        <a href="tel:+919966331389" className="text-2xl font-black text-green-400 hover:text-green-300 transition">
          <i className="fa-solid fa-phone mr-2"></i>+91 9966331389
        </a>
        <p className="text-blue-300 text-sm mt-3">
          <i className="fa-solid fa-location-dot mr-1"></i>Near Adalath, Hanumakonda
        </p>
      </div>

      <Footer />
    </div>
  )
}