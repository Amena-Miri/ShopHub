import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useProduct } from '../hooks/useProducts'
import { addToCart } from '../redux/cartSlice'
import LoadingSpinner from './LoadingSpinner'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: product, isLoading, error } = useProduct(id)
  const [quantity, setQuantity] = useState(1)

  if (isLoading) return <LoadingSpinner />
  
  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading product</h2>
        <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
      </div>
    </div>
  )

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
      }))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="btn-secondary mb-6">← Back</button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6 flex justify-center">
          <img src={product.thumbnail} alt={product.title} className="max-h-96 object-contain" />
        </div>

        <div className="space-y-4">
          <span className="badge">{product.brand || 'Premium Brand'}</span>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 dark:text-gray-400">{product.stock} in stock</span>
          </div>

          <p className="leading-relaxed">{product.description}</p>

          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <span className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-gray-500 line-through">
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-gray-700">-</button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-gray-700">+</button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex-1 text-lg py-3">Add to Cart ({quantity})</button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold capitalize">{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Warranty</p>
              <p className="font-semibold">{product.warrantyInformation || '1 Year'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails