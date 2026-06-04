import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import '../../styles/Store/Product/ProductCard.css'

function EyeIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5ZM128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128C223.84 141.46 192.43 192 128 192Zm0-112a48 48 0 1 0 48 48 48.05 48.05 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32 32 32 0 0 1-32 32Z" />
    </svg>
  )
}

function getPriceValue(price) {
  if (typeof price === 'number') return price

  const match = String(price).match(/[\d.]+/)
  return match ? Number(match[0]) : 0
}

function ProductCard({ product }) {
  const { name, category, price, href, image, hoverImage } = product
  const { addToCart } = useCart()
  const productHref = href || `/shop/${product.id}`
  const priceLabel = product.priceLabel || price

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name,
      price: getPriceValue(price),
      image,
    })
  }

  return (
    <article className="product-card">
      <Link className="product-card__link" to={productHref} aria-label={`${name} - ${priceLabel}`}>
        <span className="product-card__quick-view" aria-hidden="true">
          <EyeIcon />
        </span>

        <span className="product-card__media">
          <img
            className="product-card__image product-card__image--main"
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
          />
          {hoverImage && (
            <img
              className="product-card__image product-card__image--hover"
              src={hoverImage}
              alt=""
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          )}
        </span>
      </Link>

      <div className="product-card__details">
        <span className="product-card__copy">
          <span className="product-card__name">{name}</span>
          <span className="product-card__category">{category}</span>
        </span>
        <span className="product-card__price">{priceLabel}</span>
      </div>

      <button className="product-card__cart-button" type="button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </article>
  )
}

export default ProductCard
