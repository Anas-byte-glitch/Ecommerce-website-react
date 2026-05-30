import AboutHero from '../components/About/AboutHero'

/**
 * AboutPage
 * Each section lives in its own component under components/About/
 * with its own CSS under styles/About/
 */
function AboutPage() {
  return (
    <div className="about-page">
      <AboutHero />

      {/* More sections will be added here as we build them */}
    </div>
  )
}

export default AboutPage