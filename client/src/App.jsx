import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import ServiceHub from './pages/ServiceHub'
import Profile from './pages/Profile'
import MyServices from './pages/MyServices'
import AboutPage from './pages/AboutPage'         
import Vastu from './pages/services/Vastu'
import MarriageBureau from './pages/services/MarriageBureau'
import Finance from './pages/services/Finance'
import RealEstate from './pages/services/RealEstate'
import InteriorDesign from './pages/services/InteriorDesign'
import HomeMaintenance from './pages/services/HomeMaintenance'
import DigitalAds from './pages/services/DigitalAds'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServiceHub />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/services/vastu" element={<Vastu />} />
        <Route path="/services/marriage" element={<MarriageBureau />} />
        <Route path="/services/finance" element={<Finance />} />
        <Route path="/services/realestate" element={<RealEstate />} />
        <Route path="/services/interior" element={<InteriorDesign />} />
        <Route path="/services/maintenance" element={<HomeMaintenance />} />
        <Route path="/services/ads" element={<DigitalAds />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App