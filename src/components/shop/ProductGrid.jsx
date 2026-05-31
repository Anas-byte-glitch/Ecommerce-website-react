import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import '../../styles/Store/Product/ProductGrid.css'

// ── All shop products ────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  // Skincare
  {
    id: 'dew-veil',
    name: 'Dew Veil',
    category: 'Skincare',
    slug: 'skin-care',
    price: '$9.70',
    href: '/shop/dew-veil',
    image: 'https://framerusercontent.com/images/pu42oePhPCrNMNhAPwFAosIAZM.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fXacuOnSiZl87SW3PMsIzbIrU.jpg?width=948&height=1200',
  },
  {
    id: 'glow-mist',
    name: 'Glow Mist',
    category: 'Skincare',
    slug: 'skin-care',
    price: 'Starts at $12.10',
    href: '/shop/glow-mist',
    image: 'https://framerusercontent.com/images/ruBqvkOTBw4ULr0p23QU8AXyE.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fMJVwxLYgFxdD8t4xEp0RTMSfQ.jpg?width=948&height=1200',
  },
  {
    id: 'fresh-aura',
    name: 'Fresh Aura',
    category: 'Skincare',
    slug: 'skin-care',
    price: 'Starts at $14.10',
    href: '/shop/fresh-aura',
    image: 'https://framerusercontent.com/images/wn5QPBoCqpWzVPt3HWDFO8um4.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/GpTdbu6M38JpulHz35kFg5pPo1E.jpg?width=948&height=1200',
  },
  // Hair Style
  {
    id: 'velvet-waves',
    name: 'Velvet Waves',
    category: 'HairStyle',
    slug: 'hair-style',
    price: 'Starts at $6.10',
    href: '/shop/velvet-waves',
    image: 'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
  },
  {
    id: 'shine-lock',
    name: 'Shine Lock',
    category: 'HairStyle',
    slug: 'hair-style',
    price: 'Starts at $4.10',
    href: '/shop/shine-lock',
    image: 'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
  },
  {
    id: 'pure-curl',
    name: 'Pure Curl',
    category: 'HairStyle',
    slug: 'hair-style',
    price: 'Starts at $14.00',
    href: '/shop/pure-curl',
    image: 'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
  },
  // Body Wash
  {
    id: 'soft-bloom',
    name: 'Soft Bloom',
    category: 'BodyWash',
    slug: 'body-wash',
    price: 'Starts at $19.00',
    href: '/shop/soft-bloom',
    image: 'https://framerusercontent.com/images/pu42oePhPCrNMNhAPwFAosIAZM.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fXacuOnSiZl87SW3PMsIzbIrU.jpg?width=948&height=1200',
  },
  {
    id: 'velvet-skin',
    name: 'Velvet Skin',
    category: 'BodyWash',
    slug: 'body-wash',
    price: 'Starts at $26.00',
    href: '/shop/velvet-skin',
    image: 'https://framerusercontent.com/images/ruBqvkOTBw4ULr0p23QU8AXyE.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fMJVwxLYgFxdD8t4xEp0RTMSfQ.jpg?width=948&height=1200',
  },
  // Makeup
  {
    id: 'bare-glow',
    name: 'Bare Glow',
    category: 'Makeup',
    slug: 'makeup',
    price: 'Starts at $22.00',
    href: '/shop/bare-glow',
    image: 'https://framerusercontent.com/images/wn5QPBoCqpWzVPt3HWDFO8um4.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/GpTdbu6M38JpulHz35kFg5pPo1E.jpg?width=948&height=1200',
  },
]

const PAGE_SIZE = 6

function ProductGrid({ category = 'all' }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    if (category === 'all') return ALL_PRODUCTS
    return ALL_PRODUCTS.filter((p) => p.slug === category)
  }, [category])

  useMemo(() => {
    setVisibleCount(PAGE_SIZE)
  }, [category])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="product-grid">
      {filtered.length === 0 ? (
        <p className="product-grid__empty">No products found in this category.</p>
      ) : (
        <div className="product-grid__items">
          {visible.map((product) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="product-grid__load-wrap">
          <button
            className="product-grid__load-btn"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid