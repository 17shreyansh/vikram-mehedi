import React, { useState } from 'react'
import { Image, Box } from '@chakra-ui/react'

const LazyImage = ({ src, alt, fallback, ...props }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <>
      {!loaded && !error && (
        <Box 
          w="100%" 
          h="100%" 
          bg="gray.100" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          position="absolute"
          top={0}
          left={0}
        />
      )}
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        opacity={loaded ? 1 : 0}
        transition="opacity 0.3s ease"
        {...props}
      />
      {error && fallback}
    </>
  )
}

export default LazyImage