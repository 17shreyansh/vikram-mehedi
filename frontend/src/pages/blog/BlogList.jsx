import React, { useState, useEffect } from 'react'
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
  Tag, 
  Button,
  Input,
  Select,
  Center,
  Spinner
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar, FaClock, FaEye } from 'react-icons/fa'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'
import { blogAPI } from '../../services/api'

const MotionBox = motion(Box)

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      // Mock data since API might not be ready
      setBlogs([
        {
          _id: '1',
          title: 'Essential Bridal Mehndi Tips for Your Perfect Wedding Day',
          slug: 'essential-bridal-mehndi-tips-perfect-wedding-day',
          excerpt: 'Discover expert tips to ensure your bridal mehndi looks stunning and lasts longer on your special day.',
          featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
          category: 'Bridal Tips',
          readTime: 5,
          views: 245,
          createdAt: '2024-01-15',
          featured: true
        },
        {
          _id: '2',
          title: 'How to Care for Your Mehndi: A Complete Guide',
          slug: 'how-to-care-for-your-mehndi-complete-guide',
          excerpt: 'Learn the best practices for mehndi aftercare to ensure long-lasting, beautiful color that stays vibrant.',
          featuredImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop',
          category: 'Mehndi Care',
          readTime: 4,
          views: 189,
          createdAt: '2024-01-12',
          featured: false
        },
        {
          _id: '3',
          title: 'Latest Mehndi Design Trends for 2024',
          slug: 'latest-mehndi-design-trends-2024',
          excerpt: 'Stay updated with the hottest mehndi design trends that are taking the fashion world by storm this year.',
          featuredImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
          category: 'Design Trends',
          readTime: 6,
          views: 312,
          createdAt: '2024-01-10',
          featured: true
        }
      ])
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Bridal Tips', 'Mehndi Care', 'Design Trends', 'Occasions']

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
                Mehndi Insights
              </Text>
              <Heading
                fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                fontFamily="heading"
                color="primary.500"
                mb={6}
                letterSpacing="-2px"
                fontWeight="400"
              >
                Blog
              </Heading>
              <Text fontSize="xl" color="text.charcoal" maxW="600px" lineHeight="1.8" fontWeight="300">
                Tips, trends, and insights from the world of mehndi artistry
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Blog Content */}
      <Box py={20} bg="white">
        <Container maxW="1400px">
          {/* Filters */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            mb={12}
          >
            <HStack spacing={6} flexWrap="wrap" justify="center">
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                maxW="300px"
                size="lg"
                borderRadius="full"
              />
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                maxW="200px"
                size="lg"
                borderRadius="full"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>
            </HStack>
          </MotionBox>

          {loading ? (
            <Center py={20}>
              <Spinner size="xl" color="primary.500" />
            </Center>
          ) : (
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
              {filteredBlogs.map((blog, index) => (
                <MotionBox
                  key={blog._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    bg="white"
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="0 10px 40px rgba(0,0,0,0.1)"
                    border="1px solid"
                    borderColor="gray.100"
                    _hover={{
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    }}
                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    h="100%"
                  >
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      w="100%"
                      h="200px"
                      objectFit="cover"
                    />
                    
                    <VStack p={6} align="start" spacing={4} h="calc(100% - 200px)" justify="space-between">
                      <VStack align="start" spacing={3} flex={1}>
                        <HStack spacing={2}>
                          <Tag size="sm" colorScheme="blue">{blog.category}</Tag>
                          {blog.featured && <Tag size="sm" colorScheme="orange">Featured</Tag>}
                        </HStack>
                        
                        <Heading
                          fontSize="xl"
                          fontFamily="heading"
                          color="primary.500"
                          lineHeight="1.3"
                          noOfLines={2}
                        >
                          {blog.title}
                        </Heading>
                        
                        <Text
                          color="text.charcoal"
                          fontSize="sm"
                          lineHeight="1.6"
                          noOfLines={3}
                        >
                          {blog.excerpt}
                        </Text>
                      </VStack>
                      
                      <VStack w="100%" spacing={3}>
                        <HStack justify="space-between" w="100%" fontSize="xs" color="gray.500">
                          <HStack spacing={4}>
                            <HStack spacing={1}>
                              <FaCalendar />
                              <Text>{new Date(blog.createdAt).toLocaleDateString()}</Text>
                            </HStack>
                            <HStack spacing={1}>
                              <FaClock />
                              <Text>{blog.readTime} min read</Text>
                            </HStack>
                            <HStack spacing={1}>
                              <FaEye />
                              <Text>{blog.views} views</Text>
                            </HStack>
                          </HStack>
                        </HStack>
                        
                        <Button
                          as={Link}
                          to={`/blog/${blog.slug}`}
                          variant="outline"
                          colorScheme="primary"
                          size="sm"
                          w="100%"
                          borderRadius="full"
                        >
                          Read More
                        </Button>
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </Grid>
          )}

          {!loading && filteredBlogs.length === 0 && (
            <Center py={20}>
              <VStack spacing={4}>
                <Text fontSize="xl" color="gray.500">No articles found</Text>
                <Text color="gray.400">Try adjusting your search or filter criteria</Text>
              </VStack>
            </Center>
          )}
        </Container>
      </Box>

      <Footer />
      <ScrollToTop />
    </Box>
  )
}

export default BlogList