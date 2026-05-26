/* ============================================================
   Contact Page
   ============================================================ */

import { useState } from 'react'
import Icon from '../components/Icon'
import { usePageAnimations } from '../components/useGsapReveal'
import { CLINIC } from '../data/clinicData'
import { useToast } from '../context/ToastContext'

export default function Contact() {
  const pageRef = usePageAnimations()
  const notify = useToast()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const send = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      notify('Please fill required fields', 'Name and phone are needed.', 'error')
      return
    }
    notify('Message sent! 📨', 'Our team will call you back shortly.')
    setForm({ name: '', phone: '', message: '' })
  }

  const { lat, lng } = CLINIC.mapCoords
  const bbox = `${lng - 0.02}%2C${lat - 0.02}%2C${lng + 0.02}%2C${lat + 0.02}`

  return (
    <div ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs anim">Home / Contact</div>
          <h1 className="anim">Get in <em>Touch</em></h1>
          <p className="anim">Have a question or want to visit us? We're here and happy to help.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 54 }}>
        <div className="container">
          <div className="contact-grid">
            {/* INFO */}
            <div className="anim">
              <span className="eyebrow">Reach Us</span>
              <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>We'd Love to Hear From You</h2>
              {[
                { ic: 'pin', t: 'Visit the Clinic', d: CLINIC.address },
                { ic: 'phone', t: 'Call Us', d: CLINIC.phone, href: `tel:${CLINIC.phone.replace(/\s/g, '')}` },
                { ic: 'mail', t: 'Email Us', d: CLINIC.email, href: `mailto:${CLINIC.email}` },
                { ic: 'clock', t: 'Working Hours', d: CLINIC.hours },
              ].map((x) => (
                <div key={x.t} style={{ display: 'flex', gap: 15, marginBottom: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--mint-100)',
                                color: 'var(--teal-600)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Icon name={x.ic} size={22} />
                  </div>
                  <div>
                    <b style={{ display: 'block', fontSize: '1.02rem' }}>{x.t}</b>
                    {x.href
                      ? <a href={x.href} style={{ color: 'var(--ink-soft)', fontSize: '.92rem' }}>{x.d}</a>
                      : <span style={{ color: 'var(--ink-soft)', fontSize: '.92rem' }}>{x.d}</span>}
                  </div>
                </div>
              ))}

              <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noreferrer"
                 className="btn" style={{ background: '#25D366', color: '#fff', marginTop: 6 }}>
                <Icon name="whatsapp" size={18} /> Chat on WhatsApp
              </a>

              <div style={{ marginTop: 24, borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <iframe title="Clinic location map" width="100%" height="240" style={{ border: 0, display: 'block' }}
                        loading="lazy"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`} />
              </div>
            </div>

            {/* FORM */}
            <div className="anim">
              <div className="form-card" style={{ margin: 0, maxWidth: 'none' }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: 6 }}>Send a Message</h3>
                <p style={{ color: 'var(--ink-soft)', marginBottom: 20, fontSize: '.93rem' }}>
                  Fill the form and we'll get back to you within a few hours.
                </p>
                <div className="field">
                  <label>Your Name *</label>
                  <input value={form.name} placeholder="Full name"
                         onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Phone Number *</label>
                  <input value={form.phone} placeholder="Mobile number"
                         onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label>Your Message</label>
                  <textarea value={form.message} placeholder="How can we help you?"
                            onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button className="btn btn-primary btn-block btn-lg" onClick={send}>
                  <Icon name="mail" size={18} /> Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
