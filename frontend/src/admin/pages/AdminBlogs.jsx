import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  VStack,
  HStack,
  useToast,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Select,
  InputGroup,
  InputLeftElement,
  Image,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEllipsisV, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { blogAPI } from '../../services/api'

const AdminBlogs = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingBlog, setEditingBlog] = useState(null)
  const [filters, setFilters] = useState({
    category: 'All',
    published: 'all',
    search: ''
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: 'Bridal Tips',
    tags: [],
    published: false,
    featured: false
  })
  const [newTag, setNewTag] = useState('')
  const toast = useToast()

  const categories = ['All', 'Bridal Tips', 'Mehndi Care', 'Design Trends', 'Occasions', 'Traditional Art']

  // Mock blog data
  const mockBlogs = [
    {
      _id: '1',
      title: 'Complete Guide to Bridal Mehndi Designs',
      slug: 'bridal-mehndi-guide',
      excerpt: 'Everything you need to know about choosing the perfect bridal mehndi design for your special day.',
      category: 'Bridal Tips',
      featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      published: true,
      featured: true,
      tags: ['bridal', 'wedding', 'designs'],
      createdAt: '2024-01-15T10:00:00Z',
      views: 1250,
      likes: 89
    },
    {
      _id: '2',
      title: 'How to Care for Your Mehndi After Application',
      slug: 'mehndi-aftercare-tips',
      excerpt: 'Essential tips to ensure your mehndi develops the darkest, longest-lasting color.',
      category: 'Mehndi Care',
      featuredImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop',
      published: true,
      featured: false,
      tags: ['care', 'tips', 'aftercare'],
      createdAt: '2024-01-12T14:30:00Z',
      views: 890,
      likes: 67
    },
    {
      _id: '3',
      title: 'Latest Arabic Mehndi Design Trends 2024',
      slug: 'arabic-mehndi-trends-2024',
      excerpt: 'Discover the hottest Arabic mehndi patterns that are trending this year.',
      category: 'Design Trends',
      featuredImage: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=300&h=200&fit=crop',
      published: false,
      featured: false,
      tags: ['arabic', 'trends', '2024'],
      createdAt: '2024-01-10T09:15:00Z',
      views: 456,
      likes: 34
    }
  ]

  useEffect(() => {
    fetchBlogs()
  }, [filters])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = {
        category: filters.category !== 'All' ? filters.category : undefined,
        published: filters.published !== 'all' ? filters.published : 'all',
        search: filters.search || undefined
      }
      
      const response = await blogAPI.getAll(params)
      const blogsData = response.data?.blogs || response.blogs || response
      setBlogs(Array.isArray(blogsData) ? blogsData : [])
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      // Fallback to mock data
      setBlogs(mockBlogs)
      toast({
        title: 'Warning',
        description: 'Using demo data - API not connected',
        status: 'warning',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingBlog) {
        await blogAPI.update(editingBlog._id, formData)
        toast({
          title: 'Success',
          description: 'Blog updated successfully',
          status: 'success',
          duration: 3000
        })
      } else {
        await blogAPI.create(formData)
        toast({
          title: 'Success',
          description: 'Blog created successfully',
          status: 'success',
          duration: 3000
        })
      }
      onClose()
      resetForm()
      fetchBlogs()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content || '',
      featuredImage: blog.featuredImage,
      category: blog.category,
      tags: blog.tags || [],
      published: blog.published,
      featured: blog.featured || false
    })
    onOpen()
  }

  const handleDelete = async (id) => {
    try {
      await blogAPI.delete(id)
      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
        status: 'success',
        duration: 3000
      })
      fetchBlogs()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog',
        status: 'error',
        duration: 3000
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      category: 'Bridal Tips',
      tags: [],
      published: false,
      featured: false
    })
    setNewTag('')
    setEditingBlog(null)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">Blog Management</Heading>
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => navigate('/admin/blogs/new')}>
            Create New Blog
          </Button>
        </Flex>

        {/* Filters */}
        <Box mb={6} p={4} bg="white" borderRadius="lg" shadow="sm">
          <HStack spacing={4} flexWrap="wrap">
            <Select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              maxW="200px"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            
            <Select
              value={filters.published}
              onChange={(e) => setFilters({ ...filters, published: e.target.value })}
              maxW="200px"
            >
              <option value="all">All Posts</option>
              <option value="true">Published</option>
              <option value="false">Drafts</option>
            </Select>
            
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search blogs..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </InputGroup>
          </HStack>
        </Box>

        {/* Table */}
        <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
          {loading ? (
            <Flex justify="center" p={8}>
              <Spinner size="lg" />
            </Flex>
          ) : (
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Post</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                  <Th>Stats</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {blogs.map((blog) => (
                  <Tr key={blog._id}>
                    <Td>
                      <HStack spacing={3}>
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          boxSize="60px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="medium" noOfLines={1}>{blog.title}</Text>
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {blog.excerpt}
                          </Text>
                          <HStack>
                            {blog.featured && <Badge colorScheme="yellow">Featured</Badge>}
                            {blog.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" fontSize="xs">{tag}</Badge>
                            ))}
                          </HStack>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="blue">{blog.category}</Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme={blog.published ? 'green' : 'yellow'}>
                        {blog.published ? 'Published' : 'Draft'}
                      </Badge>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm">{blog.views} views</Text>
                        <Text fontSize="sm">{blog.likes} likes</Text>
                      </VStack>
                    </Td>
                    <Td>{new Date(blog.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <Menu>
                        <MenuButton as={IconButton} icon={<FaEllipsisV />} size="sm" />
                        <MenuList>
                          <MenuItem icon={<FaEye />} onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}>
                            View
                          </MenuItem>
                          <MenuItem icon={<FaEdit />} onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}>
                            Edit
                          </MenuItem>
                          <MenuItem icon={<FaTrash />} onClick={() => handleDelete(blog._id)}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>

        {/* Create/Edit Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{editingBlog ? 'Edit' : 'Create'} Blog Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setFormData({ 
                          ...formData, 
                          title,
                          slug: generateSlug(title)
                        })
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>URL Slug</FormLabel>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Excerpt</FormLabel>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      maxLength={200}
                    />
                    <Text fontSize="sm" color="gray.500">{formData.excerpt.length}/200</Text>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                    />
                  </FormControl>

                  <HStack w="100%">
                    <FormControl isRequired>
                      <FormLabel>Featured Image URL</FormLabel>
                      <Input
                        value={formData.featuredImage}
                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {categories.slice(1).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </Select>
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel>Tags</FormLabel>
                    <HStack>
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button onClick={addTag} size="sm">Add</Button>
                    </HStack>
                    <Wrap mt={2}>
                      {formData.tags.map((tag, index) => (
                        <WrapItem key={index}>
                          <Tag size="md" colorScheme="blue">
                            <TagLabel>{tag}</TagLabel>
                            <TagCloseButton onClick={() => removeTag(tag)} />
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </FormControl>

                  <HStack w="100%" justify="space-between">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Published</FormLabel>
                      <Switch
                        isChecked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Featured</FormLabel>
                      <Switch
                        isChecked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                    </FormControl>
                  </HStack>

                  <Button type="submit" colorScheme="blue" w="100%">
                    {editingBlog ? 'Update' : 'Create'} Blog Post
                  </Button>
                </VStack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </AdminLayout>
  )
}

export default AdminBlogs