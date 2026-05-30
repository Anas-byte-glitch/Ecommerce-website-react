import AboutHero        from '../components/About/AboutHero'
import AboutMission     from '../components/About/AboutMission'
import AboutIntegration from '../components/About/AboutIntegration'
import SocialGallerySection from '../components/home/SocialGallerySection'

function AboutPage() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutMission />
      <AboutIntegration />
      <SocialGallerySection />

      {/* More sections will be added here */}
    </div>
  )
}

export default AboutPage