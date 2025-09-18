import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
  SimpleGrid,
  Icon,
  Link,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaCalendarAlt } from 'react-icons/fa'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'

const MotionBox = motion(Box)

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    eventDate: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you within 24 hours.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setFormData({ name: '', email: '', phone: '', service: '', eventDate: '', message: '' })
    } catch (error) {
      toast({
        title: 'Error sending message',
        description: 'Please try again or contact us directly.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    { icon: FaPhone, title: 'Phone', value: '+91 98765 43210', link: 'tel:+919876543210', color: 'primary.500' },
    { icon: FaEnvelope, title: 'Email', value: 'vikram@mehendi.com', link: 'mailto:vikram@mehendi.com', color: 'accent.500' },
    { icon: FaMapMarkerAlt, title: 'Location', value: 'Mumbai, Maharashtra', link: '#', color: 'primary.500' },
    { icon: FaWhatsapp, title: 'WhatsApp', value: '+91 98765 43210', link: 'https://wa.me/919876543210', color: 'green.500' }
  ]

  return (
    <Box>
      <Navbar />
      
      <Box pt={32} pb={20} bg="linear-gradient(135deg, #FFFFFF 0%, #FAF9F7 100%)">
        <Container maxW="1200px">
          <VStack spacing={8} textAlign="center">
            <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Text fontSize="lg" color="accent.600" fontFamily="accent" mb={4} letterSpacing="3px" textTransform="uppercase">
                Get In Touch
              </Text>
              <Heading fontSize={{ base: '4xl', md: '6xl' }} fontFamily="heading" color="primary.500" mb={6}>
                Contact Us
              </Heading>
              <Text fontSize="xl" color="gray.600" maxW="600px" lineHeight="1.8">
                Ready to create beautiful memories? Let's discuss your mehndi requirements
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      <Box py={20} bg="background.ivory">
        <Container maxW="1400px">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              bg="white"
              p={10}
              borderRadius="3xl"
              boxShadow="0 20px 40px rgba(0,0,0,0.1)"
            >
              <VStack spacing={8} align="start">
                <Box>
                  <Heading fontSize={{ base: '2xl', md: '3xl' }} color="primary.500" mb={4}>
                    Send us a Message
                  </Heading>
                  <Text fontSize="lg" color="gray.600" lineHeight="1.7">
                    Fill out the form below and we'll get back to you within 24 hours
                  </Text>
                </Box>

                <Box as="form" onSubmit={handleSubmit} w="100%">
                  <VStack spacing={6}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                      <FormControl isRequired>
                        <FormLabel color="gray.700" fontWeight="600">Name</FormLabel>
                        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" size="lg" borderRadius="xl" _focus={{ borderColor: 'primary.500' }} />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel color="gray.700" fontWeight="600">Phone</FormLabel>
                        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" size="lg" borderRadius="xl" _focus={{ borderColor: 'primary.500' }} />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontWeight="600">Email</FormLabel>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" size="lg" borderRadius="xl" _focus={{ borderColor: 'primary.500' }} />
                    </FormControl>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                      <FormControl isRequired>
                        <FormLabel color="gray.700" fontWeight="600">Service</FormLabel>
                        <Select name="service" value={formData.service} onChange={handleChange} placeholder="Select service" size="lg" borderRadius="xl" _focus={{ borderColor: 'primary.500' }}>
                          <option value="bridal">Bridal Mehndi</option>
                          <option value="arabic">Arabic Mehndi</option>
                          <option value="party">Party Mehndi</option>
                          <option value="traditional">Traditional Mehndi</option>
                          <option value="corporate">Corporate Events</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel color="gray.700" fontWeight="600">Event Date</FormLabel>
                        <Input name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} size="lg" borderRadius="xl" _focus={{ borderColor: 'primary.500' }} />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl>
                      <FormLabel color="gray.700" fontWeight="600">Message</FormLabel>
                      <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your event..." rows={5} borderRadius="xl" _focus={{ borderColor: 'primary.500' }} />
                    </FormControl>

                    <Button type="submit" isLoading={loading} loadingText="Sending..." bg="primary.500" color="white" size="lg" w="100%" borderRadius="xl" _hover={{ bg: 'primary.600', transform: 'translateY(-2px)' }}>
                      Send Message
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </MotionBox>

            <MotionBox initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
              <VStack spacing={8} align="start">
                <Box>
                  <Heading fontSize={{ base: '2xl', md: '3xl' }} color="primary.500" mb={4}>
                    Get in Touch
                  </Heading>
                  <Text fontSize="lg" color="gray.600" lineHeight="1.7">
                    We're here to help make your special day even more beautiful
                  </Text>
                </Box>

                <VStack spacing={4} align="start" w="100%">
                  {contactInfo.map((info, index) => (
                    <Link key={index} href={info.link} isExternal _hover={{ textDecoration: 'none' }} w="100%">
                      <Flex align="center" p={6} bg="white" borderRadius="2xl" boxShadow="0 10px 25px rgba(0,0,0,0.08)" _hover={{ transform: 'translateY(-3px)', boxShadow: '0 15px 35px rgba(0,0,0,0.12)' }} transition="all 0.3s ease">
                        <Box p={3} bg={`${info.color.split('.')[0]}.50`} borderRadius="xl" color={info.color} mr={4}>
                          <Icon as={info.icon} boxSize={5} />
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="sm" color="gray.500" fontWeight="600">{info.title}</Text>
                          <Text fontSize="lg" color="gray.800" fontWeight="600">{info.value}</Text>
                        </VStack>
                      </Flex>
                    </Link>
                  ))}
                </VStack>

                <Box w="100%">
                  <Heading fontSize="xl" color="primary.500" mb={4}>
                    <Icon as={FaClock} mr={2} />Business Hours
                  </Heading>
                  <VStack spacing={3} align="start">
                    {[
                      { day: 'Monday - Friday', hours: '10:00 AM - 8:00 PM' },
                      { day: 'Saturday', hours: '9:00 AM - 9:00 PM' },
                      { day: 'Sunday', hours: '11:00 AM - 6:00 PM' }
                    ].map((schedule, index) => (
                      <Flex key={index} justify="space-between" w="100%" p={3} bg="white" borderRadius="lg">
                        <Text color="gray.700" fontWeight="600">{schedule.day}</Text>
                        <Text color="gray.600">{schedule.hours}</Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={20} bg="primary.500">
        <Container maxW="800px" textAlign="center">
          <VStack spacing={8}>
            <Icon as={FaCalendarAlt} fontSize="4xl" color="white" />
            <Heading fontSize={{ base: '3xl', md: '4xl' }} color="white">
              Book Your Consultation Today
            </Heading>
            <Text fontSize="xl" color="white" opacity={0.9}>
              Let's discuss your vision and create the perfect mehndi design
            </Text>
            <Button size="lg" bg="accent.500" color="white" px={12} py={6} fontSize="lg" borderRadius="full" _hover={{ bg: 'accent.600', transform: 'translateY(-2px)' }}>
              Schedule Consultation
            </Button>
          </VStack>
        </Container>
      </Box>

      <Footer />
      <ScrollToTop />
    </Box>
  )
}

export default ContactPage