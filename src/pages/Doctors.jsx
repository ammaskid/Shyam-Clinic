/* ============================================================
   Doctors Page
   ============================================================ */

import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { DOCTORS } from '../data/clinicData'

export default function Doctors() {
  const navigate = useNavigate()

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">Home / Our Doctors</div>
          <h1>Meet Our <em>Specialists</em></h1>
          <p>A team of award-winning, deeply experienced dentists who genuinely care about your comfort.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="doc-grid">
            {DOCTORS.map((d, i) => (
              <Reveal className="doc-card" key={d.id} delay={(i % 4) * 0.07}>
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
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-mute)', marginTop: 8 }}>
                    {d.qualifications}
                  </div>
                  <button className="btn btn-ghost btn-block btn-sm" style={{ marginTop: 14 }}
                          onClick={() => navigate('/booking')}>
                    <Icon name="calendar" size={15} /> Book with {d.short}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="section bg-teal">
        <div className="container">
          <Reveal className="section-head" >
            <span className="eyebrow" style={{ color: 'var(--mint-400)' }}>Our Promise</span>
            <h2 style={{ color: '#fff' }}>Care Backed by Credentials</h2>
          </Reveal>
          <div className="feat-grid">
            {[
              { ic: 'award', t: 'Certified Specialists', d: 'Every doctor board-certified in their field.' },
              { ic: 'shieldcheck', t: 'Strict Sterilisation', d: 'Autoclaved instruments for total safety.' },
              { ic: 'users', t: '25,000+ Patients', d: 'Trusted by families across Kerala.' },
              { ic: 'star', t: '4.9★ Rated', d: 'Consistently top-reviewed in Kollam.' },
            ].map((x, i) => (
              <Reveal className="feat-item" key={x.t} delay={i * 0.08}>
                <div className="fi-ic" style={{ background: 'rgba(255,255,255,.1)', color: 'var(--mint-400)' }}>
                  <Icon name={x.ic} size={28} />
                </div>
                <h4 style={{ color: '#fff' }}>{x.t}</h4>
                <p style={{ color: 'rgba(255,255,255,.6)' }}>{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
