import '../../styles/Store/Footer.css'

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" }
];

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://wa.me/9999999999",
    label: "WhatsApp",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zm-8.52 18.4a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.93.98-3.59-.23-.37A9.9 9.9 0 0 1 2.1 12C2.1 6.53 6.53 2.1 12 2.1c2.65 0 5.14 1.03 7.01 2.9A9.86 9.86 0 0 1 21.9 12c0 5.47-4.43 9.88-9.9 9.88zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07a8.17 8.17 0 0 1-2.4-1.48 9.05 9.05 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.54 3.6 12 3.6 12 3.6s-7.54 0-9.38.47A3.01 3.01 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.01 3.01 0 0 0 2.12 2.13C4.46 20.4 12 20.4 12 20.4s7.54 0 9.38-.47a3.01 3.01 0 0 0 2.12-2.13A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.6V8.4L15.5 12l-5.75 3.6z" />
      </svg>
    ),
  },
];

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* ── Top row ── */}
        <div className="footer__top">
          {/* Left: Logo + tagline */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <span className="footer__logo-icon" aria-hidden="true">
                ◯
              </span>
              <span className="footer__logo-name">Bellezza</span>
            </a>
            <p className="footer__tagline">
              Elegance in every drop – Beauty that
              <br />
              feels as good as it looks.
            </p>
          </div>

          {/* Right: Newsletter */}
          <div className="footer__newsletter">
            <form className="footer__form" onSubmit={handleSubmit}>
              <input
                className="footer__input"
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                required
              />
              <button className="footer__submit" type="submit">
                Submit
              </button>
            </form>
            <p className="footer__newsletter-note">
              Join the Revolution of Conscious Skincare
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" />

        {/* ── Bottom row ── */}
        <div className="footer__bottom">
          {/* Nav links */}
          <nav className="footer__nav" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="footer__nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social + phone */}
          <div className="footer__right">
            <div className="footer__socials">
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="footer__social-icon"
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a href="tel:+09999999999" className="footer__phone">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z" />
              </svg>
              +0 999 999 9999
            </a>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div className="footer__copy">
          <span>
            © 2026 · <strong>FrameSpace</strong> · Bellezza POWERED BY ANEVIO
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
