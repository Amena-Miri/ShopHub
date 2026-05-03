import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useApp } from '../context/AppContext'
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const { totalQuantity } = useSelector((state) => state.cart)
  const { state, toggleTheme, setViewMode } = useApp()

  return (
    <nav className="navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            {/* LOgo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src={logo} 
              alt="ShopHub Logo" 
              className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
              ShopHub
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors"
            >
              Products
            </button>
            
            {/* View Toggle */}
            <div className="hidden sm:flex items-center space-x-1 rounded-lg p-1" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  state.viewMode === 'grid' 
                    ? 'text-white' 
                    : ''
                }`}
                style={{
                  backgroundColor: state.viewMode === 'grid' ? 'var(--accent)' : 'transparent',
                  color: state.viewMode === 'grid' ? '#1a1a1a' : 'var(--text-primary)'
                }}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  state.viewMode === 'list' 
                    ? 'text-white' 
                    : ''
                }`}
                style={{
                  backgroundColor: state.viewMode === 'list' ? 'var(--accent)' : 'transparent',
                  color: state.viewMode === 'list' ? '#1a1a1a' : 'var(--text-primary)'
                }}
              >
                List
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-lg transition-all"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              {state.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-lg transition-all"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#1a1a1a'
              }}
            >
              🛒
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar