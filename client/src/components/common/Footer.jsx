import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* ✅ Logo image replaces the GNR² text box */}
            <img src={logo} alt="GNR Square Logo" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Complete Business & Home Solutions Group. Serving Hanumakonda with trust and excellence.
          </p>
          <div className="flex gap-4 mt-5">
             <a href="https://www.instagram.com/gnr2_associate?igsh=MXd5eGNqaDB6NG1tbQ==" target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-500 w-9 h-9 rounded-full flex items-center justify-center transition">

              <i className="fa-brands fa-instagram text-sm"></i>
            </a>
            <a href="https://wa.me/919966331389" className="bg-green-600 hover:bg-green-500 w-9 h-9 rounded-full flex items-center justify-center transition">
              <i className="fa-brands fa-whatsapp text-sm"></i>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-yellow-400 font-bold text-lg mb-4">Our Services</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/services/vastu" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Vastu Consultancy</Link></li>
            <li><Link to="/services/marriage" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Marriage Bureau</Link></li>
            <li><Link to="/services/finance" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Finance Services</Link></li>
            <li><Link to="/services/realestate" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Real Estate</Link></li>
            <li><Link to="/services/interior" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Interior Designs</Link></li>
            <li><Link to="/services/maintenance" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Home Maintenance</Link></li>
            <li><Link to="/services/ads" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Digital Advertising</Link></li>
            <li><Link to="/services/telemarketing" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Telemarketing Network</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-yellow-400 font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Home</Link></li>
            {/* ✅ About link added */}
            <li><Link to="/about" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>About Us</Link></li>
            <li><Link to="/services" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>All Services</Link></li>
            <li><Link to="/login" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Login</Link></li>
            <li><Link to="/register" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Register</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition"><i className="fa-solid fa-chevron-right mr-2 text-xs"></i>Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-yellow-400 font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex gap-3">
              <i className="fa-solid fa-location-dot text-yellow-400 mt-1"></i>
              <span>Near Adalath, GampaPeddanna Lane, Opposite D-Mart, Hanumakonda</span>
            </li>
            <li className="flex gap-3 items-center">
              <i className="fa-solid fa-phone text-yellow-400"></i>
              <a href="tel:+919966331389" className="hover:text-yellow-400 transition">+91 9966331389</a>
            </li>
            <li className="flex gap-3 items-center">
              <i className="fa-brands fa-whatsapp text-green-400"></i>
              <a href="https://wa.me/919966331389" className="hover:text-green-400 transition">WhatsApp Us</a>
            </li>
          </ul>

          {/* Map placeholder */}
          <div className="mt-5 bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <i className="fa-solid fa-map-location-dot text-yellow-400 text-2xl mb-2"></i>
            <p className="text-xs text-gray-400">Hanumakonda, Telangana</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
        <p>© 2025 GNR Square Associates. All rights reserved.</p>
        <p>Built with <i className="fa-solid fa-heart text-red-500 mx-1"></i> for Hanumakonda</p>
      </div>
    </footer>
  )
}
