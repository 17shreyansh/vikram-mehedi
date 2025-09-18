import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Icon,
  Image,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const MotionBox = motion(Box)

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Vikram created the most beautiful bridal mehndi for my wedding. The intricate designs were absolutely stunning and lasted for weeks! Every guest was amazed by the artistry.',
      occasion: 'Bridal Mehndi',
      location: 'Mumbai',
    },
    {
      id: 2,
      name: 'Anita Patel',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Amazing Arabic mehndi designs! Quick service and beautiful patterns. Vikram is truly professional and his work speaks for itself. Highly recommend for any occasion.',
      occasion: 'Arabic Mehndi',
      location: 'Delhi',
    },
    {
      id: 3,
      name: 'Riya Singh',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The Indo-Western fusion design was exactly what I wanted. Vikram understood my vision perfectly and created something unique and beautiful. Absolutely loved it!',
      occasion: 'Indo-Western Design',
      location: 'Bangalore',
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <Box py={32} bg="background.offWhite" position="relative" overflow="hidden">
      {/* Enhanced Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.08}
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im1hbmRhbGEiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNtYW5kYWxhKSIvPjwvc3ZnPg==')"
        backgroundSize="500px 500px"
        zIndex={0}
      />
      
      {/* Floating Geometric Elements */}
      <MotionBox
        position="absolute"
        top="10%"
        left="5%"
        w="100px"
        h="100px"
        border="2px solid"
        borderColor="accent.200"
        borderRadius="full"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        opacity={0.2}
        zIndex={1}
      />
      
      <MotionBox
        position="absolute"
        bottom="20%"
        right="8%"
        w="80px"
        h="80px"
        bg="primary.100"
        borderRadius="2xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
              Client Stories
            </Text>
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontFamily="heading"
              color="primary.500"
              mb={6}
              letterSpacing="-2px"
              fontWeight="400"
            >
              Testimonials
            </Heading>
            <Text fontSize="xl" color="text.charcoal" maxW="600px" lineHeight="1.8" fontWeight="300">
              Read what our satisfied clients say about their beautiful mehndi experience
            </Text>
          </MotionBox>

          <Box w="100%" maxW="1200px" position="relative">
            <AnimatePresence mode="wait">
              <MotionBox
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
                  {/* Testimonial Content */}
                  <GridItem>
                    <VStack spacing={8} align="start">
                      <Icon as={FaQuoteLeft} color="accent.300" boxSize={12} />
                      
                      <Text
                        fontSize={{ base: 'xl', md: '2xl' }}
                        color="text.charcoal"
                        lineHeight="1.8"
                        fontWeight="300"
                        fontStyle="italic"
                      >
                        "{testimonials[activeIndex].text}"
                      </Text>

                      <HStack spacing={2}>
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Icon key={i} as={FaStar} color="accent.500" boxSize={5} />
                        ))}
                      </HStack>

                      <VStack spacing={3} align="start">
                        <Heading fontSize="2xl" color="primary.500" fontFamily="heading" fontWeight="500">
                          {testimonials[activeIndex].name}
                        </Heading>
                        <VStack spacing={1} align="start">
                          <Text fontSize="lg" color="accent.600" fontWeight="500">
                            {testimonials[activeIndex].occasion}
                          </Text>
                          <Text fontSize="md" color="gray.500">
                            {testimonials[activeIndex].location}
                          </Text>
                        </VStack>
                      </VStack>
                    </VStack>
                  </GridItem>

                  {/* Client Image */}
                  <GridItem>
                    <Box position="relative" textAlign="center">
                      <Box
                        position="relative"
                        display="inline-block"
                        borderRadius="3xl"
                        overflow="hidden"
                        boxShadow="0 30px 60px rgba(0,0,0,0.15)"
                      >
                        <Image
                          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"
                          alt="Client Mehndi"
                          w="400px"
                          h="500px"
                          objectFit="cover"
                          fallback={<Box w="400px" h="500px" bg="accent.100" />}
                        />
                        
                        {/* Overlay */}
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          w="100%"
                          h="100%"
                          bg="linear-gradient(135deg, rgba(107,29,29,0.1) 0%, rgba(197,165,114,0.1) 100%)"
                        />
                      </Box>

                      {/* Floating Avatar */}
                      <Box
                        position="absolute"
                        bottom="-30px"
                        left="50%"
                        transform="translateX(-50%)"
                        bg="white"
                        p={2}
                        borderRadius="full"
                        boxShadow="0 15px 35px rgba(0,0,0,0.2)"
                      >
                        <Avatar
                          size="xl"
                          src={testimonials[activeIndex].image}
                          name={testimonials[activeIndex].name}
                          border="4px solid white"
                        />
                      </Box>
                    </Box>
                  </GridItem>
                </Grid>
              </MotionBox>
            </AnimatePresence>

            {/* Navigation */}
            <HStack
              position="absolute"
              bottom="-80px"
              left="50%"
              transform="translateX(-50%)"
              spacing={6}
            >
              <Box
                w="60px"
                h="60px"
                bg="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={prevTestimonial}
                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                _hover={{
                  bg: 'primary.500',
                  color: 'white',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(107, 29, 29, 0.3)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                <Icon as={FaChevronLeft} boxSize={5} />
              </Box>

              <HStack spacing={3}>
                {testimonials.map((_, index) => (
                  <Box
                    key={index}
                    w={index === activeIndex ? "30px" : "10px"}
                    h="10px"
                    bg={index === activeIndex ? "primary.500" : "gray.300"}
                    borderRadius="full"
                    cursor="pointer"
                    onClick={() => setActiveIndex(index)}
                    transition="all 0.3s ease"
                  />
                ))}
              </HStack>

              <Box
                w="60px"
                h="60px"
                bg="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={nextTestimonial}
                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                _hover={{
                  bg: 'primary.500',
                  color: 'white',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(107, 29, 29, 0.3)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                <Icon as={FaChevronRight} boxSize={5} />
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Testimonials