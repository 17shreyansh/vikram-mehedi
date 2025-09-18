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
  Select
} from '@chakra-ui/react'

const ServicesEditor = () => {
  const [servicesData, setServicesData] = useState({
    sectionTitle: 'Services',
    description: 'Choose from our range of professional mehndi services, each designed to make your occasion truly special',
    layout: 'expandable', // expandable, grid, list
    showPricing: true,
    showFeatures: true,
    showDuration: true,
    showBookingButton: true,
    defaultExpanded: false,
    animationStyle: 'smooth'
  })

  const updateField = (field, value) => {
    setServicesData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="md">Services Section Settings</Heading>
      
      <HStack spacing={8} align="start">
        <Box flex={1}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Section Title</FormLabel>
              <Input
                value={servicesData.sectionTitle}
                onChange={(e) => updateField('sectionTitle', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={servicesData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Layout Style</FormLabel>
                <Select
                  value={servicesData.layout}
                  onChange={(e) => updateField('layout', e.target.value)}
                >
                  <option value="expandable">Expandable Cards</option>
                  <option value="grid">Grid Layout</option>
                  <option value="list">List View</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Animation Style</FormLabel>
                <Select
                  value={servicesData.animationStyle}
                  onChange={(e) => updateField('animationStyle', e.target.value)}
                >
                  <option value="smooth">Smooth</option>
                  <option value="bounce">Bounce</option>
                  <option value="fade">Fade</option>
                </Select>
              </FormControl>
            </HStack>

            <VStack spacing={4} align="stretch">
              <Heading size="sm">Display Options</Heading>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Pricing</FormLabel>
                <Switch
                  isChecked={servicesData.showPricing}
                  onChange={(e) => updateField('showPricing', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Features List</FormLabel>
                <Switch
                  isChecked={servicesData.showFeatures}
                  onChange={(e) => updateField('showFeatures', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Duration</FormLabel>
                <Switch
                  isChecked={servicesData.showDuration}
                  onChange={(e) => updateField('showDuration', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Booking Button</FormLabel>
                <Switch
                  isChecked={servicesData.showBookingButton}
                  onChange={(e) => updateField('showBookingButton', e.target.checked)}
                />
              </FormControl>
              
              {servicesData.layout === 'expandable' && (
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Default Expanded</FormLabel>
                  <Switch
                    isChecked={servicesData.defaultExpanded}
                    onChange={(e) => updateField('defaultExpanded', e.target.checked)}
                  />
                </FormControl>
              )}
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
                    {servicesData.sectionTitle}
                  </Heading>
                  <Text textAlign="center" color="gray.600" fontSize="sm">
                    {servicesData.description}
                  </Text>
                  
                  <VStack spacing={3} w="100%">
                    {['Bridal Mehndi', 'Arabic Mehndi', 'Party Mehndi'].map((service, index) => (
                      <Box
                        key={index}
                        w="100%"
                        p={3}
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <HStack justify="space-between" align="center">
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="medium" fontSize="sm">{service}</Text>
                            {servicesData.showDuration && (
                              <Text fontSize="xs" color="gray.500">2-3 hours</Text>
                            )}
                          </VStack>
                          <VStack align="end" spacing={1}>
                            {servicesData.showPricing && (
                              <Text fontSize="sm" fontWeight="bold" color="primary.500">
                                ₹5,000 - ₹15,000
                              </Text>
                            )}
                            {servicesData.showBookingButton && (
                              <Box px={2} py={1} bg="primary.500" color="white" borderRadius="md" fontSize="xs">
                                Book Now
                              </Box>
                            )}
                          </VStack>
                        </HStack>
                        
                        {servicesData.showFeatures && servicesData.layout === 'expandable' && (
                          <Box mt={2} pt={2} borderTop="1px solid" borderColor="gray.100">
                            <Text fontSize="xs" color="gray.600">
                              • Premium henna • Touch-up service • Custom designs
                            </Text>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </HStack>
    </VStack>
  )
}

export default ServicesEditor