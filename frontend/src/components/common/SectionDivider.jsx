import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const SectionDivider = ({ variant = 'default', height = '100px' }) => {
  const variants = {
    default: {
      bg: 'linear-gradient(135deg, rgba(197,165,114,0.1) 0%, rgba(107,29,29,0.05) 100%)',
      pattern: null,
    },
    mandala: {
      bg: 'transparent',
      pattern: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im1hbmRhbGEiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0M1QTU3MiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI1MCIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZCMUQxRCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuNCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNtYW5kYWxhKSIvPjwvc3ZnPg==')",
    },
    wave: {
      bg: 'transparent',
      clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
    },
  }

  const currentVariant = variants[variant] || variants.default

  return (
    <Box
      position="relative"
      h={height}
      overflow="hidden"
      bg={currentVariant.bg}
      backgroundImage={currentVariant.pattern}
      backgroundSize="400px 200px"
      backgroundRepeat="repeat-x"
      backgroundPosition="center"
      clipPath={currentVariant.clipPath}
    >
      {/* Animated decorative elements */}
      <Container maxW="1400px" h="100%" position="relative">
        <MotionBox
          position="absolute"
          top="50%"
          left="20%"
          transform="translateY(-50%)"
          w="60px"
          h="60px"
          border="2px solid"
          borderColor="accent.300"
          borderRadius="full"
          opacity={0.4}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <MotionBox
          position="absolute"
          top="30%"
          right="25%"
          w="40px"
          h="40px"
          bg="primary.200"
          borderRadius="lg"
          opacity={0.3}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <MotionBox
          position="absolute"
          bottom="20%"
          left="60%"
          w="30px"
          h="30px"
          border="2px solid"
          borderColor="primary.300"
          borderRadius="full"
          opacity={0.5}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </Container>
    </Box>
  )
}

export default SectionDivider