import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

const fetchProducts = async (category) => {
  let url = `${API_BASE_URL}/products`
  if (category && category !== 'all') {
    url = `${API_BASE_URL}/products/category/${category}`
  }
  const response = await axios.get(url)
  return response.data.products || response.data
}

const fetchProduct = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`)
  return response.data
}

const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/categories`)
  return ['all', ...response.data.map(cat => cat.slug || cat)]
}

export const useProducts = (category = 'all') => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
    staleTime: 5 * 60 * 1000,
  })
}

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}