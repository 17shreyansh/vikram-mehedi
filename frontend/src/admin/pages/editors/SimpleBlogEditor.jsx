import React, { useState, useEffect, useRef } from 'react'
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
  Badge,
  Select,
  Image,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider
} from '@chakra-ui/react'
import { 
  FaSave, 
  FaEye, 
  FaArrowLeft, 
  FaImage,
  FaCalendar,
  FaUser,
  FaCog
} from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'

const SimpleBlogEditor = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const toast = useToast()
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure()
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure()
  
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [blogData, setBlogData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: 'Bridal Tips',
    tags: [],
    published: false,
    featured: false,
    author: 'Vikram Mehndi',
    publishDate: new Date().toISOString().split('T')[0],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      ogImage: ''
    },
    readTime: 0
  })
  
  const [newTag, setNewTag] = useState('')
  const [newKeyword, setNewKeyword] = useState('')
  
  const categories = [
    'Bridal Tips',
    'Mehndi Care', 
    'Design Trends',
    'Occasions',
    'Traditional Art',
    'Modern Fusion',
    'DIY Tips',
    'Cultural Significance'
  ]

  useEffect(() => {
    if (id && id !== 'new') {
      fetchBlogData()
    }
  }, [id])

  const fetchBlogData = async () => {
    try {
      setLoading(true)
      // Mock data
      const mockBlog = {
        _id: id,
        title: 'Complete Guide to Bridal Mehndi Designs',
        slug: 'bridal-mehndi-guide',
        excerpt: 'Everything you need to know about choosing the perfect bridal mehndi design for your special day.',
        content: 'Bridal mehndi is an essential part of wedding celebrations...\n\nWith intricate patterns and beautiful designs, mehndi adds elegance to your special day.',
        featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        category: 'Bridal Tips',
        tags: ['bridal', 'wedding', 'designs'],
        published: false,
        featured: false,
        author: 'Vikram Mehndi',
        publishDate: '2024-01-15',
        seo: {
          metaTitle: 'Complete Guide to Bridal Mehndi Designs | Vikram Mehndi',
          metaDescription: 'Discover the perfect bridal mehndi designs for your wedding day. Expert tips and stunning patterns.',
          keywords: ['bridal mehndi', 'wedding henna', 'mehndi designs'],
          ogImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop'
        },
        readTime: 8
      }
      
      setBlogData(mockBlog)
    } catch (err) {
      console.error('Failed to load blog data:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field, value) => {
    setBlogData(prev => ({ ...prev, [field]: value }))
    
    // Calculate read time for content
    if (field === 'content') {
      const wordCount = value.split(' ').length
      const readTime = Math.ceil(wordCount / 200) || 1
      setBlogData(prev => ({ ...prev, readTime }))
    }
  }

  const updateSEOField = (field, value) => {
    setBlogData(prev => ({
      ...prev,
      seo: { ...prev.seo, [field]: value }
    }))
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const addTag = () => {
    if (newTag.trim() && !blogData.tags.includes(newTag.trim())) {
      setBlogData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tag) => {
    setBlogData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !blogData.seo.keywords.includes(newKeyword.trim())) {
      setBlogData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword.trim()]
        }
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword) => {
    setBlogData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(k => k !== keyword)
      }
    }))
  }

  const handleSave = async (publish = false) => {
    try {
      setSaving(true)
      
      if (!blogData.title.trim()) {
        toast({
          title: 'Error',
          description: 'Please enter a title',
          status: 'error',
          duration: 3000
        })
        return
      }

      const saveData = {
        ...blogData,
        published: publish || blogData.published,
        slug: blogData.slug || generateSlug(blogData.title)
      }

      console.log('Saving blog:', saveData)
      
      toast({
        title: 'Success',
        description: `Blog ${publish ? 'published' : 'saved'} successfully`,
        status: 'success',
        duration: 3000
      })

      if (id === 'new') {
        navigate('/admin/blogs')
      }
    } catch (err) {
      console.error('Save error:', err)
      toast({
        title: 'Error',
        description: 'Failed to save blog',
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
            <Heading size="md" color="gray.600">Loading Blog Editor...</Heading>
          </VStack>
        </Center>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        {/* Header */}
        <HStack justify="space-between" mb={8}>
          <HStack>
            <Button
              leftIcon={<FaArrowLeft />}
              onClick={() => navigate('/admin/blogs')}
              variant="ghost"
            >
              Back to Blogs
            </Button>
            <Heading size="lg">
              {id === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}
            </Heading>
          </HStack>
          <HStack>
            <Badge colorScheme={blogData.published ? 'green' : 'yellow'}>
              {blogData.published ? 'Published' : 'Draft'}
            </Badge>
            <Text fontSize="sm" color="gray.600">
              {blogData.readTime} min read
            </Text>
            <Button
              leftIcon={<FaCog />}
              onClick={onSettingsOpen}
              variant="outline"
              size="sm"
            >
              Settings
            </Button>
            <Button
              leftIcon={<FaEye />}
              onClick={onPreviewOpen}
              variant="outline"
            >
              Preview
            </Button>
            <Button
              onClick={() => handleSave(false)}
              isLoading={saving}
              variant="outline"
            >
              Save Draft
            </Button>
            <Button
              leftIcon={<FaSave />}
              colorScheme="blue"
              onClick={() => handleSave(true)}
              isLoading={saving}
            >
              Publish
            </Button>
          </HStack>
        </HStack>

        <Grid templateColumns="1fr 300px" gap={8}>
          {/* Main Editor */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Title */}
              <FormControl>
                <Input
                  value={blogData.title}
                  onChange={(e) => {
                    const title = e.target.value
                    updateField('title', title)
                    if (!blogData.slug) {
                      updateField('slug', generateSlug(title))
                    }
                  }}
                  placeholder="Enter blog title..."
                  fontSize="2xl"
                  fontWeight="bold"
                  border="none"
                  _focus={{ boxShadow: 'none' }}
                  p={0}
                />
              </FormControl>

              {/* Excerpt */}
              <FormControl>
                <Textarea
                  value={blogData.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  placeholder="Write a compelling excerpt..."
                  rows={3}
                  resize="none"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {blogData.excerpt.length}/200 characters
                </Text>
              </FormControl>

              {/* Content Editor */}
              <Card>
                <CardBody>
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      value={blogData.content}
                      onChange={(e) => updateField('content', e.target.value)}
                      placeholder="Write your blog content here..."
                      minH="400px"
                      fontFamily="mono"
                      fontSize="sm"
                    />
                  </FormControl>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>

          {/* Sidebar */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Featured Image */}
              <Card>
                <CardBody>
                  <Heading size="sm" mb={4}>Featured Image</Heading>
                  <VStack spacing={3}>
                    {blogData.featuredImage && (
                      <Image
                        src={blogData.featuredImage}
                        alt="Featured"
                        w="100%"
                        h="150px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    )}
                    <Input
                      value={blogData.featuredImage}
                      onChange={(e) => updateField('featuredImage', e.target.value)}
                      placeholder="Image URL"
                      size="sm"
                    />
                    <Button size="sm" leftIcon={<FaImage />} w="100%">
                      Upload Image
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              {/* Category & Tags */}
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel fontSize="sm">Category</FormLabel>
                      <Select
                        value={blogData.category}
                        onChange={(e) => updateField('category', e.target.value)}
                        size="sm"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">Tags</FormLabel>
                      <HStack>
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag"
                          size="sm"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button onClick={addTag} size="sm">Add</Button>
                      </HStack>
                      <Wrap mt={2}>
                        {blogData.tags.map((tag, index) => (
                          <WrapItem key={index}>
                            <Tag size="sm" colorScheme="blue">
                              <TagLabel>{tag}</TagLabel>
                              <TagCloseButton onClick={() => removeTag(tag)} />
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>

              {/* Publishing Options */}
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Heading size="sm">Publishing</Heading>
                    
                    <FormControl>
                      <FormLabel fontSize="sm">Author</FormLabel>
                      <Input
                        value={blogData.author}
                        onChange={(e) => updateField('author', e.target.value)}
                        size="sm"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">Publish Date</FormLabel>
                      <Input
                        type="date"
                        value={blogData.publishDate}
                        onChange={(e) => updateField('publishDate', e.target.value)}
                        size="sm"
                      />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0" fontSize="sm">Featured Post</FormLabel>
                      <Switch
                        isChecked={blogData.featured}
                        onChange={(e) => updateField('featured', e.target.checked)}
                      />
                    </FormControl>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>
        </Grid>

        {/* Settings Modal */}
        <Modal isOpen={isSettingsOpen} onClose={onSettingsClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Blog Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Tabs>
                <TabList>
                  <Tab>SEO</Tab>
                  <Tab>Advanced</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>URL Slug</FormLabel>
                        <Input
                          value={blogData.slug}
                          onChange={(e) => updateField('slug', e.target.value)}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Meta Title</FormLabel>
                        <Input
                          value={blogData.seo.metaTitle}
                          onChange={(e) => updateSEOField('metaTitle', e.target.value)}
                          maxLength={60}
                        />
                        <Text fontSize="sm" color="gray.500">
                          {blogData.seo.metaTitle.length}/60 characters
                        </Text>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Meta Description</FormLabel>
                        <Textarea
                          value={blogData.seo.metaDescription}
                          onChange={(e) => updateSEOField('metaDescription', e.target.value)}
                          maxLength={160}
                          rows={3}
                        />
                        <Text fontSize="sm" color="gray.500">
                          {blogData.seo.metaDescription.length}/160 characters
                        </Text>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Keywords</FormLabel>
                        <HStack>
                          <Input
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            placeholder="Add keyword"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                          />
                          <Button onClick={addKeyword}>Add</Button>
                        </HStack>
                        <Wrap mt={2}>
                          {blogData.seo.keywords.map((keyword, index) => (
                            <WrapItem key={index}>
                              <Tag size="sm" colorScheme="green">
                                <TagLabel>{keyword}</TagLabel>
                                <TagCloseButton onClick={() => removeKeyword(keyword)} />
                              </Tag>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </FormControl>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <Text>Advanced settings coming soon...</Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Preview Modal */}
        <Modal isOpen={isPreviewOpen} onClose={onPreviewClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Blog Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box p={6} bg="white" borderRadius="lg">
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Badge colorScheme="blue" mb={2}>{blogData.category}</Badge>
                    <Heading size="xl" mb={2}>{blogData.title}</Heading>
                    <HStack spacing={4} color="gray.600" fontSize="sm">
                      <HStack>
                        <FaUser />
                        <Text>{blogData.author}</Text>
                      </HStack>
                      <HStack>
                        <FaCalendar />
                        <Text>{new Date(blogData.publishDate).toLocaleDateString()}</Text>
                      </HStack>
                      <Text>{blogData.readTime} min read</Text>
                    </HStack>
                  </Box>
                  
                  {blogData.featuredImage && (
                    <Image
                      src={blogData.featuredImage}
                      alt={blogData.title}
                      w="100%"
                      h="300px"
                      objectFit="cover"
                      borderRadius="lg"
                    />
                  )}
                  
                  <Text fontSize="lg" color="gray.700" fontStyle="italic">
                    {blogData.excerpt}
                  </Text>
                  
                  <Divider />
                  
                  <Box>
                    <Text whiteSpace="pre-wrap" lineHeight="1.8">
                      {blogData.content}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </AdminLayout>
  )
}

export default SimpleBlogEditor