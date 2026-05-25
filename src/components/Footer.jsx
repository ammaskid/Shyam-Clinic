/* ============================================================
   Footer
   ============================================================ */

import { Link } from 'react-router-dom'
import Icon from './Icon'
import { CLINIC } from '../data/clinicData'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <div className="brand-mark"><Icon name="tooth" size={24} /></div>
              <div className="brand-text">
                <b style={{ color: '#fff' }}>Shyam Dental</b>
                <span>Clinic</span>
              </div>
            </Link>
            <p>Modern, gentle and expert dental care for the whole family. Caring for Kollam's smiles since {CLINIC.established}.</p>
            <div className="f-line"><Icon name="star" size={15} /> 4.9 ★ rated on Google</div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/doctors">Our Doctors</Link>
            <Link to="/reviews">Patient Reviews</Link>
            <Link to="/booking">Book Appointment</Link>
          </div>

          <div>
            <h4>Treatments</h4>
            <Link to="/services">Root Canal</Link>
            <Link to="/services">Dental Implants</Link>
            <Link to="/services">Braces & Aligners</Link>
            <Link to="/services">Teeth Whitening</Link>
            <Link to="/services">Kids' Dentistry</Link>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <span className="f-line"><Icon name="pin" size={14} /> MG Road, Kollam, Kerala</span>
            <a href={`tel:${CLINIC.phone.replace(/\s/g, '')}`}><Icon name="phone" size={14} /> {CLINIC.phone}</a>
            <a href={`mailto:${CLINIC.email}`}><Icon name="mail" size={14} /> {CLINIC.email}</a>
            <span className="f-line"><Icon name="clock" size={14} /> Mon–Sat: 9 AM – 8 PM</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 {CLINIC.name}. All rights reserved.</span>
          <span>Designed & developed by <span className="foot-loomix">Loomix Studios</span></span>
        </div>
      </div>
    </footer>
  )
}
