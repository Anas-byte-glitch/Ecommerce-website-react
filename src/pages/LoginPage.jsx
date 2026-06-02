import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/LoginPage.css'

// ── Brand mark ────────────────────────────────────────────────────────────────
function BrandMark() {
  return (
    <svg className="login__brand-mark" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="10.35" />
      <path d="M6.4 11.5c2.4-1.7 4.9-1.7 7.3 0 0.7 0.5 1.4 0.7 2.1 0.6" />
    </svg>
  )
}

// ── Eye icons ─────────────────────────────────────────────────────────────────
function EyeOpen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeClosed() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

// ── LoginPage ─────────────────────────────────────────────────────────────────
function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)

  // ── localStorage helpers ──────────────────────────────────────────────────
  const getUsers  = () => JSON.parse(localStorage.getItem('bellezza_users') || '[]')
  const setSession = (user) => localStorage.setItem('bellezza_session', JSON.stringify(user))

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const users = getUsers()
      const user  = users.find((u) => u.email === email && u.password === password)

      if (!user) {
        setError('Incorrect email or password.')
        setLoading(false)
        return
      }

      setSession({ id: user.id, name: user.name, email: user.email })
      setSuccess(true)
      // ← redirect to dashboard after login
      setTimeout(() => navigate('/dashboard'), 1200)
    }, 600)
  }

  return (
    <div className="login-page">

      {/* ── Left: decorative panel ── */}
      <div className="login-page__panel" aria-hidden="true">
        <div className="login-page__panel-bg" />
        <div className="login-page__circle login-page__circle--1" />
        <div className="login-page__circle login-page__circle--2" />
        <div className="login-page__circle login-page__circle--3" />
        <div className="login-page__panel-inner">
          <div className="login-page__panel-quote">
            <span className="login-page__panel-quote-mark">"</span>
            Elegance in every drop — Beauty that feels as good as it looks.
          </div>
          <div className="login-page__panel-tag">Bellezza · Since 2024</div>
        </div>
      </div>

      {/* ── Right: form ── */}
      <div className="login-page__form-side">
        <div className="login-page__form-wrap">

          {/* Logo */}
          <Link to="/" className="login-page__logo" aria-label="Bellezza home">
            <BrandMark />
            <span>Bellezza</span>
          </Link>

          <div className="login-page__sep" />

          {/* Heading */}
          <div className="login-page__heading">
            <h1 className="login-page__title">Welcome back</h1>
            <p className="login-page__sub">Sign in to your Bellezza account</p>
          </div>

          {/* Success state */}
          {success ? (
            <div className="login-page__success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Welcome back! Redirecting to dashboard…</span>
            </div>
          ) : (
            <form className="login-page__form" onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className="login-page__field">
                <label className="login-page__label" htmlFor="email">Email Address</label>
                <input
                  className="login-page__input"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="login-page__field">
                <div className="login-page__label-row">
                  <label className="login-page__label" htmlFor="password">Password</label>
                  <button type="button" className="login-page__forgot">Forgot password?</button>
                </div>
                <div className="login-page__input-wrap">
                  <input
                    className="login-page__input login-page__input--pass"
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-page__eye"
                    onClick={() => setShowPass((s) => !s)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeClosed /> : <EyeOpen />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && <p className="login-page__error" role="alert">{error}</p>}

              {/* Submit */}
              <button
                className={`login-page__submit${loading ? ' login-page__submit--loading' : ''}`}
                type="submit"
                disabled={loading}
              >
                {loading ? <span className="login-page__spinner" /> : 'Sign In'}
              </button>

            </form>
          )}

        </div>
      </div>

    </div>
  )
}

export default LoginPage