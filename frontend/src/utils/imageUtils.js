// Image URL utilities
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000'

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  return `${IMAGE_BASE_URL}${imagePath}`
}

export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
}