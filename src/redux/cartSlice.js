import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart')
  return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0, totalAmount: 0 }
}

const saveCartToStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify({
    items: state.items,
    totalQuantity: state.totalQuantity,
    totalAmount: state.totalAmount,
  }))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.price * existingItem.quantity
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        })
      }
      
      state.totalQuantity += 1
      state.totalAmount += action.payload.price
      saveCartToStorage(state)
      toast.success('Added to cart!')
    },
    
    removeFromCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        state.totalQuantity -= item.quantity
        state.totalAmount -= item.totalPrice
        state.items = state.items.filter(item => item.id !== action.payload)
        saveCartToStorage(state)
        toast.success('Removed from cart')
      }
    },
    
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
        item.totalPrice += item.price
        state.totalQuantity += 1
        state.totalAmount += item.price
        saveCartToStorage(state)
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        item.totalPrice -= item.price
        state.totalQuantity -= 1
        state.totalAmount -= item.price
        saveCartToStorage(state)
      } else if (item && item.quantity === 1) {
        cartSlice.caseReducers.removeFromCart(state, action)
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
      saveCartToStorage(state)
      toast.success('Cart cleared!')
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer