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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Center,
  AspectRatio,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import ImageGallery from 'react-image-gallery'
import { galleryAPI } from '../../services/api'
import { getFallbackImage } from '../../utils/fallbackData'
import Spinner from '../common/Spinner'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const MotionBox = motion(Box)

const Gallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [modalImages, setModalImages] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Bridal', 'Arabic', 'Traditional', 'Party', 'Corporate']

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await galleryAPI.getAll({ status: 'active' })
      setGalleryImages(response.items || [])
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Filter images by category
  const filteredImages = Array.isArray(galleryImages) 
    ? (selectedCategory === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase()))
    : []

  const openGallery = (images, startIndex) => {
    const galleryImages = images.map((img, idx) => ({
      original: img.url ? `http://localhost:5000${img.url}` : getFallbackImage(idx),
      thumbnail: img.url ? `http://localhost:5000${img.url}` : getFallbackImage(idx),
      description: img.title,
    }))
    setModalImages(galleryImages)
    onOpen()
  }

  return (
    <Box id="gallery" py={32} bg="background.ivory" position="relative" overflow="hidden">
      {/* Enhanced Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.08}
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im1hbmRhbGEiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzVBNTcyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0M1QTU3MiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI21hbmRhbGEpIi8+PC9zdmc+')"
        backgroundSize="500px 500px"
        zIndex={0}
      />
      
      {/* Floating Geometric Elements */}
      <MotionBox
        position="absolute"
        top="15%"
        right="8%"
        w="100px"
        h="100px"
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
        left="5%"
        w="60px"
        h="60px"
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
              Our Masterpieces
            </Text>
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontFamily="heading"
              color="primary.500"
              mb={6}
              letterSpacing="-2px"
              fontWeight="400"
            >
              Gallery
            </Heading>
            <Text fontSize="xl" color="text.charcoal" maxW="600px" lineHeight="1.8" fontWeight="300">
              Discover our stunning collection of mehndi artistry, where tradition meets contemporary elegance
            </Text>
          </MotionBox>

          {/* Category Filter */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <HStack spacing={4} flexWrap="wrap" justify="center">
              {categories.map((category, index) => (
                <MotionBox
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant={selectedCategory === category ? 'solid' : 'outline'}
                    bg={selectedCategory === category ? 'primary.500' : 'transparent'}
                    color={selectedCategory === category ? 'white' : 'primary.500'}
                    borderColor="primary.500"
                    borderWidth="2px"
                    onClick={() => setSelectedCategory(category)}
                    size="lg"
                    borderRadius="full"
                    px={8}
                    fontWeight="600"
                    _hover={{
                      bg: selectedCategory === category ? 'primary.600' : 'primary.500',
                      color: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px rgba(107, 29, 29, 0.2)',
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    {category}
                  </Button>
                </MotionBox>
              ))}
            </HStack>
          </MotionBox>

          {/* 3D Carousel Gallery */}
          {loading ? (
            <Center py={20}>
              <Spinner size="xl" text="Loading Gallery..." />
            </Center>
          ) : (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              w="100%"
            >
              <Box
                sx={{
                  '.swiper': {
                    width: '100%',
                    paddingTop: '50px',
                    paddingBottom: '50px',
                  },
                  '.swiper-slide': {
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '300px',
                    height: '400px',
                  },
                  '.swiper-pagination-bullet': {
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#C5A572',
                    opacity: 0.7,
                  },
                  '.swiper-pagination-bullet-active': {
                    backgroundColor: '#6B1D1D',
                    opacity: 1,
                  },
                  '.swiper-button-next, .swiper-button-prev': {
                    color: '#6B1D1D',
                    '&:after': {
                      fontSize: '20px',
                    },
                  },
                }}
              >
                <Swiper
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView="auto"
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                  loop={true}
                >
                  {filteredImages.map((image, index) => (
                    <SwiperSlide key={image._id}>
                      <Box
                        cursor="pointer"
                        onClick={() => openGallery(filteredImages, index)}
                        position="relative"
                        borderRadius="xl"
                        overflow="hidden"
                        bg="white"
                        boxShadow="0 15px 35px rgba(0,0,0,0.2)"
                        _hover={{
                          transform: 'scale(1.05)',
                        }}
                        transition="transform 0.3s ease"
                        w="300px"
                        h="400px"
                      >
                        <Image
                          src={image.url ? `http://localhost:5000${image.url}` : getFallbackImage(index)}
                          alt={image.title}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          fallback={
                            <Box
                              w="100%"
                              h="100%"
                              bg="accent.100"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text color="accent.600">Loading...</Text>
                            </Box>
                          }
                        />
                        
                        <Box
                          position="absolute"
                          bottom={0}
                          left={0}
                          right={0}
                          bg="linear-gradient(transparent, rgba(0,0,0,0.8))"
                          color="white"
                          p={4}
                        >
                          <Text fontWeight="bold" fontSize="lg" mb={1}>
                            {image.title}
                          </Text>
                          <Text fontSize="sm" color="accent.200">
                            {image.category}
                          </Text>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </MotionBox>
          )}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(10px)" />
        <ModalContent bg="transparent" boxShadow="none" maxW="90vw">
          <ModalCloseButton color="white" zIndex={2} size="lg" />
          <ImageGallery
            items={modalImages}
            showThumbnails={true}
            showPlayButton={false}
            showFullscreenButton={true}
            showBullets={true}
          />
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Gallery