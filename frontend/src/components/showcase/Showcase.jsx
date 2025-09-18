import React, { useRef } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  AspectRatio,
} from '@chakra-ui/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fallbackImages } from '../../utils/fallbackData'

const MotionBox = motion(Box)

const Showcase = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const showcaseImages = fallbackImages.slice(0, 8).map((img, index) => ({
    id: index + 1,
    url: img
  }))

  return (
    <Box
      ref={containerRef}
      minH="100vh"
      bg="background.ivory"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="1400px" py={20} position="relative" zIndex={2}>
        <VStack spacing={20}>
          {/* Static Header */}
          <Box textAlign="center">
            <Text
              fontSize="lg"
              color="accent.600"
              fontFamily="accent"
              mb={4}
              letterSpacing="3px"
              textTransform="uppercase"
            >
              Design Showcase
            </Text>
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontFamily="heading"
              color="primary.500"
              mb={6}
              letterSpacing="-2px"
              fontWeight="400"
            >
              Artistry
            </Heading>
            <Text fontSize="xl" color="text.charcoal" maxW="600px" lineHeight="1.8" fontWeight="300">
              Experience the beauty of traditional mehndi art through our curated collection
            </Text>
          </Box>

          {/* Complex Scroll Images */}
          <Box w="100%" position="relative" h="1400px">
            {showcaseImages.map((image, index) => (
              <ImageShowcase
                key={image.id}
                image={image}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

const ImageShowcase = ({ image, index, scrollProgress }) => {
  const positions = [
    { top: '2%', left: '5%' },
    { top: '8%', right: '8%' },
    { top: '18%', left: '12%' },
    { top: '28%', right: '15%' },
    { top: '40%', left: '8%' },
    { top: '50%', right: '5%' },
    { top: '65%', left: '18%' },
    { top: '75%', right: '12%' }
  ]
  
  const position = positions[index % positions.length]
  
  // Complex scroll transformations
  const y1 = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])
  const y2 = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [-50, 20, -20, 50])
  const y3 = useTransform(scrollProgress, [0, 0.4, 0.6, 1], [80, -10, 10, -80])
  
  const yTransforms = [y1, y2, y3]
  const yTransform = yTransforms[index % 3]
  
  const rotate = useTransform(
    scrollProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, index % 2 === 0 ? 5 : -5, 0, index % 2 === 0 ? -3 : 3, 0]
  )
  
  const scale = useTransform(
    scrollProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.8, 1, index % 2 === 0 ? 1.1 : 0.9, 1, 1.2]
  )
  
  const opacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  )

  return (
    <MotionBox
      position="absolute"
      {...position}
      w={{ base: '200px', md: '280px', lg: '320px' }}
      style={{ 
        y: yTransform, 
        rotate, 
        scale, 
        opacity
      }}
      zIndex={8 - index}
    >
      <AspectRatio ratio={3/4}>
        <Image
          src={image.url}
          alt={`Mehndi Artistry ${index + 1}`}
          objectFit="cover"
          borderRadius="2xl"
          boxShadow="0 25px 60px rgba(107,29,29,0.3)"
        />
      </AspectRatio>
    </MotionBox>
  )
}

export default Showcase