import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ConfigProvider } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import theme from './theme'
import { AuthProvider } from './contexts/AuthContext'
import PageLoader from './components/common/PageLoader'
import CustomCursor from './components/common/CustomCursor'
import ProtectedRoute from './admin/components/ProtectedRoute'

// Lazy load components for better performance
const Home = lazy(() => import('./pages/home/Home'))
const About = lazy(() => import('./pages/about/About'))
const Contact = lazy(() => import('./pages/contact/Contact'))
const GalleryPage = lazy(() => import('./pages/gallery/Gallery'))
const ServicesPage = lazy(() => import('./pages/services/Services'))
const BlogList = lazy(() => import('./pages/blog/BlogList'))
const BlogDetail = lazy(() => import('./pages/blog/BlogDetail'))
const AdminLogin = lazy(() => import('./admin/pages/Login'))
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'))
const AdminGallery = lazy(() => import('./admin/pages/AdminGallery'))
const AdminBookings = lazy(() => import('./admin/pages/AdminBookings'))
const AdminServices = lazy(() => import('./admin/pages/AdminServices'))


const HomeEditor = lazy(() => import('./admin/pages/editors/HomeEditor'))
const AboutPageEditor = lazy(() => import('./admin/pages/editors/AboutPageEditor'))
const BlogEditor = lazy(() => import('./admin/pages/editors/BlogEditor'))
const AdminBlogs = lazy(() => import('./admin/pages/AdminBlogs'))
const PrivacyPage = lazy(() => import('./pages/privacy/Privacy'))
const TermsPage = lazy(() => import('./pages/terms/Terms'))

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

const antdTheme = {
  token: {
    colorPrimary: '#6B1D1D',
    colorSuccess: '#C5A572',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: 8,
  },
}

function App() {

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChakraProvider theme={theme}>
        <ConfigProvider theme={antdTheme}>
          <AuthProvider>
            <CustomCursor />
            <Router>
              <Suspense fallback={<PageLoader text="Loading..." />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
                  <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
                  <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />

                  <Route path="/admin/pages/home" element={<ProtectedRoute><HomeEditor /></ProtectedRoute>} />
                  <Route path="/admin/pages/about" element={<ProtectedRoute><AboutPageEditor /></ProtectedRoute>} />
                  <Route path="/admin/blogs" element={<ProtectedRoute><AdminBlogs /></ProtectedRoute>} />
                  <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
                  <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />


                </Routes>
              </Suspense>
            </Router>
          </AuthProvider>
        </ConfigProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}

export default App