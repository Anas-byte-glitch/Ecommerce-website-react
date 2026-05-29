import Navbar from '../components/common/Navbar'
import HeroSection from '../components/home/HeroSection'

function HomePage() {
  return (
    <>
      <Navbar cartCount={0} />
      <HeroSection />
    </>
  )
}

export default HomePage
