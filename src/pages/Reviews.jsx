/* ============================================================
   Reviews Page — read + submit reviews
   ============================================================ */

import { useState } from 'react'
import Icon from '../components/Icon'
import CountUp from '../components/CountUp'
import { usePageAnimations } from '../components/useGsapReveal'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'

export default function Reviews() {
  const pageRef = usePageAnimations()
  const { reviews, addReview } = useApp()
  const notify = useToast()
  const [form, setForm] = useState({ name: '', role: '', rating: 5, text: '' })

  const submit = () => {
    if (!form.name.trim() || !form.text.trim()) {
      notify('Missing details', 'Please add your name and review.', 'error')
      return
    }
    addReview({
      id: 'r' + Date.now(),
      name: form.name.trim(),
      role: form.role.trim() || 'Verified Patient',
      rating: Number(form.rating),
      text: form.text.trim(),
      date: 'Just now',
    })
    setForm({ name: '', role: '', rating: 5, text: '' })
    notify('Thank you for your review! ⭐', 'Your feedback has been published.')
    window.scrollTo({ top: 380, behavior: 'smooth' })
  }

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <div ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs anim">Home / Reviews</div>
          <h1 className="anim">What Our <em>Patients</em> Say</h1>
          <p className="anim">Honest stories from the people who trust us with their smiles.</p>
          <div className="anim" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 20,
                        background: '#fff', padding: '12px 22px', borderRadius: 100, boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ color: 'var(--gold)', fontSize: '1.25rem', letterSpacing: 2 }}>★★★★★</span>
            <b style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
              <CountUp value={Number(avg)} decimals={1} />
            </b>
            <span style={{ color: 'var(--ink-soft)', fontSize: '.9rem' }}>· {reviews.length} reviews</span>
          </div>
        </div>
      </section>

      {/* REVIEW GRID */}
      <section className="section" style={{ paddingTop: 54 }}>
        <div className="container">
          <div className="rev-grid anim-stagger">
            {reviews.map((r) => (
              <div className="rev-card" key={r.id}>
                <div className="rev-top">
                  <div className="rev-stars">
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </div>
                  <span className="rev-date">{r.date}</span>
                </div>
                <p>{r.text}</p>
                <div className="rev-author">
                  <div className="rev-avatar">{r.name.charAt(0)}</div>
                  <div>
                    <b>{r.name}</b>
                    <span>{r.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WRITE REVIEW */}
      <section className="section bg-mint">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow">Share Your Experience</span>
            <h2>Write a Review</h2>
            <p>Visited us recently? We'd love to hear how it went.</p>
          </div>
          <div className="form-card anim">
            <div className="form-row">
              <div className="field">
                <label>Your Name</label>
                <input value={form.name} placeholder="e.g. Anjana Pillai"
                       onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field">
                <label>Occupation / Area (optional)</label>
                <input value={form.role} placeholder="e.g. Teacher, Kollam"
                       onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>Your Rating</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setForm({ ...form, rating: n })}
                          style={{ fontSize: '2rem', lineHeight: 1, transition: 'transform .15s',
                                   color: n <= form.rating ? 'var(--gold)' : '#d6d2c5' }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.18)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          aria-label={`${n} stars`}>
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Your Review</label>
              <textarea value={form.text} placeholder="Tell us about your visit..."
                        onChange={(e) => setForm({ ...form, text: e.target.value })} />
            </div>
            <button className="btn btn-primary btn-block btn-lg" onClick={submit}>
              <Icon name="star" size={18} /> Submit My Review
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
