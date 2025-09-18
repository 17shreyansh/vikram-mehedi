import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'

const MotionBox = motion(Box)

const PrivacyPage = () => {
  return (
    <Box>
      <Navbar />
      
      <Box pt={32} pb={20} bg="linear-gradient(135deg, #FFFFFF 0%, #FAF9F7 100%)">
        <Container maxW="800px">
          <VStack spacing={8} textAlign="center">
            <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Heading fontSize={{ base: '4xl', md: '6xl' }} fontFamily="heading" color="primary.500" mb={6}>
                Privacy Policy
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Last updated: {new Date().toLocaleDateString()}
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      <Box py={20} bg="white">
        <Container maxW="800px">
          <VStack spacing={8} align="start">
            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Information We Collect</Heading>
              <Text color="gray.700" lineHeight="1.8">
                We collect information you provide directly to us, such as when you book our services, contact us, or subscribe to our newsletter. This may include your name, email address, phone number, and event details.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>How We Use Your Information</Heading>
              <Text color="gray.700" lineHeight="1.8">
                We use the information we collect to provide, maintain, and improve our services, process bookings, communicate with you, and send you updates about our services.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Information Sharing</Heading>
              <Text color="gray.700" lineHeight="1.8">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Data Security</Heading>
              <Text color="gray.700" lineHeight="1.8">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Contact Us</Heading>
              <Text color="gray.700" lineHeight="1.8">
                If you have any questions about this Privacy Policy, please contact us at vikram@mehendi.com or +91 98765 43210.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer />
      <ScrollToTop />
    </Box>
  )
}

export default PrivacyPage