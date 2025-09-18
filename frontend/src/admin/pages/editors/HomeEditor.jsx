import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Spinner,
  Center,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { FaSave, FaEye, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { pagesAPI } from '../../../services/api'
import HeroEditor from './sections/HeroEditor'
import GalleryEditor from './sections/GalleryEditor'
import ServicesEditor from './sections/ServicesEditor'
import AboutEditor from './sections/AboutEditor'
import TestimonialsEditor from './sections/TestimonialsEditor'
import ContactEditor from './sections/ContactEditor'

const HomeEditor = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      setLoading(true)
      const data = await pagesAPI.getBySlug('home')
      setPageData(data)
    } catch (err) {
      setError('Failed to load page data')
      console.error('Error fetching page data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await pagesAPI.update('home', pageData)
      toast({
        title: 'Success',
        description: 'Homepage updated successfully',
        status: 'success',
        duration: 3000
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to save changes',
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
            <Heading size="md" color="gray.600">Loading Homepage Editor...</Heading>
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
            <Heading size="lg">Edit Homepage</Heading>
          </HStack>
          <HStack>
            <Button
              leftIcon={<FaEye />}
              onClick={() => window.open('/', '_blank')}
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

        <Tabs>
          <TabList>
            <Tab>Hero Section</Tab>
            <Tab>Gallery</Tab>
            <Tab>Services</Tab>
            <Tab>About</Tab>
            <Tab>Testimonials</Tab>
            <Tab>Contact</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <HeroEditor pageData={pageData} setPageData={setPageData} />
            </TabPanel>
            <TabPanel>
              <GalleryEditor pageData={pageData} setPageData={setPageData} />
            </TabPanel>
            <TabPanel>
              <ServicesEditor pageData={pageData} setPageData={setPageData} />
            </TabPanel>
            <TabPanel>
              <AboutEditor pageData={pageData} setPageData={setPageData} />
            </TabPanel>
            <TabPanel>
              <TestimonialsEditor pageData={pageData} setPageData={setPageData} />
            </TabPanel>
            <TabPanel>
              <ContactEditor pageData={pageData} setPageData={setPageData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </AdminLayout>
  )
}

export default HomeEditor