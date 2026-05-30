import '../../styles/About/AboutMission.css'

// ── Stats data ───────────────────────────────────────────────────────────────
const STATS = [
  { value: '30+',  label: 'Awards.' },
  { value: '32+',  label: 'Investments.' },
  { value: '10k',  label: 'Awards.' },
  { value: '100+', label: 'Users.' },
]

function AboutMission() {
  return (
    <>
      {/* ── Section 1: Two-column text + image ── */}
      <section className="about-mission">
        {/* Left: text */}
        <div className="about-mission__text">
          <h2 className="about-mission__title">
            Quality, Consciousness,
            <br />
            And Versatile Design
          </h2>
          <p className="about-mission__body">
            Bellezza was created with a simple idea: to design an e-commerce
            template that feels both modern and timeless. Inspired by beauty and
            lifestyle brands, it offers a clean foundation that can adapt to
            different industries.
          </p>
        </div>

        {/* Right: image */}
        <div className="about-mission__image-wrap">
          <img
            className="about-mission__image"
            src="https://framerusercontent.com/images/7MaKWyyvDSoo5ueFYsJkDl3I.jpg?scale-down-to=1024"
            srcSet="
              https://framerusercontent.com/images/7MaKWyyvDSoo5ueFYsJkDl3I.jpg?scale-down-to=1024 768w,
              https://framerusercontent.com/images/7MaKWyyvDSoo5ueFYsJkDl3I.jpg?scale-down-to=2048 1536w
            "
            sizes="495px"
            alt="Beauty Product"
            width="3888"
            height="5184"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* ── Section 2: Statistics strip ── */}
      <div className="about-stats">
        {STATS.map((stat, i) => (
          <div
            className="about-stats__item"
            key={stat.label + i}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="about-stats__value">{stat.value}</span>
            <span className="about-stats__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default AboutMission