import '../../styles/About/AboutIntegration.css'

function AboutIntegration() {
  return (
    <div className="about-integration">
      {/* ── Left: image ── */}
      <div className="about-integration__image-wrap">
        <img
          className="about-integration__image"
          src="https://framerusercontent.com/images/UozH8MNHZKywcYFhPAf2jDgHRy8.jpg?scale-down-to=1024"
          srcSet="
            https://framerusercontent.com/images/UozH8MNHZKywcYFhPAf2jDgHRy8.jpg?scale-down-to=1024 682w,
            https://framerusercontent.com/images/UozH8MNHZKywcYFhPAf2jDgHRy8.jpg?scale-down-to=2048 1365w,
            https://framerusercontent.com/images/UozH8MNHZKywcYFhPAf2jDgHRy8.jpg?width=2624       2624w
          "
          sizes="495px"
          alt="Beauty Product"
          width="2624"
          height="3936"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ── Right: text ── */}
      <div className="about-integration__text">
        <h2 className="about-integration__title">
          Powered By Shopiframe And Seamless Shopify Integration
        </h2>
        <p className="about-integration__body">
          Bellezza integrates seamlessly with Shopify through{' '}
          <strong>Shopiframe</strong>, making it simple to connect your products
          and manage your business. You handle the operations in Shopify, while
          Framer gives you full creative control over your storefront design.
        </p>
      </div>
    </div>
  )
}

export default AboutIntegration