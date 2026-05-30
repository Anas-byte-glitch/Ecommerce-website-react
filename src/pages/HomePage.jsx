import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BenefitsSection from '../components/home/BenefitsSection'
import SocialGallerySection from '../components/home/SocialGallerySection'

/**
 * HomePage
 * Contains only home-specific content.
 * Navbar and Footer are injected automatically by MainLayout via <Outlet />.
 */
function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <BenefitsSection />
      <SocialGallerySection />
    </>
  )
}

export default HomePage