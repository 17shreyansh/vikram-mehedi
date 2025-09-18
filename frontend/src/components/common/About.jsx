import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  VStack,
  HStack,
  Icon,
  Button,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaAward, FaUsers, FaHeart, FaStar } from 'react-icons/fa'

const MotionBox = motion(Box)

const About = () => {
  const achievements = [
    { icon: FaUsers, number: '1000+', label: 'Happy Clients', color: 'primary.500' },
    { icon: FaAward, number: '8+', label: 'Years Experience', color: 'accent.500' },
    { icon: FaHeart, number: '2500+', label: 'Designs Created', color: 'primary.500' },
    { icon: FaStar, number: '4.9', label: 'Average Rating', color: 'accent.500' },
  ]

  return (
    <Box py={32} bg="background.offWhite" position="relative" overflow="hidden">
      {/* Background Elements */}
      <Box
        position="absolute"
        top="10%"
        left="-10%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(197,165,114,0.08) 0%, transparent 70%)"
        borderRadius="full"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="-10%"
        w="400px"
        h="400px"
        bg="radial-gradient(circle, rgba(107,29,29,0.05) 0%, transparent 70%)"
        borderRadius="full"
      />

      <Container maxW="1400px" position="relative" zIndex={2}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={20} alignItems="center">
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              position="relative"
            >
              {/* Main Image */}
              <Box position="relative" borderRadius="3xl" overflow="hidden">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop"
                  alt="Vikram Mehndi Artist"
                  w="100%"
                  h="500px"
                  objectFit="cover"
                  fallback={<Box w="100%" h="500px" bg="accent.100" />}
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

              {/* Floating Elements */}
              <MotionBox
                position="absolute"
                top="-20px"
                right="-20px"
                w="120px"
                h="120px"
                bg="white"
                borderRadius="2xl"
                boxShadow="0 20px 40px rgba(0,0,0,0.1)"
                p={6}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <VStack spacing={2}>
                  <Icon as={FaAward} color="accent.500" boxSize={8} />
                  <Text fontSize="lg" fontWeight="bold" color="primary.500">8+</Text>
                  <Text fontSize="xs" color="gray.600" textAlign="center">Years Experience</Text>
                </VStack>
              </MotionBox>

              <MotionBox
                position="absolute"
                bottom="-30px"
                left="-30px"
                w="100px"
                h="100px"
                bg="primary.500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                boxShadow="0 15px 35px rgba(107, 29, 29, 0.3)"
              >
                <VStack spacing={0}>
                  <Text fontSize="xl" fontWeight="bold" color="white">4.9</Text>
                  <Text fontSize="xs" color="whiteAlpha.900">Rating</Text>
                </VStack>
              </MotionBox>
            </MotionBox>
          </GridItem>

          <GridItem>
            <VStack align="start" spacing={10}>
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Text
                  fontSize="lg"
                  color="accent.600"
                  fontFamily="accent"
                  mb={4}
                  letterSpacing="3px"
                  textTransform="uppercase"
                >
                  About Artist
                </Text>
                
                <Heading
                  fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                  fontFamily="heading"
                  color="primary.500"
                  mb={8}
                  letterSpacing="-2px"
                  fontWeight="400"
                  lineHeight="1.1"
                >
                  Vikram Mehndi
                </Heading>
                
                <VStack spacing={6} align="start">
                  <Text fontSize="xl" color="text.charcoal" lineHeight="1.8" fontWeight="300">
                    With over 8 years of experience in the art of mehndi, Vikram has become 
                    a trusted name for creating stunning, intricate designs that celebrate 
                    life's most precious moments.
                  </Text>

                  <Text fontSize="lg" color="text.charcoal" lineHeight="1.7" fontWeight="300">
                    Specializing in bridal mehndi, Arabic patterns, and contemporary fusion designs, 
                    combining traditional techniques with modern aesthetics to create unique 
                    artwork that tells your story.
                  </Text>

                  <Text fontSize="lg" color="text.charcoal" lineHeight="1.7" fontWeight="300">
                    Every design is crafted with premium quality henna, ensuring deep, long-lasting 
                    color that enhances the beauty of your special occasions.
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                w="100%"
              >
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  {achievements.map((item, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      textAlign="center"
                      p={6}
                      bg="white"
                      borderRadius="2xl"
                      boxShadow="0 10px 30px rgba(0,0,0,0.08)"
                      border="1px solid"
                      borderColor="gray.100"
                      _hover={{ 
                        transform: 'translateY(-5px)', 
                        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                        borderColor: 'accent.200'
                      }}
                    >
                      <VStack spacing={3}>
                        <Box
                          p={3}
                          bg={`${item.color.split('.')[0]}.50`}
                          borderRadius="xl"
                          color={item.color}
                        >
                          <Icon as={item.icon} boxSize={6} />
                        </Box>
                        <Text fontSize="2xl" fontWeight="bold" color="primary.500">
                          {item.number}
                        </Text>
                        <Text fontSize="sm" color="text.charcoal" fontWeight="500">
                          {item.label}
                        </Text>
                      </VStack>
                    </MotionBox>
                  ))}
                </Grid>
              </MotionBox>


            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default About