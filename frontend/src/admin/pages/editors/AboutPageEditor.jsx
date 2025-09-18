import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Card,
  CardBody,
  Text,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  Badge
} from '@chakra-ui/react'
import ImageUpload from '../../../components/common/ImageUpload'
import { FaSave, FaEye, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { pagesAPI } from '../../../services/api'

const AboutPageEditor = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageData, setPageData] = useState({
    slug: 'about',
    heroTitle: 'About Me',
    heroSubtitle: 'Vikram Mehndi',
    heroDescription: 'Creating beautiful memories through the art of mehndi for over 8 years',
    storyTitle: 'The Artist Behind the Art',
    storyContent: 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.',
    storyContent2: 'Specializing in bridal mehndi, Arabic patterns, and contemporary fusion designs, combining traditional techniques with modern aesthetics to create unique artwork that tells your story.',
    storyContent3: 'Every design is crafted with premium quality henna, ensuring deep, long-lasting color that enhances the beauty of your special occasions. From intimate gatherings to grand celebrations, each piece is a work of art.',
    storyContent4: 'My passion lies in understanding your vision and bringing it to life through personalized designs that reflect your personality and the significance of your celebration.',
    artistImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop',
    showAchievements: true
  })

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      setLoading(true)
      const data = await pagesAPI.getBySlug('about')
      if (data) {
        setPageData(prev => ({ ...prev, ...data }))
      }
    } catch (err) {
      console.error('Failed to load page data:', err)
      setError('Failed to load page data')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const saveData = {
        ...pageData,
        slug: 'about',
        title: 'About Page'
      }
      await pagesAPI.update('about', saveData)
      toast({
        title: 'Success',
        description: 'About page updated successfully',
        status: 'success',
        duration: 3000
      })
    } catch (err) {
      console.error('Save error:', err)
      toast({
        title: 'Error',
        description: err.message || 'Failed to save changes',
        status: 'error',
        duration: 3000
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <Center h="50vh">
          <VStack spacing={4}>
            <Spinner size="xl" color="primary.500" />
            <Heading size="md" color="gray.600">Loading About Page Editor...</Heading>
          </VStack>
        </Center>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <Container maxW="7xl" py={8}>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Container>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <HStack justify="space-between" mb={8}>
          <HStack>
            <Button
              leftIcon={<FaArrowLeft />}
              onClick={() => navigate('/admin')}
              variant="ghost"
            >
              Back to Dashboard
            </Button>
            <Heading size="lg">Edit About Page</Heading>
          </HStack>
          <HStack>
            <Button
              leftIcon={<FaEye />}
              onClick={() => window.open('/about', '_blank')}
              variant="outline"
            >
              Preview
            </Button>
            <Button
              leftIcon={<FaSave />}
              colorScheme="blue"
              onClick={handleSave}
              isLoading={saving}
            >
              Save Changes
            </Button>
          </HStack>
        </HStack>

        <HStack spacing={8} align="start">
          <Box flex={1}>
            <VStack spacing={6} align="stretch">
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Hero Section</Heading>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        value={pageData?.heroTitle || ''}
                        onChange={(e) => updateField('heroTitle', e.target.value)}
                        placeholder="About Me"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Subtitle</FormLabel>
                      <Input
                        value={pageData?.heroSubtitle || ''}
                        onChange={(e) => updateField('heroSubtitle', e.target.value)}
                        placeholder="Vikram Mehndi"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={pageData?.heroDescription || ''}
                        onChange={(e) => updateField('heroDescription', e.target.value)}
                        rows={3}
                        placeholder="Creating beautiful memories through the art of mehndi..."
                      />
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Story Section</Heading>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Story Title</FormLabel>
                      <Input
                        value={pageData?.storyTitle || ''}
                        onChange={(e) => updateField('storyTitle', e.target.value)}
                        placeholder="The Artist Behind the Art"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Main Story Content</FormLabel>
                      <Textarea
                        value={pageData?.storyContent || ''}
                        onChange={(e) => updateField('storyContent', e.target.value)}
                        rows={4}
                        placeholder="With over 8 years of experience..."
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Additional Content 1</FormLabel>
                      <Textarea
                        value={pageData?.storyContent2 || ''}
                        onChange={(e) => updateField('storyContent2', e.target.value)}
                        rows={3}
                        placeholder="Specializing in bridal mehndi..."
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Additional Content 2</FormLabel>
                      <Textarea
                        value={pageData?.storyContent3 || ''}
                        onChange={(e) => updateField('storyContent3', e.target.value)}
                        rows={3}
                        placeholder="Every design is crafted..."
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Additional Content 3</FormLabel>
                      <Textarea
                        value={pageData?.storyContent4 || ''}
                        onChange={(e) => updateField('storyContent4', e.target.value)}
                        rows={3}
                        placeholder="My passion lies in understanding..."
                      />
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Settings</Heading>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Artist Image</FormLabel>
                      <ImageUpload
                        value={pageData?.artistImage || ''}
                        onChange={(url) => updateField('artistImage', url)}
                        type="pages"
                        placeholder="Upload artist image"
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb={0}>Show Achievements Section</FormLabel>
                      <Switch
                        isChecked={pageData?.showAchievements !== false}
                        onChange={(e) => updateField('showAchievements', e.target.checked)}
                      />
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </Box>

          <Box flex={1}>
            <Card position="sticky" top={4}>
              <CardBody>
                <Heading size="sm" mb={4}>Live Preview</Heading>
                <Box p={4} bg="gray.50" borderRadius="lg" maxH="70vh" overflowY="auto">
                  <VStack spacing={6} align="start">
                    {/* Hero Preview */}
                    <Box w="100%" p={4} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                      <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Hero Section</Text>
                      <Text fontSize="sm" color="accent.600" mb={1} fontWeight="500">
                        {pageData?.heroTitle || 'About Me'}
                      </Text>
                      <Heading size="md" color="primary.500" mb={2}>
                        {pageData?.heroSubtitle || 'Vikram Mehndi'}
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        {pageData?.heroDescription || 'Creating beautiful memories through the art of mehndi for over 8 years'}
                      </Text>
                    </Box>
                    
                    {/* Story Preview */}
                    <Box w="100%" p={4} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                      <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Story Section</Text>
                      <Heading size="sm" color="primary.500" mb={3}>
                        {pageData?.storyTitle || 'The Artist Behind the Art'}
                      </Heading>
                      <VStack spacing={2} align="start">
                        <Text color="gray.600" fontSize="sm" fontWeight="500">
                          {pageData?.storyContent || 'Main story content...'}
                        </Text>
                        {pageData?.storyContent2 && (
                          <Text color="gray.600" fontSize="xs">
                            {pageData.storyContent2}
                          </Text>
                        )}
                        {pageData?.storyContent3 && (
                          <Text color="gray.600" fontSize="xs">
                            {pageData.storyContent3}
                          </Text>
                        )}
                        {pageData?.storyContent4 && (
                          <Text color="gray.600" fontSize="xs">
                            {pageData.storyContent4}
                          </Text>
                        )}
                      </VStack>
                    </Box>

                    {/* Image Preview */}
                    {pageData?.artistImage && (
                      <Box w="100%" p={4} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                        <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Artist Image</Text>
                        <Box borderRadius="md" overflow="hidden" h="120px">
                          <img 
                            src={pageData.artistImage} 
                            alt="Artist" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'
                            }}
                          />
                        </Box>
                      </Box>
                    )}

                    {/* Settings Preview */}
                    <Box w="100%" p={4} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                      <Text fontSize="xs" color="gray.500" mb={2} textTransform="uppercase">Settings</Text>
                      <Text fontSize="sm" color="gray.600">
                        Achievements: {pageData?.showAchievements !== false ? 'Visible' : 'Hidden'}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </CardBody>
            </Card>
          </Box>
        </HStack>
      </Container>
    </AdminLayout>
  )
}

export default AboutPageEditor