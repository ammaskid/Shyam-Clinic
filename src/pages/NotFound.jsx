/* ============================================================
   404 Not Found
   ============================================================ */

import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div style={{ width: 84, height: 84, borderRadius: 22, margin: '0 auto 22px',
                      background: 'var(--mint-100)', color: 'var(--teal-600)',
                      display: 'grid', placeItems: 'center' }}>
          <Icon name="tooth" size={44} />
        </div>
        <h1 style={{ fontSize: '2.6rem', marginBottom: 8 }}>404</h1>
        <h2 style={{ fontSize: '1.3rem', marginBottom: 10, fontWeight: 500 }}>Page Not Found</h2>
        <p style={{ color: 'var(--ink-soft)', marginBottom: 24 }}>
          Looks like this page took a trip to the dentist. Let's get you back home.
        </p>
        <Link to="/" className="btn btn-primary">
          <Icon name="arrowleft" size={17} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
