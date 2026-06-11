import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CartDrawer from '../components/cart/CartDrawer'
import ScrollToTop from '../components/common/ScrollToTop'

function MainLayout() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // سرعة السكروول
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false, // مهم: يوقفه في الموبايل
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      
      <Navbar />
      <CartDrawer />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default MainLayout