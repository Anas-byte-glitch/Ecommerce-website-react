import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/Store/ProductDetail.css'

// ── Same product data as ProductGrid ─────────────────────────────────────────
// Extend each product with detail-specific fields (images[], features, description, accordion)
const PRODUCTS_DETAIL = {
  'dew-veil': {
    id: 'dew-veil',
    name: 'Dew Veil',
    category: 'Skincare',
    priceLabel: '$9.70',
    rating: 4.5,
    reviewCount: 27,
    images: [
      'https://framerusercontent.com/images/pu42oePhPCrNMNhAPwFAosIAZM.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/fXacuOnSiZl87SW3PMsIzbIrU.jpg?width=948&height=1200',
    ],
    features: ['Lightweight & Non-Greasy', 'Deep Hydration & Nourishment', 'Fast-Absorbing Formula', 'Suitable for All Skin Types'],
    description: 'This advanced serum, formulated with 10% Argireline, provides a powerful yet non-invasive solution for reducing the appearance of dynamic wrinkles, including forehead lines, frown lines, and smile lines. By incorporating a high concentration of this peptide, it helps to relax facial tension, smooth fine lines, and improve overall skin texture. With regular use, the skin appears more youthful, refreshed, and visibly firmer.',
    accordion: [
      { title: 'Ingredients', body: 'Our formula is crafted with high-quality, skin-loving ingredients, free from harsh chemicals and toxins. We prioritize natural extracts, vitamins, and clinically proven actives to deliver the best results while keeping your skin healthy and nourished.' },
      { title: 'How to Use', body: 'For best results, apply a small amount to clean skin and gently massage in circular motions until fully absorbed. Use morning and night as part of your skincare routine. Pair with SPF during the day for added protection.' },
      { title: 'Benefits', body: 'Deeply hydrates and nourishes the skin, Enhances natural radiance and glow, Lightweight and fast-absorbing formula, Suitable for all skin types, including sensitive skin.' },
      { title: 'Sustainability & Ethics', body: 'We are committed to clean beauty and sustainability. Our products are cruelty-free, vegan, and packaged in eco-friendly materials. We believe in beauty that not only makes you feel good but is also good for the planet.' },
    ],
  },
  'glow-mist': {
    id: 'glow-mist',
    name: 'Glow Mist',
    category: 'Skincare',
    priceLabel: 'Starts at $12.10',
    rating: 4.3,
    reviewCount: 19,
    images: [
      'https://framerusercontent.com/images/ruBqvkOTBw4ULr0p23QU8AXyE.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/fMJVwxLYgFxdD8t4xEp0RTMSfQ.jpg?width=948&height=1200',
    ],
    features: ['Instant Radiance Boost', 'Hydrating Mist Formula', 'Sets Makeup Beautifully', 'Refreshing & Lightweight'],
    description: 'A refreshing facial mist that delivers an instant burst of hydration and radiance. Infused with botanical extracts and hyaluronic acid, it replenishes moisture throughout the day, leaving skin dewy, plump, and glowing.',
    accordion: [
      { title: 'Ingredients', body: 'Aqua, Hyaluronic Acid, Rose Water, Glycerin, Niacinamide, Vitamin C derivative, Aloe Vera Extract.' },
      { title: 'How to Use', body: 'Hold 20–30cm from face and mist evenly. Use on bare skin or over makeup. Can be reapplied throughout the day.' },
      { title: 'Benefits', body: 'Instantly hydrates, refreshes tired skin, extends makeup wear, and adds a luminous finish.' },
      { title: 'Sustainability & Ethics', body: 'Cruelty-free, vegan, and packaged in recycled materials.' },
    ],
  },
  'fresh-aura': {
    id: 'fresh-aura',
    name: 'Fresh Aura',
    category: 'Skincare',
    priceLabel: 'Starts at $14.10',
    rating: 4.6,
    reviewCount: 34,
    images: [
      'https://framerusercontent.com/images/wn5QPBoCqpWzVPt3HWDFO8um4.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/GpTdbu6M38JpulHz35kFg5pPo1E.jpg?width=948&height=1200',
    ],
    features: ['Purifying Formula', 'Pore-Minimizing', 'Oil-Control', 'Suitable for Combination Skin'],
    description: 'A lightweight, oil-free moisturizer that purifies and balances the skin while delivering deep hydration. Perfect for combination to oily skin types.',
    accordion: [
      { title: 'Ingredients', body: 'Salicylic Acid, Niacinamide, Zinc PCA, Hyaluronic Acid, Green Tea Extract.' },
      { title: 'How to Use', body: 'Apply to clean skin morning and evening. Follow with SPF in the morning.' },
      { title: 'Benefits', body: 'Controls excess oil, minimizes pores, and keeps skin balanced throughout the day.' },
      { title: 'Sustainability & Ethics', body: 'Vegan, cruelty-free, and dermatologist tested.' },
    ],
  },
  'velvet-waves': {
    id: 'velvet-waves',
    name: 'Velvet Waves',
    category: 'HairStyle',
    priceLabel: 'Starts at $6.10',
    rating: 4.2,
    reviewCount: 15,
    images: [
      'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
    ],
    features: ['Defines Waves & Curls', 'Frizz Control', 'Lightweight Hold', 'No Crunch Formula'],
    description: 'A silky wave-enhancing serum that defines and nourishes natural waves and curls without stiffness or crunch. Infused with argan oil for shine and softness.',
    accordion: [
      { title: 'Ingredients', body: 'Argan Oil, Coconut Milk, Panthenol, Glycerin, Flaxseed Extract.' },
      { title: 'How to Use', body: 'Apply to damp hair, scrunch upward to define waves, and air dry or diffuse.' },
      { title: 'Benefits', body: 'Enhances natural texture, reduces frizz, and adds long-lasting definition.' },
      { title: 'Sustainability & Ethics', body: 'Sulfate-free, cruelty-free, and vegan certified.' },
    ],
  },
  'shine-lock': {
    id: 'shine-lock',
    name: 'Shine Lock',
    category: 'HairStyle',
    priceLabel: 'Starts at $4.10',
    rating: 4.0,
    reviewCount: 11,
    images: [
      'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
    ],
    features: ['Mirror-Like Shine', 'Tames Flyaways', 'Heat Protection', 'All Hair Types'],
    description: 'A glossing spray that locks in mirror-like shine and tames flyaways instantly. Provides light heat protection up to 230°C.',
    accordion: [
      { title: 'Ingredients', body: 'Cyclomethicone, Dimethicone, Vitamin E, UV Filters.' },
      { title: 'How to Use', body: 'Spray lightly over styled hair from 30cm away. Avoid roots.' },
      { title: 'Benefits', body: 'Adds intense shine, controls frizz, and protects against heat damage.' },
      { title: 'Sustainability & Ethics', body: 'Not tested on animals. Recyclable packaging.' },
    ],
  },
  'pure-curl': {
    id: 'pure-curl',
    name: 'Pure Curl',
    category: 'HairStyle',
    priceLabel: 'Starts at $14.00',
    rating: 4.7,
    reviewCount: 42,
    images: [
      'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
    ],
    features: ['Deep Curl Definition', 'Anti-Humidity Shield', 'Moisturizing', 'Paraben-Free'],
    description: 'Specially formulated for curly and coily hair types, this cream delivers deep moisture, curl definition, and long-lasting frizz control.',
    accordion: [
      { title: 'Ingredients', body: 'Shea Butter, Jojoba Oil, Aloe Vera, Marshmallow Root Extract, Castor Oil.' },
      { title: 'How to Use', body: 'Work into wet hair section by section. Rake through curls and scrunch. Diffuse or air dry.' },
      { title: 'Benefits', body: 'Defines curls, seals in moisture, and fights humidity for all-day hold.' },
      { title: 'Sustainability & Ethics', body: 'Vegan, cruelty-free, and biodegradable formula.' },
    ],
  },
  'soft-bloom': {
    id: 'soft-bloom',
    name: 'Soft Bloom',
    category: 'BodyWash',
    priceLabel: 'Starts at $19.00',
    rating: 4.4,
    reviewCount: 23,
    images: [
      'https://framerusercontent.com/images/pu42oePhPCrNMNhAPwFAosIAZM.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/fXacuOnSiZl87SW3PMsIzbIrU.jpg?width=948&height=1200',
    ],
    features: ['Gentle Cleansing', 'Floral Fragrance', 'Moisturizing Lather', 'pH Balanced'],
    description: 'A luxurious body wash with a soft floral scent that cleanses, nourishes, and leaves skin silky smooth. Enriched with rose extract and shea butter.',
    accordion: [
      { title: 'Ingredients', body: 'Rose Extract, Shea Butter, Glycerin, Aloe Vera, Sweet Almond Oil.' },
      { title: 'How to Use', body: 'Lather onto wet skin, massage gently, and rinse thoroughly.' },
      { title: 'Benefits', body: 'Cleanses without stripping moisture, leaves skin soft and lightly scented.' },
      { title: 'Sustainability & Ethics', body: 'Biodegradable formula, cruelty-free, vegan.' },
    ],
  },
  'velvet-skin': {
    id: 'velvet-skin',
    name: 'Velvet Skin',
    category: 'BodyWash',
    priceLabel: 'Starts at $26.00',
    rating: 4.8,
    reviewCount: 56,
    images: [
      'https://framerusercontent.com/images/ruBqvkOTBw4ULr0p23QU8AXyE.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/fMJVwxLYgFxdD8t4xEp0RTMSfQ.jpg?width=948&height=1200',
    ],
    features: ['Ultra-Rich Lather', '24h Moisture Lock', 'Silk Protein Complex', 'Dermatologist Tested'],
    description: 'An indulgent body wash enriched with silk proteins and botanical oils that wraps skin in velvety softness and long-lasting hydration.',
    accordion: [
      { title: 'Ingredients', body: 'Silk Amino Acids, Marula Oil, Vitamin E, Chamomile Extract, Oat Milk.' },
      { title: 'How to Use', body: 'Apply to wet skin, lather generously, rinse well. Best used with a loofah.' },
      { title: 'Benefits', body: 'Intense moisture, soft skin feel, soothes sensitive skin, long-lasting fragrance.' },
      { title: 'Sustainability & Ethics', body: 'Microplastic-free, vegan, cruelty-free, and housed in recycled packaging.' },
    ],
  },
  'bare-glow': {
    id: 'bare-glow',
    name: 'Bare Glow',
    category: 'Makeup',
    priceLabel: 'Starts at $22.00',
    rating: 4.5,
    reviewCount: 31,
    images: [
      'https://framerusercontent.com/images/wn5QPBoCqpWzVPt3HWDFO8um4.jpg?width=948&height=1200',
      'https://framerusercontent.com/images/GpTdbu6M38JpulHz35kFg5pPo1E.jpg?width=948&height=1200',
    ],
    features: ['Buildable Coverage', 'Natural Finish', 'SPF 20 Protection', 'Non-Comedogenic'],
    description: 'A skin-tinted moisturizer that evens skin tone while letting your natural beauty shine through. Lightweight, breathable, and enriched with SPF 20.',
    accordion: [
      { title: 'Ingredients', body: 'Titanium Dioxide (SPF), Niacinamide, Hyaluronic Acid, Vitamin C, Aloe Vera.' },
      { title: 'How to Use', body: 'Apply with fingertips or brush, blending outward from center of face. Build coverage as needed.' },
      { title: 'Benefits', body: 'Evens skin tone, hydrates, protects from sun damage, and gives a natural glow.' },
      { title: 'Sustainability & Ethics', body: 'Mineral SPF formula, vegan, cruelty-free, and dermatologist approved.' },
    ],
  },
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgb(191,164,146)" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M 10 3 L 4.5 8.5 L 2 6" stroke="rgb(95,161,56)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
      aria-hidden="true"
    >
      <path d="M 3 6 L 9 12 L 15 6" stroke="rgb(45,43,48)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M 3.75 8.3 L 6.467 5.583 C 6.788 5.262 6.788 4.737 6.467 4.417 L 3.75 1.7"
        stroke="rgb(115,115,115)" strokeWidth="0.94" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(145,145,145)" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(145,145,145)" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

// ── Accordion item ────────────────────────────────────────────────────────────
function AccordionItem({ title, body }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="pdp-accordion__item">
      <button
        className="pdp-accordion__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="pdp-accordion__body">
          <p>{body}</p>
        </div>
      )}
      <div className="pdp-accordion__line" />
    </div>
  )
}

// ── Eye icon for quick-view badge ────────────────────────────────────────────
function EyeIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
    </svg>
  )
}

// ── Similar Products section ──────────────────────────────────────────────────
const ALL_PRODUCTS_LIST = Object.values(PRODUCTS_DETAIL)

function SimilarProducts({ currentId }) {
  // Get 3 products from same category, excluding current; fallback to other products
  const current = PRODUCTS_DETAIL[currentId]
  const similar = ALL_PRODUCTS_LIST
    .filter((p) => p.id !== currentId && p.category === current?.category)
    .slice(0, 3)

  // If not enough from same category, fill with others
  const others = ALL_PRODUCTS_LIST.filter(
    (p) => p.id !== currentId && !similar.find((s) => s.id === p.id)
  )
  const displayed = [...similar, ...others].slice(0, 3)

  if (displayed.length === 0) return null

  return (
    <section className="pdp-similar">
      {/* Title */}
      <div className="pdp-similar__head">
        <h2 className="pdp-similar__title">Similar Product</h2>
      </div>

      {/* 3-column grid */}
      <div className="pdp-similar__grid">
        {displayed.map((p) => (
          <Link key={p.id} to={`/shop/${p.id}`} className="pdp-similar__card">
            {/* Quick-view badge */}
            <span className="pdp-similar__badge" aria-hidden="true">
              <EyeIcon />
            </span>

            {/* Image area */}
            <span className="pdp-similar__media">
              <img
                className="pdp-similar__img pdp-similar__img--main"
                src={p.images[0]}
                alt={p.name}
                loading="lazy"
              />
              {p.images[1] && (
                <img
                  className="pdp-similar__img pdp-similar__img--hover"
                  src={p.images[1]}
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                />
              )}
            </span>

            {/* Text */}
            <span className="pdp-similar__info">
              <span className="pdp-similar__text">
                <span className="pdp-similar__name">{p.name}</span>
                <span className="pdp-similar__cat">{p.category}</span>
              </span>
              <span className="pdp-similar__price">{p.priceLabel}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* Show More button */}
      <div className="pdp-similar__footer">
        <Link to="/shop" className="pdp-similar__show-more">
          <span>Show More</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  )
}

// ── ProductDetailPage ─────────────────────────────────────────────────────────
function ProductDetailPage() {
  const { id } = useParams()
  const product = PRODUCTS_DETAIL[id] || null

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity]       = useState(1)
  const [added, setAdded]             = useState(false)

  if (!product) {
    return (
      <div className="pdp-not-found">
        <h2>Product not found.</h2>
        <Link to="/shop">← Back to Shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pdp">
      <div className="pdp__content">

        {/* ════ LEFT: image gallery + description + accordion ════ */}
        <div className="pdp__left">
          {/* Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main-image">
              <img src={product.images[activeImage]} alt={product.name} draggable="false" />
            </div>
            {product.images.length > 1 && (
              <div className="pdp__thumbs">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    className={`pdp__thumb${activeImage === i ? ' pdp__thumb--active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" draggable="false" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pdp__description">
            <h4 className="pdp__desc-title">Description</h4>
            <p className="pdp__desc-body">{product.description}</p>
          </div>

          <div className="pdp__divider" />

          {/* Accordion */}
          <div className="pdp-accordion">
            {product.accordion.map((item) => (
              <AccordionItem key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>

        {/* ════ RIGHT: info + buy ════ */}
        <div className="pdp__right">
          {/* Breadcrumb */}
          <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="pdp__breadcrumb-link">Home</Link>
            <ChevronRight />
            <Link to="/shop" className="pdp__breadcrumb-link">Shop</Link>
            <ChevronRight />
            <span className="pdp__breadcrumb-current">{product.name}</span>
          </nav>

          {/* Name + category */}
          <div className="pdp__info">
            <h3 className="pdp__name">{product.name}</h3>
            <span className="pdp__category">{product.category}</span>
          </div>

          {/* Rating */}
          <div className="pdp__rating">
            <StarIcon />
            <span className="pdp__rating-value">{product.rating}</span>
            <span className="pdp__rating-count">( {product.reviewCount} Review )</span>
          </div>

          {/* Price */}
          <div className="pdp__price">{product.priceLabel}</div>

          {/* Features */}
          <ul className="pdp__features">
            {product.features.map((f) => (
              <li key={f} className="pdp__feature">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="pdp__divider" />

          {/* Quantity + Add to basket */}
          <div className="pdp__buy">
            <div className="pdp__quantity">
              <button className="pdp__qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">
                <MinusIcon />
              </button>
              <span className="pdp__qty-value">{quantity}</span>
              <button className="pdp__qty-btn" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                <PlusIcon />
              </button>
            </div>
            <button className={`pdp__add-btn${added ? ' pdp__add-btn--added' : ''}`} onClick={handleAddToCart}>
              {added ? '✓ ADDED' : 'ADD TO BASKET'}
            </button>
          </div>
        </div>

      </div>

      {/* ── Similar Products ── */}
      <SimilarProducts currentId={id} />

    </div>
  )
}

export default ProductDetailPage