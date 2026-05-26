/* ============================================================
   Doctors Page — with GSAP animations
   ============================================================ */

import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import CountUp from '../components/CountUp'
import Scene3D from '../components/Scene3D'
import { usePageAnimations } from '../components/useGsapReveal'
import { DOCTORS } from '../data/clinicData'

export default function Doctors() {
  const pageRef = usePageAnimations()
  const navigate = useNavigate()

  return (
    <div ref={pageRef}>
      <section className="page-hero page-hero-3d">
        <div className="container page-hero-grid">
          <div>
            <div className="crumbs anim">Home / Our Doctors</div>
            <h1 className="anim">Meet Our <em>Specialists</em></h1>
            <p className="anim">A team of award-winning, deeply experienced dentists who genuinely care about your comfort.</p>
          </div>
          <div className="page-hero-3d-stage anim">
            <Scene3D variant="shield" height={280} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
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
                    <span><Icon name="award" size={14} /> Certified</span>
                  </div>
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-mute)', marginTop: 8 }}>
                    {d.qualifications}
                  </div>
                  <button className="btn btn-ghost btn-block btn-sm" style={{ marginTop: 14 }}
                          onClick={() => navigate('/booking')}>
                    <Icon name="calendar" size={15} /> Book with {d.short}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP with animated numbers */}
      <section className="section bg-teal">
        <div className="container">
          <div className="section-head anim">
            <span className="eyebrow" style={{ color: 'var(--mint-400)' }}>Our Promise</span>
            <h2 style={{ color: '#fff' }}>Care Backed by Credentials</h2>
          </div>
          <div className="feat-grid anim-stagger">
            {[
              { num: 50, suffix: '+', t: 'Certified Awards', d: 'Recognised excellence in dental care.', ic: 'award' },
              { num: 100, suffix: '%', t: 'Sterilisation', d: 'Autoclaved instruments, every time.', ic: 'shieldcheck' },
              { num: 25000, suffix: '+', t: 'Patients Treated', d: 'Trusted by families across Kerala.', ic: 'users' },
              { num: 4.9, suffix: '★', decimals: 1, t: 'Average Rating', d: 'Consistently top-reviewed in Kollam.', ic: 'star' },
            ].map((x) => (
              <div className="feat-item" key={x.t}>
                <div className="fi-ic" style={{ background: 'rgba(255,255,255,.1)', color: 'var(--mint-400)' }}>
                  <Icon name={x.ic} size={28} />
                </div>
                <h4 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: 4 }}>
                  <CountUp value={x.num} suffix={x.suffix} decimals={x.decimals || 0} />
                </h4>
                <b style={{ color: '#fff', display: 'block', marginBottom: 4 }}>{x.t}</b>
                <p style={{ color: 'rgba(255,255,255,.6)' }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
