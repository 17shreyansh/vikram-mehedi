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

const TermsPage = () => {
  return (
    <Box>
      <Navbar />
      
      <Box pt={32} pb={20} bg="linear-gradient(135deg, #FFFFFF 0%, #FAF9F7 100%)">
        <Container maxW="800px">
          <VStack spacing={8} textAlign="center">
            <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Heading fontSize={{ base: '4xl', md: '6xl' }} fontFamily="heading" color="primary.500" mb={6}>
                Terms & Conditions
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
              <Heading fontSize="2xl" color="primary.500" mb={4}>Booking & Payment</Heading>
              <Text color="gray.700" lineHeight="1.8">
                All bookings require advance payment. Cancellations must be made at least 24 hours before the scheduled appointment. Refunds are subject to our cancellation policy.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Service Terms</Heading>
              <Text color="gray.700" lineHeight="1.8">
                We use only natural, high-quality henna. Results may vary based on skin type and aftercare. We are not responsible for allergic reactions, though we recommend patch tests for sensitive skin.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Liability</Heading>
              <Text color="gray.700" lineHeight="1.8">
                Our liability is limited to the cost of services provided. We are not responsible for any indirect or consequential damages arising from our services.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Intellectual Property</Heading>
              <Text color="gray.700" lineHeight="1.8">
                All designs and content on this website are our intellectual property. Unauthorized use or reproduction is prohibited.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="2xl" color="primary.500" mb={4}>Contact</Heading>
              <Text color="gray.700" lineHeight="1.8">
                For questions about these terms, contact us at vikram@mehendi.com or +91 98765 43210.
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

export default TermsPage