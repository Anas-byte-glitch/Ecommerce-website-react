import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

/**
 * MainLayout
 * Shared shell for all public-facing pages (Home, Shop, About, …).
 * React Router renders the matched child page into <Outlet />.
 */
function MainLayout() {
  return (
    <>
      <Navbar cartCount={0} />

      {/* Each public page renders here — no page needs its own Navbar/Footer */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default MainLayout