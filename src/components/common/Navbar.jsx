import { useEffect, useState } from 'react'
import '../../styles/Store/Navbar.css'

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
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

function Navbar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((currentState) => !currentState)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('navbar-menu-open', isMenuOpen)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('navbar-menu-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className={`navbar ${hasScrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__container" aria-label="Primary navigation">
        <a className="navbar__logo" href="/" aria-label="Bellezza home">
          <svg className="navbar__brand-mark" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="10.35" />
            <path d="M6.4 11.5c2.4-1.7 4.9-1.7 7.3 0 0.7 0.5 1.4 0.7 2.1 0.6" />
          </svg>
          <span>Bellezza</span>
        </a>

        <ul className="navbar__links">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <a className="navbar__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions" aria-label="Store actions">
          <button className="navbar__icon-button" type="button" aria-label="Search">
            <SearchIcon />
          </button>

          <button className="navbar__icon-button navbar__cart-button" type="button" aria-label={`Cart with ${cartCount} items`}>
            <CartIcon />
            <span className="navbar__cart-badge">{cartCount}</span>
          </button>

          <button
            className={`navbar__menu-button ${isMenuOpen ? 'navbar__menu-button--active' : ''}`}
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`} id="mobile-menu">
        <div className="navbar__mobile-header">
          <a className="navbar__mobile-logo" href="/" aria-label="Bellezza home" onClick={closeMenu}>
            <svg className="navbar__brand-mark" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="10.35" />
              <path d="M6.4 11.5c2.4-1.7 4.9-1.7 7.3 0 0.7 0.5 1.4 0.7 2.1 0.6" />
            </svg>
            <span>Bellezza</span>
          </a>

          <button className="navbar__mobile-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}>
            <span />
            <span />
          </button>
        </div>

        <ul className="navbar__mobile-links">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <a className="navbar__mobile-link" href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
