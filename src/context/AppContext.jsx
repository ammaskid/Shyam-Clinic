/* ============================================================
   Global App Context
   Holds shared state: appointments, patients, reviews, invoices.
   Persists to localStorage so a clinic's demo data survives refresh.
   ============================================================ */

import { createContext, useContext, useState, useEffect } from 'react'
import {
  APPOINTMENTS, PATIENTS, REVIEWS, INVOICES,
} from '../data/clinicData'

const AppContext = createContext(null)

// Helper: load from localStorage or fall back to seed data
function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [appointments, setAppointments] = useState(() => loadState('sd_appointments', APPOINTMENTS))
  const [patients, setPatients] = useState(() => loadState('sd_patients', PATIENTS))
  const [reviews, setReviews] = useState(() => loadState('sd_reviews', REVIEWS))
  const [invoices, setInvoices] = useState(() => loadState('sd_invoices', INVOICES))

  // Admin auth — session only (clears on tab close)
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return sessionStorage.getItem('sd_admin') === 'true' } catch { return false }
  })

  // Persist whenever data changes
  useEffect(() => { localStorage.setItem('sd_appointments', JSON.stringify(appointments)) }, [appointments])
  useEffect(() => { localStorage.setItem('sd_patients', JSON.stringify(patients)) }, [patients])
  useEffect(() => { localStorage.setItem('sd_reviews', JSON.stringify(reviews)) }, [reviews])
  useEffect(() => { localStorage.setItem('sd_invoices', JSON.stringify(invoices)) }, [invoices])

  // ---- Actions ----
  const addAppointment = (appt) => {
    setAppointments((a) => [appt, ...a])
    // auto-create a patient record if new
    setPatients((p) => {
      if (p.some((x) => x.name.toLowerCase() === appt.patient.toLowerCase())) return p
      return [{
        id: 'P-' + Math.floor(1050 + Math.random() * 900),
        name: appt.patient,
        age: appt.age || '—',
        gender: '—',
        phone: appt.phone || '—',
        email: appt.email || '—',
        last: appt.date,
        treatment: appt.service,
        status: 'Active',
        balance: 0,
      }, ...p]
    })
  }

  const updateAppointmentStatus = (id, status) => {
    setAppointments((a) => a.map((x) => (x.id === id ? { ...x, status } : x)))
  }

  const deleteAppointment = (id) => {
    setAppointments((a) => a.filter((x) => x.id !== id))
  }

  const addPatient = (patient) => setPatients((p) => [patient, ...p])

  const addReview = (review) => setReviews((r) => [review, ...r])

  const loginAdmin = () => {
    setIsAdmin(true)
    try { sessionStorage.setItem('sd_admin', 'true') } catch { /* ignore */ }
  }
  const logoutAdmin = () => {
    setIsAdmin(false)
    try { sessionStorage.removeItem('sd_admin') } catch { /* ignore */ }
  }

  // Reset everything to seed data (handy for sales demos)
  const resetDemo = () => {
    setAppointments(APPOINTMENTS)
    setPatients(PATIENTS)
    setReviews(REVIEWS)
    setInvoices(INVOICES)
    localStorage.removeItem('sd_appointments')
    localStorage.removeItem('sd_patients')
    localStorage.removeItem('sd_reviews')
    localStorage.removeItem('sd_invoices')
  }

  const value = {
    appointments, setAppointments, addAppointment, updateAppointmentStatus, deleteAppointment,
    patients, setPatients, addPatient,
    reviews, addReview,
    invoices, setInvoices,
    isAdmin, loginAdmin, logoutAdmin,
    resetDemo,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
