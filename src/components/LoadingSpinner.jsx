import React from 'react'
import logo from '../assets/logo.png'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
            <img 
        src={logo} 
        alt="ShopHub Logo" 
        className="w-54 h-54 object-contain mb-6 animate-pulse"
      />
      <div className="loading-spinner"></div>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    </div>
  )
}

export default LoadingSpinner