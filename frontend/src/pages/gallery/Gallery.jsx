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
  SimpleGrid,
  Badge,
  AspectRatio,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ImageGallery from 'react-image-gallery'
import { useFallbackData } from '../../hooks/useFallbackData'
import { pagesAPI } from '../../services/api'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'

const MotionBox = motion(Box)

const GalleryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [modalImages, setModalImages] = useState([])
  const [homePageContent, setHomePageContent] = useState(null)

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const content = await pagesAPI.getBySlug('home')
        setHomePageContent(content)
      } catch (error) {
        console.log('Using default footer content')
      }
    }
    fetchHomeContent()
  }, [])

  const categories = ['All', 'Bridal', 'Arabic', 'Traditional', 'Party']

  const { data: galleryImages } = useFallbackData('gallery')

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openGallery = (images, startIndex) => {
    const galleryImages = images.map(img => ({
      original: img.image || img.url,
      thumbnail: img.image || img.url,
      description: img.title,
    }))
    setModalImages(galleryImages)
    onOpen()
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
                Our Masterpieces
              </Text>
              <Heading fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontFamily="heading" color="primary.500" mb={6}>
                Gallery
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" maxW="600px" lineHeight="1.8">
                Discover our stunning collection of mehndi artistry, where tradition meets contemporary elegance
              </Text>
            </MotionBox>

            {/* Category Filter */}
            <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap" justify="center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'solid' : 'outline'}
                  bg={selectedCategory === category ? 'primary.500' : 'transparent'}
                  color={selectedCategory === category ? 'white' : 'primary.500'}
                  borderColor="primary.500"
                  onClick={() => setSelectedCategory(category)}
                  size={{ base: 'md', md: 'lg' }}
                  borderRadius="full"
                  px={{ base: 4, md: 8 }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  _hover={{
                    bg: 'primary.500',
                    color: 'white',
                  }}
                >
                  {category}
                </Button>
              ))}
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Box py={20} bg="background.ivory">
        <Container maxW="1400px">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={{ base: 4, md: 8 }}>
            {filteredImages.map((image, index) => (
              <MotionBox
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                cursor="pointer"
                onClick={() => openGallery(filteredImages, index)}
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                bg="white"
                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
                transition="all 0.3s ease"
              >
                <AspectRatio ratio={3/4}>
                  <Image
                    src={image.image || image.url}
                    alt={image.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    loading="lazy"
                  />
                </AspectRatio>
                
                <Box p={4}>
                  <HStack justify="space-between" align="center">
                    <Text fontWeight="600" fontSize={{ base: 'md', md: 'lg' }} color="gray.800">
                      {image.title}
                    </Text>
                    <Badge colorScheme="orange" variant="subtle" fontSize={{ base: 'xs', md: 'sm' }}>
                      {image.category}
                    </Badge>
                  </HStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg="primary.500">
        <Container maxW="800px" textAlign="center">
          <VStack spacing={8}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} color="white" fontFamily="heading">
              Ready to Book Your Session?
            </Heading>
            <Text fontSize="xl" color="white" opacity={0.9}>
              Let's create beautiful memories together with our exquisite mehndi designs
            </Text>
            <Button
              size="lg"
              bg="accent.500"
              color="white"
              px={12}
              py={6}
              fontSize="lg"
              borderRadius="full"
              _hover={{
                bg: 'accent.600',
                transform: 'translateY(-2px)',
              }}
            >
              Book Now
            </Button>
          </VStack>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent bg="transparent" boxShadow="none" maxW="90vw">
          <ModalCloseButton color="white" zIndex={2} size="lg" />
          <ImageGallery
            items={modalImages}
            showThumbnails={true}
            showPlayButton={false}
            showFullscreenButton={true}
          />
        </ModalContent>
      </Modal>

      <Footer pageContent={homePageContent} />
      <ScrollToTop />
    </Box>
  )
}

export default GalleryPage