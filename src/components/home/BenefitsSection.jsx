import '../../styles/Store/BenefitsSection.css'

const benefits = [
  {
    title: 'Delivery',
    description: 'Fast and reliable shipping to your doorstep, ensuring your beauty essentials arrive safely and on time.',
    icon: 'delivery',
  },
  {
    title: 'Online Order',
    description: 'Seamless and secure online shopping experience with just a few clicks - beauty at your convenience.',
    icon: 'wifi',
  },
  {
    title: 'Guarantee',
    description: 'Shop with confidence! We stand by our products and offer a satisfaction guarantee for every purchase.',
    icon: 'tag',
  },
]

function BenefitIcon({ type }) {
  const paths = {
    delivery:
      'M255.42 117l-14-35A15.93 15.93 0 0 0 226.58 72H192v-8a8 8 0 0 0-8-8H32a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h17a32 32 0 0 0 62 0h50a32 32 0 0 0 62 0h17a16 16 0 0 0 16-16v-64a7.94 7.94 0 0 0-.58-3ZM192 88h34.58l9.6 24H192ZM32 72h144v64H32Zm48 136a16 16 0 1 1 16-16 16 16 0 0 1-16 16Zm81-24h-50a32 32 0 0 0-62 0H32v-32h144v12.31A32.11 32.11 0 0 0 161 184Zm31 24a16 16 0 1 1 16-16 16 16 0 0 1-16 16Zm48-24h-17a32.06 32.06 0 0 0-31-24v-32h48Z',
    wifi:
      'M140 204a12 12 0 1 1-12-12 12 12 0 0 1 12 12ZM237.08 87A172 172 0 0 0 18.92 87a8 8 0 0 0 10.16 12.37 156 156 0 0 1 197.84 0A8 8 0 0 0 237.08 87ZM205 122.77a124 124 0 0 0-153.94 0A8 8 0 0 0 61 135.31a108 108 0 0 1 134.06 0 8 8 0 0 0 9.94-12.54Zm-32.26 35.76a76.05 76.05 0 0 0-89.42 0 8 8 0 0 0 9.42 12.94 60 60 0 0 1 70.58 0 8 8 0 1 0 9.42-12.94Z',
    tag:
      'M243.31 136 144 36.69A15.86 15.86 0 0 0 132.69 32H40a8 8 0 0 0-8 8v92.69A15.86 15.86 0 0 0 36.69 144L136 243.31a16 16 0 0 0 22.63 0l84.68-84.68a16 16 0 0 0 0-22.63Zm-96 96L48 132.69V48h84.69L232 147.31ZM96 84a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z',
  }

  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d={paths[type]} />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
    </svg>
  )
}

function BenefitsSection() {
  return (
    <section className="benefits-section" id="benefits" aria-labelledby="benefits-title">
      <div className="benefits-section__content">
        <h2 className="benefits-section__title" id="benefits-title">
          Our Key Benefits
        </h2>

        <div className="benefits-section__cards">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <span className="benefit-card__icon">
                <BenefitIcon type={benefit.icon} />
              </span>

              <div className="benefit-card__copy">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="benefits-feature">
          <div className="benefits-feature__image">
            <img
              src="https://framerusercontent.com/images/RUG3viisJv6UHhfobKbSesox4Cs.png?scale-down-to=1024&width=800&height=1200"
              alt="Beauty woman"
            />
            <a className="benefits-feature__hotspot" href="/shop/volumizing-texturizing-hair-sprays" aria-label="View 100% Plant-Derived Squalane">
              <span />
              <span className="benefits-feature__tooltip" aria-hidden="true">
                <strong>100% Plant-Derived Squalane</strong>
                <b>$90</b>
              </span>
            </a>
          </div>

          <div className="benefits-feature__panel">
            <div className="benefits-feature__panel-content">
              <h2>
                Make You Look And
                <br />
                Feel Glowy And Health
              </h2>
              <p>Elegance in every drop - Beauty that feels as good as it looks.</p>
              <a className="benefits-feature__button" href="/about-us">
                <span>About Us</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
