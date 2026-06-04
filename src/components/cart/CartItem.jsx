import './CartDrawer.css'

function formatPrice(value) {
  return `$${Number(value || 0).toFixed(2)}`
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <img className="cart-item__image" src={item.image} alt={item.name} />

      <div className="cart-item__content">
        <div className="cart-item__header">
          <div>
            <h3 className="cart-item__name">{item.name}</h3>
            <p className="cart-item__meta">Bellezza product</p>
          </div>
          <strong className="cart-item__price">
            {formatPrice(item.price * item.quantity)}
          </strong>
        </div>

        <div className="cart-item__actions">
          <div className="cart-item__quantity" aria-label={`Quantity for ${item.name}`}>
            <button type="button" onClick={onDecrease} aria-label={`Decrease ${item.name} quantity`}>
              -
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={onIncrease} aria-label={`Increase ${item.name} quantity`}>
              +
            </button>
          </div>

          <button className="cart-item__remove" type="button" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}

export default CartItem
