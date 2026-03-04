import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import {
  selectCategories,
  selectMenuItems,
  selectSelectedCategory,
  setCategory,
} from './features/menu/menuSlice'
import {
  addToOrder,
  selectOrderCarbs,
  clearOrder,
  decreaseOrderItem,
  selectOrderFat,
  removeFromOrder,
  selectOrderCalories,
  selectOrderItemCount,
  selectOrderItems,
  selectOrderProtein,
  selectOrderTotal,
} from './features/order/orderSlice'

const createInitialCheckoutForm = () => ({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  deliveryAddress: '',
  cardholderName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
})

function App() {
  const dispatch = useDispatch()
  const [zoomedImageId, setZoomedImageId] = useState(null)
  const [orderFeedback, setOrderFeedback] = useState('')
  const [orderFeedbackType, setOrderFeedbackType] = useState('success')
  const [checkoutForm, setCheckoutForm] = useState(createInitialCheckoutForm)
  const categories = useSelector(selectCategories)
  const selectedCategory = useSelector(selectSelectedCategory)
  const menuItems = useSelector(selectMenuItems)
  const orderItems = useSelector(selectOrderItems)
  const orderItemCount = useSelector(selectOrderItemCount)
  const orderTotal = useSelector(selectOrderTotal)
  const orderCalories = useSelector(selectOrderCalories)
  const orderProtein = useSelector(selectOrderProtein)
  const orderCarbs = useSelector(selectOrderCarbs)
  const orderFat = useSelector(selectOrderFat)

  const filteredMenuItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory)

  const handleCheckoutFieldChange = (event) => {
    const { name, value } = event.target

    if (orderFeedback && orderFeedbackType === 'error') {
      setOrderFeedback('')
      setOrderFeedbackType('success')
    }

    setCheckoutForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handlePlaceOrder = (event) => {
    event.preventDefault()

    if (orderItems.length === 0) {
      setOrderFeedbackType('error')
      setOrderFeedback('Add at least one menu item before placing an order.')
      return
    }

    const hasAllCheckoutDetails = Object.values(checkoutForm).every(
      (value) => value.trim().length > 0,
    )

    if (!hasAllCheckoutDetails) {
      setOrderFeedbackType('error')
      setOrderFeedback(
        'Please complete customer and payment details before placing your order.',
      )
      return
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000)
    const placedTotal = orderTotal.toFixed(2)
    const customerFirstName = checkoutForm.customerName.trim().split(' ')[0]

    setOrderFeedbackType('success')
    setOrderFeedback(
      `Thanks ${customerFirstName}! Order #${orderNumber} placed successfully. Total charged: $${placedTotal}.`,
    )
    setCheckoutForm(createInitialCheckoutForm())
    dispatch(clearOrder())
  }

  const handleClearOrder = () => {
    setOrderFeedbackType('success')
    setOrderFeedback('')
    setCheckoutForm(createInitialCheckoutForm())
    dispatch(clearOrder())
  }

  return (
    <div className="page theme-casual">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="hero">
        <h1>
          Olive and Ember <span className="restaurant-script">Restaurant</span>
        </h1>
        <p>Select a food type, review nutrition details, and build your order.</p>
      </header>

      <main id="main-content" className="main-content">
        <section className="categories" aria-label="Food types">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-button ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => dispatch(setCategory(category))}
            >
              {category}
            </button>
          ))}
        </section>

        <div className="content-grid">
          <section className="menu-panel" aria-labelledby="menu-heading">
            <h2 id="menu-heading">Menu</h2>
            <div className="menu-grid">
              {filteredMenuItems.map((item) => (
                <article
                  className="menu-card"
                  key={item.id}
                  style={{
                    '--menu-card-image': item.image ? `url("${item.image}")` : 'none',
                  }}
                >
                  <div className="menu-card-header">
                    <h3>{item.name}</h3>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  {item.image && (
                    <button
                      type="button"
                      className="food-image-button"
                      onClick={() =>
                        setZoomedImageId((currentId) =>
                          currentId === item.id ? null : item.id,
                        )
                      }
                      aria-label={`${
                        zoomedImageId === item.id ? 'Shrink' : 'Zoom'
                      } for ${item.name}`}
                      aria-pressed={zoomedImageId === item.id}
                    >
                      <img
                        className={`food-image ${
                          zoomedImageId === item.id
                            ? 'zoomed'
                            : ''
                        }`}
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  )}
                  <p>{item.description}</p>
                  <p className="serves-text">
                    <strong>Serves:</strong> {item.serves}
                  </p>

                  <ul className="nutrition-list" aria-label={`${item.name} nutritional values`}>
                    <li>
                      <strong>Calories:</strong> {item.nutrition.calories}
                    </li>
                    <li>
                      <strong>Protein:</strong> {item.nutrition.protein}g
                    </li>
                    <li>
                      <strong>Carbs:</strong> {item.nutrition.carbs}g
                    </li>
                    <li>
                      <strong>Fat:</strong> {item.nutrition.fat}g
                    </li>
                  </ul>

                  {item.ingredients?.length > 0 && (
                    <div className="ingredients-block">
                      <strong>Ingredients:</strong>
                      <ul className="ingredients-list" aria-label={`${item.name} ingredients`}>
                        {item.ingredients.map((ingredient, index) => (
                          <li key={`${item.id}-ingredient-${index}`}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    type="button"
                    className="add-button"
                    onClick={() => dispatch(addToOrder(item))}
                  >
                    Add to Order
                  </button>
                </article>
              ))}
            </div>
          </section>

          <aside className="order-panel" aria-labelledby="order-heading">
            <div className="order-panel-header">
              <h2 id="order-heading">Current Order</h2>
              <span className="order-count" role="status" aria-live="polite">
                {orderItemCount} item{orderItemCount === 1 ? '' : 's'}
              </span>
            </div>

            {orderItems.length === 0 ? (
              <p className="empty-order">No items added yet.</p>
            ) : (
              <ul className="order-list">
                {orderItems.map((item) => (
                  <li className="order-item" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)} each</p>
                      <p className="order-serves">
                        <strong>Serves:</strong> {item.serves}
                      </p>
                      {item.ingredients?.length > 0 && (
                        <p className="order-ingredients-preview">
                          <strong>Ingredients:</strong>{' '}
                          {item.ingredients.slice(0, 2).join(', ')}
                          {item.ingredients.length > 2 ? ', ...' : ''}
                        </p>
                      )}
                    </div>
                    <div className="order-controls">
                      <button
                        type="button"
                        className="qty-button"
                        onClick={() => dispatch(decreaseOrderItem(item.id))}
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        -
                      </button>
                      <span className="qty-value" aria-live="polite" aria-atomic="true">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="qty-button"
                        onClick={() => dispatch(addToOrder(item))}
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => dispatch(removeFromOrder(item.id))}
                        aria-label={`Remove ${item.name} from order`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="order-summary">
              <p>
                Total: <strong>${orderTotal.toFixed(2)}</strong>
              </p>
              <p>
                Calories: <strong>{orderCalories}</strong>
              </p>
              <p>
                Protein: <strong>{orderProtein}g</strong>
              </p>
              <p>
                Carbs: <strong>{orderCarbs}g</strong>
              </p>
              <p>
                Fat: <strong>{orderFat}g</strong>
              </p>
            </div>

            <form
              className="checkout-form"
              onSubmit={handlePlaceOrder}
              aria-describedby="checkout-note"
            >
              <fieldset className="checkout-fieldset">
                <legend className="checkout-section-title">Customer Information</legend>
                <div className="checkout-grid">
                  <label className="checkout-field" htmlFor="customerName">
                    <span>Full Name</span>
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      value={checkoutForm.customerName}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="checkout-field" htmlFor="customerEmail">
                    <span>Email</span>
                    <input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      value={checkoutForm.customerEmail}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className="checkout-field" htmlFor="customerPhone">
                    <span>Phone</span>
                    <input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      value={checkoutForm.customerPhone}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="tel"
                      required
                    />
                  </label>

                  <label
                    className="checkout-field checkout-field-full"
                    htmlFor="deliveryAddress"
                  >
                    <span>Address</span>
                    <input
                      id="deliveryAddress"
                      name="deliveryAddress"
                      type="text"
                      value={checkoutForm.deliveryAddress}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="street-address"
                      required
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="checkout-fieldset">
                <legend className="checkout-section-title">Payment Information</legend>
                <div className="checkout-grid">
                  <label
                    className="checkout-field checkout-field-full"
                    htmlFor="cardholderName"
                  >
                    <span>Name on Card</span>
                    <input
                      id="cardholderName"
                      name="cardholderName"
                      type="text"
                      value={checkoutForm.cardholderName}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="cc-name"
                      required
                    />
                  </label>

                  <label className="checkout-field" htmlFor="cardNumber">
                    <span>Card Number</span>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      value={checkoutForm.cardNumber}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="cc-number"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </label>

                  <label className="checkout-field" htmlFor="cardExpiry">
                    <span>Expiry</span>
                    <input
                      id="cardExpiry"
                      name="cardExpiry"
                      type="text"
                      value={checkoutForm.cardExpiry}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      required
                    />
                  </label>

                  <label className="checkout-field" htmlFor="cardCvc">
                    <span>CVV</span>
                    <input
                      id="cardCvc"
                      name="cardCvc"
                      type="password"
                      value={checkoutForm.cardCvc}
                      onChange={handleCheckoutFieldChange}
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      maxLength={4}
                      required
                    />
                  </label>
                </div>
              </fieldset>

              <p id="checkout-note" className="checkout-note">
                Checkout is simulated for demo purposes. No payment is processed.
              </p>

              <button
                className="place-order-button"
                type="submit"
                disabled={orderItems.length === 0}
              >
                Place Order
              </button>
            </form>

            <button
              type="button"
              className="clear-button"
              onClick={handleClearOrder}
              disabled={orderItems.length === 0}
            >
              Clear Order
            </button>

            {orderFeedback && (
              <p
                className={`order-feedback ${orderFeedbackType}`}
                role={orderFeedbackType === 'error' ? 'alert' : 'status'}
                aria-live={orderFeedbackType === 'error' ? 'assertive' : 'polite'}
              >
                {orderFeedback}
              </p>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
