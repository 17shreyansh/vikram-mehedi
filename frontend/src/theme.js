import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  breakpoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
  colors: {
    primary: {
      50: '#FDF2F2',
      100: '#FCE8E8',
      200: '#F8D1D1',
      300: '#F4BABA',
      400: '#F0A3A3',
      500: '#6B1D1D',
      600: '#5A1818',
      700: '#4A1313',
      800: '#390E0E',
      900: '#280909',
    },
    accent: {
      50: '#FAF7F0',
      100: '#F5EFE1',
      200: '#EBDFC3',
      300: '#E1CFA5',
      400: '#D7BF87',
      500: '#C5A572',
      600: '#B8965F',
      700: '#A6864D',
      800: '#94763B',
      900: '#826629',
    },
    background: {
      ivory: '#FDFBF7',
      offWhite: '#FAF8F4',
    },
    text: {
      charcoal: '#333333',
    }
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Poppins, sans-serif',
    accent: 'Great Vibes, cursive',
  },
  styles: {
    global: {
      '*': {
        scrollBehavior: 'smooth',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: 'background.ivory',
        color: 'text.charcoal',
        fontFeatureSettings: '"kern"',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        overflowX: 'hidden',
      },
      // Enhanced scroll animations
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        bg: 'gray.100',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'accent.400',
        borderRadius: '4px',
        _hover: {
          bg: 'accent.500',
        },
      },
      // Selection styling
      '::selection': {
        bg: 'accent.200',
        color: 'primary.600',
      },
      '::-moz-selection': {
        bg: 'accent.200',
        color: 'primary.600',
      },
      // Mobile optimizations
      '@media (max-width: 768px)': {
        body: {
          fontSize: '14px',
        },
        '.chakra-container': {
          px: 4,
        },
      },
    },
  },
  components: {
    Button: {
      variants: {
        elegant: {
          bg: 'accent.500',
          color: 'white',
          fontWeight: '500',
          borderRadius: 'lg',
          _hover: {
            bg: 'accent.600',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(197, 165, 114, 0.3)',
          },
          transition: 'all 0.3s ease',
        },
        premium: {
          bg: 'primary.500',
          color: 'white',
          fontWeight: '600',
          borderRadius: 'xl',
          px: 8,
          py: 6,
          _hover: {
            bg: 'primary.600',
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 30px rgba(107, 29, 29, 0.4)',
          },
          transition: 'all 0.3s ease',
        }
      }
    },
    Card: {
      variants: {
        elegant: {
          container: {
            bg: 'white',
            borderRadius: 'xl',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'accent.100',
            overflow: 'hidden',
            _hover: {
              transform: 'translateY(-5px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            },
            transition: 'all 0.3s ease',
          }
        }
      }
    }
  }
})

export default theme