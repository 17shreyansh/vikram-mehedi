import React, { useState, useEffect } from 'react'
import { Box, Container, Heading, Text, VStack, Image, Grid, GridItem, HStack, Icon, Spinner, Center, Alert, AlertIcon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaAward, FaUsers, FaHeart, FaStar } from 'react-icons/fa'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'
import { pagesAPI } from '../../services/api'

const MotionBox = motion(Box)

const About = () => {
  const [pageData, setPageData] = useState(null)
  const [homePageContent, setHomePageContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const defaultAchievements = [
    { icon: FaUsers, number: '1000+', label: 'Happy Clients', color: 'primary.500' },
    { icon: FaAward, number: '8+', label: 'Years Experience', color: 'accent.500' },
    { icon: FaHeart, number: '2500+', label: 'Designs Created', color: 'primary.500' },
    { icon: FaStar, number: '4.9', label: 'Average Rating', color: 'accent.500' },
  ]

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      setLoading(true)
      const [aboutData, homeData] = await Promise.all([
        pagesAPI.getBySlug('about'),
        pagesAPI.getBySlug('home')
      ])
      setPageData(aboutData)
      setHomePageContent(homeData)
    } catch (err) {
      console.error('Error fetching page data:', err)
      // Use default data if API fails
      setPageData({
        heroTitle: 'About Me',
        heroSubtitle: 'Vikram Mehndi',
        heroDescription: 'Creating beautiful memories through the art of mehndi for over 8 years',
        storyTitle: 'The Artist Behind the Art',
        storyContent: 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.',
        storyContent2: 'Specializing in bridal mehndi, Arabic patterns, and contemporary fusion designs, combining traditional techniques with modern aesthetics to create unique artwork that tells your story.',
        storyContent3: 'Every design is crafted with premium quality henna, ensuring deep, long-lasting color that enhances the beauty of your special occasions. From intimate gatherings to grand celebrations, each piece is a work of art.',
        storyContent4: 'My passion lies in understanding your vision and bringing it to life through personalized designs that reflect your personality and the significance of your celebration.',
        artistImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop',
        showAchievements: true,
        achievements: defaultAchievements
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Center h="50vh">
          <VStack spacing={4}>
            <Spinner size="xl" color="primary.500" />
            <Text color="gray.600">Loading About Page...</Text>
          </VStack>
        </Center>
        <Footer pageContent={homePageContent} />
      </Box>
    )
  }

  const achievements = pageData?.achievements || defaultAchievements

  return (
    <Box>
      <Navbar />
      
      {/* Hero Section */}
      <Box pt="100px" pb={20} bg="background.ivory" position="relative" overflow="hidden">
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
        
        <Container maxW="1400px" position="relative" zIndex={2}>
          <VStack spacing={8} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Text
                fontSize="lg"
                color="accent.600"
                fontFamily="accent"
                mb={4}
                letterSpacing="3px"
                textTransform="uppercase"
              >
                {pageData?.heroTitle || 'About Artist'}
              </Text>
              <Heading
                fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                fontFamily="heading"
                color="primary.500"
                mb={6}
                letterSpacing="-2px"
                fontWeight="400"
              >
                {pageData?.heroSubtitle || 'Vikram Mehndi'}
              </Heading>
              <Text fontSize="xl" color="text.charcoal" maxW="600px" lineHeight="1.8" fontWeight="300">
                {pageData?.heroDescription || 'Creating beautiful memories through the art of mehndi for over 8 years'}
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* About Content */}
      <Box py={32} bg="white" position="relative" overflow="hidden">
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
                <Box position="relative" borderRadius="3xl" overflow="hidden">
                  <Image
                    src={pageData?.artistImage || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop"}
                    alt="Vikram Mehndi Artist"
                    w="100%"
                    h="500px"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    bg="linear-gradient(135deg, rgba(107,29,29,0.1) 0%, rgba(197,165,114,0.1) 100%)"
                  />
                </Box>
              </MotionBox>
            </GridItem>

            <GridItem>
              <VStack align="start" spacing={8}>
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Heading
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    fontFamily="heading"
                    color="primary.500"
                    mb={6}
                    letterSpacing="-2px"
                    fontWeight="400"
                    lineHeight="1.1"
                  >
                    {pageData?.storyTitle || 'The Artist Behind the Art'}
                  </Heading>
                  
                  <VStack spacing={6} align="start">
                    <Text fontSize="xl" color="text.charcoal" lineHeight="1.8" fontWeight="300">
                      {pageData?.storyContent || 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.'}
                    </Text>

                    {pageData?.storyContent2 && (
                      <Text fontSize="lg" color="text.charcoal" lineHeight="1.7" fontWeight="300">
                        {pageData.storyContent2}
                      </Text>
                    )}

                    {pageData?.storyContent3 && (
                      <Text fontSize="lg" color="text.charcoal" lineHeight="1.7" fontWeight="300">
                        {pageData.storyContent3}
                      </Text>
                    )}

                    {pageData?.storyContent4 && (
                      <Text fontSize="lg" color="text.charcoal" lineHeight="1.7" fontWeight="300">
                        {pageData.storyContent4}
                      </Text>
                    )}
                  </VStack>
                </MotionBox>

                {(pageData?.showAchievements !== false) && (
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
                )}
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <Footer pageContent={homePageContent} />
      <ScrollToTop />
    </Box>
  )
}

export default About