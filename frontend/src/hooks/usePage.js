import { useState, useEffect } from 'react'
import { pagesAPI } from '../services/api'

export const usePage = (slug) => {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPage()
  }, [slug])

  const fetchPage = async () => {
    try {
      setLoading(true)
      setError(null)
      const pageData = await pagesAPI.getBySlug(slug)
      setPage(pageData)
    } catch (err) {
      setError(err)
      setPage(null)
    } finally {
      setLoading(false)
    }
  }

  return { page, loading, error, refetch: fetchPage }
}