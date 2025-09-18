import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Image, 
  VStack, 
  HStack, 
  Tag, 
  Button,
  Divider,
  Center,
  Spinner
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { FaCalendar, FaClock, FaEye, FaArrowLeft } from 'react-icons/fa'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'

const MotionBox = motion(Box)

const BlogDetail = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      // Mock data since API might not be ready
      setBlog({
        _id: '1',
        title: 'Essential Bridal Mehndi Tips for Your Perfect Wedding Day',
        slug: 'essential-bridal-mehndi-tips-perfect-wedding-day',
        excerpt: 'Discover expert tips to ensure your bridal mehndi looks stunning and lasts longer on your special day.',
        content: `
          <p>Your wedding day is one of the most important days of your life, and your bridal mehndi plays a crucial role in completing your bridal look. Here are some essential tips to ensure your mehndi turns out perfect.</p>

          <h2>Pre-Application Preparation</h2>
          <p>Start preparing your hands and feet at least a week before your mehndi ceremony. Exfoliate regularly to remove dead skin cells and moisturize daily to keep your skin soft and supple.</p>

          <h2>Choosing the Right Design</h2>
          <p>Select designs that complement your outfit and jewelry. Traditional motifs like paisleys, flowers, and intricate patterns work beautifully for bridal mehndi.</p>

          <h2>Day of Application</h2>
          <p>Ensure your hands are clean and free from any oils or lotions. This helps the henna paste adhere better and results in a darker stain.</p>

          <h2>Aftercare Tips</h2>
          <p>Keep the mehndi on for at least 6-8 hours. Apply a mixture of lemon juice and sugar to keep it moist and enhance the color development.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
        category: 'Bridal Tips',
        readTime: 5,
        views: 245,
        createdAt: '2024-01-15',
        featured: true
      })
    } catch (error) {
      console.error('Failed to fetch blog:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Center minH="100vh" pt="100px">
          <Spinner size="xl" color="primary.500" />
        </Center>
      </Box>
    )
  }

  if (!blog) {
    return (
      <Box>
        <Navbar />
        <Center minH="100vh" pt="100px">
          <VStack spacing={4}>
            <Text fontSize="xl" color="gray.500">Blog post not found</Text>
            <Button as={Link} to="/blog" leftIcon={<FaArrowLeft />}>
              Back to Blog
            </Button>
          </VStack>
        </Center>
      </Box>
    )
  }

  return (
    <Box>
      <Navbar />
      
      {/* Hero Section */}
      <Box pt="100px" pb={10} bg="background.ivory" position="relative" overflow="hidden">
        <Container maxW="1000px" position="relative" zIndex={2}>
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VStack spacing={6} align="start">
              <Button
                as={Link}
                to="/blog"
                leftIcon={<FaArrowLeft />}
                variant="ghost"
                color="primary.500"
                size="lg"
              >
                Back to Blog
              </Button>
              
              <HStack spacing={2} flexWrap="wrap">
                <Tag size="md" colorScheme="blue">{blog.category}</Tag>
                {blog.featured && <Tag size="md" colorScheme="orange">Featured</Tag>}
              </HStack>
              
              <Heading
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontFamily="heading"
                color="primary.500"
                lineHeight="1.2"
                fontWeight="400"
              >
                {blog.title}
              </Heading>
              
              <HStack spacing={6} fontSize="sm" color="gray.600" flexWrap="wrap">
                <HStack spacing={2}>
                  <FaCalendar />
                  <Text>{new Date(blog.createdAt).toLocaleDateString()}</Text>
                </HStack>
                <HStack spacing={2}>
                  <FaClock />
                  <Text>{blog.readTime} min read</Text>
                </HStack>
                <HStack spacing={2}>
                  <FaEye />
                  <Text>{blog.views} views</Text>
                </HStack>
              </HStack>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Featured Image */}
      <Box bg="white" py={10}>
        <Container maxW="1000px">
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              w="100%"
              h={{ base: '300px', md: '400px' }}
              objectFit="cover"
              borderRadius="2xl"
              boxShadow="0 20px 60px rgba(0,0,0,0.1)"
            />
          </MotionBox>
        </Container>
      </Box>

      {/* Content */}
      <Box bg="white" pb={20}>
        <Container maxW="800px">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Box
              fontSize="lg"
              lineHeight="1.8"
              color="text.charcoal"
              sx={{
                'h2': {
                  fontSize: '2xl',
                  fontWeight: 'bold',
                  color: 'primary.500',
                  mt: 8,
                  mb: 4,
                  fontFamily: 'heading'
                },
                'h3': {
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                  color: 'primary.500',
                  mt: 6,
                  mb: 3,
                  fontFamily: 'heading'
                },
                'p': {
                  mb: 6
                },
                'ul': {
                  pl: 6,
                  mb: 6
                },
                'li': {
                  mb: 2
                }
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </MotionBox>
          
          <Divider my={10} />
          
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VStack spacing={6} align="center" textAlign="center">
              <Text fontSize="lg" color="text.charcoal">
                Found this article helpful? Share it with others!
              </Text>
              <HStack spacing={4}>
                <Button colorScheme="blue" size="lg">
                  Share on Facebook
                </Button>
                <Button colorScheme="twitter" size="lg">
                  Share on Twitter
                </Button>
                <Button colorScheme="whatsapp" size="lg">
                  Share on WhatsApp
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      <Footer />
      <ScrollToTop />
    </Box>
  )
}

export default BlogDetail