import { useState } from 'react'
import '../styles/Contact/ContactPage.css'

// ── Social / contact links ────────────────────────────────────────────────────
const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Frame-Space',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.54 3.6 12 3.6 12 3.6s-7.54 0-9.38.47A3.01 3.01 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.01 3.01 0 0 0 2.12 2.13C4.46 20.4 12 20.4 12 20.4s7.54 0 9.38-.47a3.01 3.01 0 0 0 2.12-2.13A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.6V8.4L15.5 12l-5.75 3.6z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://whatsapp.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zm-8.52 18.4a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.93.98-3.59-.23-.37A9.9 9.9 0 0 1 2.1 12C2.1 6.53 6.53 2.1 12 2.1c2.65 0 5.14 1.03 7.01 2.9A9.86 9.86 0 0 1 21.9 12c0 5.47-4.43 9.88-9.9 9.88zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07a8.17 8.17 0 0 1-2.4-1.48 9.05 9.05 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

// ── Phone icon ────────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z"/>
    </svg>
  )
}

// ── ContactPage ───────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ firstName: '', email: '', description: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-page">

      {/* ── Header ── */}
      <div className="contact-page__head">
        <h1 className="contact-page__title">Contact Us</h1>
        <p className="contact-page__subtitle">
          Have questions? We're here to help! Reach out to us for any inquiries,
          and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* ── Form card ── */}
      <div className="contact-page__card">
        {submitted ? (
          <div className="contact-page__success">
            <p>Thank you! We'll be in touch soon.</p>
          </div>
        ) : (
          <form className="contact-page__form" onSubmit={handleSubmit} noValidate>

            {/* Row: First Name + Email */}
            <div className="contact-page__row">
              <div className="contact-page__field">
                <label className="contact-page__label" htmlFor="firstName">First Name</label>
                <input
                  className="contact-page__input"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Your first name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-page__field">
                <label className="contact-page__label" htmlFor="email">Email Address</label>
                <input
                  className="contact-page__input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Textarea: Description */}
            <div className="contact-page__field">
              <label className="contact-page__label" htmlFor="description">Description</label>
              <textarea
                className="contact-page__textarea"
                id="description"
                name="description"
                placeholder="Write your message..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <button className="contact-page__submit" type="submit">
              Submit
            </button>

          </form>
        )}
      </div>

      {/* ── Socials + Phone ── */}
      <section className="contact-page__socials" aria-label="Social links">
        {/* Social icon buttons */}
        <div className="contact-page__icons">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              className="contact-page__icon-btn"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="contact-page__divider" aria-hidden="true" />

        {/* Phone */}
        <a className="contact-page__phone" href="tel:+991234567890">
          <PhoneIcon />
          +99 123 456 7890
        </a>
      </section>

    </div>
  )
}

export default ContactPage