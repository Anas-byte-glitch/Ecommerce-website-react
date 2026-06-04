import { useState, useMemo } from 'react'
import ProductCard                       from './ProductCard'
import '../../styles/Store/Product/ProductGrid.css'

const ALL_PRODUCTS = [
  {
    id: 'dew-veil',
    name: 'Dew Veil',
    category: 'Skincare',
    slug: 'skin-care',
    price: '$9.70',
    image: 'https://framerusercontent.com/images/pu42oePhPCrNMNhAPwFAosIAZM.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fXacuOnSiZl87SW3PMsIzbIrU.jpg?width=948&height=1200',
  },
  {
    id: 'glow-mist',
    name: 'Glow Mist',
    category: 'Skincare',
    slug: 'skin-care',
    price: 'Starts at $12.10',
    image: 'https://framerusercontent.com/images/ruBqvkOTBw4ULr0p23QU8AXyE.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fMJVwxLYgFxdD8t4xEp0RTMSfQ.jpg?width=948&height=1200',
  },
  {
    id: 'fresh-aura',
    name: 'Fresh Aura',
    category: 'Skincare',
    slug: 'skin-care',
    price: 'Starts at $14.10',
    image: 'https://framerusercontent.com/images/wn5QPBoCqpWzVPt3HWDFO8um4.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/GpTdbu6M38JpulHz35kFg5pPo1E.jpg?width=948&height=1200',
  },
  {
    id: 'velvet-waves',
    name: 'Velvet Waves',
    category: 'HairStyle',
    slug: 'hair-style',
    price: 'Starts at $6.10',
    image: 'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
  },
  {
    id: 'shine-lock',
    name: 'Shine Lock',
    category: 'HairStyle',
    slug: 'hair-style',
    price: 'Starts at $4.10',
    image: 'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
  },
  {
    id: 'pure-curl',
    name: 'Pure Curl',
    category: 'HairStyle',
    slug: 'hair-style',
    price: 'Starts at $14.00',
    image: 'https://framerusercontent.com/images/RPOWnXMJPVkGAKUCtJi1TCTUvw.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/adGLTrJQSug4Xa4K53Jdv9SKY4.jpg?width=948&height=1200',
  },
  {
    id: 'soft-bloom',
    name: 'Soft Bloom',
    category: 'BodyWash',
    slug: 'body-wash',
    price: 'Starts at $19.00',
    image: 'https://framerusercontent.com/images/pu42oePhPCrNMNhAPwFAosIAZM.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fXacuOnSiZl87SW3PMsIzbIrU.jpg?width=948&height=1200',
  },
  {
    id: 'velvet-skin',
    name: 'Velvet Skin',
    category: 'BodyWash',
    slug: 'body-wash',
    price: 'Starts at $26.00',
    image: 'https://framerusercontent.com/images/ruBqvkOTBw4ULr0p23QU8AXyE.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/fMJVwxLYgFxdD8t4xEp0RTMSfQ.jpg?width=948&height=1200',
  },
  {
    id: 'bare-glow',
    name: 'Bare Glow',
    category: 'Makeup',
    slug: 'makeup',
    price: 'Starts at $22.00',
    image: 'https://framerusercontent.com/images/wn5QPBoCqpWzVPt3HWDFO8um4.jpg?width=948&height=1200',
    hoverImage: 'https://framerusercontent.com/images/GpTdbu6M38JpulHz35kFg5pPo1E.jpg?width=948&height=1200',
  },
]

const PAGE_SIZE = 6

function ProductGrid({ category = 'all', searchQuery = '' }) {
  const filterKey = `${category}:${searchQuery}`
  const [visibleState, setVisibleState] = useState({
    key: filterKey,
    count: PAGE_SIZE,
  })

  const filtered = useMemo(() => {
    let list = category === 'all'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.slug === category)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    return list
  }, [category, searchQuery])

  const visibleCount = visibleState.key === filterKey ? visibleState.count : PAGE_SIZE
  const visible  = filtered.slice(0, visibleCount)
  const hasMore  = visibleCount < filtered.length

  return (
    <div className="product-grid">
      {filtered.length === 0 ? (
        <p className="product-grid__empty">No products found.</p>
      ) : (
        <div className="product-grid__items">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="product-grid__load-wrap">
          <button
            className="product-grid__load-btn"
            onClick={() => setVisibleState({ key: filterKey, count: visibleCount + PAGE_SIZE })}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
