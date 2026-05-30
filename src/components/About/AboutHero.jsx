import '../../styles/About/AboutHero.css'

function AboutHero() {
  return (
    <header className="about-hero">
      {/* ── Text block ── */}
      <div className="about-hero__text">
        <h1 className="about-hero__title">Our Story</h1>
        <p className="about-hero__subtitle">
          For over 25 years, we have been redefining beauty through innovation and
          passion. Our journey is built on expertise, creativity, and a deep
          understanding of what makes each individual unique.
        </p>
      </div>

      {/* ── Full-width image ── */}
      <div className="about-hero__image-wrap">
        <img
          className="about-hero__image"
          src="https://framerusercontent.com/images/iypvgl9KPuAExfY8AzLI1FJyyK0.jpg?scale-down-to=2048"
          srcSet="
            https://framerusercontent.com/images/iypvgl9KPuAExfY8AzLI1FJyyK0.jpg?scale-down-to=512  512w,
            https://framerusercontent.com/images/iypvgl9KPuAExfY8AzLI1FJyyK0.jpg?scale-down-to=1024 1024w,
            https://framerusercontent.com/images/iypvgl9KPuAExfY8AzLI1FJyyK0.jpg?scale-down-to=2048 2048w
          "
          sizes="min(max(min(100vw, 1440px) - 128px, 1px), 1440px)"
          alt="About us beauty product"
          width="5750"
          height="3832"
          decoding="async"
          loading="eager"
        />
      </div>
    </header>
  )
}

export default AboutHero