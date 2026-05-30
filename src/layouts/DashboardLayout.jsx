import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'

/**
 * DashboardLayout
 * Private shell for all /dashboard/* pages.
 * No Navbar or Footer — only the admin Sidebar + page content.
 * React Router renders the matched dashboard page into <Outlet />.
 */
function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      {/* Left: persistent admin sidebar */}
      <Sidebar />

      {/* Right: scrollable page content area */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout