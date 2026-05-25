/* ============================================================
   Admin — wrapper page
   Shows the passcode gate, or the dashboard once authenticated.
   ============================================================ */

import { useApp } from '../context/AppContext'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function Admin() {
  const { isAdmin } = useApp()
  return isAdmin ? <AdminDashboard /> : <AdminLogin />
}
