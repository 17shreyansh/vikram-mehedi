import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  Grid,
  GridItem,
  AspectRatio,
} from '@chakra-ui/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useHeroImage } from '../../hooks/useFallbackData'
import { getFallbackImage } from '../../utils/fallbackData'

const MotionBox = motion(Box)

const HeroSection = ({ pageContent }) => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const { heroImage, isOnline } = useHeroImage()
  
  // Get hero data from pageContent or use defaults
  const heroData = pageContent?.sections?.find(s => s.type === 'hero')?.data || {
    tagline: 'Artistry in Every Detail',
    mainHeading: 'Elegant',
    subHeading: 'Mehndi Designs',
    description: 'Transform your celebrations with intricate, breathtaking mehndi artistry. Each creation tells your unique story through timeless patterns and contemporary elegance.',
    buttonText: 'Book Your Session',
    buttonLink: '#contact'
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box position="relative" minH={{ base: "auto", lg: "100vh" }} bg="background.ivory" pt={{ base: "100px", md: "100px" }} pb={{ base: 8, lg: 0 }}>
      {/* Enhanced Mandala Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.12}
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im1hbmRhbGEiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0M1QTU3MiIgc3Ryb2tlLXdpZHRoPSIxIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjAwIDQwTDIyMCAxODBMMjAwIDIwMEwxODAgMTgwWiIgZmlsbD0iI0M1QTU3MiIgb3BhY2l0eT0iMC4zIi8+PHBhdGggZD0iTTM2MCAyMDBMMTgwIDIyMEwyMDAgMjAwTDE4MCAyMDBaIiBmaWxsPSIjQzVBNTcyIiBvcGFjaXR5PSIwLjMiLz48cGF0aCBkPSJNMjAwIDM2MEwxODAgMjIwTDIwMCAyMDBMMjIwIDIyMFoiIGZpbGw9IiNDNUE1NzIiIG9wYWNpdHk9IjAuMyIvPjxwYXRoIGQ9Ik00MCAyMDBMMjIwIDE4MEwyMDAgMjAwTDIyMCAyMDBaIiBmaWxsPSIjQzVBNTcyIiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbWFuZGFsYSkiLz48L3N2Zz4=')"
        backgroundSize="500px 500px"
        zIndex={0}
      />

      {/* Floating Geometric Elements */}
      <MotionBox
        position="absolute"
        top={{ base: "20%", lg: "15%" }}
        right={{ base: "5%", lg: "10%" }}
        w={{ base: "60px", md: "80px", lg: "120px" }}
        h={{ base: "60px", md: "80px", lg: "120px" }}
        border="2px solid"
        borderColor="accent.200"
        borderRadius="full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        opacity={0.3}
        zIndex={1}
      />
      
      <MotionBox
        position="absolute"
        bottom={{ base: "15%", lg: "20%" }}
        left={{ base: "5%", lg: "8%" }}
        w={{ base: "50px", md: "60px", lg: "80px" }}
        h={{ base: "50px", md: "60px", lg: "80px" }}
        bg="primary.100"
        borderRadius="2xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.4}
        zIndex={1}
      />

      <Container maxW="1400px" h={{ base: "auto", lg: "calc(100vh - 100px)" }} display="flex" alignItems={{ base: "flex-start", lg: "center" }} position="relative" zIndex={2} overflow="visible" px={{ base: 4, md: 8 }} py={{ base: 4, lg: 0 }}>
        <Grid templateColumns={{ base: '1fr', lg: '1.3fr 0.7fr' }} gap={{ base: 4, lg: 20 }} w="100%" alignItems={{ base: "flex-start", lg: "center" }}>
          
          {/* Left Content */}
          <GridItem order={{ base: 2, lg: 1 }}>
            <VStack align={{ base: "center", lg: "start" }} spacing={{ base: 6, lg: 10 }} textAlign={{ base: "center", lg: "left" }}>
              <MotionBox
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="accent.600"
                  fontFamily="accent"
                  mb={6}
                  letterSpacing="3px"
                  textTransform="uppercase"
                >
                  {heroData.tagline}
                </Text>
                
                <Heading
                  fontSize={{ base: '3xl', md: '5xl', lg: '8xl' }}
                  fontFamily="heading"
                  color="primary.500"
                  lineHeight="0.85"
                  mb={8}
                  letterSpacing="-3px"
                  fontWeight="400"
                >
                  {heroData.mainHeading}
                  <Text 
                    as="span" 
                    display="block" 
                    fontFamily="accent" 
                    fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }} 
                    color="accent.500" 
                    mt={4}
                    fontWeight="400"
                  >
                    {heroData.subHeading}
                  </Text>
                </Heading>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                maxW="550px"
              >
                <Text 
                  fontSize={{ base: 'md', md: 'lg', lg: '2xl' }} 
                  color="text.charcoal" 
                  lineHeight="1.6" 
                  mb={{ base: 6, lg: 12 }}
                  fontWeight="300"
                >
                  {heroData.description}
                </Text>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Button
                  size={{ base: 'lg', lg: 'xl' }}
                  bg="primary.500"
                  color="white"
                  px={{ base: 8, lg: 16 }}
                  py={{ base: 6, lg: 8 }}
                  h="auto"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  w={{ base: '100%', md: 'auto' }}
                  maxW={{ base: '250px', md: 'none' }}
                  mx={{ base: 'auto', lg: 0 }}
                  fontWeight="500"
                  borderRadius="full"
                  onClick={scrollToContact}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    w: '100%',
                    h: '100%',
                    bg: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s',
                  }}
                  _hover={{
                    bg: 'primary.600',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 25px 50px rgba(107, 29, 29, 0.4)',
                    _before: { left: '100%' }
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  {heroData.buttonText}
                </Button>
              </MotionBox>
            </VStack>
          </GridItem>

          {/* Right Images */}
          <GridItem order={{ base: 1, lg: 2 }}>
            <MotionBox
              style={{ y: y1 }}
              position="relative"
              h={{ base: "350px", md: "450px", lg: "600px" }}
              overflow="visible"
              mx="auto"
              maxW={{ base: "250px", md: "350px", lg: "none" }}
            >
              {/* Main Image Container */}
              <MotionBox
                position="relative"
                w="100%"
                h={{ base: "300px", md: "400px", lg: "500px" }}
                borderRadius="3xl"
                overflow="hidden"
                boxShadow="0 20px 40px rgba(0,0,0,0.15)"
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <AspectRatio ratio={3/4}>
                  <Image
                    src={heroImage || getFallbackImage(0)}
                    alt="Mehndi Design"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    loading="lazy"
                    fallback={<Box w="100%" h="100%" bg="accent.100" />}
                  />
                </AspectRatio>
                
                {/* Sophisticated Overlay */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  w="100%"
                  h="100%"
                  bg="linear-gradient(135deg, rgba(107, 29, 29, 0.05) 0%, rgba(197, 165, 114, 0.05) 100%)"
                />

                {/* Decorative Border */}
                <Box
                  position="absolute"
                  top={4}
                  left={4}
                  right={4}
                  bottom={4}
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  borderRadius="2xl"
                  pointerEvents="none"
                />
              </MotionBox>

              {/* Floating Secondary Images */}
              <MotionBox
                position="absolute"
                top="20px"
                right={{ base: "-10px", lg: "-15px" }}
                w={{ base: "60px", md: "80px", lg: "100px" }}
                h={{ base: "60px", md: "80px", lg: "100px" }}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 15px 30px rgba(0,0,0,0.2)"
                style={{ y: y2 }}
                initial={{ opacity: 0, x: 50, rotate: 15 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                border="3px solid white"
                zIndex={3}
              >
                <Image
                  src={getFallbackImage(1)}
                  alt="Mehndi Design"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  fallback={
                    <Box
                      w="100%"
                      h="100%"
                      bg="linear-gradient(45deg, accent.400, accent.600)"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top="30%"
                        left="30%"
                        w="40%"
                        h="40%"
                        bg="white"
                        borderRadius="full"
                        opacity={0.4}
                      />
                    </Box>
                  }
                />
              </MotionBox>

              <MotionBox
                position="absolute"
                bottom="40px"
                left={{ base: "-15px", lg: "-20px" }}
                w={{ base: "50px", md: "70px", lg: "90px" }}
                h={{ base: "50px", md: "70px", lg: "90px" }}
                borderRadius="full"
                overflow="hidden"
                boxShadow="0 15px 30px rgba(0,0,0,0.2)"
                border="4px solid white"
                initial={{ opacity: 0, x: -50, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                zIndex={3}
              >
                <Image
                  src={getFallbackImage(2)}
                  alt="Mehndi Design"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  fallback={
                    <Box
                      w="100%"
                      h="100%"
                      bg="linear-gradient(135deg, primary.400, primary.700)"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        top="25%"
                        left="25%"
                        w="50%"
                        h="50%"
                        bg="accent.300"
                        borderRadius="xl"
                        opacity={0.5}
                      />
                    </Box>
                  }
                />
              </MotionBox>

              {/* Abstract Decorative Elements */}
              <MotionBox
                position="absolute"
                top="40%"
                right={{ base: "-25px", lg: "-40px" }}
                w={{ base: "40px", md: "60px", lg: "80px" }}
                h={{ base: "40px", md: "60px", lg: "80px" }}
                bg="linear-gradient(135deg, #C5A572, #B8965F)"
                borderRadius="xl"
                initial={{ opacity: 0, scale: 0, rotate: 45 }}
                animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
                zIndex={1}
              />

              <MotionBox
                position="absolute"
                bottom="30%"
                right={{ base: "20px", lg: "-5px" }}
                w={{ base: "30px", md: "40px", lg: "50px" }}
                h={{ base: "30px", md: "40px", lg: "50px" }}
                border="2px solid"
                borderColor="accent.300"
                borderRadius="full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                zIndex={1}
              />
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>

      {/* Elegant Scroll Indicator */}
      <MotionBox
        position="absolute"
        bottom="50px"
        left="50%"
        transform="translateX(-50%)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <VStack spacing={4}>
          <Text fontSize="xs" color="gray.400" letterSpacing="3px" textTransform="uppercase">
            Discover More
          </Text>
          <MotionBox
            w="2px"
            h="40px"
            bg="linear-gradient(180deg, #C5A572, transparent)"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </VStack>
      </MotionBox>
    </Box>
  )
}

export default HeroSection