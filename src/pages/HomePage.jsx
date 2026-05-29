import Navbar from '../components/common/Navbar'
import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BenefitsSection from '../components/home/BenefitsSection'
import SocialGallerySection from '../components/home/SocialGallerySection'

function HomePage() {
  return (
    <>
      <Navbar cartCount={0} />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <BenefitsSection />
      <SocialGallerySection />
    </>
  )
}

export default HomePage
