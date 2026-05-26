/* ============================================================
   Navbar — responsive, with a PORTAL-based mobile drawer.
   The mobile menu renders directly into <body> so it can never
   be clipped or trapped by a parent's overflow/transform.
   ============================================================ */

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/doctors', label: 'Our Doctors' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // close on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // lock body scroll while drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const go = (to) => { setOpen(false); navigate(to) }

  // ---- the mobile drawer, rendered via portal into <body> ----
  const drawer = (
    <div className={'mobile-drawer-root' + (open ? ' open' : '')}>
      <div className="mobile-drawer-backdrop" onClick={() => setOpen(false)} />
      <aside className="mobile-drawer" role="dialog" aria-label="Menu">
        <div className="mobile-drawer-head">
          <div className="brand">
            <div className="brand-mark"><Icon name="tooth" size={22} /></div>
            <div className="brand-text">
              <b>Shyam Dental</b>
              <span>Clinic</span>
            </div>
          </div>
          <button className="mobile-drawer-close" onClick={() => setOpen(false)}
                  aria-label="Close menu">
            <Icon name="x" size={24} />
          </button>
        </div>

        <nav className="mobile-drawer-links">
          {LINKS.map((l) => (
            <button key={l.to}
                    className={'mobile-drawer-link' + (isActive(l.to) ? ' active' : '')}
                    onClick={() => go(l.to)}>
              {l.label}
              <Icon name="arrow" size={16} />
            </button>
          ))}
          <button className={'mobile-drawer-link' + (isActive('/admin') ? ' active' : '')}
                  onClick={() => go('/admin')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="lock" size={15} /> Admin Panel
            </span>
            <Icon name="arrow" size={16} />
          </button>
        </nav>

        <button className="btn btn-primary btn-block btn-lg mobile-drawer-cta"
                onClick={() => go('/booking')}>
          <Icon name="calendar" size={18} /> Book Appointment
        </button>

        <div className="mobile-drawer-foot">
          <a href="tel:+919847012345"><Icon name="phone" size={15} /> +91 98470 12345</a>
          <span><Icon name="pin" size={15} /> MG Road, Kollam</span>
        </div>
      </aside>
    </div>
  )

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <button className="brand" onClick={() => go('/')}
                  style={{ background: 'none', cursor: 'pointer' }}>
            <div className="brand-mark"><Icon name="tooth" size={24} /></div>
            <div className="brand-text">
              <b>Shyam Dental</b>
              <span>Clinic</span>
            </div>
          </button>

          {/* desktop links */}
          <div className="nav-links">
            {LINKS.map((l) => (
              <button key={l.to}
                      className={'nav-link' + (isActive(l.to) ? ' active' : '')}
                      onClick={() => go(l.to)}>
                {l.label}
              </button>
            ))}
            <button className={'nav-link' + (isActive('/admin') ? ' active' : '')}
                    onClick={() => go('/admin')}>
              <Icon name="lock" size={14} /> &nbsp;Admin
            </button>
            <button className="btn btn-primary nav-cta" onClick={() => go('/booking')}>
              <Icon name="calendar" size={17} /> Book Now
            </button>
          </div>

          {/* mobile burger */}
          <button className="burger" onClick={() => setOpen((o) => !o)}
                  aria-label="Open menu" aria-expanded={open}>
            <Icon name={open ? 'x' : 'menu'} size={26} />
          </button>
        </div>
      </nav>

      {/* drawer portaled to <body> — escapes all clipping */}
      {typeof document !== 'undefined' && createPortal(drawer, document.body)}
    </>
  )
}
