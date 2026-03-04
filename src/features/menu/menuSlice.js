import { createSlice } from '@reduxjs/toolkit'
import { foodCategories, foodMenu } from '../../data/menuData'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    categories: foodCategories,
    selectedCategory: 'Healthy',
    items: foodMenu,
  },
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload
    },
  },
})

export const { setCategory } = menuSlice.actions

export const selectCategories = (state) => state.menu.categories
export const selectSelectedCategory = (state) => state.menu.selectedCategory
export const selectMenuItems = (state) => state.menu.items

export default menuSlice.reducer
