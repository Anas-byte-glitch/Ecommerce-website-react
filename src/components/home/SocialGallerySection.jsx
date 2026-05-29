import '../../styles/Store/SocialGallerySection.css'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
    alt: 'person walking on snowfield',
  },
  {
    src: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
    alt: 'skincare products flat lay',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    alt: 'minimal morning wellness',
  },
  {
    src: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&q=80',
    alt: 'woman relaxing in bathtub',
  },
  {
    src: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=600&q=80',
    alt: 'botanical leaves on white surface',
  },
  {
    src: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80',
    alt: 'woman in white dress sitting on sofa',
  },
]

const AVATAR_SRC =
  'https://framerusercontent.com/images/nm9RWgDD8m1449EnbuM3tR56WI0.jpg?width=190&height=190'

function SocialGallerySection() {
  return (
    <section className="social-gallery" aria-labelledby="social-gallery-title">
      <div className="social-gallery__intro">
        <h2 className="social-gallery__title" id="social-gallery-title">
          <span>#</span>BELLEZZABEAUTY
        </h2>
        <p className="social-gallery__desc">
          Stay in the loop for must-know updates on new products, exclusive launches, and upcoming events.
        </p>
        <a
          className="social-gallery__button"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          Follow Us
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
          </svg>
        </a>
      </div>

      <div className="social-gallery__grid" aria-label="Bellezza beauty gallery">
        {galleryImages.map((image) => (
          <a
            className="social-gallery__item"
            key={image.src}
            href="https://www.instagram.com/bellezza.shop"
            target="_blank"
            rel="noreferrer"
          >
            {/* Main photo */}
            <img src={image.src} alt={image.alt} loading="lazy" />

            {/* Dark overlay on hover */}
            <div className="social-gallery__overlay" aria-hidden="true" />

            {/* Instagram profile info on hover */}
            <div className="social-gallery__profile" aria-hidden="true">
              <div className="social-gallery__avatar">
                <img src={AVATAR_SRC} alt="bellezza.shop avatar" />
              </div>
              <span className="social-gallery__username">bellezza.shop</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default SocialGallerySection