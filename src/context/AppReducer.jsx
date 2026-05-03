export const initialState = {
  theme: 'light',
  viewMode: 'grid',
  selectedCategory: 'all',
  sortBy: 'default',
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload }
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }
    default:
      return state
  }
}