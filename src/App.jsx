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

function App() {
  const dispatch = useDispatch()
  const [zoomedImageId, setZoomedImageId] = useState(null)
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

  return (
    <div className="page theme-casual">
      <header className="hero">
        <h1>
          Olive and Ember <span className="restaurant-script">Restaurant</span>
        </h1>
        <p>Select a food type, review nutrition details, and build your order.</p>
      </header>

      <section className="categories" aria-label="Food types">
        {categories.map((category) => (
          <button
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
        <section className="menu-panel" aria-label="Food menu">
          <h2>Menu</h2>
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
                  className="add-button"
                  onClick={() => dispatch(addToOrder(item))}
                >
                  Add to Order
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="order-panel" aria-label="Order summary">
          <div className="order-panel-header">
            <h2>Current Order</h2>
            <span>
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
                      className="qty-button"
                      onClick={() => dispatch(decreaseOrderItem(item.id))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-button"
                      onClick={() => dispatch(addToOrder(item))}
                    >
                      +
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => dispatch(removeFromOrder(item.id))}
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

          <button
            className="clear-button"
            onClick={() => dispatch(clearOrder())}
            disabled={orderItems.length === 0}
          >
            Clear Order
          </button>
        </aside>
      </div>
    </div>
  )
}

export default App
