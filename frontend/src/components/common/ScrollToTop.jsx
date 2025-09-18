import React, { useState, useEffect } from 'react'
import {
  Box,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { FaArrowUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          bottom="30px"
          right="30px"
          zIndex={1000}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <IconButton
            onClick={scrollToTop}
            icon={<Icon as={FaArrowUp} />}
            size="lg"
            bg="primary.500"
            color="white"
            borderRadius="full"
            boxShadow="0 10px 30px rgba(107, 29, 29, 0.3)"
            _hover={{
              bg: 'primary.600',
              transform: 'translateY(-3px)',
              boxShadow: '0 15px 40px rgba(107, 29, 29, 0.4)',
            }}
            _active={{
              transform: 'translateY(-1px)',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            aria-label="Scroll to top"
            w="60px"
            h="60px"
          />
          
          {/* Decorative ring */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="80px"
            h="80px"
            border="2px solid"
            borderColor="accent.300"
            borderRadius="full"
            opacity={0.6}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            pointerEvents="none"
            as={motion.div}
          />
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop