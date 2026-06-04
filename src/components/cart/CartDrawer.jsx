import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import './CartDrawer.css'

function formatPrice(value) {
  return `$${Number(value || 0).toFixed(2)}`
}

function EmptyCartIcon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="45" />
      <path d="M34 48h52l-6 35H40z" />
      <path d="M43 48c2-18 13-28 30-25 13 3 21 12 23 25" />
      <circle cx="47" cy="86" r="4" />
      <circle cx="75" cy="86" r="4" />
    </svg>
  )
}

function CartDrawer() {
  const {
    cartItems,
    cartCount,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getTotal,
  } = useCart()

  const subtotal = getTotal()

  return (
    <>
      <div
        className={`cart-drawer__overlay ${isCartOpen ? 'cart-drawer__overlay--visible' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`cart-drawer ${isCartOpen ? 'cart-drawer--open' : ''}`}
        aria-hidden={!isCartOpen}
        aria-label="Shopping cart"
      >
        <header className="cart-drawer__header">
          <h2>
            Cart <span>({cartCount})</span>
          </h2>
          <button className="cart-drawer__close" type="button" onClick={closeCart} aria-label="Close cart">
            x
          </button>
        </header>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <EmptyCartIcon />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="cart-drawer__items">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => updateQuantity(item.id, 'increase')}
                  onDecrease={() => updateQuantity(item.id, 'decrease')}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="cart-drawer__footer">
          <div className="cart-drawer__subtotal">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <p className="cart-drawer__note">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
          {cartItems.length > 0 ? (
            <Link className="cart-drawer__checkout" to="/checkout" onClick={closeCart}>
              Checkout
            </Link>
          ) : (
            <Link className="cart-drawer__checkout" to="/shop" onClick={closeCart}>
              Shop Now
            </Link>
          )}
        </footer>
      </aside>
    </>
  )
}

export default CartDrawer
