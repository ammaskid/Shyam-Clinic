/* ============================================================
   Navbar — responsive with mobile slide-out menu
   ============================================================ */

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // close menu whenever the route changes
  useEffect(() => { setOpen(false) }, [location.pathname])

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/doctors', label: 'Our Doctors' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  // navigate AND always close the menu (works even if same route)
  const handleNav = (to) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <button className="brand" onClick={() => handleNav('/')}
                  style={{ background: 'none', cursor: 'pointer' }}>
            <div className="brand-mark"><Icon name="tooth" size={24} /></div>
            <div className="brand-text">
              <b>Shyam Dental</b>
              <span>Clinic</span>
            </div>
          </button>

          <div className={'nav-links' + (open ? ' open' : '')}>
            {links.map((l) => (
              <button key={l.to}
                      className={'nav-link' + (isActive(l.to) ? ' active' : '')}
                      onClick={() => handleNav(l.to)}>
                {l.label}
              </button>
            ))}
            <button className={'nav-link' + (isActive('/admin') ? ' active' : '')}
                    onClick={() => handleNav('/admin')}>
              <Icon name="lock" size={14} /> &nbsp;Admin
            </button>
            <button className="btn btn-primary nav-cta" onClick={() => handleNav('/booking')}>
              <Icon name="calendar" size={17} /> Book Now
            </button>
          </div>

          <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <Icon name={open ? 'x' : 'menu'} size={26} />
          </button>
        </div>
      </nav>
      <div className={'nav-overlay' + (open ? ' show' : '')}
           onClick={() => setOpen(false)} />
    </>
  )
}
