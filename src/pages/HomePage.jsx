import React from 'react'
import { useProducts } from '../hooks/useProducts'
import { useApp } from '../context/AppContext'
import ProductList from '../components/ProductList'
import CategoryList from '../components/CategoryList'

const HomePage = () => {
  const { state, setSortBy } = useApp()
  const { data: products, isLoading, error } = useProducts(state.selectedCategory)

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Failed to load products</h2>
          <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="hero rounded-2xl p-8 mb-8 text-center">
        <h1 className="text-5xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
          Welcome to ShopHub
        </h1>
        <p className="text-xl">Discover amazing products at great prices</p>
      </div>

      {/* Categories */}
      <CategoryList />

      {/* Sort Bar */}
      <div className="flex justify-between items-center mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <span className="font-semibold">Sort by:</span>
        <select
          value={state.sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input w-48"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Products */}
      <ProductList products={products} isLoading={isLoading} />
    </div>
  )
}

export default HomePage