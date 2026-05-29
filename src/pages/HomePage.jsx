import Navbar from '../components/common/Navbar'
import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/home/FeaturedProducts'

function HomePage() {
  return (
    <>
      <Navbar cartCount={0} />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
    </>
  )
}

export default HomePage
