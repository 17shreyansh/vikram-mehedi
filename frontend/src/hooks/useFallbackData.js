import { useState, useEffect } from 'react'
import { checkServerStatus, fallbackGalleryData, fallbackServicesData, getRandomFallbackImage } from '../utils/fallbackData'
import { getApiUrl } from '../utils/imageUtils'

const getFallbackData = (type) => {
  switch (type) {
    case 'gallery':
      return fallbackGalleryData
    case 'services':
      return fallbackServicesData
    default:
      return []
  }
}

export const useFallbackData = (dataType = 'gallery') => {
  const [data, setData] = useState(getFallbackData(dataType))
  const [isOnline, setIsOnline] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      const serverOnline = await checkServerStatus()
      setIsOnline(serverOnline)

      if (serverOnline) {
        try {
          const response = await fetch(`${getApiUrl()}/${dataType}`)
          if (response.ok) {
            const serverData = await response.json()
            setData(serverData.items || serverData.services || serverData || [])
          } else {
            throw new Error('Server response not ok')
          }
        } catch (error) {
          setIsOnline(false)
          setData(getFallbackData(dataType))
        }
      } else {
        setData(getFallbackData(dataType))
      }
      
      setLoading(false)
    }

    fetchData()
  }, [dataType])

  return { data, isOnline, loading }
}

export const useHeroImage = () => {
  const [heroImage, setHeroImage] = useState(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const fetchHeroImage = async () => {
      const serverOnline = await checkServerStatus()
      setIsOnline(serverOnline)

      if (serverOnline) {
        try {
          const response = await fetch(`${getApiUrl()}/hero-image`)
          if (response.ok) {
            const data = await response.json()
            setHeroImage(data.image)
          } else {
            throw new Error('Failed to fetch hero image')
          }
        } catch (error) {
          setHeroImage(getRandomFallbackImage())
          setIsOnline(false)
        }
      } else {
        setHeroImage(getRandomFallbackImage())
      }
    }

    fetchHeroImage()
  }, [])

  return { heroImage, isOnline }
}