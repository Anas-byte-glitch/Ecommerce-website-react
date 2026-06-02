import { Link } from 'react-router-dom'
import '../../styles/Store/FeaturedProducts.css'

const products = [
  {
    id: 'dew-veil',
    name: 'Dew Veil',
    category: 'Skincare',
    price: '$9.70',
    image: 'https://framerusercontent.com/images/pu42oePhPCrNMNhAPwFAosIAZM.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fXacuOnSiZl87SW3PMsIzbIrU.jpg?width=948&height=1200',
  },
  {
    id: 'glow-mist',
    name: 'Glow Mist',
    category: 'Skincare',
    price: 'Starts at $12.10',
    image: 'https://framerusercontent.com/images/ruBqvkOTBw4ULr0p23QU8AXyE.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fMJVwxLYgFxdD8t4xEp0RTMSfQ.jpg?width=948&height=1200',
  },
  {
    id: 'fresh-aura',
    name: 'Fresh Aura',
    category: 'Skincare',
    price: 'Starts at $14.10',
    image: 'https://framerusercontent.com/images/wn5QPBoCqpWzVPt3HWDFO8um4.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/GpTdbu6M38JpulHz35kFg5pPo1E.jpg?width=948&height=1200',
  },
  {
    id: 'velvet-waves',
    name: 'Velvet Waves',
    category: 'HairStyle',
    price: 'Starts at $6.10',
    image: 'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
  },
]

function EyeIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5ZM128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128C223.84 141.46 192.43 192 128 192Zm0-112a48 48 0 1 0 48 48 48.05 48.05 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32 32 32 0 0 1-32 32Z" />
    </svg>
  )
}

function FeaturedProducts() {
  return (
    <section className="featured-products" id="bestsellers" aria-labelledby="featured-products-title">
      <div className="featured-products__title-wrap">
        <h2 className="featured-products__title" id="featured-products-title">
          Best Sellers
        </h2>
      </div>

      <div className="featured-products__grid">
        {products.map((product) => (
          <Link
            key={product.id}
            className="product-card"
            to={`/shop/${product.id}`}
          >
            <span className="product-card__quick-view" aria-hidden="true">
              <EyeIcon />
            </span>

            <span className="product-card__media">
              <img className="product-card__image product-card__image--main" src={product.image} alt={product.name} />
              <img className="product-card__image product-card__image--hover" src={product.hoverImage} alt="" aria-hidden="true" />
            </span>

            <span className="product-card__details">
              <span className="product-card__copy">
                <span className="product-card__name">{product.name}</span>
                <span className="product-card__category">{product.category}</span>
              </span>
              <span className="product-card__price">{product.price}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts