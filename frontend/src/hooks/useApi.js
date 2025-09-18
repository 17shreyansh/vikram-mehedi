import { useState, useEffect } from 'react'

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.success ? response.data : response)
    } catch (err) {
      setError(err.error || 'An error occurred')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  const refetch = () => fetchData()

  return { data, loading, error, refetch }
}

export const useApiMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (apiCall) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      return response.success ? response.data : response
    } catch (err) {
      setError(err.error || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}