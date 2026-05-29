import Navbar from '../components/common/Navbar'
import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'

function HomePage() {
  return (
    <>
      <Navbar cartCount={0} />
      <HeroSection />
      <CategorySection />
    </>
  )
}

export default HomePage
