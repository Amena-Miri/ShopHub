import React from 'react'
import ProductCard from './ProductCard'
import { useApp } from '../context/AppContext'

const ProductList = ({ products, isLoading }) => {
  const { state } = useApp()
  const { viewMode, sortBy } = state

  const getSortedProducts = () => {
    if (!products) return []
    const sorted = [...products]
    if (sortBy === 'price-asc') {
      return sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      return sorted.sort((a, b) => b.price - a.price)
    }
    return sorted
  }

  const sortedProducts = getSortedProducts()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card skeleton" style={{ height: '300px' }}></div>
        ))}
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="list" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="grid" />
      ))}
    </div>
  )
}

export default ProductList