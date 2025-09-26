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
  Image,
  Button
} from '@chakra-ui/react'
import { FaImage } from 'react-icons/fa'

const HeroEditor = ({ pageData, setPageData }) => {
  const defaultHeroData = {
    tagline: 'Artistry in Every Detail',
    mainHeading: 'Elegant',
    subHeading: 'Mehndi Designs',
    description: 'Transform your celebrations with intricate, breathtaking mehndi artistry.',
    buttonText: 'Book Your Session',
    buttonLink: '#contact',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
    showFloatingShapes: true,
    showScrollIndicator: true
  }

  const heroData = pageData?.sections?.find(s => s.type === 'hero')?.data || defaultHeroData

  const updateField = (field, value) => {
    if (!setPageData) return
    
    setPageData(prevData => {
      const currentSections = prevData?.sections || []
      const heroSectionIndex = currentSections.findIndex(s => s.type === 'hero')
      
      let updatedSections
      if (heroSectionIndex >= 0) {
        // Update existing hero section
        updatedSections = currentSections.map((section, index) => 
          index === heroSectionIndex 
            ? { ...section, data: { ...section.data, [field]: value } }
            : section
        )
      } else {
        // Create new hero section
        updatedSections = [
          ...currentSections,
          {
            type: 'hero',
            title: 'Hero Section',
            order: 0,
            visible: true,
            data: { ...defaultHeroData, [field]: value }
          }
        ]
      }
      
      return {
        ...prevData,
        slug: 'home',
        title: 'Home Page',
        sections: updatedSections
      }
    })
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="md">Hero Section Settings</Heading>
      
      <HStack spacing={8} align="start">
        {/* Form */}
        <Box flex={1}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Tagline</FormLabel>
              <Input
                value={heroData.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                placeholder="Small text above main heading"
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Main Heading</FormLabel>
                <Input
                  value={heroData.mainHeading}
                  onChange={(e) => updateField('mainHeading', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Sub Heading</FormLabel>
                <Input
                  value={heroData.subHeading}
                  onChange={(e) => updateField('subHeading', e.target.value)}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={heroData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Button Text</FormLabel>
                <Input
                  value={heroData.buttonText}
                  onChange={(e) => updateField('buttonText', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Button Link</FormLabel>
                <Input
                  value={heroData.buttonLink}
                  onChange={(e) => updateField('buttonLink', e.target.value)}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Background Image URL</FormLabel>
              <HStack>
                <Input
                  value={heroData.backgroundImage}
                  onChange={(e) => updateField('backgroundImage', e.target.value)}
                />
                <Button leftIcon={<FaImage />} size="sm">
                  Upload
                </Button>
              </HStack>
            </FormControl>

            <HStack spacing={8}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Floating Shapes</FormLabel>
                <Switch
                  isChecked={heroData.showFloatingShapes}
                  onChange={(e) => updateField('showFloatingShapes', e.target.checked)}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Scroll Indicator</FormLabel>
                <Switch
                  isChecked={heroData.showScrollIndicator}
                  onChange={(e) => updateField('showScrollIndicator', e.target.checked)}
                />
              </FormControl>
            </HStack>
          </VStack>
        </Box>

        {/* Preview */}
        <Box flex={1}>
          <Card>
            <CardBody>
              <Heading size="sm" mb={4}>Preview</Heading>
              <Box
                bg="linear-gradient(135deg, #FFFFFF 0%, #FAF9F7 100%)"
                p={6}
                borderRadius="lg"
                position="relative"
                minH="300px"
              >
                <VStack spacing={4} align="start">
                  <Text fontSize="sm" color="accent.600" textTransform="uppercase" letterSpacing="2px">
                    {heroData.tagline}
                  </Text>
                  <VStack align="start" spacing={2}>
                    <Heading fontSize="3xl" color="primary.500">
                      {heroData.mainHeading}
                    </Heading>
                    <Text fontSize="2xl" fontFamily="accent" color="accent.500">
                      {heroData.subHeading}
                    </Text>
                  </VStack>
                  <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {heroData.description}
                  </Text>
                  <Button colorScheme="red" size="sm">
                    {heroData.buttonText}
                  </Button>
                </VStack>
                
                {heroData.backgroundImage && (
                  <Image
                    src={heroData.backgroundImage}
                    alt="Hero background"
                    position="absolute"
                    top={2}
                    right={2}
                    w="80px"
                    h="80px"
                    objectFit="cover"
                    borderRadius="md"
                    opacity={0.7}
                  />
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>
      </HStack>
    </VStack>
  )
}

export default HeroEditor