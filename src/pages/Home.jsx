/* ============================================================
   Home Page — 3D tooth hero + full GSAP animations
   ============================================================ */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Tooth3D from '../components/Tooth3D'
import CountUp from '../components/CountUp'
import { usePageAnimations } from '../components/useGsapReveal'
import { SERVICES, DOCTORS, REVIEWS, FEATURES, STATS } from '../data/clinicData'

export default function Home() {
  const pageRef = usePageAnimations()
  const heroRef = useRef(null)

  // GSAP hero entrance timeline
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
          tl.from('.hero-anim', { y: 36, opacity: 0, duration: 0.7, stagger: 0.12 })
            .from('.hero-visual', { scale: 0.88, opacity: 0, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.5')
            .from('.hero-float', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' }, '-=0.4')
        }, root)
      } catch (e) {
        console.warn('Hero GSAP skipped.', e)
      }
    })()
    return () => { cancelled = true; if (ctx) ctx.revert() }
  }, [])

  return (
    <div ref={pageRef}>
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
                  <b>
                    <CountUp value={s.num} suffix={s.suffix} decimals={s.decimals} />
                  </b>
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
          <div className="feat-grid anim-stagger">
            {FEATURES.map((f) => (
              <div className="feat-item" key={f.title}>
                <div className="fi-ic"><Icon name={f.icon} size={28} /></div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SERVICES ---- */}
      <section className="section bg-mint">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow">What We Do</span>
            <h2>Complete Dental Care, Under One Roof</h2>
            <p>From routine cleanings to full smile makeovers — every treatment delivered with skill and a gentle touch.</p>
          </div>
          <div className="svc-grid anim-stagger">
            {SERVICES.slice(0, 3).map((s) => (
              <div className="svc-card" key={s.id}>
                {s.tag && <span className="svc-tag">{s.tag}</span>}
                <div className="svc-icon"><Icon name={s.icon} size={28} /></div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div className="svc-price">{s.price} <small>{s.unit}</small></div>
              </div>
            ))}
          </div>
          <div className="anim" style={{ textAlign: 'center', marginTop: 40 }}>
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
            <div className="anim">
              <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                   alt="Dentist caring for a patient"
                   className="why-img" loading="lazy" />
            </div>
            <div className="anim">
              <span className="eyebrow">Why Shyam Dental</span>
              <h2 style={{ fontSize: '2.3rem', marginBottom: 16 }}>
                Dentistry that feels different — calm, clear and caring.
              </h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>
                We've reimagined the dental visit. No long waits, no confusing bills, no fear.
                Just honest advice, modern technology and a team that treats you like family.
              </p>
              <div className="anim-stagger">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- IMPACT NUMBERS BAND ---- */}
      <section className="section impact-band">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow" style={{ color: 'var(--mint-400)' }}>Our Impact</span>
            <h2 style={{ color: '#fff' }}>Numbers That Build Trust</h2>
          </div>
          <div className="impact-grid anim-stagger">
            {[
              { num: 25000, suffix: '+', label: 'Patients Treated', ic: 'users' },
              { num: 17, suffix: ' yrs', label: 'Years of Service', ic: 'award' },
              { num: 4900, suffix: '+', label: 'Implants Placed', ic: 'anchor' },
              { num: 98, suffix: '%', label: 'Patient Satisfaction', ic: 'heart' },
            ].map((x) => (
              <div className="impact-item" key={x.label}>
                <div className="impact-ic"><Icon name={x.ic} size={26} /></div>
                <b><CountUp value={x.num} suffix={x.suffix} /></b>
                <span>{x.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- DOCTORS ---- */}
      <section className="section bg-mint">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow">Meet The Team</span>
            <h2>Experts You Can Trust</h2>
            <p>Award-winning specialists devoted to keeping your smile healthy for life.</p>
          </div>
          <div className="doc-grid anim-stagger">
            {DOCTORS.map((d) => (
              <div className="doc-card" key={d.id}>
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
              </div>
            ))}
          </div>
          <div className="anim" style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/doctors" className="btn btn-ghost">
              Meet All Doctors <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- REVIEWS ---- */}
      <section className="section">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow">Patient Stories</span>
            <h2>Smiles That Speak For Us</h2>
            <p>Real words from real patients who found their confidence again.</p>
          </div>
          <div className="rev-grid anim-stagger">
            {REVIEWS.slice(0, 3).map((r) => (
              <div className="rev-card" key={r.id}>
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
              </div>
            ))}
          </div>
          <div className="anim" style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/reviews" className="btn btn-ghost">
              Read All Reviews <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band anim">
            <div className="cta-tooth"><Icon name="tooth" size={210} /></div>
            <h2>Ready for a Healthier, Brighter Smile?</h2>
            <p>Book your appointment in under 60 seconds — it's free and easy.</p>
            <Link to="/booking" className="btn btn-gold btn-lg">
              <Icon name="calendar" size={19} /> Book Your Visit Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
