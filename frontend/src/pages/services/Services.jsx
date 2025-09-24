import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Badge,
  Flex,
  Icon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaClock, FaRupeeSign, FaStar } from 'react-icons/fa'
import { servicesAPI } from '../../services/api'
import { getFallbackImage } from '../../utils/fallbackData'
import { getImageUrl } from '../../utils/imageUtils'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'
import Spinner from '../../components/common/Spinner'

const MotionBox = motion(Box)

const ServicesPage = () => {
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

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box>
      <Navbar />
      
      {/* Hero Section */}
      <Box pt={32} pb={20} bg="linear-gradient(135deg, #FFFFFF 0%, #FAF9F7 100%)">
        <Container maxW="1200px">
          <VStack spacing={8} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Text fontSize="lg" color="accent.600" fontFamily="accent" mb={4} letterSpacing="3px" textTransform="uppercase">
                Our Expertise
              </Text>
              <Heading fontSize={{ base: '4xl', md: '6xl' }} fontFamily="heading" color="primary.500" mb={6}>
                Services
              </Heading>
              <Text fontSize="xl" color="gray.600" maxW="600px" lineHeight="1.8">
                Choose from our range of professional mehndi services, each designed to make your occasion truly special
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box py={20} bg="background.ivory">
        <Container maxW="1400px">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {loading ? (
              <Flex justify="center" py={20}>
                <Spinner size="xl" text="Loading Services..." />
              </Flex>
            ) : (
              services.map((service, index) => (
                <MotionBox
                  key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                bg="white"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
                transition="all 0.3s ease"
                position="relative"
              >
                {service.popular && (
                  <Badge
                    position="absolute"
                    top={4}
                    right={4}
                    bg="accent.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    zIndex={2}
                  >
                    <Icon as={FaStar} mr={1} /> Popular
                  </Badge>
                )}
                
                <Image
                  src={service.image ? getImageUrl(service.image) : getFallbackImage(index)}
                  alt={service.title}
                  h="250px"
                  w="100%"
                  objectFit="cover"
                />
                
                <Box p={6}>
                  <VStack align="start" spacing={4}>
                    <Heading fontSize="2xl" color="primary.500">
                      {service.title}
                    </Heading>
                    
                    <HStack spacing={6} color="gray.600">
                      <HStack>
                        <Icon as={FaRupeeSign} />
                        <Text fontWeight="600">
                          ₹{service.minPrice.toLocaleString()} - ₹{service.maxPrice.toLocaleString()}
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={FaClock} />
                        <Text>{service.duration}</Text>
                      </HStack>
                    </HStack>
                    
                    <Text color="gray.700" lineHeight="1.6">
                      {service.description}
                    </Text>
                    
                    {service.features && service.features.length > 0 && (
                      <Box w="100%">
                        <Text fontWeight="600" color="primary.500" mb={2}>
                          What's Included:
                        </Text>
                        <List spacing={1}>
                          {service.features.map((feature, idx) => (
                            <ListItem key={idx} fontSize="sm" color="gray.600">
                              <ListIcon as={FaCheck} color="accent.500" />
                              {feature}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                    
                    <Button
                      bg="primary.500"
                      color="white"
                      size="lg"
                      w="100%"
                      borderRadius="xl"
                      onClick={() => navigate('/contact')}
                      _hover={{
                        bg: 'primary.600',
                        transform: 'translateY(-2px)',
                      }}
                    >
                      Book {service.title}
                    </Button>
                  </VStack>
                </Box>
                </MotionBox>
              ))
            )}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box py={20} bg="white">
        <Container maxW="1200px">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading fontSize={{ base: '3xl', md: '4xl' }} color="primary.500">
                Why Choose Us?
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px">
                We bring years of expertise and passion to create the perfect mehndi experience for you
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {[
                { title: 'Expert Artists', desc: 'Skilled professionals with years of experience' },
                { title: 'Premium Quality', desc: 'Only the finest natural henna for best results' },
                { title: 'Custom Designs', desc: 'Personalized patterns for your special occasion' },
                { title: 'Timely Service', desc: 'Always on time, never keeping you waiting' }
              ].map((item, index) => (
                <VStack key={index} spacing={4} textAlign="center">
                  <Box
                    w={16}
                    h={16}
                    bg="accent.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FaCheck} color="accent.600" fontSize="xl" />
                  </Box>
                  <Heading fontSize="xl" color="primary.500">
                    {item.title}
                  </Heading>
                  <Text color="gray.600" textAlign="center">
                    {item.desc}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg="primary.500">
        <Container maxW="800px" textAlign="center">
          <VStack spacing={8}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} color="white">
              Ready to Book Your Service?
            </Heading>
            <Text fontSize="xl" color="white" opacity={0.9}>
              Contact us today to discuss your requirements and book your preferred service
            </Text>
            <Button
              size="lg"
              bg="accent.500"
              color="white"
              px={12}
              py={6}
              fontSize="lg"
              borderRadius="full"
              onClick={() => navigate('/contact')}
              _hover={{
                bg: 'accent.600',
                transform: 'translateY(-2px)',
              }}
            >
              Get Quote Now
            </Button>
          </VStack>
        </Container>
      </Box>

      <Footer />
      <ScrollToTop />
    </Box>
  )
}

export default ServicesPage