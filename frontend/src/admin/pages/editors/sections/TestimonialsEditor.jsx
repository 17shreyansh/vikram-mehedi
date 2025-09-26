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

const TestimonialsEditor = ({ pageData, setPageData }) => {
  const defaultTestimonialsData = {
    sectionTitle: 'What Our Clients Say',
    description: 'Read what our satisfied clients have to say about their experience',
    showRatings: true,
    showClientPhotos: true,
    autoplay: true,
    autoplaySpeed: 5000,
    showDots: true,
    showArrows: true,
    slidesToShow: 3,
    layout: 'carousel'
  }

  const testimonialsData = pageData?.sections?.find(s => s.type === 'testimonials')?.data || defaultTestimonialsData

  const updateField = (field, value) => {
    if (!setPageData) return
    
    setPageData(prevData => {
      const currentSections = prevData?.sections || []
      const testimonialsSectionIndex = currentSections.findIndex(s => s.type === 'testimonials')
      
      let updatedSections
      if (testimonialsSectionIndex >= 0) {
        updatedSections = currentSections.map((section, index) => 
          index === testimonialsSectionIndex 
            ? { ...section, data: { ...section.data, [field]: value } }
            : section
        )
      } else {
        updatedSections = [
          ...currentSections,
          {
            type: 'testimonials',
            title: 'Testimonials Section',
            order: 4,
            visible: true,
            data: { ...defaultTestimonialsData, [field]: value }
          }
        ]
      }
      
      return { ...prevData, sections: updatedSections }
    })
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="md">Testimonials Section Settings</Heading>
      
      <HStack spacing={8} align="start">
        <Box flex={1}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Section Title</FormLabel>
              <Input
                value={testimonialsData.sectionTitle}
                onChange={(e) => updateField('sectionTitle', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={testimonialsData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={2}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Layout Style</FormLabel>
                <Select
                  value={testimonialsData.layout}
                  onChange={(e) => updateField('layout', e.target.value)}
                >
                  <option value="carousel">Carousel</option>
                  <option value="grid">Grid</option>
                  <option value="masonry">Masonry</option>
                </Select>
              </FormControl>
              
              {testimonialsData.layout === 'carousel' && (
                <FormControl>
                  <FormLabel>Slides to Show</FormLabel>
                  <NumberInput min={1} max={4}>
                    <NumberInputField
                      value={testimonialsData.slidesToShow}
                      onChange={(e) => updateField('slidesToShow', parseInt(e.target.value))}
                    />
                  </NumberInput>
                </FormControl>
              )}
            </HStack>

            <VStack spacing={4} align="stretch">
              <Heading size="sm">Display Options</Heading>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Star Ratings</FormLabel>
                <Switch
                  isChecked={testimonialsData.showRatings}
                  onChange={(e) => updateField('showRatings', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Client Photos</FormLabel>
                <Switch
                  isChecked={testimonialsData.showClientPhotos}
                  onChange={(e) => updateField('showClientPhotos', e.target.checked)}
                />
              </FormControl>
            </VStack>

            {testimonialsData.layout === 'carousel' && (
              <VStack spacing={4} align="stretch">
                <Heading size="sm">Carousel Settings</Heading>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Autoplay</FormLabel>
                  <Switch
                    isChecked={testimonialsData.autoplay}
                    onChange={(e) => updateField('autoplay', e.target.checked)}
                  />
                </FormControl>
                
                {testimonialsData.autoplay && (
                  <FormControl>
                    <FormLabel>Autoplay Speed (ms)</FormLabel>
                    <NumberInput min={1000} max={10000} step={500}>
                      <NumberInputField
                        value={testimonialsData.autoplaySpeed}
                        onChange={(e) => updateField('autoplaySpeed', parseInt(e.target.value))}
                      />
                    </NumberInput>
                  </FormControl>
                )}
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Show Navigation Dots</FormLabel>
                  <Switch
                    isChecked={testimonialsData.showDots}
                    onChange={(e) => updateField('showDots', e.target.checked)}
                  />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Show Navigation Arrows</FormLabel>
                  <Switch
                    isChecked={testimonialsData.showArrows}
                    onChange={(e) => updateField('showArrows', e.target.checked)}
                  />
                </FormControl>
              </VStack>
            )}
          </VStack>
        </Box>

        <Box flex={1}>
          <Card>
            <CardBody>
              <Heading size="sm" mb={4}>Preview</Heading>
              <Box p={4} bg="gray.50" borderRadius="lg">
                <VStack spacing={4} align="center">
                  <Heading size="lg" color="primary.500">
                    {testimonialsData.sectionTitle}
                  </Heading>
                  <Text textAlign="center" color="gray.600" fontSize="sm">
                    {testimonialsData.description}
                  </Text>
                  
                  <HStack spacing={3} w="100%">
                    {[1, 2, 3].slice(0, testimonialsData.slidesToShow).map(i => (
                      <Box
                        key={i}
                        flex={1}
                        p={3}
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <VStack spacing={2} align="start">
                          {testimonialsData.showRatings && (
                            <HStack>
                              {[1,2,3,4,5].map(star => (
                                <Text key={star} color="yellow.400" fontSize="xs">★</Text>
                              ))}
                            </HStack>
                          )}
                          <Text fontSize="xs" color="gray.600">
                            "Amazing work! The designs were beautiful and lasted long."
                          </Text>
                          <HStack spacing={2}>
                            {testimonialsData.showClientPhotos && (
                              <Box
                                w="20px"
                                h="20px"
                                bg="gray.300"
                                borderRadius="full"
                              />
                            )}
                            <VStack spacing={0} align="start">
                              <Text fontSize="xs" fontWeight="medium">Priya S.</Text>
                              <Text fontSize="xs" color="gray.500">Bride</Text>
                            </VStack>
                          </HStack>
                        </VStack>
                      </Box>
                    ))}
                  </HStack>
                  
                  {testimonialsData.layout === 'carousel' && testimonialsData.showDots && (
                    <HStack spacing={1}>
                      {[1,2,3].map(dot => (
                        <Box
                          key={dot}
                          w="6px"
                          h="6px"
                          bg={dot === 1 ? "primary.500" : "gray.300"}
                          borderRadius="full"
                        />
                      ))}
                    </HStack>
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

export default TestimonialsEditor