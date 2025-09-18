import React, { useState } from 'react'
import {
  Box,
  Button,
  Image,
  VStack,
  HStack,
  Text,
  Progress,
  useToast,
  IconButton,
  Input
} from '@chakra-ui/react'
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa'
import { uploadAPI } from '../../services/api'

const ImageUpload = ({ 
  value, 
  onChange, 
  type = 'general',
  multiple = false,
  maxFiles = 5,
  placeholder = 'Upload image'
}) => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const toast = useToast()

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files)
    if (!files.length) return

    if (multiple && files.length > maxFiles) {
      toast({
        title: 'Error',
        description: `Maximum ${maxFiles} files allowed`,
        status: 'error',
        duration: 3000
      })
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      if (multiple) {
        const formData = new FormData()
        files.forEach(file => formData.append('images', file))
        
        const response = await uploadAPI.uploadMultiple(type, formData, (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentCompleted)
        })
        
        const newUrls = response.files.map(file => file.url)
        onChange([...(value || []), ...newUrls])
      } else {
        const formData = new FormData()
        formData.append('image', files[0])
        
        const response = await uploadAPI.uploadSingle(type, formData, (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentCompleted)
        })
        
        onChange(response.file.url)
      }

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Upload failed',
        status: 'error',
        duration: 3000
      })
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleRemove = (index) => {
    if (multiple) {
      const newUrls = [...(value || [])]
      newUrls.splice(index, 1)
      onChange(newUrls)
    } else {
      onChange('')
    }
  }

  const renderSingleUpload = () => (
    <VStack spacing={4}>
      {value && (
        <Box position="relative">
          <Image
            src={value}
            alt="Uploaded"
            maxH="200px"
            borderRadius="md"
            objectFit="cover"
          />
          <IconButton
            icon={<FaTrash />}
            size="sm"
            colorScheme="red"
            position="absolute"
            top={2}
            right={2}
            onClick={() => handleRemove()}
          />
        </Box>
      )}
      
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        display="none"
        id={`upload-${type}`}
      />
      
      <Button
        as="label"
        htmlFor={`upload-${type}`}
        leftIcon={<FaUpload />}
        isLoading={uploading}
        loadingText="Uploading..."
        cursor="pointer"
      >
        {value ? 'Change Image' : placeholder}
      </Button>
      
      {uploading && <Progress value={progress} w="100%" />}
    </VStack>
  )

  const renderMultipleUpload = () => (
    <VStack spacing={4}>
      {value && value.length > 0 && (
        <HStack wrap="wrap" spacing={2}>
          {value.map((url, index) => (
            <Box key={index} position="relative">
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                boxSize="100px"
                borderRadius="md"
                objectFit="cover"
              />
              <IconButton
                icon={<FaTrash />}
                size="xs"
                colorScheme="red"
                position="absolute"
                top={1}
                right={1}
                onClick={() => handleRemove(index)}
              />
            </Box>
          ))}
        </HStack>
      )}
      
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        display="none"
        id={`upload-multiple-${type}`}
      />
      
      <Button
        as="label"
        htmlFor={`upload-multiple-${type}`}
        leftIcon={<FaImage />}
        isLoading={uploading}
        loadingText="Uploading..."
        cursor="pointer"
        isDisabled={value && value.length >= maxFiles}
      >
        {placeholder} ({(value?.length || 0)}/{maxFiles})
      </Button>
      
      {uploading && <Progress value={progress} w="100%" />}
    </VStack>
  )

  return multiple ? renderMultipleUpload() : renderSingleUpload()
}

export default ImageUpload