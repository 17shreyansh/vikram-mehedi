import React from 'react'
import { Box, Spinner as ChakraSpinner, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const Spinner = ({ size = 'lg', text = 'Loading...', color = 'primary.500' }) => {
  return (
    <VStack spacing={4}>
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <ChakraSpinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={color}
          size={size}
        />
      </MotionBox>
      {text && (
        <Text color="gray.600" fontSize="sm" fontWeight="500">
          {text}
        </Text>
      )}
    </VStack>
  )
}

export default Spinner