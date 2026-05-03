import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--accent)' }}>Your cart is empty</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Looks like you haven't added any items yet</p>
          <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>Shopping Cart</h1>
        <button onClick={() => dispatch(clearCart())} className="text-red-500 hover:text-red-600 font-semibold">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card p-4 flex gap-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="font-bold text-xl" style={{ color: 'var(--accent)' }}>${item.price}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} className="w-8 h-8 rounded-md" style={{ backgroundColor: 'var(--bg-secondary)' }}>-</button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} className="w-8 h-8 rounded-md" style={{ backgroundColor: 'var(--bg-secondary)' }}>+</button>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="ml-auto text-red-500 font-semibold">Remove</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl" style={{ color: 'var(--accent)' }}>${item.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent)' }}>Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Items ({totalQuantity})</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="border-t pt-3 mt-3" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="btn-primary w-full mb-3 py-3 text-lg">Proceed to Checkout</button>
            <Link to="/" className="btn-secondary w-full block text-center">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart