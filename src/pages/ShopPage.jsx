import { useState } from 'react'
import ProductGrid from '../components/shop/ProductGrid'
import '../styles/Store/Shop.css'

// ── Category filter data ─────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'All',        slug: 'all' },
  { label: 'Skin Care',  slug: 'skin-care' },
  { label: 'Hair Style', slug: 'hair-style' },
  { label: 'Body Wash',  slug: 'body-wash' },
  { label: 'Makeup',     slug: 'makeup' },
]

// ── Product List Header ──────────────────────────────────────────────────────
function ProductListHeader({ activeCategory, onCategoryChange }) {
  return (
    <section className="shop-header">
      <header className="shop-header__text">
        <div className="shop-header__title-group">
          <h1 className="shop-header__title">
            Love Your Skin With Our Product.
          </h1>
          <p className="shop-header__subtitle">
            Experience beauty made just for you – high-quality, skin-loving
            formulas designed to enhance your natural glow.
          </p>
        </div>
      </header>

      <nav className="shop-header__filters" aria-label="Product categories">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.slug}
            className={`shop-header__pill${activeCategory === cat.slug ? ' shop-header__pill--active' : ''}`}
            onClick={() => onCategoryChange(cat.slug)}
            aria-current={activeCategory === cat.slug ? 'true' : undefined}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </section>
  )
}

// ── ShopPage ─────────────────────────────────────────────────────────────────
function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="shop-page">
      <ProductListHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section className="shop-products">
        <ProductGrid category={activeCategory} />
      </section>
    </div>
  )
}

export default ShopPage