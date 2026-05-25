/* ============================================================
   Admin Login — passcode gate
   ============================================================ */

import { useState } from 'react'
import Icon from '../components/Icon'
import { CLINIC } from '../data/clinicData'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'

export default function AdminLogin() {
  const { loginAdmin } = useApp()
  const notify = useToast()
  const [code, setCode] = useState('')
  const [shake, setShake] = useState(false)
  const [show, setShow] = useState(false)

  const tryLogin = () => {
    if (code.trim() === CLINIC.adminPasscode) {
      loginAdmin()
      notify('Welcome back, Doctor 👋', 'You now have full access to the clinic panel.')
    } else {
      setShake(true)
      notify('Incorrect passcode', 'Please check and try again.', 'error')
      setTimeout(() => setShake(false), 450)
      setCode('')
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login">
        <div className="admin-lock"><Icon name="lock" size={32} /></div>
        <h2>Clinic Admin Access</h2>
        <p>This area is restricted. Please enter the staff passcode to continue.</p>

        <div style={{ position: 'relative' }}>
          <input
            className={'passcode-input' + (shake ? ' shake' : '')}
            type={show ? 'text' : 'password'}
            value={code}
            placeholder="••••••••"
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryLogin()}
            autoFocus
          />
          <button onClick={() => setShow(!show)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                           color: 'var(--ink-mute)' }}
                  aria-label="Toggle visibility">
            <Icon name="eye" size={20} />
          </button>
        </div>

        <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 18 }} onClick={tryLogin}>
          <Icon name="shieldcheck" size={18} /> Unlock Dashboard
        </button>

        <div className="admin-hint">
          Demo passcode: <code>{CLINIC.adminPasscode}</code>
          <br />
          <span style={{ fontSize: '.74rem' }}>
            (The clinic can change this in <code>src/data/clinicData.js</code>)
          </span>
        </div>
      </div>
    </div>
  )
}
