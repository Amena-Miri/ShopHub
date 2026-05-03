import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../redux/cartSlice'

const ProductCard = ({ product, viewMode }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
    }))
  }

  if (viewMode === 'list') {
    return (
      <div className="card flex gap-4 p-4 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded-lg" />
        <div className="flex-1">
          <h3 className="font-semibold text-base">{product.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>${product.price}</span>
            <button onClick={handleAddToCart} className="btn-primary text-sm py-1.5 px-3">Add to Cart</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card cursor-pointer group" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="p-4 h-48 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <img src={product.thumbnail} alt={product.title} className="h-32 object-contain group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <h3 className="font-semibold truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.brand || 'Premium'}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>${product.price}</span>
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full transition-all transform hover:scale-110"
            style={{ backgroundColor: 'var(--accent)', color: '#1a1a1a' }}
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard