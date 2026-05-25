/* ============================================================
   Admin Dashboard — full clinic management panel
   Sections: Overview, Appointments, Patients, Billing, Analytics
   ============================================================ */

import { useState } from 'react'
import Icon from '../components/Icon'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  REVENUE_BARS, REVENUE_BY_TREATMENT, ACTIVITY_FEED,
} from '../data/clinicData'

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'appointments', label: 'Appointments', icon: 'calendar' },
  { id: 'patients', label: 'Patients', icon: 'users' },
  { id: 'billing', label: 'Billing', icon: 'card' },
  { id: 'analytics', label: 'Analytics', icon: 'chart' },
]

const inr = (n) => '₹' + n.toLocaleString('en-IN')

function statusClass(s) {
  return {
    confirmed: 'st-confirmed', pending: 'st-pending', done: 'st-done', cancelled: 'st-cancelled',
    paid: 'st-paid', partial: 'st-partial', Active: 'st-active', 'Follow-up': 'st-followup',
  }[s] || 'st-pending'
}

export default function AdminDashboard() {
  const {
    appointments, updateAppointmentStatus, deleteAppointment,
    patients, addPatient, invoices, logoutAdmin, resetDemo,
  } = useApp()
  const notify = useToast()

  const [tab, setTab] = useState('overview')
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newPat, setNewPat] = useState({ name: '', age: '', gender: 'Female', phone: '', email: '', treatment: '' })

  // ---- derived metrics ----
  const todayAppts = appointments.filter((a) => a.date === 'Today')
  const pendingCount = appointments.filter((a) => a.status === 'pending').length
  const paidRevenue = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const pendingRevenue = invoices.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)

  // ---- appointment status cycle ----
  const cycleStatus = (a) => {
    const order = ['pending', 'confirmed', 'done', 'cancelled']
    const next = order[(order.indexOf(a.status) + 1) % order.length]
    updateAppointmentStatus(a.id, next)
  }

  // ---- add patient ----
  const savePatient = () => {
    if (!newPat.name.trim() || !newPat.phone.trim()) {
      return notify('Missing info', 'Please enter at least name and phone.', 'error')
    }
    addPatient({
      id: 'P-' + Math.floor(1050 + Math.random() * 900),
      name: newPat.name.trim(),
      age: newPat.age || '—',
      gender: newPat.gender,
      phone: newPat.phone.trim(),
      email: newPat.email.trim() || '—',
      last: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      treatment: newPat.treatment.trim() || 'Consultation',
      status: 'Active',
      balance: 0,
    })
    setNewPat({ name: '', age: '', gender: 'Female', phone: '', email: '', treatment: '' })
    setShowAdd(false)
    notify('Patient added ✅', `${newPat.name} is now in your records.`)
  }

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  )

  const handleReset = () => {
    resetDemo()
    notify('Demo reset', 'All data restored to the original sample set.')
  }

  // ---- KPI cards ----
  const kpis = [
    { ic: 'calendar', bg: '#d6f6ef', c: '#0f7268', val: todayAppts.length, label: "Today's Appointments", trend: '+3 vs yesterday', up: true },
    { ic: 'users', bg: '#fff1d6', c: '#9a6b00', val: patients.length, label: 'Total Patients', trend: '+12 this week', up: true },
    { ic: 'rupee', bg: '#e7e1ff', c: '#5b46c9', val: inr(paidRevenue), label: 'Revenue Collected', trend: '+18% growth', up: true },
    { ic: 'star', bg: '#ffe1da', c: '#c0392b', val: '4.9', label: 'Avg. Rating', trend: '1,800+ reviews', up: true },
  ]

  return (
    <div className="dash">
      {/* SIDEBAR (desktop) */}
      <aside className="dash-side">
        <div className="ds-brand">Shyam Dental</div>
        <div className="ds-sub">Admin Panel</div>
        {TABS.map((t) => (
          <button key={t.id} className={'ds-link' + (tab === t.id ? ' active' : '')}
                  onClick={() => setTab(t.id)}>
            <Icon name={t.icon} size={18} /> {t.label}
          </button>
        ))}
        <div className="ds-spacer" />
        <div className="ds-user">
          <div className="ds-avatar">S</div>
          <div>
            <b>Dr. Shyam K.</b>
            <span>Administrator</span>
          </div>
        </div>
        <button className="ds-logout" onClick={logoutAdmin}>
          <Icon name="logout" size={17} /> Log Out
        </button>
      </aside>

      {/* MOBILE TAB BAR */}
      <div className="dash-mobile-bar">
        {TABS.map((t) => (
          <button key={t.id} className={'ds-link' + (tab === t.id ? ' active' : '')}
                  onClick={() => setTab(t.id)}>
            <Icon name={t.icon} size={16} /> {t.label}
          </button>
        ))}
        <button className="ds-link" onClick={logoutAdmin}>
          <Icon name="logout" size={16} /> Log Out
        </button>
      </div>

      {/* BODY */}
      <div className="dash-body">
        <div className="dash-topbar">
          <div>
            <h1>{TABS.find((t) => t.id === tab).label}</h1>
            <div className="dt-sub">
              Welcome back, Dr. Shyam — here's what's happening at your clinic.
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={handleReset}>
            <Icon name="activity" size={15} /> Reset Demo Data
          </button>
        </div>

        {/* ============ OVERVIEW ============ */}
        {tab === 'overview' && (
          <>
            <div className="kpi-grid">
              {kpis.map((k) => (
                <div className="kpi" key={k.label}>
                  <div className="kpi-ic" style={{ background: k.bg, color: k.c }}>
                    <Icon name={k.ic} size={20} />
                  </div>
                  <b>{k.val}</b>
                  <div className="kpi-label">{k.label}</div>
                  <div className={'kpi-trend ' + (k.up ? 'trend-up' : 'trend-down')}>
                    <Icon name="trend" size={13} /> {k.trend}
                  </div>
                </div>
              ))}
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Today's Schedule</h3>
                <span style={{ fontSize: '.85rem', color: 'var(--ink-soft)' }}>
                  {todayAppts.length} appointments · {pendingCount} pending
                </span>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr><th>Time</th><th>Patient</th><th>Doctor</th><th>Treatment</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {todayAppts.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--ink-mute)' }}>
                        No appointments today.
                      </td></tr>
                    )}
                    {todayAppts.map((a) => (
                      <tr key={a.id}>
                        <td><b>{a.time}</b></td>
                        <td><span className="cell-name"><span className="pat-avatar">{a.patient.charAt(0)}</span>{a.patient}</span></td>
                        <td>{a.doctor}</td>
                        <td>{a.service}</td>
                        <td><span className={'status ' + statusClass(a.status)}>{a.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel-row2">
              <div className="panel">
                <div className="panel-head"><h3>Revenue Trend (6 Months)</h3></div>
                <div className="bars">
                  {REVENUE_BARS.map((b) => (
                    <div className="bar-col" key={b.label}>
                      <div className="bar" style={{ height: b.value + '%' }} />
                      <span>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel">
                <div className="panel-head"><h3>Recent Activity</h3></div>
                {ACTIVITY_FEED.map((a, i) => (
                  <div className="activity-item" key={i}>
                    <div className="act-ic" style={{ background: a.color + '22', color: a.color }}>
                      <Icon name={a.icon} size={17} />
                    </div>
                    <div>
                      <div className="act-text">{a.text}</div>
                      <div className="act-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ============ APPOINTMENTS ============ */}
        {tab === 'appointments' && (
          <div className="panel">
            <div className="panel-head">
              <h3>All Appointments ({appointments.length})</h3>
              <span style={{ fontSize: '.82rem', color: 'var(--teal-600)', fontWeight: 600 }}>
                Tap a status to update · use 🗑 to remove
              </span>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Treatment</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontWeight: 600 }}>{a.id}</td>
                      <td><span className="cell-name"><span className="pat-avatar">{a.patient.charAt(0)}</span>{a.patient}</span></td>
                      <td>{a.doctor}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>
                      <td>{a.service}</td>
                      <td>
                        <span className={'status clickable ' + statusClass(a.status)}
                              onClick={() => cycleStatus(a)} title="Click to change">
                          {a.status}
                        </span>
                      </td>
                      <td>
                        <button className="icon-btn danger"
                                onClick={() => { deleteAppointment(a.id); notify('Appointment removed', a.id + ' deleted.') }}
                                aria-label="Delete">
                          <Icon name="trash" size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============ PATIENTS ============ */}
        {tab === 'patients' && (
          <div className="panel">
            <div className="panel-head">
              <h3>Patient Records ({patients.length})</h3>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="search-box">
                  <span className="s-icon"><Icon name="search" size={16} /></span>
                  <input placeholder="Search name, ID or phone..."
                         value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(!showAdd)}>
                  <Icon name="plus" size={15} /> Add Patient
                </button>
              </div>
            </div>

            {showAdd && (
              <div className="add-form">
                <div className="add-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Full Name *</label>
                    <input value={newPat.name} placeholder="Patient name"
                           onChange={(e) => setNewPat({ ...newPat, name: e.target.value })} />
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Age</label>
                    <input value={newPat.age} placeholder="Age"
                           onChange={(e) => setNewPat({ ...newPat, age: e.target.value })} />
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Gender</label>
                    <select value={newPat.gender}
                            onChange={(e) => setNewPat({ ...newPat, gender: e.target.value })}>
                      <option>Female</option><option>Male</option><option>Other</option>
                    </select>
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Phone *</label>
                    <input value={newPat.phone} placeholder="Phone number"
                           onChange={(e) => setNewPat({ ...newPat, phone: e.target.value })} />
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Email</label>
                    <input value={newPat.email} placeholder="Email"
                           onChange={(e) => setNewPat({ ...newPat, email: e.target.value })} />
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Treatment</label>
                    <input value={newPat.treatment} placeholder="Treatment"
                           onChange={(e) => setNewPat({ ...newPat, treatment: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button className="btn btn-primary btn-sm" onClick={savePatient}>
                    <Icon name="check" size={15} /> Save Patient
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th>ID</th><th>Patient</th><th>Age</th><th>Gender</th><th>Phone</th><th>Last Visit</th><th>Treatment</th><th>Balance</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {filteredPatients.length === 0 && (
                    <tr><td colSpan="9" style={{ textAlign: 'center', color: 'var(--ink-mute)' }}>
                      No patients match your search.
                    </td></tr>
                  )}
                  {filteredPatients.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.id}</td>
                      <td><span className="cell-name"><span className="pat-avatar">{p.name.charAt(0)}</span>{p.name}</span></td>
                      <td>{p.age}</td>
                      <td>{p.gender}</td>
                      <td>{p.phone}</td>
                      <td>{p.last}</td>
                      <td>{p.treatment}</td>
                      <td style={{ color: p.balance > 0 ? 'var(--coral)' : 'var(--ink-soft)', fontWeight: 600 }}>
                        {p.balance > 0 ? inr(p.balance) : '—'}
                      </td>
                      <td><span className={'status ' + statusClass(p.status)}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============ BILLING ============ */}
        {tab === 'billing' && (
          <>
            <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              <div className="kpi">
                <div className="kpi-ic" style={{ background: '#d6f6ef', color: '#0f7268' }}>
                  <Icon name="check" size={20} />
                </div>
                <b>{inr(paidRevenue)}</b>
                <div className="kpi-label">Collected</div>
              </div>
              <div className="kpi">
                <div className="kpi-ic" style={{ background: '#fff1d6', color: '#9a6b00' }}>
                  <Icon name="clock" size={20} />
                </div>
                <b>{inr(pendingRevenue)}</b>
                <div className="kpi-label">Outstanding</div>
              </div>
              <div className="kpi">
                <div className="kpi-ic" style={{ background: '#e7e1ff', color: '#5b46c9' }}>
                  <Icon name="file" size={20} />
                </div>
                <b>{invoices.length}</b>
                <div className="kpi-label">Total Invoices</div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Invoices &amp; Payments</h3>
                <button className="btn btn-ghost btn-sm"
                        onClick={() => notify('Export ready', 'Invoice report downloaded (demo).')}>
                  <Icon name="download" size={15} /> Export
                </button>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr><th>Invoice</th><th>Patient</th><th>Date</th><th>Service</th><th>Amount</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {invoices.map((iv) => (
                      <tr key={iv.id}>
                        <td style={{ fontWeight: 600 }}>{iv.id}</td>
                        <td>{iv.patient}</td>
                        <td>{iv.date}</td>
                        <td>{iv.service}</td>
                        <td style={{ fontWeight: 600, color: 'var(--teal-700)' }}>{inr(iv.amount)}</td>
                        <td><span className={'status ' + statusClass(iv.status)}>{iv.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ============ ANALYTICS ============ */}
        {tab === 'analytics' && (
          <>
            <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {[
                { ic: 'rupee', bg: '#d6f6ef', c: '#0f7268', val: '₹1,84,500', label: 'This Month' },
                { ic: 'chart', bg: '#fff1d6', c: '#9a6b00', val: '₹9,72,000', label: 'This Quarter' },
                { ic: 'card', bg: '#e7e1ff', c: '#5b46c9', val: '₹2,640', label: 'Avg. per Patient' },
              ].map((k) => (
                <div className="kpi" key={k.label}>
                  <div className="kpi-ic" style={{ background: k.bg, color: k.c }}>
                    <Icon name={k.ic} size={20} />
                  </div>
                  <b>{k.val}</b>
                  <div className="kpi-label">{k.label}</div>
                </div>
              ))}
            </div>

            <div className="panel">
              <div className="panel-head"><h3>Monthly Revenue</h3></div>
              <div className="bars" style={{ height: 220 }}>
                {REVENUE_BARS.map((b) => (
                  <div className="bar-col" key={b.label}>
                    <div className="bar" style={{ height: b.value + '%' }} />
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-row2">
              <div className="panel">
                <div className="panel-head"><h3>Revenue by Treatment</h3></div>
                <div className="table-scroll">
                  <table>
                    <thead><tr><th>Treatment</th><th>Patients</th><th>Revenue</th><th>Share</th></tr></thead>
                    <tbody>
                      {REVENUE_BY_TREATMENT.map((r) => (
                        <tr key={r.name}>
                          <td><b>{r.name}</b></td>
                          <td>{r.patients}</td>
                          <td style={{ color: 'var(--teal-700)', fontWeight: 600 }}>{inr(r.revenue)}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div className="progress"><span style={{ width: r.share + '%' }} /></div>
                              <span style={{ fontSize: '.81rem' }}>{r.share}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="panel">
                <div className="panel-head"><h3>Clinic Health</h3></div>
                {[
                  ['No-show rate', '2.4%'],
                  ['New patients (May)', '48'],
                  ['Treatments completed', '312'],
                  ['Pending follow-ups', '9'],
                  ['Returning patients', '74%'],
                  ['Online bookings', '63%'],
                ].map(([k, v]) => (
                  <div className="stat-row" key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
