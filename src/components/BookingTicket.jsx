/* ============================================================
   BookingTicket — a beautiful ticket-style confirmation modal
   shown after an appointment is booked. Rendered via portal.
   ============================================================ */

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon'

export default function BookingTicket({ booking, onClose, onViewHome }) {
  // lock scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!booking) return null

  const ticket = (
    <div className="ticket-overlay" onClick={onClose}>
      <div className="ticket-wrap" onClick={(e) => e.stopPropagation()}>
        {/* confetti dots */}
        <div className="ticket-confetti">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={'confetti c' + (i % 5)}
                  style={{ left: (7 + i * 6.4) + '%', animationDelay: (i * 0.12) + 's' }} />
          ))}
        </div>

        <button className="ticket-close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={20} />
        </button>

        <div className="ticket">
          {/* TOP — success header */}
          <div className="ticket-top">
            <div className="ticket-check">
              <Icon name="check" size={34} stroke={3} />
            </div>
            <h3>Appointment Confirmed!</h3>
            <p>Your smile journey is booked 🎉</p>
          </div>

          {/* perforation */}
          <div className="ticket-perf">
            <span className="perf-notch left" />
            <span className="perf-line" />
            <span className="perf-notch right" />
          </div>

          {/* BODY — details */}
          <div className="ticket-body">
            <div className="ticket-clinic">
              <div className="ticket-clinic-mark"><Icon name="tooth" size={20} /></div>
              <div>
                <b>Shyam Dental Clinic</b>
                <span>MG Road, Kollam, Kerala</span>
              </div>
            </div>

            <div className="ticket-rows">
              <div className="ticket-row">
                <span className="tr-label"><Icon name="file" size={14} /> Booking ID</span>
                <b className="tr-value">{booking.id}</b>
              </div>
              <div className="ticket-row">
                <span className="tr-label"><Icon name="users" size={14} /> Patient</span>
                <b className="tr-value">{booking.patient}</b>
              </div>
              <div className="ticket-row">
                <span className="tr-label"><Icon name="tooth" size={14} /> Treatment</span>
                <b className="tr-value">{booking.service}</b>
              </div>
              <div className="ticket-row">
                <span className="tr-label"><Icon name="stethoscope" size={14} /> Doctor</span>
                <b className="tr-value">{booking.doctor}</b>
              </div>
            </div>

            {/* date + time highlight */}
            <div className="ticket-datetime">
              <div className="ticket-dt-box">
                <Icon name="calendar" size={18} />
                <div>
                  <span>Date</span>
                  <b>{booking.date}</b>
                </div>
              </div>
              <div className="ticket-dt-box">
                <Icon name="clock" size={18} />
                <div>
                  <span>Time</span>
                  <b>{booking.time}</b>
                </div>
              </div>
            </div>

            {/* fake barcode */}
            <div className="ticket-barcode">
              {Array.from({ length: 44 }).map((_, i) => (
                <span key={i} style={{ width: (Math.random() * 3 + 1) + 'px' }} />
              ))}
            </div>
            <div className="ticket-note">
              <Icon name="bell" size={14} /> A WhatsApp reminder will be sent 24 hours before.
            </div>
          </div>

          {/* ACTIONS */}
          <div className="ticket-actions">
            <button className="btn btn-primary btn-block" onClick={onViewHome}>
              <Icon name="check" size={17} /> Done
            </button>
            <button className="btn btn-ghost btn-block" onClick={onClose}>
              Book Another
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return typeof document !== 'undefined'
    ? createPortal(ticket, document.body)
    : null
}
