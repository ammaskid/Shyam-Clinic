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

  // close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // lock body scroll when menu open
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

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link to="/" className="brand">
            <div className="brand-mark"><Icon name="tooth" size={24} /></div>
            <div className="brand-text">
              <b>Shyam Dental</b>
              <span>Clinic</span>
            </div>
          </Link>

          <div className={'nav-links' + (open ? ' open' : '')}>
            {links.map((l) => (
              <Link key={l.to} to={l.to}
                    className={'nav-link' + (isActive(l.to) ? ' active' : '')}>
                {l.label}
              </Link>
            ))}
            <Link to="/admin" className={'nav-link' + (isActive('/admin') ? ' active' : '')}>
              <Icon name="lock" size={14} /> &nbsp;Admin
            </Link>
            <button className="btn btn-primary nav-cta" onClick={() => navigate('/booking')}>
              <Icon name="calendar" size={17} /> Book Now
            </button>
          </div>

          <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <Icon name={open ? 'x' : 'menu'} size={26} />
          </button>
        </div>
      </nav>
      <div className={'nav-overlay' + (open ? ' show' : '')} onClick={() => setOpen(false)} />
    </>
  )
}
