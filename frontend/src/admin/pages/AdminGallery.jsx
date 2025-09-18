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
  Image,
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
  Select,
  Textarea,
  Switch,
  VStack,
  HStack,
  useToast,
  Flex,
  Text,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEllipsisV, FaEye } from 'react-icons/fa'
import { galleryAPI } from '../../services/api'
import AdminLayout from '../components/AdminLayout'

const AdminGallery = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState([])
  const [filters, setFilters] = useState({
    category: 'All',
    status: 'all',
    search: ''
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const [editingItem, setEditingItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Bridal',
    description: '',
    alt: '',
    tags: '',
    featured: false,
    status: 'active',
    sortOrder: 0
  })
  const [imageFile, setImageFile] = useState(null)
  const toast = useToast()

  const categories = ['All', 'Bridal', 'Arabic', 'Traditional', 'Party', 'Corporate']
  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]

  useEffect(() => {
    fetchItems()
  }, [filters, pagination.page])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      }
      if (filters.category === 'All') delete params.category
      if (filters.status === 'all') delete params.status
      
      const response = await galleryAPI.getAll(params)
      setItems(response.items)
      setPagination(prev => ({
        ...prev,
        ...response.pagination
      }))
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch gallery items',
        status: 'error',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const submitData = new FormData()
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key])
      })
      if (imageFile) {
        submitData.append('image', imageFile)
      }

      if (editingItem) {
        await galleryAPI.update(editingItem._id, formData)
        toast({
          title: 'Success',
          description: 'Gallery item updated successfully',
          status: 'success',
          duration: 3000
        })
      } else {
        if (!imageFile) {
          toast({
            title: 'Error',
            description: 'Please select an image',
            status: 'error',
            duration: 3000
          })
          return
        }
        await galleryAPI.upload(submitData)
        toast({
          title: 'Success',
          description: 'Gallery item created successfully',
          status: 'success',
          duration: 3000
        })
      }
      
      onClose()
      resetForm()
      fetchItems()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save gallery item',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      alt: item.alt || '',
      tags: item.tags?.join(', ') || '',
      featured: item.featured,
      status: item.status,
      sortOrder: item.sortOrder || 0
    })
    onOpen()
  }

  const handleDelete = async () => {
    try {
      await galleryAPI.delete(deleteId)
      toast({
        title: 'Success',
        description: 'Gallery item deleted successfully',
        status: 'success',
        duration: 3000
      })
      onDeleteClose()
      fetchItems()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete gallery item',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleBulkAction = async (action) => {
    if (selectedItems.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select items first',
        status: 'error',
        duration: 3000
      })
      return
    }

    try {
      await galleryAPI.bulk({ action, ids: selectedItems })
      toast({
        title: 'Success',
        description: `Bulk ${action} completed successfully`,
        status: 'success',
        duration: 3000
      })
      setSelectedItems([])
      fetchItems()
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${action} items`,
        status: 'error',
        duration: 3000
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Bridal',
      description: '',
      alt: '',
      tags: '',
      featured: false,
      status: 'active',
      sortOrder: 0
    })
    setImageFile(null)
    setEditingItem(null)
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(items.map(item => item._id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    }
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg">Gallery Management</Heading>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => { resetForm(); onOpen() }}>
          Add New Image
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
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            maxW="200px"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </Select>
          
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search images..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </InputGroup>
        </HStack>
      </Box>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Box mb={4} p={3} bg="blue.50" borderRadius="md">
          <HStack>
            <Text>{selectedItems.length} items selected</Text>
            <Button size="sm" onClick={() => handleBulkAction('delete')} colorScheme="red">
              Delete Selected
            </Button>
            <Button size="sm" onClick={() => handleBulkAction('update')} colorScheme="green">
              Activate Selected
            </Button>
          </HStack>
        </Box>
      )}

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
                <Th>
                  <Checkbox
                    isChecked={selectedItems.length === items.length && items.length > 0}
                    isIndeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th>Featured</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item._id}>
                  <Td>
                    <Checkbox
                      isChecked={selectedItems.includes(item._id)}
                      onChange={(e) => handleSelectItem(item._id, e.target.checked)}
                    />
                  </Td>
                  <Td>
                    <Image
                      src={`http://localhost:5000${item.url}`}
                      alt={item.alt || item.title}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>
                    <Text fontWeight="medium">{item.title}</Text>
                    {item.description && (
                      <Text fontSize="sm" color="gray.600" noOfLines={1}>
                        {item.description}
                      </Text>
                    )}
                  </Td>
                  <Td>
                    <Badge colorScheme="blue">{item.category}</Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={item.status === 'active' ? 'green' : 'red'}>
                      {item.status}
                    </Badge>
                  </Td>
                  <Td>
                    {item.featured && <Badge colorScheme="yellow">Featured</Badge>}
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={IconButton} icon={<FaEllipsisV />} size="sm" />
                      <MenuList>
                        <MenuItem icon={<FaEye />} onClick={() => window.open(`http://localhost:5000${item.url}`, '_blank')}>
                          View
                        </MenuItem>
                        <MenuItem icon={<FaEdit />} onClick={() => handleEdit(item)}>
                          Edit
                        </MenuItem>
                        <MenuItem icon={<FaTrash />} onClick={() => { setDeleteId(item._id); onDeleteOpen() }}>
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

      {/* Pagination */}
      {pagination.pages > 1 && (
        <Flex justify="center" mt={6}>
          <HStack>
            <Button
              disabled={pagination.page === 1}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            >
              Previous
            </Button>
            <Text>Page {pagination.page} of {pagination.pages}</Text>
            <Button
              disabled={pagination.page === pagination.pages}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            >
              Next
            </Button>
          </HStack>
        </Flex>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingItem ? 'Edit' : 'Add'} Gallery Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                {!editingItem && (
                  <FormControl isRequired>
                    <FormLabel>Image</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </FormControl>
                )}

                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Alt Text</FormLabel>
                  <Input
                    value={formData.alt}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </FormControl>

                <HStack w="100%" justify="space-between">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Featured</FormLabel>
                    <Switch
                      isChecked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                  </FormControl>

                  <FormControl maxW="150px">
                    <FormLabel>Status</FormLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Select>
                  </FormControl>
                </HStack>

                <Button type="submit" colorScheme="blue" w="100%">
                  {editingItem ? 'Update' : 'Create'} Gallery Item
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation */}
      <AlertDialog isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Gallery Item</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this gallery item? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDeleteClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Container>
    </AdminLayout>
  )
}

export default AdminGallery