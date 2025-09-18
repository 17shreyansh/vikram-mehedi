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
  Button,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react'
import { FaImage } from 'react-icons/fa'

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState({
    tagline: 'About Artist',
    heading: 'Vikram Mehndi',
    description: 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.',
    detailedDescription: 'Specializing in bridal mehndi, Arabic patterns, and contemporary fusion designs, combining traditional techniques with modern aesthetics to create unique artwork that tells your story.',
    artistImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
    showStats: true,
    showAchievements: true,
    stats: [
      { number: '1000+', label: 'Happy Clients' },
      { number: '8+', label: 'Years Experience' },
      { number: '2500+', label: 'Designs Created' },
      { number: '4.9', label: 'Average Rating' }
    ]
  })

  const updateField = (field, value) => {
    setAboutData(prev => ({ ...prev, [field]: value }))
  }

  const updateStat = (index, field, value) => {
    const updatedStats = [...aboutData.stats]
    updatedStats[index][field] = value
    setAboutData(prev => ({ ...prev, stats: updatedStats }))
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="md">About Section Settings</Heading>
      
      <HStack spacing={8} align="start">
        <Box flex={1}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Tagline</FormLabel>
              <Input
                value={aboutData.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Main Heading</FormLabel>
              <Input
                value={aboutData.heading}
                onChange={(e) => updateField('heading', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={aboutData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Detailed Description</FormLabel>
              <Textarea
                value={aboutData.detailedDescription}
                onChange={(e) => updateField('detailedDescription', e.target.value)}
                rows={3}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Artist Image URL</FormLabel>
              <HStack>
                <Input
                  value={aboutData.artistImage}
                  onChange={(e) => updateField('artistImage', e.target.value)}
                />
                <Button leftIcon={<FaImage />} size="sm">
                  Upload
                </Button>
              </HStack>
            </FormControl>

            <VStack spacing={4} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Statistics</FormLabel>
                <Switch
                  isChecked={aboutData.showStats}
                  onChange={(e) => updateField('showStats', e.target.checked)}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Achievements</FormLabel>
                <Switch
                  isChecked={aboutData.showAchievements}
                  onChange={(e) => updateField('showAchievements', e.target.checked)}
                />
              </FormControl>
            </VStack>

            {aboutData.showStats && (
              <VStack spacing={4} align="stretch">
                <Heading size="sm">Statistics</Heading>
                {aboutData.stats.map((stat, index) => (
                  <HStack key={index} spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">Number</FormLabel>
                      <Input
                        size="sm"
                        value={stat.number}
                        onChange={(e) => updateStat(index, 'number', e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="sm">Label</FormLabel>
                      <Input
                        size="sm"
                        value={stat.label}
                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                      />
                    </FormControl>
                  </HStack>
                ))}
              </VStack>
            )}
          </VStack>
        </Box>

        <Box flex={1}>
          <Card>
            <CardBody>
              <Heading size="sm" mb={4}>Preview</Heading>
              <Box p={4} bg="gray.50" borderRadius="lg">
                <VStack spacing={4} align="start">
                  <Text fontSize="sm" color="accent.600" textTransform="uppercase" letterSpacing="2px">
                    {aboutData.tagline}
                  </Text>
                  <Heading size="lg" color="primary.500">
                    {aboutData.heading}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {aboutData.description}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {aboutData.detailedDescription}
                  </Text>
                  
                  {aboutData.showStats && (
                    <Box w="100%">
                      <Heading size="xs" mb={2}>Statistics</Heading>
                      <HStack spacing={4} flexWrap="wrap">
                        {aboutData.stats.map((stat, index) => (
                          <Box
                            key={index}
                            textAlign="center"
                            p={2}
                            bg="white"
                            borderRadius="md"
                            minW="60px"
                          >
                            <Text fontSize="sm" fontWeight="bold" color="primary.500">
                              {stat.number}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              {stat.label}
                            </Text>
                          </Box>
                        ))}
                      </HStack>
                    </Box>
                  )}
                  
                  {aboutData.artistImage && (
                    <Box
                      w="60px"
                      h="60px"
                      bg="gray.200"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xs"
                      color="gray.500"
                    >
                      Artist Photo
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

export default AboutEditor