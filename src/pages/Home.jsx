/* ============================================================
   Home Page — with 3D tooth hero + GSAP animations
   ============================================================ */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Tooth3D from '../components/Tooth3D'
import { SERVICES, DOCTORS, REVIEWS, FEATURES, STATS } from '../data/clinicData'

export default function Home() {
  const heroRef = useRef(null)

  // GSAP hero entrance — safe lazy load, fails open
  useEffect(() => {
    const root = heroRef.current
    if (!root) return
    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let ctx = null
    let cancelled = false
    ;(async () => {
      try {
        const g = await import('gsap')
        const gsap = g.gsap || g.default
        if (cancelled) return
        ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
          tl.from('.hero-anim', { y: 32, opacity: 0, duration: 0.7, stagger: 0.12 })
            .from('.hero-visual', { scale: 0.9, opacity: 0, duration: 0.9 }, '-=0.5')
        }, root)
      } catch (e) {
        console.warn('Hero GSAP skipped.', e)
      }
    })()
    return () => { cancelled = true; if (ctx) ctx.revert() }
  }, [])

  return (
    <div>
      {/* ---- HERO ---- */}
      <section className="hero" ref={heroRef}>
        <div className="hero-blob blob-1" />
        <div className="hero-blob blob-2" />
        <div className="container hero-grid">
          <div>
            <div className="hero-pill hero-anim">
              <span className="dot" /> Now accepting new patients in Kollam
            </div>
            <h1 className="hero-anim">Your Best Smile <em>Starts Here.</em></h1>
            <p className="hero-sub hero-anim">
              Gentle, modern and genuinely caring dentistry for the whole family.
              Book in seconds, skip the queue, and smile with confidence.
            </p>
            <div className="hero-actions hero-anim">
              <Link to="/booking" className="btn btn-primary btn-lg">
                <Icon name="calendar" size={19} /> Book an Appointment
              </Link>
              <Link to="/services" className="btn btn-ghost btn-lg">
                Explore Services <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="hero-stats hero-anim">
              {STATS.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D TOOTH */}
          <div className="hero-visual">
            <div className="hero-3d-stage">
              <Tooth3D height={400} />
            </div>
            <div className="hero-float hero-float-1">
              <div className="icon-circle" style={{ background: '#d6f6ef', color: '#0f7268' }}>
                <Icon name="shieldcheck" size={22} />
              </div>
              <div>
                <b>Painless Treatment</b>
                <span>Sedation options available</span>
              </div>
            </div>
            <div className="hero-float hero-float-2">
              <div className="icon-circle" style={{ background: '#fff1d6', color: '#9a6b00' }}>
                <Icon name="star" size={22} />
              </div>
              <div>
                <b>4.9 / 5.0</b>
                <span>1,800+ happy reviews</span>
              </div>
            </div>
            <div className="hero-3d-hint">
              <Icon name="sparkle" size={14} /> Drag to rotate
            </div>
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section className="section-sm">
        <div className="container">
          <div className="feat-grid">
            {FEATURES.map((f, i) => (
              <Reveal className="feat-item" key={f.title} delay={i * 0.08}>
                <div className="fi-ic"><Icon name={f.icon} size={28} /></div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SERVICES ---- */}
      <section className="section bg-mint">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What We Do</span>
            <h2>Complete Dental Care, Under One Roof</h2>
            <p>From routine cleanings to full smile makeovers — every treatment delivered with skill and a gentle touch.</p>
          </Reveal>
          <div className="svc-grid">
            {SERVICES.slice(0, 3).map((s, i) => (
              <Reveal className="svc-card" key={s.id} delay={i * 0.1}>
                {s.tag && <span className="svc-tag">{s.tag}</span>}
                <div className="svc-icon"><Icon name={s.icon} size={28} /></div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div className="svc-price">{s.price} <small>{s.unit}</small></div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn btn-primary">
              View All Services <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- WHY US ---- */}
      <section className="section">
        <div className="container">
          <div className="why-grid">
            <Reveal>
              <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                   alt="Dentist caring for a patient"
                   className="why-img" loading="lazy" />
            </Reveal>
            <Reveal delay={0.12}>
              <span className="eyebrow">Why Shyam Dental</span>
              <h2 style={{ fontSize: '2.3rem', marginBottom: 16 }}>
                Dentistry that feels different — calm, clear and caring.
              </h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>
                We've reimagined the dental visit. No long waits, no confusing bills, no fear.
                Just honest advice, modern technology and a team that treats you like family.
              </p>
              {[
                { ic: 'shieldcheck', t: 'Sterile & Safe', d: 'Hospital-grade sterilisation on every instrument, every time.' },
                { ic: 'rupee', t: 'Transparent Pricing', d: 'Know the cost before we begin — zero hidden charges.' },
                { ic: 'users', t: 'Specialists for Every Need', d: 'Implantologist, orthodontist and paediatric experts in-house.' },
              ].map((x) => (
                <div key={x.t} className="why-point">
                  <div className="why-point-ic">
                    <Icon name={x.ic} size={22} />
                  </div>
                  <div>
                    <b style={{ display: 'block', fontSize: '1.04rem' }}>{x.t}</b>
                    <span style={{ color: 'var(--ink-soft)', fontSize: '.92rem' }}>{x.d}</span>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- DOCTORS ---- */}
      <section className="section bg-mint">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Meet The Team</span>
            <h2>Experts You Can Trust</h2>
            <p>Award-winning specialists devoted to keeping your smile healthy for life.</p>
          </Reveal>
          <div className="doc-grid">
            {DOCTORS.map((d, i) => (
              <Reveal className="doc-card" key={d.id} delay={i * 0.08}>
                <div className="doc-photo">
                  <img src={d.img} alt={d.name} loading="lazy" />
                  <div className="doc-rate"><Icon name="star" size={13} /> {d.rating}</div>
                </div>
                <div className="doc-body">
                  <h3>{d.name}</h3>
                  <div className="doc-spec">{d.spec}</div>
                  <p>{d.bio}</p>
                  <div className="doc-meta">
                    <span><b>{d.exp}</b> exp.</span>
                    <span><b>{d.patients}</b> treated</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/doctors" className="btn btn-ghost">
              Meet All Doctors <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- REVIEWS ---- */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Patient Stories</span>
            <h2>Smiles That Speak For Us</h2>
            <p>Real words from real patients who found their confidence again.</p>
          </Reveal>
          <div className="rev-grid">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <Reveal className="rev-card" key={r.id} delay={i * 0.1}>
                <div className="rev-top">
                  <div className="rev-stars">{'★'.repeat(r.rating)}</div>
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
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/reviews" className="btn btn-ghost">
              Read All Reviews <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-tooth"><Icon name="tooth" size={210} /></div>
            <h2>Ready for a Healthier, Brighter Smile?</h2>
            <p>Book your appointment in under 60 seconds — it's free and easy.</p>
            <Link to="/booking" className="btn btn-gold btn-lg">
              <Icon name="calendar" size={19} /> Book Your Visit Now
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
