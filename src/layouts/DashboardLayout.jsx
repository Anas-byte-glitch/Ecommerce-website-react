import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import '../styles/Dashboard/DashboardLayout.css'  // ← هذا السطر فقط

function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout