import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Flex,
  Text,
  Spinner,
  HStack,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { FaEllipsisV, FaSearch, FaEye, FaCheck, FaReply, FaTimes } from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { contactAPI } from '../../services/api'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'New', label: 'New' },
    { value: 'Read', label: 'Read' },
    { value: 'Replied', label: 'Replied' },
    { value: 'Closed', label: 'Closed' }
  ]

  useEffect(() => {
    fetchContacts()
  }, [filters])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const params = { ...filters }
      if (filters.status === 'all') delete params.status
      
      const response = await contactAPI.getAll(params)
      setContacts(response.data.messages)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contacts',
        status: 'error',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status)
      toast({
        title: 'Success',
        description: `Contact status updated to ${status}`,
        status: 'success',
        duration: 3000
      })
      fetchContacts()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        status: 'error',
        duration: 3000
      })
    }
  }

  const viewContact = (contact) => {
    setSelectedContact(contact)
    onOpen()
    if (contact.status === 'New') {
      updateStatus(contact._id, 'Read')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'red'
      case 'Read': return 'blue'
      case 'Replied': return 'green'
      case 'Closed': return 'gray'
      default: return 'gray'
    }
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">Contact Messages</Heading>
        </Flex>

        {/* Filters */}
        <Box mb={6} p={4} bg="white" borderRadius="lg" shadow="sm">
          <HStack spacing={4} flexWrap="wrap">
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              maxW="200px"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
            
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search contacts..."
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
                  <Th>Contact Info</Th>
                  <Th>Service</Th>
                  <Th>Event Date</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {contacts.map((contact) => (
                  <Tr key={contact._id}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="medium">{contact.name}</Text>
                        <Text fontSize="sm" color="gray.600">{contact.email}</Text>
                        <Text fontSize="sm" color="gray.600">{contact.phone}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Text fontWeight="medium">{contact.service}</Text>
                    </Td>
                    <Td>
                      {contact.eventDate ? new Date(contact.eventDate).toLocaleDateString() : 'Not specified'}
                    </Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </Td>
                    <Td>{new Date(contact.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <Menu>
                        <MenuButton as={IconButton} icon={<FaEllipsisV />} size="sm" />
                        <MenuList>
                          <MenuItem icon={<FaEye />} onClick={() => viewContact(contact)}>
                            View Details
                          </MenuItem>
                          <MenuItem icon={<FaCheck />} onClick={() => updateStatus(contact._id, 'Read')}>
                            Mark as Read
                          </MenuItem>
                          <MenuItem icon={<FaReply />} onClick={() => updateStatus(contact._id, 'Replied')}>
                            Mark as Replied
                          </MenuItem>
                          <MenuItem icon={<FaTimes />} onClick={() => updateStatus(contact._id, 'Closed')}>
                            Close
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

        {contacts.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No contact messages found</Text>
          </Box>
        )}

        {/* View Contact Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Contact Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedContact && (
                <VStack spacing={4} align="start">
                  <Box>
                    <Text fontWeight="bold" color="gray.700">Name:</Text>
                    <Text>{selectedContact.name}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">Email:</Text>
                    <Text>{selectedContact.email}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">Phone:</Text>
                    <Text>{selectedContact.phone}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">Service:</Text>
                    <Text>{selectedContact.service}</Text>
                  </Box>
                  {selectedContact.eventDate && (
                    <Box>
                      <Text fontWeight="bold" color="gray.700">Event Date:</Text>
                      <Text>{new Date(selectedContact.eventDate).toLocaleDateString()}</Text>
                    </Box>
                  )}
                  <Box>
                    <Text fontWeight="bold" color="gray.700">Message:</Text>
                    <Text>{selectedContact.message}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">Status:</Text>
                    <Badge colorScheme={getStatusColor(selectedContact.status)}>
                      {selectedContact.status}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">Received:</Text>
                    <Text>{new Date(selectedContact.createdAt).toLocaleString()}</Text>
                  </Box>
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </AdminLayout>
  )
}

export default AdminContacts