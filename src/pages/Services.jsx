/* ============================================================
   Services Page — with GSAP animations
   ============================================================ */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePageAnimations } from '../components/useGsapReveal'
import { SERVICES, FAQS } from '../data/clinicData'

const PRICE_LIST = [
  { n: 'Consultation & Oral Exam', d: 'Includes treatment planning', a: '₹300' },
  { n: 'Scaling & Polishing', d: 'Full-mouth professional cleaning', a: '₹500' },
  { n: 'Tooth Filling', d: 'Tooth-coloured composite', a: '₹800' },
  { n: 'Root Canal Treatment', d: 'Single sitting, per tooth', a: '₹3,500' },
  { n: 'Tooth Extraction', d: 'Simple extraction', a: '₹600' },
  { n: 'Dental Crown (Zirconia)', d: 'Per crown, lab included', a: '₹6,500' },
  { n: 'Dental Implant', d: 'Titanium, with crown', a: '₹22,000' },
  { n: 'Complete Braces Treatment', d: 'Metal braces, full course', a: '₹25,000' },
  { n: 'Clear Aligners', d: 'Invisible orthodontics', a: '₹55,000' },
  { n: 'Laser Teeth Whitening', d: 'In-clinic, single session', a: '₹6,000' },
]

export default function Services() {
  const pageRef = usePageAnimations()
  const [active, setActive] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs anim">Home / Services</div>
          <h1 className="anim">Our <em>Treatments</em> & Services</h1>
          <p className="anim">Comprehensive dental care delivered with modern technology and a gentle, caring approach.</p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="svc-grid anim-stagger">
            {SERVICES.map((s) => (
              <div className="svc-card" key={s.id}
                   onClick={() => setActive(active === s.id ? null : s.id)}
                   style={{ cursor: 'pointer' }}>
                {s.tag && <span className="svc-tag">{s.tag}</span>}
                <div className="svc-icon"><Icon name={s.icon} size={28} /></div>
                <h3>{s.name}</h3>
                <p>{active === s.id ? s.long : s.desc}</p>
                <div className="svc-price">{s.price} <small>{s.unit}</small></div>
                <div className="svc-meta"><Icon name="clock" size={13} /> {s.duration} appointment</div>
                <div className="svc-more">{active === s.id ? '− Show less' : '+ Learn more'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE LIST */}
      <section className="section bg-mint">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow">Transparent Pricing</span>
            <h2>Clear Costs, No Surprises</h2>
            <p>Every price is upfront. Easy no-cost EMI options available on treatments above ₹15,000.</p>
          </div>
          <div className="price-table anim-stagger">
            {PRICE_LIST.map((p) => (
              <div className="price-row" key={p.n}>
                <div className="pr-name">
                  <b>{p.n}</b>
                  <span>{p.d}</span>
                </div>
                <div className="pr-amt">{p.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow">Good to Know</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you might want to know before your visit.</p>
          </div>
          <div className="faq-list anim-stagger">
            {FAQS.map((f, i) => (
              <div className="faq-item" key={i}>
                <button className={'faq-q' + (openFaq === i ? ' open' : '')}
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                  <span className="faq-icon"><Icon name="plus" size={20} /></span>
                </button>
                <div className={'faq-a' + (openFaq === i ? ' open' : '')}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band anim">
            <div className="cta-tooth"><Icon name="sparkle" size={210} /></div>
            <h2>Not Sure Which Treatment You Need?</h2>
            <p>Book a consultation — our doctors will guide you with an honest plan.</p>
            <Link to="/booking" className="btn btn-gold btn-lg">
              <Icon name="stethoscope" size={19} /> Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
