import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Navbar from '../../components/common/Navbar'
import HeroSection from '../../components/common/HeroSection'
import Gallery from '../../components/gallery/Gallery'
import Showcase from '../../components/showcase/Showcase'
import Services from '../../components/services/Services'
import About from '../../components/common/About'
import Testimonials from '../../components/testimonials/Testimonials'
import Contact from '../../components/common/Contact'
import Footer from '../../components/common/Footer'
import ScrollToTop from '../../components/common/ScrollToTop'
import SectionDivider from '../../components/common/SectionDivider'
import { pagesAPI } from '../../services/api'

const MotionBox = motion(Box)

const Home = () => {
  const [pageContent, setPageContent] = useState(null)

  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth'
    fetchPageContent()
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const fetchPageContent = async () => {
    try {
      const content = await pagesAPI.getBySlug('home')
      setPageContent(content)
    } catch (error) {
      console.log('Using default content')
    }
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
    >


      <Navbar />
      <HeroSection pageContent={pageContent} />
      
      {/* Enhanced Section Transitions */}
      <Box position="relative">
        {/* Flowing Wave Divider */}
        <Box
          position="absolute"
          top={-1}
          left={0}
          w="100%"
          h="100px"
          backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wLDUwIEM0MDAsMTAwIDgwMCwwIDEyMDAsNTAgTDEyMDAsMTAwIEwwLDEwMCBaIiBmaWxsPSIjRkFGOUY3Ii8+PC9zdmc+')"
          backgroundSize="cover"
          zIndex={1}
        />
        
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Gallery />
        </MotionBox>
      </Box>
      
      {/* Artistic Section Separator */}
      <Box position="relative" py={20}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="300px"
          h="2px"
          bg="linear-gradient(90deg, transparent 0%, #C5A572 20%, #6B1D1D 50%, #C5A572 80%, transparent 100%)"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="20px"
          h="20px"
          bg="#C5A572"
          borderRadius="full"
          boxShadow="0 0 20px rgba(197,165,114,0.5)"
        />
      </Box>
      
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Showcase />
      </MotionBox>
      
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Services />
      </MotionBox>
      
      {/* Elegant Curve Divider */}
      <Box
        w="100%"
        h="120px"
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMjBweCIgdmlld0JveD0iMCAwIDEyMDAgMTIwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wLDYwIFE2MDAsMTIwIDEyMDAsNjAgTDEyMDAsMTIwIEwwLDEyMCBaIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+')"
        backgroundSize="cover"
      />
      
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <About />
      </MotionBox>
      
      {/* Testimonials with Enhanced Background */}
      <Box position="relative" bg="linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 100%)">
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Testimonials />
        </MotionBox>
      </Box>
      
      {/* Contact with Sophisticated Background */}
      <Box
        position="relative"
        bg="linear-gradient(180deg, #F5F3F0 0%, #FFFFFF 100%)"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          w: '100%',
          h: '100%',
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMiIgZmlsbD0iI0M1QTU3MiIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')",
          backgroundSize: '50px 50px',
          opacity: 0.3,
          zIndex: 0
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          position="relative"
          zIndex={1}
        >
          <Contact />
        </MotionBox>
      </Box>
      
      <Footer />
      
      {/* Enhanced Scroll to Top */}
      <ScrollToTop />
      

    </MotionBox>
  )
}

export default Home