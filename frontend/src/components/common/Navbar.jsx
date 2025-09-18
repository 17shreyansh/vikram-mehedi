import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const MotionBox = motion(Box)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (item) => {
    if (item.path.includes('#')) {
      // Handle section scrolling
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        window.location.href = `/${item.path}`
        return
      }
      // Already on home page, just scroll
      const sectionId = item.path.replace('/#', '')
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#contact'
      return
    }
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <MotionBox
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      position="fixed"
      top={0}
      w="100%"
      bg={scrolled ? 'rgba(253, 251, 247, 0.95)' : 'rgba(253, 251, 247, 0.8)'}
      backdropFilter="blur(20px)"
      zIndex={1000}
      borderBottom={scrolled ? '1px solid' : 'none'}
borderColor="accent.100"
      boxShadow={scrolled ? '0 8px 32px rgba(0,0,0,0.1)' : 'none'}
      sx={{
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={8}
        py={6}
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Text
              fontSize="2xl"
              fontFamily="accent"
              color="primary.500"
              fontWeight="bold"
              letterSpacing="wider"
            >
              Vikram Mehndi
            </Text>
          </MotionBox>
        </Link>

        <Stack direction="row" spacing={10} display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item, index) => (
            <MotionBox
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Text
                cursor="pointer"
                fontWeight="500"
                fontSize="lg"
                color="text.charcoal"
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '0%',
                  height: '2px',
                  bg: 'accent.500',
                  transition: 'width 0.3s ease',
                }}
                _hover={{
                  color: 'primary.500',
                  _after: { width: '100%' }
                }}
                onClick={() => item.path.includes('#') ? handleNavigation(item) : null}
                as={Link}
                to={item.path.includes('#') ? undefined : item.path}
              >
                {item.name}
              </Text>
            </MotionBox>
          ))}
        </Stack>

        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          display={{ base: 'none', md: 'block' }}
        >
          <Button
            bg="primary.500"
            color="white"
            size="lg"
            px={8}
            borderRadius="full"
            fontWeight="600"
            onClick={scrollToContact}
            _hover={{
              bg: 'primary.600',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 25px rgba(107, 29, 29, 0.3)',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            Book Now
          </Button>
        </MotionBox>

        <IconButton
          display={{ base: 'block', md: 'none' }}
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onOpen}
          color="primary.500"
          size="lg"
        />

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontFamily="accent" color="primary.500" fontSize="xl">
              Vikram Mehndi
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={8} align="start" pt={8}>
                {navItems.map((item) => (
                  <Text
                    key={item.name}
                    cursor="pointer"
                    fontWeight="500"
                    fontSize="xl"
                    color="text.charcoal"
                    _hover={{ color: 'primary.500' }}
                    onClick={() => {
                      if (item.path.includes('#')) {
                        handleNavigation(item)
                      }
                      onClose()
                    }}
                    as={Link}
                    to={item.path.includes('#') ? undefined : item.path}
                  >
                    {item.name}
                  </Text>
                ))}
                <Button
                  bg="primary.500"
                  color="white"
                  size="lg"
                  w="full"
                  borderRadius="full"
                  fontWeight="600"
                  onClick={() => {
                    scrollToContact()
                    onClose()
                  }}
                >
                  Book Now
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </MotionBox>
  )
}

export default Navbar