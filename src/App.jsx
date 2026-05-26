/* ============================================================
   App — routing + providers
   ============================================================ */

import { Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ParticleBackground from './components/ParticleBackground'
import ScrollProgress from './components/ScrollProgress'

import Home from './pages/Home'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import Reviews from './pages/Reviews'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <AppProvider>
      <ToastProvider>
        <ScrollToTop />
        {/* dental particles behind everything (hidden on admin) */}
        {!isAdmin && <ParticleBackground />}
        {!isAdmin && <ScrollProgress />}
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {!isAdmin && <Footer />}
        </div>
      </ToastProvider>
    </AppProvider>
  )
}
