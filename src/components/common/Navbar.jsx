import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import '../../styles/Store/Navbar.css'

const navigationLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Shop',       href: '/shop' },
  { label: 'About Us',   href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

const PRODUCTS = [
  { name: 'Dew Veil',     id: 'dew-veil' },
  { name: 'Glow Mist',    id: 'glow-mist' },
  { name: 'Fresh Aura',   id: 'fresh-aura' },
  { name: 'Velvet Waves', id: 'velvet-waves' },
  { name: 'Shine Lock',   id: 'shine-lock' },
  { name: 'Pure Curl',    id: 'pure-curl' },
  { name: 'Soft Bloom',   id: 'soft-bloom' },
  { name: 'Velvet Skin',  id: 'velvet-skin' },
  { name: 'Bare Glow',    id: 'bare-glow' },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="10.8" cy="10.8" r="7.2" />
      <path d="m16.1 16.1 4.4 4.4" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d="M216 64h-40a48 48 0 0 0-96 0H40a16 16 0 0 0-16 16v120a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16ZM128 32a32 32 0 0 1 32 32H96a32 32 0 0 1 32-32Zm88 168H40V80h40v16a8 8 0 0 0 16 0V80h64v16a8 8 0 0 0 16 0V80h40Z" />
    </svg>
  )
}

function Navbar() {
  const [isMenuOpen,  setIsMenuOpen]  = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartCount, openCart } = useCart()
  const navigate = useNavigate()

  const closeMenu    = () => setIsMenuOpen(false)
  const toggleMenu   = () => setIsMenuOpen((s) => !s)
  const openSearch   = () => { setSearchOpen(true); setSearchQuery('') }
  const closeSearch  = () => { setSearchOpen(false); setSearchQuery('') }

  const suggestions = searchQuery.trim().length > 0
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    navigate(`/shop?search=${encodeURIComponent(q)}`)
    closeSearch()
  }

  const handleSuggestion = (id) => {
    navigate(`/shop/${id}`)
    closeSearch()
  }

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('navbar-menu-open', isMenuOpen)
    const onKey = (e) => {
      if (e.key === 'Escape') { closeMenu(); closeSearch() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('navbar-menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [isMenuOpen])

  return (
    <>
      <header className={`navbar ${hasScrolled ? 'navbar--scrolled' : ''}`}>
        <nav className="navbar__container" aria-label="Primary navigation">

          <Link className="navbar__logo" to="/" aria-label="Bellezza home">
            <svg className="navbar__brand-mark" viewBox="0 0 22 22" aria-hidden="true">
              <circle cx="11" cy="11" r="10.35" />
              <path d="M6.4 11.5c2.4-1.7 4.9-1.7 7.3 0 0.7 0.5 1.4 0.7 2.1 0.6" />
            </svg>
            <span>Bellezza</span>
          </Link>

          <ul className="navbar__links">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Link className="navbar__link" to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <button className="navbar__icon-button" type="button" aria-label="Open search" onClick={openSearch}>
              <SearchIcon />
            </button>

            <button className="navbar__icon-button navbar__cart-button" type="button" onClick={openCart} aria-label={`Open cart with ${cartCount} items`}>
              <CartIcon />
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </button>

            <button
              className={`navbar__menu-button ${isMenuOpen ? 'navbar__menu-button--active' : ''}`}
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`} id="mobile-menu">
          <div className="navbar__mobile-header">
            <Link className="navbar__mobile-logo" to="/" onClick={closeMenu}>
              <svg className="navbar__brand-mark" viewBox="0 0 22 22" aria-hidden="true">
                <circle cx="11" cy="11" r="10.35" />
                <path d="M6.4 11.5c2.4-1.7 4.9-1.7 7.3 0 0.7 0.5 1.4 0.7 2.1 0.6" />
              </svg>
              <span>Bellezza</span>
            </Link>
            <button className="navbar__mobile-close" type="button" aria-label="Close menu" onClick={closeMenu}>
              <span /><span />
            </button>
          </div>

          <ul className="navbar__mobile-links">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Link className="navbar__mobile-link" to={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ── Search Modal ── */}
      {searchOpen && (
        <div className="search-overlay" onClick={closeSearch} aria-modal="true" role="dialog">
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <form className="search-modal__form" onSubmit={handleSearch}>
              <SearchIcon />
              <input
                className="search-modal__input"
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                aria-label="Search products"
              />
              {searchQuery && (
                <button type="button" className="search-modal__clear" onClick={() => setSearchQuery('')} aria-label="Clear">
                  ✕
                </button>
              )}
            </form>

            {suggestions.length > 0 && (
              <ul className="search-modal__results">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <button
                      className="search-modal__result-item"
                      type="button"
                      onClick={() => handleSuggestion(p.id)}
                    >
                      <span className="search-modal__result-name">{p.name} — Bellezza</span>
                      <span className="search-modal__result-path">/shop/{p.id}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
