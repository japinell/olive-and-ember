import { createSlice } from '@reduxjs/toolkit'

const comboEligibleMainCategories = new Set([
  'Pizza',
  'Burgers',
  'Salads',
  'Bowls',
  'Healthy',
])

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    items: [],
  },
  reducers: {
    addToOrder(state, action) {
      const selectedItem = action.payload
      const existingItem = state.items.find((item) => item.id === selectedItem.id)

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push({
        ...selectedItem,
        quantity: 1,
      })
    },
    decreaseOrderItem(state, action) {
      const targetItemId = action.payload
      const existingItem = state.items.find((item) => item.id === targetItemId)

      if (!existingItem) {
        return
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== targetItemId)
        return
      }

      existingItem.quantity -= 1
    },
    removeFromOrder(state, action) {
      const targetItemId = action.payload
      state.items = state.items.filter((item) => item.id !== targetItemId)
    },
    clearOrder(state) {
      state.items = []
    },
  },
})

export const { addToOrder, decreaseOrderItem, removeFromOrder, clearOrder } =
  orderSlice.actions

export const selectOrderItems = (state) => state.order.items

export const selectOrderItemCount = (state) =>
  state.order.items.reduce((count, item) => count + item.quantity, 0)

export const selectOrderSubtotal = (state) =>
  state.order.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectOrderHasValueCombo = (state) => {
  const hasDrink = state.order.items.some(
    (item) => item.category === 'Drinks' && item.quantity > 0,
  )
  const hasMain = state.order.items.some(
    (item) => comboEligibleMainCategories.has(item.category) && item.quantity > 0,
  )

  return hasDrink && hasMain
}

export const selectOrderComboDiscount = (state) => {
  if (!selectOrderHasValueCombo(state)) {
    return 0
  }

  return selectOrderSubtotal(state) * 0.1
}

export const selectOrderTotal = (state) =>
  selectOrderSubtotal(state) - selectOrderComboDiscount(state)

export const selectOrderCalories = (state) =>
  state.order.items.reduce(
    (total, item) => total + item.nutrition.calories * item.quantity,
    0,
  )

export const selectOrderProtein = (state) =>
  state.order.items.reduce(
    (total, item) => total + item.nutrition.protein * item.quantity,
    0,
  )

export const selectOrderCarbs = (state) =>
  state.order.items.reduce(
    (total, item) => total + item.nutrition.carbs * item.quantity,
    0,
  )

export const selectOrderFat = (state) =>
  state.order.items.reduce(
    (total, item) => total + item.nutrition.fat * item.quantity,
    0,
  )

export const selectOrderSugar = (state) =>
  state.order.items.reduce(
    (total, item) => total + (item.nutrition.sugar ?? 0) * item.quantity,
    0,
  )

export default orderSlice.reducer
