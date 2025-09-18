import React from 'react'
import {
  Box,
  VStack,
  Text,
  Spinner as ChakraSpinner,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const PageLoader = ({ text = "Loading..." }) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="background.ivory"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.05}
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im1hbmRhbGEiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNtYW5kYWxhKSIvPjwvc3ZnPg==')"
        backgroundSize="500px 500px"
        zIndex={0}
      />

      <MotionBox
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        position="relative"
        zIndex={2}
      >
        <VStack spacing={8}>
          {/* Brand Logo */}
          <MotionBox
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Text
              fontSize="4xl"
              fontFamily="accent"
              color="primary.500"
              fontWeight="400"
              letterSpacing="wider"
            >
              Vikram Mehndi
            </Text>
          </MotionBox>

          {/* Custom Spinner */}
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box position="relative">
              <ChakraSpinner
                size="xl"
                color="accent.500"
                thickness="3px"
                speed="0.8s"
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="30px"
                h="30px"
                bg="primary.500"
                borderRadius="full"
                opacity={0.8}
              />
            </Box>
          </MotionBox>

          {/* Loading Text */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Text
              fontSize="lg"
              color="text.charcoal"
              fontWeight="300"
              letterSpacing="2px"
              textTransform="uppercase"
            >
              {text}
            </Text>
          </MotionBox>
        </VStack>
      </MotionBox>
    </Box>
  )
}

export default PageLoader