import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../features/menu/menuSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
  },
})
