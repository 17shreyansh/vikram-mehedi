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
  AlertDialogOverlay,
  NumberInput,
  NumberInputField,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEllipsisV, FaRupeeSign } from 'react-icons/fa'
import { servicesAPI } from '../../services/api'
import AdminLayout from '../components/AdminLayout'

const AdminServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedServices, setSelectedServices] = useState([])
  const [filters, setFilters] = useState({
    category: 'All',
    active: 'all',
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
  const [editingService, setEditingService] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    duration: '',
    features: [],
    category: 'Bridal',
    popular: false,
    active: true,
    image: '',
    icon: '',
    sortOrder: 0
  })
  const [imageFile, setImageFile] = useState(null)
  const [newFeature, setNewFeature] = useState('')
  const toast = useToast()

  const categories = ['All', 'Bridal', 'Arabic', 'Traditional', 'Party', 'Corporate', 'Kids']
  const activeOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'true', label: 'Active Only' },
    { value: 'false', label: 'Inactive Only' }
  ]

  useEffect(() => {
    fetchServices()
  }, [filters, pagination.page])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      }
      if (filters.category === 'All') delete params.category
      if (filters.active === 'all') delete params.active
      
      const response = await servicesAPI.getAll(params)
      setServices(response.services)
      setPagination(prev => ({
        ...prev,
        ...response.pagination
      }))
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
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
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'features') {
          submitData.append(key, JSON.stringify(formData[key]))
        } else {
          submitData.append(key, formData[key])
        }
      })
      
      // Add image file if selected
      if (imageFile) {
        submitData.append('image', imageFile)
      }

      if (editingService) {
        await servicesAPI.update(editingService._id, submitData)
        toast({
          title: 'Success',
          description: 'Service updated successfully',
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
        await servicesAPI.create(submitData)
        toast({
          title: 'Success',
          description: 'Service created successfully',
          status: 'success',
          duration: 3000
        })
      }
      
      onClose()
      resetForm()
      fetchServices()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save service',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      minPrice: service.minPrice.toString(),
      maxPrice: service.maxPrice.toString(),
      duration: service.duration,
      features: service.features || [],
      category: service.category,
      popular: service.popular,
      active: service.active,
      image: service.image || '',
      icon: service.icon || '',
      sortOrder: service.sortOrder || 0
    })
    onOpen()
  }

  const handleDelete = async () => {
    try {
      await servicesAPI.delete(deleteId)
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
        status: 'success',
        duration: 3000
      })
      onDeleteClose()
      fetchServices()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleBulkAction = async (action) => {
    if (selectedServices.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select services first',
        status: 'error',
        duration: 3000
      })
      return
    }

    try {
      await servicesAPI.bulk({ action, ids: selectedServices })
      toast({
        title: 'Success',
        description: `Bulk ${action} completed successfully`,
        status: 'success',
        duration: 3000
      })
      setSelectedServices([])
      fetchServices()
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${action} services`,
        status: 'error',
        duration: 3000
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      minPrice: '',
      maxPrice: '',
      duration: '',
      features: [],
      category: 'Bridal',
      popular: false,
      active: true,
      image: '',
      icon: '',
      sortOrder: 0
    })
    setImageFile(null)
    setNewFeature('')
    setEditingService(null)
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (feature) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f !== feature)
    })
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedServices(services.map(service => service._id))
    } else {
      setSelectedServices([])
    }
  }

  const handleSelectService = (id, checked) => {
    if (checked) {
      setSelectedServices([...selectedServices, id])
    } else {
      setSelectedServices(selectedServices.filter(serviceId => serviceId !== id))
    }
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg">Services Management</Heading>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => { resetForm(); onOpen() }}>
          Add New Service
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
            value={filters.active}
            onChange={(e) => setFilters({ ...filters, active: e.target.value })}
            maxW="200px"
          >
            {activeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search services..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </InputGroup>
        </HStack>
      </Box>

      {/* Bulk Actions */}
      {selectedServices.length > 0 && (
        <Box mb={4} p={3} bg="blue.50" borderRadius="md">
          <HStack>
            <Text>{selectedServices.length} services selected</Text>
            <Button size="sm" onClick={() => handleBulkAction('delete')} colorScheme="red">
              Delete Selected
            </Button>
            <Button size="sm" onClick={() => handleBulkAction('activate')} colorScheme="green">
              Activate Selected
            </Button>
            <Button size="sm" onClick={() => handleBulkAction('deactivate')} colorScheme="orange">
              Deactivate Selected
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
                    isChecked={selectedServices.length === services.length && services.length > 0}
                    isIndeterminate={selectedServices.length > 0 && selectedServices.length < services.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </Th>
                <Th>Service</Th>
                <Th>Category</Th>
                <Th>Price Range</Th>
                <Th>Duration</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {services.map((service) => (
                <Tr key={service._id}>
                  <Td>
                    <Checkbox
                      isChecked={selectedServices.includes(service._id)}
                      onChange={(e) => handleSelectService(service._id, e.target.checked)}
                    />
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium">{service.title}</Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {service.description}
                      </Text>
                      <HStack>
                        {service.popular && <Badge colorScheme="yellow">Popular</Badge>}
                        {service.features?.length > 0 && (
                          <Badge variant="outline">{service.features.length} features</Badge>
                        )}
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge colorScheme="blue">{service.category}</Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <FaRupeeSign size="12" />
                      <Text>{service.minPrice.toLocaleString()} - {service.maxPrice.toLocaleString()}</Text>
                    </HStack>
                  </Td>
                  <Td>{service.duration}</Td>
                  <Td>
                    <Badge colorScheme={service.active ? 'green' : 'red'}>
                      {service.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={IconButton} icon={<FaEllipsisV />} size="sm" />
                      <MenuList>
                        <MenuItem icon={<FaEdit />} onClick={() => handleEdit(service)}>
                          Edit
                        </MenuItem>
                        <MenuItem icon={<FaTrash />} onClick={() => { setDeleteId(service._id); onDeleteOpen() }}>
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
          <ModalHeader>{editingService ? 'Edit' : 'Add'} Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </FormControl>

                <HStack w="100%">
                  <FormControl isRequired>
                    <FormLabel>Min Price (₹)</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        value={formData.minPrice}
                        onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                      />
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Max Price (₹)</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        value={formData.maxPrice}
                        onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                      />
                    </NumberInput>
                  </FormControl>
                </HStack>

                <HStack w="100%">
                  <FormControl isRequired>
                    <FormLabel>Duration</FormLabel>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 2-3 hours"
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
                  <FormLabel>Features</FormLabel>
                  <HStack>
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button onClick={addFeature} size="sm">Add</Button>
                  </HStack>
                  <Wrap mt={2}>
                    {formData.features.map((feature, index) => (
                      <WrapItem key={index}>
                        <Tag size="md" colorScheme="blue">
                          <TagLabel>{feature}</TagLabel>
                          <TagCloseButton onClick={() => removeFeature(feature)} />
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </FormControl>

                <FormControl isRequired={!editingService}>
                  <FormLabel>Service Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  {editingService && (
                    <Text fontSize="sm" color="gray.600" mt={1}>
                      Leave empty to keep current image
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Sort Order</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    />
                  </NumberInput>
                </FormControl>

                <HStack w="100%" justify="space-between">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Popular</FormLabel>
                    <Switch
                      isChecked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Active</FormLabel>
                    <Switch
                      isChecked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    />
                  </FormControl>
                </HStack>

                <Button type="submit" colorScheme="blue" w="100%">
                  {editingService ? 'Update' : 'Create'} Service
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
            <AlertDialogHeader>Delete Service</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this service? This action cannot be undone.
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

export default AdminServices