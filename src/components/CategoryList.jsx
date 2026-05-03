import React from 'react'
import { useCategories } from '../hooks/useProducts'
import { useApp } from '../context/AppContext'

const CategoryList = () => {
  const { data: categories, isLoading } = useCategories()
  const { state, setSelectedCategory } = useApp()

  if (isLoading) return null

  return (
    <div className="mb-8">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories?.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              state.selectedCategory === category 
                ? 'shadow-md' 
                : ''
            }`}
            style={{
              backgroundColor: state.selectedCategory === category 
                ? 'var(--accent)' 
                : 'var(--bg-secondary)',
              color: state.selectedCategory === category 
                ? '#1a1a1a' 
                : 'var(--text-primary)',
              border: `1px solid ${state.selectedCategory === category ? 'var(--accent)' : 'var(--border-color)'}`
            }}
          >
            {category === 'all' ? 'All Products' : category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryList