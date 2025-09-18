import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Icon,
  useToast,
  Image,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { contactAPI } from '../../services/api'

const MotionBox = motion(Box)

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const contactInfo = [
    { icon: FaPhone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: FaEnvelope, label: 'Email', value: 'vikram@mehndiart.com', href: 'mailto:vikram@mehndiart.com' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Mumbai, Maharashtra', href: '#' },
  ]

  const socialLinks = [
    { icon: FaWhatsapp, color: 'green.500', href: 'https://wa.me/919876543210' },
    { icon: FaInstagram, color: 'pink.500', href: 'https://instagram.com/vikrammehndi' },
    { icon: FaFacebook, color: 'blue.500', href: 'https://facebook.com/vikrammehndi' },
  ]

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await contactAPI.create(data)
      toast({
        title: 'Message Sent!',
        description: 'Thank you for your inquiry. We will get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi! I would like to book a mehndi session.')
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
  }

  return (
    <Box id="contact" py={32} bg="white" position="relative" overflow="hidden">
      {/* Enhanced Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.06}
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im1hbmRhbGEiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNtYW5kYWxhKSIvPjwvc3ZnPg==')"
        backgroundSize="500px 500px"
        zIndex={0}
      />
      
      {/* Floating Geometric Elements */}
      <MotionBox
        position="absolute"
        top="15%"
        right="10%"
        w="120px"
        h="120px"
        border="2px solid"
        borderColor="accent.200"
        borderRadius="full"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        opacity={0.2}
        zIndex={1}
      />
      
      <MotionBox
        position="absolute"
        bottom="25%"
        left="8%"
        w="80px"
        h="80px"
        bg="primary.100"
        borderRadius="2xl"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.3}
        zIndex={1}
      />

      <Container maxW="1400px" position="relative" zIndex={2}>
        <VStack spacing={20}>
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
              Let's Connect
            </Text>
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontFamily="heading"
              color="primary.500"
              mb={6}
              letterSpacing="-2px"
              fontWeight="400"
            >
              Get In Touch
            </Heading>
            <Text fontSize="xl" color="text.charcoal" maxW="600px" lineHeight="1.8" fontWeight="300">
              Ready to book your mehndi session? Contact us today and let's create beautiful memories together
            </Text>
          </MotionBox>

          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={20} w="100%">
            {/* Contact Information */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <VStack spacing={12} align="start">
                  <VStack spacing={8} align="start" w="100%">
                    <Heading fontSize="3xl" color="primary.500" fontFamily="heading" fontWeight="500">
                      Contact Information
                    </Heading>

                    {contactInfo.map((info, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        w="100%"
                      >
                        <HStack
                          spacing={6}
                          p={6}
                          bg="white"
                          borderRadius="2xl"
                          boxShadow="0 10px 30px rgba(0,0,0,0.08)"
                          border="1px solid"
                          borderColor="gray.100"
                          _hover={{
                            transform: 'translateY(-3px)',
                            boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                            borderColor: 'accent.200'
                          }}
                          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                          cursor={info.href !== '#' ? 'pointer' : 'default'}
                          onClick={() => info.href !== '#' && window.open(info.href)}
                        >
                          <Box
                            p={4}
                            bg="accent.50"
                            borderRadius="xl"
                            color="accent.600"
                          >
                            <Icon as={info.icon} boxSize={6} />
                          </Box>
                          <VStack align="start" spacing={1}>
                            <Text fontSize="sm" color="gray.600" fontWeight="500" textTransform="uppercase" letterSpacing="1px">
                              {info.label}
                            </Text>
                            <Text fontSize="lg" fontWeight="600" color="text.charcoal">
                              {info.value}
                            </Text>
                          </VStack>
                        </HStack>
                      </MotionBox>
                    ))}
                  </VStack>

                  {/* Social Links */}
                  <VStack spacing={6} align="start" w="100%">
                    <Heading fontSize="2xl" color="primary.500" fontFamily="heading" fontWeight="500">
                      Follow Us
                    </Heading>
                    <HStack spacing={4}>
                      {socialLinks.map((social, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Box
                            w="60px"
                            h="60px"
                            bg="white"
                            borderRadius="xl"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                            onClick={() => window.open(social.href, '_blank')}
                            boxShadow="0 8px 25px rgba(0,0,0,0.1)"
                            _hover={{
                              transform: 'translateY(-5px)',
                              boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                              bg: social.color,
                              color: 'white'
                            }}
                            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                          >
                            <Icon as={social.icon} boxSize={6} />
                          </Box>
                        </MotionBox>
                      ))}
                    </HStack>
                  </VStack>

                  {/* WhatsApp CTA */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    w="100%"
                  >
                    <Button
                      leftIcon={<FaWhatsapp />}
                      bg="green.500"
                      color="white"
                      size="lg"
                      onClick={openWhatsApp}
                      px={12}
                      py={6}
                      h="auto"
                      fontSize="lg"
                      fontWeight="600"
                      borderRadius="full"
                      w="100%"
                      _hover={{
                        bg: 'green.600',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 15px 35px rgba(34, 197, 94, 0.3)',
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      WhatsApp Now
                    </Button>
                  </MotionBox>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Contact Form */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                bg="white"
                p={12}
                borderRadius="3xl"
                boxShadow="0 30px 80px rgba(0,0,0,0.1)"
                border="1px solid"
                borderColor="gray.100"
                position="relative"
                overflow="hidden"
              >
                {/* Background Pattern */}
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  w="200px"
                  h="200px"
                  bg="radial-gradient(circle, rgba(197,165,114,0.05) 0%, transparent 70%)"
                  borderRadius="full"
                  transform="translate(50%, -50%)"
                />

                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={8} position="relative" zIndex={2}>
                    <Heading fontSize="3xl" color="primary.500" fontFamily="heading" fontWeight="500" mb={4}>
                      Book Your Session
                    </Heading>

                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} w="100%">
                      <FormControl isInvalid={errors.name}>
                        <FormLabel fontWeight="600" color="text.charcoal">Full Name</FormLabel>
                        <Input 
                          {...register('name', { required: 'Name is required' })}
                          size="lg"
                          borderRadius="xl"
                          border="2px solid"
                          borderColor="gray.200"
                          _focus={{ borderColor: 'accent.500', boxShadow: '0 0 0 1px #C5A572' }}
                        />
                      </FormControl>

                      <FormControl isInvalid={errors.phone}>
                        <FormLabel fontWeight="600" color="text.charcoal">Phone Number</FormLabel>
                        <Input 
                          {...register('phone', { required: 'Phone is required' })}
                          size="lg"
                          borderRadius="xl"
                          border="2px solid"
                          borderColor="gray.200"
                          _focus={{ borderColor: 'accent.500', boxShadow: '0 0 0 1px #C5A572' }}
                        />
                      </FormControl>
                    </Grid>

                    <FormControl isInvalid={errors.email}>
                      <FormLabel fontWeight="600" color="text.charcoal">Email</FormLabel>
                      <Input 
                        type="email" 
                        {...register('email', { required: 'Email is required' })}
                        size="lg"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'accent.500', boxShadow: '0 0 0 1px #C5A572' }}
                      />
                    </FormControl>

                    <FormControl isInvalid={errors.service}>
                      <FormLabel fontWeight="600" color="text.charcoal">Service</FormLabel>
                      <Select 
                        {...register('service', { required: 'Please select a service' })}
                        size="lg"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'accent.500', boxShadow: '0 0 0 1px #C5A572' }}
                      >
                        <option value="">Select a service</option>
                        <option value="Bridal Mehndi">Bridal Mehndi</option>
                        <option value="Arabic Mehndi">Arabic Mehndi</option>
                        <option value="Indo-Western">Indo-Western</option>
                        <option value="Party Mehndi">Party Mehndi</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="600" color="text.charcoal">Message</FormLabel>
                      <Textarea 
                        {...register('message')} 
                        rows={4}
                        size="lg"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'accent.500', boxShadow: '0 0 0 1px #C5A572' }}
                        placeholder="Tell us about your event and requirements..."
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      bg="primary.500"
                      color="white"
                      size="lg"
                      w="100%"
                      isLoading={loading}
                      loadingText="Sending..."
                      py={6}
                      h="auto"
                      fontSize="lg"
                      fontWeight="600"
                      borderRadius="full"
                      _hover={{
                        bg: 'primary.600',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 15px 35px rgba(107, 29, 29, 0.3)',
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </MotionBox>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Contact