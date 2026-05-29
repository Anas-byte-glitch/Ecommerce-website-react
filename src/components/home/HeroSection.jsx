import '../../styles/Store/HeroSection.css'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
    </svg>
  )
}

function CustomerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8.5" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__gradient" aria-hidden="true">
        <div id="Gradients" className="hero-section__gradient-layer">
          <canvas data-generated="false" />
        </div>
      </div>

      <div className="hero-section__grid" aria-hidden="true" />

      <div className="hero-section__container">
        <div className="hero-section__content">
          <h1 className="hero-section__title" id="hero-title">
            Where Natural
            <br />
            Beauty Begins
          </h1>

          <p className="hero-section__description">
            Elevate your glow with beauty essentials, shop the latest must-haves in one chic storefront.
          </p>

          <div className="hero-section__actions">
            <a className="hero-section__button" href="/shop">
              <span>Shop Now</span>
              <span className="hero-section__button-icon hero-section__button-icon--primary">
                <ArrowIcon />
              </span>
              <span className="hero-section__button-icon hero-section__button-icon--secondary" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>

            <div className="hero-section__customers" aria-label="100K plus happy customers">
              <span className="hero-section__customer-icon">
                <CustomerIcon />
              </span>

              <span className="hero-section__customer-copy">
                <strong>100K +</strong>
                <span>Happy customers</span>
              </span>
            </div>
          </div>
        </div>

        <div className="hero-section__visual">
          <div className="hero-section__badge" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="hero-badge-curve" d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" />
              </defs>
              <text>
                <textPath href="#hero-badge-curve">Beauty That Feels as Good - Every Day - </textPath>
              </text>
              <path className="hero-section__badge-star" d="M60 36c4.2 13.1 10.9 19.8 24 24-13.1 4.2-19.8 10.9-24 24-4.2-13.1-10.9-19.8-24-24 13.1-4.2 19.8-10.9 24-24Z" />
            </svg>
          </div>

          <div className="hero-section__image-frame">
            <img src="/images/HeroSection.avif" alt="Multiple beauty products arranged neatly on a display stand" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
