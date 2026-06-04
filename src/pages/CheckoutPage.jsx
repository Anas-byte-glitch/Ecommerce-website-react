import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/Store/Checkout.css'

const WILAYAS = [
  '01 - Adrar',
  '02 - Chlef',
  '03 - Laghouat',
  '04 - Oum El Bouaghi',
  '05 - Batna',
  '06 - Bejaia',
  '07 - Biskra',
  '08 - Bechar',
  '09 - Blida',
  '10 - Bouira',
  '11 - Tamanrasset',
  '12 - Tebessa',
  '13 - Tlemcen',
  '14 - Tiaret',
  '15 - Tizi Ouzou',
  '16 - Alger',
  '17 - Djelfa',
  '18 - Jijel',
  '19 - Setif',
  '20 - Saida',
  '21 - Skikda',
  '22 - Sidi Bel Abbes',
  '23 - Annaba',
  '24 - Guelma',
  '25 - Constantine',
  '26 - Medea',
  '27 - Mostaganem',
  '28 - M Sila',
  '29 - Mascara',
  '30 - Ouargla',
  '31 - Oran',
  '32 - El Bayadh',
  '33 - Illizi',
  '34 - Bordj Bou Arreridj',
  '35 - Boumerdes',
  '36 - El Tarf',
  '37 - Tindouf',
  '38 - Tissemsilt',
  '39 - El Oued',
  '40 - Khenchela',
  '41 - Souk Ahras',
  '42 - Tipaza',
  '43 - Mila',
  '44 - Ain Defla',
  '45 - Naama',
  '46 - Ain Temouchent',
  '47 - Ghardaia',
  '48 - Relizane',
  '49 - Timimoun',
  '50 - Bordj Badji Mokhtar',
  '51 - Ouled Djellal',
  '52 - Beni Abbes',
  '53 - In Salah',
  '54 - In Guezzam',
  '55 - Touggourt',
  '56 - Djanet',
  '57 - El M Ghair',
  '58 - El Meniaa',
]

const DELIVERY_OPTIONS = [
  {
    id: 'home',
    title: 'Delivery to home',
    description: 'Directly to your address, confirmed by phone.',
    baseFee: 600,
  },
  {
    id: 'desk',
    title: 'Stop desk',
    description: 'Pick up from the nearest delivery office.',
    baseFee: 400,
  },
]

const REMOTE_WILAYA_CODES = new Set(['01', '08', '11', '30', '32', '33', '37', '49', '50', '52', '53', '54', '56', '58'])

function formatPrice(value) {
  return `${Number(value || 0).toFixed(2)} DA`
}

function getWilayaCode(wilaya) {
  return wilaya.split(' - ')[0]
}

function getDeliveryFee(wilaya, deliveryType) {
  if (!wilaya || !deliveryType) return 0

  const option = DELIVERY_OPTIONS.find((item) => item.id === deliveryType)
  if (!option) return 0

  const isRemote = REMOTE_WILAYA_CODES.has(getWilayaCode(wilaya))
  return option.baseFee + (isRemote ? 350 : 0)
}

function CheckoutPage() {
  const { cartItems, cartCount, getTotal } = useCart()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    deliveryType: 'home',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const subtotal = getTotal()
  const deliveryFee = useMemo(
    () => getDeliveryFee(formData.wilaya, formData.deliveryType),
    [formData.wilaya, formData.deliveryType]
  )
  const grandTotal = subtotal + deliveryFee

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page checkout-page--empty">
        <section className="checkout-empty">
          <span className="checkout-empty__eyebrow">Bellezza checkout</span>
          <h1>Your cart is waiting for a little glow.</h1>
          <p>Add your favorite products, then come back here to confirm your Algerian delivery details.</p>
          <Link className="checkout-empty__link" to="/shop">Back to shop</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <section className="checkout-hero" aria-labelledby="checkout-title">
        <div>
          <span className="checkout-hero__eyebrow">Cash on delivery in Algeria</span>
          <h1 id="checkout-title">Confirm your order</h1>
        </div>
        <p>
          Simple checkout with the essentials only. Our team will call you to confirm the order before shipping.
        </p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-form__head">
            <span>01</span>
            <div>
              <h2>Delivery information</h2>
              <p>Enter the details needed to prepare your order.</p>
            </div>
          </div>

          <label className="checkout-field">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ex: Amine Benali"
              autoComplete="name"
              required
            />
          </label>

          <label className="checkout-field">
            <span>Phone number</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex: 0550 00 00 00"
              autoComplete="tel"
              required
            />
          </label>

          <label className="checkout-field">
            <span>Wilaya</span>
            <select name="wilaya" value={formData.wilaya} onChange={handleChange} required>
              <option value="">Choose your wilaya</option>
              {WILAYAS.map((wilaya) => (
                <option key={wilaya} value={wilaya}>{wilaya}</option>
              ))}
            </select>
          </label>

          <fieldset className="checkout-delivery">
            <legend>Delivery type</legend>
            <div className="checkout-delivery__options">
              {DELIVERY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`checkout-delivery__option${formData.deliveryType === option.id ? ' checkout-delivery__option--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    value={option.id}
                    checked={formData.deliveryType === option.id}
                    onChange={handleChange}
                  />
                  <span className="checkout-delivery__radio" />
                  <span>
                    <strong>{option.title}</strong>
                    <small>{option.description}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="checkout-form__submit" type="submit">
            Confirm order
          </button>

          {isSubmitted && (
            <p className="checkout-form__success" role="status">
              Order received. We will call {formData.phone} to confirm your delivery in {formData.wilaya}.
            </p>
          )}
        </form>

        <aside className="checkout-summary" aria-label="Order summary">
          <div className="checkout-summary__top">
            <span>02</span>
            <div>
              <h2>Order summary</h2>
              <p>{cartCount} item{cartCount > 1 ? 's' : ''} in your cart</p>
            </div>
          </div>

          <div className="checkout-summary__items">
            {cartItems.map((item) => (
              <article className="checkout-summary__item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </article>
            ))}
          </div>

          <div className="checkout-summary__totals">
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>{deliveryFee ? formatPrice(deliveryFee) : 'Select wilaya'}</strong>
            </div>
            <div className="checkout-summary__grand">
              <span>Total</span>
              <strong>{formatPrice(grandTotal)}</strong>
            </div>
          </div>

          <div className="checkout-summary__cod">
            <span>COD</span>
            <p>Pay in cash when your order arrives.</p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default CheckoutPage
