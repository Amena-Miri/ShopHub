import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { initialState, AppReducer } from './AppReducer'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const savedTheme = localStorage.getItem('theme')
    const savedViewMode = localStorage.getItem('viewMode')
    return {
      ...initialState,
      theme: savedTheme || initialState.theme,
      viewMode: savedViewMode || initialState.viewMode,
    }
  })

  useEffect(() => {
    localStorage.setItem('theme', state.theme)
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }, [state.theme])

  useEffect(() => {
    localStorage.setItem('viewMode', state.viewMode)
  }, [state.viewMode])

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' })
  const setViewMode = (mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode })
  const setSelectedCategory = (category) => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category })
  const setSortBy = (sort) => dispatch({ type: 'SET_SORT_BY', payload: sort })

  return (
    <AppContext.Provider value={{
      state,
      toggleTheme,
      setViewMode,
      setSelectedCategory,
      setSortBy,
    }}>
      {children}
    </AppContext.Provider>
  )
}