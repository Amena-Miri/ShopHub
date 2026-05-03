import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

export const productsApi = {
  getAllProducts: () => axios.get(`${API_BASE_URL}/products`),
  getProductById: (id) => axios.get(`${API_BASE_URL}/products/${id}`),
  getCategories: () => axios.get(`${API_BASE_URL}/products/categories`),
  getProductsByCategory: (category) => axios.get(`${API_BASE_URL}/products/category/${category}`),
}