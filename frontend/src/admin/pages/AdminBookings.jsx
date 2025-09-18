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
  Button
} from '@chakra-ui/react'
import { FaEllipsisV, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import AdminLayout from '../components/AdminLayout'
import { bookingsAPI } from '../../services/api'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  })
  const toast = useToast()

  // Mock data for now
  const mockBookings = [
    {
      _id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      service: 'Bridal Mehndi',
      eventDate: '2024-02-15',
      status: 'confirmed',
      createdAt: '2024-01-10T10:00:00Z',
      message: 'Need intricate bridal design for wedding'
    },
    {
      _id: '2',
      name: 'Anita Patel',
      email: 'anita@example.com',
      phone: '+91 87654 32109',
      service: 'Arabic Mehndi',
      eventDate: '2024-02-20',
      status: 'pending',
      createdAt: '2024-01-12T14:30:00Z',
      message: 'Party event, need quick design'
    },
    {
      _id: '3',
      name: 'Riya Singh',
      email: 'riya@example.com',
      phone: '+91 76543 21098',
      service: 'Traditional Mehndi',
      eventDate: '2024-01-25',
      status: 'completed',
      createdAt: '2024-01-05T09:15:00Z',
      message: 'Festival celebration'
    }
  ]

  useEffect(() => {
    fetchBookings()
  }, [filters])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      // For now, use mock data
      setTimeout(() => {
        let filtered = mockBookings
        if (filters.status !== 'all') {
          filtered = filtered.filter(booking => booking.status === filters.status)
        }
        if (filters.search) {
          filtered = filtered.filter(booking => 
            booking.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            booking.service.toLowerCase().includes(filters.search.toLowerCase())
          )
        }
        setBookings(filtered)
        setLoading(false)
      }, 500)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch bookings',
        status: 'error',
        duration: 3000
      })
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      // Mock update
      setBookings(prev => prev.map(booking => 
        booking._id === id ? { ...booking, status } : booking
      ))
      toast({
        title: 'Success',
        description: `Booking status updated to ${status}`,
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update booking status',
        status: 'error',
        duration: 3000
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'green'
      case 'pending': return 'yellow'
      case 'completed': return 'blue'
      case 'cancelled': return 'red'
      default: return 'gray'
    }
  }

  return (
    <AdminLayout>
      <Container maxW="7xl" py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">Bookings Management</Heading>
        </Flex>

        {/* Filters */}
        <Box mb={6} p={4} bg="white" borderRadius="lg" shadow="sm">
          <HStack spacing={4} flexWrap="wrap">
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              maxW="200px"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
            
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search bookings..."
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
                  <Th>Customer</Th>
                  <Th>Service</Th>
                  <Th>Event Date</Th>
                  <Th>Status</Th>
                  <Th>Booking Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookings.map((booking) => (
                  <Tr key={booking._id}>
                    <Td>
                      <Box>
                        <Text fontWeight="medium">{booking.name}</Text>
                        <Text fontSize="sm" color="gray.600">{booking.email}</Text>
                        <Text fontSize="sm" color="gray.600">{booking.phone}</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Text fontWeight="medium">{booking.service}</Text>
                      {booking.message && (
                        <Text fontSize="sm" color="gray.600" noOfLines={2}>
                          {booking.message}
                        </Text>
                      )}
                    </Td>
                    <Td>{new Date(booking.eventDate).toLocaleDateString()}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(booking.status)}>
                        {booking.status.toUpperCase()}
                      </Badge>
                    </Td>
                    <Td>{new Date(booking.createdAt).toLocaleDateString()}</Td>
                    <Td>
                      <Menu>
                        <MenuButton as={IconButton} icon={<FaEllipsisV />} size="sm" />
                        <MenuList>
                          <MenuItem icon={<FaEye />}>
                            View Details
                          </MenuItem>
                          <MenuItem icon={<FaEdit />} onClick={() => updateStatus(booking._id, 'confirmed')}>
                            Confirm
                          </MenuItem>
                          <MenuItem icon={<FaEdit />} onClick={() => updateStatus(booking._id, 'completed')}>
                            Mark Complete
                          </MenuItem>
                          <MenuItem icon={<FaTrash />} onClick={() => updateStatus(booking._id, 'cancelled')}>
                            Cancel
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

        {bookings.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No bookings found</Text>
          </Box>
        )}
      </Container>
    </AdminLayout>
  )
}

export default AdminBookings