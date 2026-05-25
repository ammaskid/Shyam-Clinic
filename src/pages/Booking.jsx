/* ============================================================
   Booking Page — multi-step appointment flow
   ============================================================ */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { SERVICES, DOCTORS, TIME_SLOTS } from '../data/clinicData'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'

const STEP_LABELS = ['Service', 'Doctor & Time', 'Your Details', 'Done']

export default function Booking() {
  const navigate = useNavigate()
  const { addAppointment } = useApp()
  const notify = useToast()

  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(null)
  const [data, setData] = useState({
    service: '', doctor: '', date: '', slot: '',
    name: '', phone: '', email: '', notes: '',
  })

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const today = new Date().toISOString().split('T')[0]

  const next = () => {
    if (step === 1 && !data.service) {
      return notify('Select a service', 'Please pick a treatment to continue.', 'error')
    }
    if (step === 2) {
      if (!data.doctor) return notify('Choose a doctor', 'Please select a doctor.', 'error')
      if (!data.date) return notify('Pick a date', 'Please select an appointment date.', 'error')
      if (!data.slot) return notify('Pick a time', 'Please select a time slot.', 'error')
    }
    if (step === 3) {
      if (!data.name.trim() || !data.phone.trim()) {
        return notify('Details required', 'Please enter your name and phone number.', 'error')
      }
      if (!/^[0-9+\-\s]{7,15}$/.test(data.phone.trim())) {
        return notify('Invalid phone', 'Please enter a valid phone number.', 'error')
      }
      const appt = {
        id: 'A-' + Math.floor(509 + Math.random() * 490),
        patient: data.name.trim(),
        doctor: data.doctor,
        date: new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        time: data.slot,
        service: data.service,
        status: 'confirmed',
        phone: data.phone.trim(),
        email: data.email.trim(),
      }
      addAppointment(appt)
      setConfirmed(appt)
      setStep(4)
      notify('Appointment Confirmed! ✅', 'A WhatsApp confirmation has been sent.')
      window.scrollTo(0, 0)
      return
    }
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const back = () => { setStep(step - 1); window.scrollTo(0, 0) }

  const reset = () => {
    setStep(1)
    setConfirmed(null)
    setData({ service: '', doctor: '', date: '', slot: '', name: '', phone: '', email: '', notes: '' })
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">Home / Book Appointment</div>
          <h1>Book Your <em>Appointment</em></h1>
          <p>It takes less than a minute. Choose, confirm, and you're set.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="form-card">

            {/* STEP INDICATOR */}
            {step < 4 && (
              <div className="steps">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1
                  const on = step >= n
                  return (
                    <div className="step-node" key={label}>
                      <div className="step-dot">
                        <div className={'step-circle' + (on ? ' active' : '')}>
                          {step > n ? <Icon name="check" size={18} /> : n}
                        </div>
                        <span className={'step-label' + (on ? ' active' : '')}>{label}</span>
                      </div>
                      {i < 3 && <div className={'step-line' + (step > n ? ' active' : '')} />}
                    </div>
                  )
                })}
              </div>
            )}

            {/* STEP 1 — SERVICE */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: 6 }}>Which treatment do you need?</h3>
                <p style={{ color: 'var(--ink-soft)', marginBottom: 20, fontSize: '.94rem' }}>
                  Select the service you'd like to book.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
                     className="pick-grid">
                  {SERVICES.map((s) => (
                    <div key={s.id}
                         className={'pick-card' + (data.service === s.name ? ' sel' : '')}
                         onClick={() => set('service', s.name)}>
                      <div className="pc-ic"><Icon name={s.icon} size={22} /></div>
                      <div>
                        <b>{s.name}</b>
                        <span className="pc-sub" style={{ color: 'var(--teal-700)', fontWeight: 600 }}>
                          {s.price} {s.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 — DOCTOR + DATE + SLOT */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: 16 }}>Pick your doctor & time</h3>
                <div className="field">
                  <label>Choose a Doctor</label>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {DOCTORS.map((d) => (
                      <div key={d.id}
                           className={'pick-card' + (data.doctor === d.name ? ' sel' : '')}
                           onClick={() => set('doctor', d.name)}>
                        <img src={d.img} alt={d.name} loading="lazy" />
                        <div>
                          <b>{d.name}</b>
                          <span className="pc-sub">{d.spec}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label>Select a Date</label>
                  <input type="date" min={today} value={data.date}
                         onChange={(e) => set('date', e.target.value)} />
                </div>
                <div className="field">
                  <label>Available Time Slots</label>
                  <div className="slot-grid">
                    {TIME_SLOTS.map((s) => (
                      <div key={s.t}
                           className={'slot' + (s.taken ? ' taken' : '') + (data.slot === s.t ? ' active' : '')}
                           onClick={() => !s.taken && set('slot', s.t)}>
                        {s.t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — DETAILS */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: 16 }}>Your details</h3>
                <div className="form-row">
                  <div className="field">
                    <label>Full Name *</label>
                    <input value={data.name} placeholder="Your full name"
                           onChange={(e) => set('name', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Phone Number *</label>
                    <input value={data.phone} placeholder="10-digit mobile number"
                           onChange={(e) => set('phone', e.target.value)} />
                  </div>
                </div>
                <div className="field">
                  <label>Email (optional)</label>
                  <input value={data.email} placeholder="you@example.com"
                         onChange={(e) => set('email', e.target.value)} />
                </div>
                <div className="field">
                  <label>Anything we should know? (optional)</label>
                  <textarea value={data.notes} placeholder="Symptoms, preferences, etc."
                            onChange={(e) => set('notes', e.target.value)} />
                </div>
                <div style={{ background: 'var(--mint-50)', borderRadius: 14, padding: 18 }}>
                  <b style={{ fontSize: '.88rem', display: 'block', marginBottom: 8 }}>Booking Summary</b>
                  <div style={{ fontSize: '.87rem', color: 'var(--ink-soft)', lineHeight: 2 }}>
                    <div><Icon name="tooth" size={14} />&nbsp; {data.service}</div>
                    <div><Icon name="stethoscope" size={14} />&nbsp; {data.doctor}</div>
                    <div><Icon name="calendar" size={14} />&nbsp; {data.date || '—'} at {data.slot || '—'}</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — CONFIRMED */}
            {step === 4 && confirmed && (
              <div style={{ textAlign: 'center', padding: '14px 0' }}>
                <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--mint-100)',
                              color: 'var(--teal-600)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
                  <Icon name="check" size={44} stroke={2.5} />
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: 6 }}>You're All Booked! 🎉</h2>
                <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>
                  A confirmation has been sent to your WhatsApp &amp; email.
                </p>
                <div style={{ background: 'var(--mint-50)', borderRadius: 16, padding: 22,
                              textAlign: 'left', maxWidth: 380, margin: '0 auto 24px' }}>
                  {[
                    ['Booking ID', confirmed.id],
                    ['Patient', confirmed.patient],
                    ['Treatment', confirmed.service],
                    ['Doctor', confirmed.doctor],
                    ['Date & Time', `${confirmed.date} · ${confirmed.time}`],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between',
                                          padding: '8px 0', borderBottom: '1px solid var(--sand)' }}>
                      <span style={{ color: 'var(--ink-soft)', fontSize: '.87rem' }}>{k}</span>
                      <b style={{ fontSize: '.89rem', textAlign: 'right' }}>{v}</b>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 13,
                                color: 'var(--teal-700)', fontSize: '.83rem', fontWeight: 600 }}>
                    <Icon name="bell" size={15} /> Reminder will be sent 24 hrs before.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Back to Home <Icon name="arrow" size={16} />
                  </button>
                  <button className="btn btn-ghost" onClick={reset}>Book Another</button>
                </div>
              </div>
            )}

            {/* NAV BUTTONS */}
            {step < 4 && (
              <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
                {step > 1 && <button className="btn btn-ghost" onClick={back}>Back</button>}
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={next}>
                  {step === 3 ? 'Confirm Appointment' : 'Continue'} <Icon name="arrow" size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
