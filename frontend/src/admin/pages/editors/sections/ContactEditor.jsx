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

const ContactEditor = () => {
  const [contactData, setContactData] = useState({
    sectionTitle: 'Contact Us',
    description: 'Ready to book your session? Get in touch with us today',
    showContactForm: true,
    showContactInfo: true,
    showMap: false,
    showBusinessHours: true,
    showSocialLinks: true,
    formFields: {
      name: true,
      email: true,
      phone: true,
      service: true,
      eventDate: true,
      message: true
    },
    contactInfo: {
      phone: '+91 98765 43210',
      email: 'vikram@mehndiart.com',
      address: 'Mumbai, Maharashtra',
      businessHours: 'Mon-Sun: 9:00 AM - 8:00 PM'
    },
    layout: 'side-by-side' // side-by-side, stacked, form-only
  })

  const updateField = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }))
  }

  const updateFormField = (field, value) => {
    setContactData(prev => ({
      ...prev,
      formFields: { ...prev.formFields, [field]: value }
    }))
  }

  const updateContactInfo = (field, value) => {
    setContactData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }))
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="md">Contact Section Settings</Heading>
      
      <HStack spacing={8} align="start">
        <Box flex={1}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Section Title</FormLabel>
              <Input
                value={contactData.sectionTitle}
                onChange={(e) => updateField('sectionTitle', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={contactData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={2}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Layout Style</FormLabel>
              <Select
                value={contactData.layout}
                onChange={(e) => updateField('layout', e.target.value)}
              >
                <option value="side-by-side">Side by Side</option>
                <option value="stacked">Stacked</option>
                <option value="form-only">Form Only</option>
              </Select>
            </FormControl>

            <VStack spacing={4} align="stretch">
              <Heading size="sm">Section Components</Heading>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Contact Form</FormLabel>
                <Switch
                  isChecked={contactData.showContactForm}
                  onChange={(e) => updateField('showContactForm', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Contact Info</FormLabel>
                <Switch
                  isChecked={contactData.showContactInfo}
                  onChange={(e) => updateField('showContactInfo', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Map</FormLabel>
                <Switch
                  isChecked={contactData.showMap}
                  onChange={(e) => updateField('showMap', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Business Hours</FormLabel>
                <Switch
                  isChecked={contactData.showBusinessHours}
                  onChange={(e) => updateField('showBusinessHours', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Social Links</FormLabel>
                <Switch
                  isChecked={contactData.showSocialLinks}
                  onChange={(e) => updateField('showSocialLinks', e.target.checked)}
                />
              </FormControl>
            </VStack>

            {contactData.showContactForm && (
              <VStack spacing={4} align="stretch">
                <Heading size="sm">Form Fields</Heading>
                
                <HStack spacing={4}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontSize="sm">Name</FormLabel>
                    <Switch
                      size="sm"
                      isChecked={contactData.formFields.name}
                      onChange={(e) => updateFormField('name', e.target.checked)}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontSize="sm">Email</FormLabel>
                    <Switch
                      size="sm"
                      isChecked={contactData.formFields.email}
                      onChange={(e) => updateFormField('email', e.target.checked)}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontSize="sm">Phone</FormLabel>
                    <Switch
                      size="sm"
                      isChecked={contactData.formFields.phone}
                      onChange={(e) => updateFormField('phone', e.target.checked)}
                    />
                  </FormControl>
                </HStack>
                
                <HStack spacing={4}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontSize="sm">Service</FormLabel>
                    <Switch
                      size="sm"
                      isChecked={contactData.formFields.service}
                      onChange={(e) => updateFormField('service', e.target.checked)}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontSize="sm">Event Date</FormLabel>
                    <Switch
                      size="sm"
                      isChecked={contactData.formFields.eventDate}
                      onChange={(e) => updateFormField('eventDate', e.target.checked)}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontSize="sm">Message</FormLabel>
                    <Switch
                      size="sm"
                      isChecked={contactData.formFields.message}
                      onChange={(e) => updateFormField('message', e.target.checked)}
                    />
                  </FormControl>
                </HStack>
              </VStack>
            )}

            {contactData.showContactInfo && (
              <VStack spacing={4} align="stretch">
                <Heading size="sm">Contact Information</Heading>
                
                <FormControl>
                  <FormLabel fontSize="sm">Phone</FormLabel>
                  <Input
                    size="sm"
                    value={contactData.contactInfo.phone}
                    onChange={(e) => updateContactInfo('phone', e.target.value)}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="sm">Email</FormLabel>
                  <Input
                    size="sm"
                    value={contactData.contactInfo.email}
                    onChange={(e) => updateContactInfo('email', e.target.value)}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="sm">Address</FormLabel>
                  <Input
                    size="sm"
                    value={contactData.contactInfo.address}
                    onChange={(e) => updateContactInfo('address', e.target.value)}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="sm">Business Hours</FormLabel>
                  <Input
                    size="sm"
                    value={contactData.contactInfo.businessHours}
                    onChange={(e) => updateContactInfo('businessHours', e.target.value)}
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
                    {contactData.sectionTitle}
                  </Heading>
                  <Text textAlign="center" color="gray.600" fontSize="sm">
                    {contactData.description}
                  </Text>
                  
                  <HStack spacing={4} w="100%" align="start">
                    {contactData.showContactForm && (
                      <Box flex={1} p={3} bg="white" borderRadius="lg">
                        <Heading size="xs" mb={2}>Contact Form</Heading>
                        <VStack spacing={2}>
                          {contactData.formFields.name && (
                            <Box w="100%" h="6" bg="gray.100" borderRadius="sm" />
                          )}
                          {contactData.formFields.email && (
                            <Box w="100%" h="6" bg="gray.100" borderRadius="sm" />
                          )}
                          {contactData.formFields.phone && (
                            <Box w="100%" h="6" bg="gray.100" borderRadius="sm" />
                          )}
                          {contactData.formFields.message && (
                            <Box w="100%" h="12" bg="gray.100" borderRadius="sm" />
                          )}
                          <Box w="100%" h="6" bg="primary.500" borderRadius="sm" />
                        </VStack>
                      </Box>
                    )}
                    
                    {contactData.showContactInfo && (
                      <Box flex={1} p={3} bg="white" borderRadius="lg">
                        <Heading size="xs" mb={2}>Contact Info</Heading>
                        <VStack spacing={1} align="start" fontSize="xs">
                          <Text>{contactData.contactInfo.phone}</Text>
                          <Text>{contactData.contactInfo.email}</Text>
                          <Text>{contactData.contactInfo.address}</Text>
                          {contactData.showBusinessHours && (
                            <Text color="gray.500">{contactData.contactInfo.businessHours}</Text>
                          )}
                        </VStack>
                      </Box>
                    )}
                  </HStack>
                  
                  {contactData.showMap && (
                    <Box w="100%" h="20" bg="gray.200" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                      <Text fontSize="xs" color="gray.500">Map Component</Text>
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

export default ContactEditor