import React, { useState, useEffect, useRef } from 'react'
import '../../../styles/editor.css'
import ImageUpload from '../../../components/common/ImageUpload'
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
  Badge,
  Select,
  InputGroup,
  InputLeftElement,
  Image,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
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
  TabPanel
} from '@chakra-ui/react'
import { 
  FaSave, 
  FaEye, 
  FaArrowLeft, 
  FaImage, 
  FaCode, 
  FaLink,
  FaCalendar,
  FaUser,
  FaTags,
  FaGlobe,
  FaSearch,
  FaCog
} from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { blogAPI } from '../../../services/api'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image'
import Quote from '@editorjs/quote'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Delimiter from '@editorjs/delimiter'
import Table from '@editorjs/table'
import Embed from '@editorjs/embed'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Underline from '@editorjs/underline'

const BlogEditor = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const toast = useToast()
  const editorRef = useRef(null)
  const editorInstance = useRef(null)
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure()
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure()
  
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  
  const [blogData, setBlogData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: null,
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
    const timer = setTimeout(() => {
      if (id && id !== 'new') {
        fetchBlogData()
      } else {
        initializeEditor()
      }
    }, 300)
    
    return () => {
      clearTimeout(timer)
      if (editorInstance.current?.destroy) {
        editorInstance.current.destroy()
        editorInstance.current = null
      }
    }
  }, [])

  const fetchBlogData = async () => {
    try {
      setLoading(true)
      const response = await blogAPI.getById(id)
      const blog = response.data || response
      
      setBlogData({
        ...blog,
        publishDate: blog.publishDate ? blog.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
        seo: blog.seo || {
          metaTitle: '',
          metaDescription: '',
          keywords: [],
          ogImage: ''
        }
      })
      
      setTimeout(() => initializeEditor(blog.content), 500)
    } catch (err) {
      console.error('Failed to load blog data:', err)
      setError('Failed to load blog data')
    } finally {
      setLoading(false)
    }
  }

  const initializeEditor = (initialData = null) => {
    if (editorInstance.current?.destroy) {
      editorInstance.current.destroy()
      editorInstance.current = null
    }

    if (!document.getElementById('editorjs')) return

    editorInstance.current = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4],
            defaultLevel: 2
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: 'Tell your story...'
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file) => {
                const formData = new FormData()
                formData.append('image', file)
                
                try {
                  const response = await fetch('/api/upload/blogs', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    body: formData
                  })
                  
                  const result = await response.json()
                  
                  if (result.success) {
                    return {
                      success: 1,
                      file: {
                        url: result.file.url
                      }
                    }
                  } else {
                    throw new Error(result.error)
                  }
                } catch (error) {
                  return {
                    success: 0,
                    error: error.message
                  }
                }
              }
            }
          }
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote author'
          }
        },
        code: {
          class: Code,
          config: {
            placeholder: 'Enter code here...'
          }
        },
        linkTool: LinkTool,
        delimiter: Delimiter,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3
          }
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              instagram: true,
              twitter: true,
              pinterest: true
            }
          }
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
        },
        underline: Underline
      },
      data: initialData || {
        blocks: [
          {
            type: 'header',
            data: {
              text: 'Start writing your blog post...',
              level: 2
            }
          }
        ]
      },
      placeholder: 'Let\'s write an awesome story!',
      autofocus: true,
      onChange: calculateReadTime
    })
  }

  const calculateReadTime = () => {
    if (!editorInstance.current?.save) return
    
    editorInstance.current.save().then(outputData => {
      const wordCount = outputData.blocks.reduce((count, block) => {
        if (block.type === 'paragraph' || block.type === 'header') {
          return count + (block.data.text?.split(' ').length || 0)
        }
        return count
      }, 0)
      setBlogData(prev => ({ ...prev, readTime: Math.ceil(wordCount / 200) || 1 }))
    }).catch(() => {})
  }

  const updateField = (field, value) => {
    setBlogData(prev => ({ ...prev, [field]: value }))
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

      const content = await editorInstance.current.save()
      
      const saveData = {
        ...blogData,
        content,
        published: publish || blogData.published,
        slug: blogData.slug || generateSlug(blogData.title)
      }

      if (id === 'new') {
        await blogAPI.create(saveData)
      } else {
        await blogAPI.update(id, saveData)
      }
      
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
        description: err.message || 'Failed to save blog',
        status: 'error',
        duration: 3000
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    onPreviewOpen()
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
              onClick={handlePreview}
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

              {/* Editor */}
              <Card>
                <CardBody>
                  <Box
                    id="editorjs"
                    minH="400px"
                    ref={editorRef}
                    className="blog-editor"
                  />
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
                  <ImageUpload
                    value={blogData.featuredImage}
                    onChange={(url) => updateField('featuredImage', url)}
                    type="blogs"
                    placeholder="Upload featured image"
                  />
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

                      <FormControl>
                        <FormLabel>OG Image URL</FormLabel>
                        <Input
                          value={blogData.seo.ogImage}
                          onChange={(e) => updateSEOField('ogImage', e.target.value)}
                        />
                      </FormControl>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Text>Advanced settings coming soon...</Text>
                    </VStack>
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
                  
                  <Text>Content preview will be rendered here...</Text>
                </VStack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </AdminLayout>
  )
}

export default BlogEditor