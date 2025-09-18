import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  VStack,
  HStack,
  Card,
  CardBody,
  Heading,
  Text,
  Select,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react'

const GalleryEditor = () => {
  const [galleryData, setGalleryData] = useState({
    sectionTitle: 'Gallery',
    description: 'Discover our stunning collection of mehndi artistry',
    showCategories: true,
    defaultCategory: 'All',
    itemsPerPage: 12,
    showLoadMore: true,
    enableLightbox: true,
    showImageTitles: true,
    gridColumns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      large: 4
    }
  })

  const updateField = (field, value) => {
    setGalleryData(prev => ({ ...prev, [field]: value }))
  }

  const updateGridColumns = (device, value) => {
    setGalleryData(prev => ({
      ...prev,
      gridColumns: { ...prev.gridColumns, [device]: parseInt(value) }
    }))
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="md">Gallery Section Settings</Heading>
      
      <HStack spacing={8} align="start">
        <Box flex={1}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Section Title</FormLabel>
              <Input
                value={galleryData.sectionTitle}
                onChange={(e) => updateField('sectionTitle', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={galleryData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Default Category</FormLabel>
                <Select
                  value={galleryData.defaultCategory}
                  onChange={(e) => updateField('defaultCategory', e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Party">Party</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Items Per Page</FormLabel>
                <NumberInput>
                  <NumberInputField
                    value={galleryData.itemsPerPage}
                    onChange={(e) => updateField('itemsPerPage', parseInt(e.target.value))}
                  />
                </NumberInput>
              </FormControl>
            </HStack>

            <Heading size="sm">Grid Layout</Heading>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Mobile (1 col)</FormLabel>
                <NumberInput min={1} max={2}>
                  <NumberInputField
                    value={galleryData.gridColumns.mobile}
                    onChange={(e) => updateGridColumns('mobile', e.target.value)}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Tablet (2 col)</FormLabel>
                <NumberInput min={1} max={3}>
                  <NumberInputField
                    value={galleryData.gridColumns.tablet}
                    onChange={(e) => updateGridColumns('tablet', e.target.value)}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Desktop (3 col)</FormLabel>
                <NumberInput min={2} max={4}>
                  <NumberInputField
                    value={galleryData.gridColumns.desktop}
                    onChange={(e) => updateGridColumns('desktop', e.target.value)}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Large (4 col)</FormLabel>
                <NumberInput min={3} max={6}>
                  <NumberInputField
                    value={galleryData.gridColumns.large}
                    onChange={(e) => updateGridColumns('large', e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </HStack>

            <VStack spacing={4} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Category Filter</FormLabel>
                <Switch
                  isChecked={galleryData.showCategories}
                  onChange={(e) => updateField('showCategories', e.target.checked)}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Load More Button</FormLabel>
                <Switch
                  isChecked={galleryData.showLoadMore}
                  onChange={(e) => updateField('showLoadMore', e.target.checked)}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Enable Lightbox</FormLabel>
                <Switch
                  isChecked={galleryData.enableLightbox}
                  onChange={(e) => updateField('enableLightbox', e.target.checked)}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Image Titles</FormLabel>
                <Switch
                  isChecked={galleryData.showImageTitles}
                  onChange={(e) => updateField('showImageTitles', e.target.checked)}
                />
              </FormControl>
            </VStack>
          </VStack>
        </Box>

        <Box flex={1}>
          <Card>
            <CardBody>
              <Heading size="sm" mb={4}>Preview</Heading>
              <Box p={4} bg="gray.50" borderRadius="lg">
                <VStack spacing={4} align="center">
                  <Heading size="lg" color="primary.500">
                    {galleryData.sectionTitle}
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    {galleryData.description}
                  </Text>
                  
                  {galleryData.showCategories && (
                    <HStack spacing={2} flexWrap="wrap">
                      {['All', 'Bridal', 'Arabic', 'Traditional', 'Party'].map(cat => (
                        <Box
                          key={cat}
                          px={3}
                          py={1}
                          bg={cat === galleryData.defaultCategory ? 'primary.500' : 'white'}
                          color={cat === galleryData.defaultCategory ? 'white' : 'gray.600'}
                          borderRadius="full"
                          fontSize="sm"
                          border="1px solid"
                          borderColor="gray.200"
                        >
                          {cat}
                        </Box>
                      ))}
                    </HStack>
                  )}
                  
                  <Box
                    display="grid"
                    gridTemplateColumns={`repeat(${galleryData.gridColumns.desktop}, 1fr)`}
                    gap={2}
                    w="100%"
                  >
                    {[1,2,3,4,5,6].map(i => (
                      <Box
                        key={i}
                        bg="gray.200"
                        aspectRatio="1"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="xs"
                        color="gray.500"
                      >
                        Image {i}
                      </Box>
                    ))}
                  </Box>
                  
                  {galleryData.showLoadMore && (
                    <Box px={4} py={2} bg="primary.500" color="white" borderRadius="md" fontSize="sm">
                      Load More
                    </Box>
                  )}
                </VStack>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </HStack>
    </VStack>
  )
}

export default GalleryEditor