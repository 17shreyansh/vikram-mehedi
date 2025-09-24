import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  Grid,
  GridItem,
  AspectRatio,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { servicesAPI } from '../../services/api'
import { getFallbackImage } from '../../utils/fallbackData'
import Spinner from '../common/Spinner'

const MotionBox = motion(Box)

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll({ active: true })
      setServices(response.services || [])
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box py={20} bg="background.ivory">
      <Container maxW="1200px">
        <VStack spacing={16}>
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <Text
              fontSize="lg"
              color="accent.600"
              fontFamily="accent"
              mb={4}
              letterSpacing="3px"
              textTransform="uppercase"
            >
              Our Services
            </Text>
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontFamily="heading"
              color="primary.500"
              mb={6}
              letterSpacing="-2px"
              fontWeight="400"
            >
              Mehndi Artistry
            </Heading>
            <Text fontSize="xl" color="text.charcoal" maxW="600px" lineHeight="1.8" fontWeight="300">
              Professional mehndi services for all your special occasions
            </Text>
          </MotionBox>

          {loading ? (
            <Spinner size="xl" text="Loading Services..." />
          ) : (
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} w="100%">
              {services.map((service, index) => (
                <MotionBox
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <GridItem>
                    <Box
                      bg="white"
                      borderRadius="xl"
                      overflow="hidden"
                      boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                      _hover={{
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      }}
                      transition="all 0.3s ease"
                    >
                      <AspectRatio ratio={4/3}>
                        <Image
                          src={service.image ? `http://localhost:5000${service.image}` : getFallbackImage(0)}
                          alt={service.title}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                        />
                      </AspectRatio>
                      
                      <VStack p={6} align="start" spacing={4}>
                        <Heading size="lg" color="primary.500" fontFamily="heading">
                          {service.title}
                        </Heading>
                        <Text color="text.charcoal" lineHeight="1.6">
                          {service.description}
                        </Text>
                        <Text color="accent.600" fontWeight="bold" fontSize="lg">
                          ₹{service.minPrice.toLocaleString()} - ₹{service.maxPrice.toLocaleString()}
                        </Text>
                        <Text color="gray.600" fontSize="sm">
                          Duration: {service.duration}
                        </Text>
                        <Button
                          bg="primary.500"
                          color="white"
                          size="md"
                          borderRadius="full"
                          onClick={() => navigate('/contact')}
                          _hover={{
                            bg: 'primary.600',
                            transform: 'translateY(-2px)',
                          }}
                          transition="all 0.3s ease"
                        >
                          Book Now
                        </Button>
                      </VStack>
                    </Box>
                  </GridItem>
                </MotionBox>
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Services