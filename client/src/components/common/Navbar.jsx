import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setProfileOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-lg relative z-50">

      <Link to="/" className="flex items-center gap-3">
        <div className="bg-yellow-400 text-blue-900 font-black text-xl px-3 py-1 rounded">GNR²</div>
        <div>
          <p className="font-bold text-yellow-400 text-lg leading-tight">GNR Square</p>
          <p className="text-green-400 text-xs">Associates</p>
        </div>
      </Link>

      <div className="hidden md:flex gap-6 text-sm font-medium items-center">
        <Link to="/" className="hover:text-yellow-400 transition"><i className="fa-solid fa-house mr-1"></i>Home</Link>
        <Link to="/services" className="hover:text-yellow-400 transition"><i className="fa-solid fa-grid-2 mr-1"></i>Services</Link>
        <Link to="/contact" className="hover:text-yellow-400 transition"><i className="fa-solid fa-phone mr-1"></i>Contact</Link>

        {user ? (
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full transition">
              {user.photoURL ? (
                <img src={user.photoURL} className="w-8 h-8 rounded-full object-cover" alt="profile"/>
              ) : (
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-user text-blue-900 text-sm"></i>
                </div>
              )}
              <span className="text-sm font-semibold">{user.displayName?.split(' ')[0] || 'User'}</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform ${profileOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-2xl shadow-2xl w-56 overflow-hidden z-50">
                <div className="bg-blue-900 text-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} className="w-10 h-10 rounded-full object-cover" alt="profile"/>
                    ) : (
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-user text-blue-900"></i>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm">{user.displayName || 'User'}</p>
                      <p className="text-blue-300 text-xs truncate w-32">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link to="/profile" onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition text-sm">
                    <i className="fa-solid fa-user text-blue-600 w-4"></i> My Profile
                  </Link>
                  <Link to="/my-services"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition text-sm">
                  <i className="fa-solid fa-list text-blue-600 w-4"></i> My Inquiries
                  </Link>
                   <hr className="my-2"/>
                  <button onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-500 transition text-sm w-full">
                    <i className="fa-solid fa-right-from-bracket w-4"></i> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="hover:text-yellow-400 transition text-sm font-medium">Login</Link>
            <Link to="/register" className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition text-sm">Register</Link>
          </div>
        )}
      </div>

      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-blue-900 flex flex-col items-center gap-4 py-6 md:hidden border-t border-blue-800">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/services" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Services</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Contact</Link>
          {user ? (
            <>
              <span className="text-yellow-400 font-semibold">{user.displayName}</span>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition">
                <i className="fa-solid fa-right-from-bracket mr-2"></i>Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}
                className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

