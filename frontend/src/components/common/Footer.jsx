import React from 'react'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  Divider,
  Image,
} from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const Footer = ({ pageContent }) => {
  // Get contact data from pageContent or use defaults
  const contactData = pageContent?.sections?.find(s => s.type === 'contact')?.data?.contactInfo || {
    phone: '+91 98765 43210',
    email: 'vikram@mehndiart.com',
    address: 'Mumbai, Maharashtra',
    whatsapp: '+91 98765 43210',
    instagram: '@vikrammehndi',
    facebook: 'VikramMehndiArt'
  }

  const socialLinks = [
    { icon: FaFacebook, url: `https://facebook.com/${contactData.facebook}`, label: 'Facebook', color: 'blue.500' },
    { icon: FaInstagram, url: `https://instagram.com/${contactData.instagram.replace('@', '')}`, label: 'Instagram', color: 'pink.500' },
    { icon: FaWhatsapp, url: `https://wa.me/${contactData.whatsapp.replace(/\s/g, '').replace('+', '')}`, label: 'WhatsApp', color: 'green.500' },
  ]

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const services = [
    'Bridal Mehndi',
    'Arabic Mehndi',
    'Indo-Western',
    'Party Mehndi',
    'Corporate Events',
  ]

  const scrollToSection = (sectionId) => {
    if (sectionId.includes('#')) {
      const element = document.getElementById(sectionId.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Box bg="primary.500" color="white" position="relative" overflow="hidden">
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.05}
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im1hbmRhbGEiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjEiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNtYW5kYWxhKSIvPjwvc3ZnPg==')"
        backgroundSize="150px 150px"
      />

      <Container maxW="1400px" position="relative" zIndex={2} py={20}>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={12}>
          {/* Brand Section */}
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <VStack align="start" spacing={8}>
                <VStack align="start" spacing={4}>
                  <Heading
                    fontSize="4xl"
                    fontFamily="accent"
                    color="accent.200"
                    fontWeight="400"
                  >
                    Vikram Mehndi
                  </Heading>
                  <Text fontSize="lg" opacity={0.9} lineHeight="1.8" maxW="400px" fontWeight="300">
                    Creating beautiful mehndi designs for your special occasions. 
                    With over 8 years of experience, we bring artistry and elegance 
                    to every design, making your moments truly memorable.
                  </Text>
                </VStack>

                <HStack spacing={6}>
                  {socialLinks.map((social, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={social.url}
                        isExternal
                        w="50px"
                        h="50px"
                        bg="whiteAlpha.100"
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ 
                          bg: social.color,
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 25px rgba(255,255,255,0.2)'
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        <Icon as={social.icon} boxSize={5} />
                      </Link>
                    </MotionBox>
                  ))}
                </HStack>
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Quick Links */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <VStack align="start" spacing={8}>
                <Heading fontSize="xl" color="accent.200" fontFamily="heading" fontWeight="500">
                  Quick Links
                </Heading>
                <VStack align="start" spacing={4}>
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      as={!link.href.includes('#') ? RouterLink : 'span'}
                      to={!link.href.includes('#') ? link.href : undefined}
                      onClick={() => link.href.includes('#') ? scrollToSection(link.href) : null}
                      fontSize="lg"
                      opacity={0.9}
                      cursor="pointer"
                      fontWeight="300"
                      _hover={{ 
                        color: 'accent.200', 
                        opacity: 1, 
                        transform: 'translateX(5px)',
                        textDecoration: 'none'
                      }}
                      transition="all 0.3s ease"
                    >
                      {link.label}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Services */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <VStack align="start" spacing={8}>
                <Heading fontSize="xl" color="accent.200" fontFamily="heading" fontWeight="500">
                  Our Services
                </Heading>
                <VStack align="start" spacing={4}>
                  {services.map((service, index) => (
                    <Text
                      key={index}
                      fontSize="lg"
                      opacity={0.9}
                      fontWeight="300"
                      _hover={{ 
                        color: 'accent.200', 
                        opacity: 1,
                        transform: 'translateX(5px)'
                      }}
                      transition="all 0.3s ease"
                      cursor="pointer"
                    >
                      {service}
                    </Text>
                  ))}
                </VStack>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>

        {/* Contact Info Bar */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          mt={16}
          p={8}
          bg="whiteAlpha.100"
          borderRadius="2xl"
          backdropFilter="blur(10px)"
        >
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            <HStack spacing={4}>
              <Box
                p={3}
                bg="accent.500"
                borderRadius="xl"
                color="white"
              >
                <Icon as={FaPhone} boxSize={5} />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" opacity={0.8} textTransform="uppercase" letterSpacing="1px">Phone</Text>
                <Text fontSize="lg" fontWeight="500">{contactData.phone}</Text>
              </VStack>
            </HStack>

            <HStack spacing={4}>
              <Box
                p={3}
                bg="accent.500"
                borderRadius="xl"
                color="white"
              >
                <Icon as={FaEnvelope} boxSize={5} />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" opacity={0.8} textTransform="uppercase" letterSpacing="1px">Email</Text>
                <Text fontSize="lg" fontWeight="500">{contactData.email}</Text>
              </VStack>
            </HStack>

            <HStack spacing={4}>
              <Box
                p={3}
                bg="accent.500"
                borderRadius="xl"
                color="white"
              >
                <Icon as={FaMapMarkerAlt} boxSize={5} />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" opacity={0.8} textTransform="uppercase" letterSpacing="1px">Location</Text>
                <Text fontSize="lg" fontWeight="500">{contactData.address}</Text>
              </VStack>
            </HStack>
          </Grid>
        </MotionBox>

        <Divider my={12} borderColor="whiteAlpha.300" />

        {/* Bottom Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <HStack justify="space-between" flexWrap="wrap" spacing={6}>
            <HStack spacing={2}>
              <Text fontSize="lg" opacity={0.8}>
                © 2024 Vikram Mehndi. Made with
              </Text>
              <Icon as={FaHeart} color="accent.300" boxSize={4} />
              <Text fontSize="lg" opacity={0.8}>
                in Mumbai
              </Text>
            </HStack>
            <HStack spacing={8}>
              <Link as={RouterLink} to="/privacy" fontSize="lg" opacity={0.8} _hover={{ opacity: 1, color: 'accent.200' }} fontWeight="300">
                Privacy Policy
              </Link>
              <Link as={RouterLink} to="/terms" fontSize="lg" opacity={0.8} _hover={{ opacity: 1, color: 'accent.200' }} fontWeight="300">
                Terms & Conditions
              </Link>
            </HStack>
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default Footer