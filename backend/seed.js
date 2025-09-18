import mongoose from 'mongoose'
import Service from './models/Service.js'
import Gallery from './models/Gallery.js'
import PageContent from './models/PageContent.js'
import dotenv from 'dotenv'

dotenv.config()

const services = [
  {
    title: 'Bridal Mehndi',
    description: 'Intricate and elaborate mehndi designs perfect for brides. Includes full hand and feet coverage with traditional and contemporary patterns.',
    minPrice: 5000,
    maxPrice: 15000,
    duration: '3-5 hours',
    features: [
      'Full hand & feet design',
      'Intricate bridal patterns',
      'Premium quality henna',
      'Touch-ups included',
      'Complimentary design consultation'
    ],
    category: 'Bridal',
    popular: true,
    icon: 'FaCrown'
  },
  {
    title: 'Arabic Mehndi',
    description: 'Bold and beautiful Arabic patterns with modern twists. Quick application with stunning results perfect for any occasion.',
    minPrice: 2000,
    maxPrice: 5000,
    duration: '1-2 hours',
    features: [
      'Bold Arabic patterns',
      'Quick application',
      'Modern designs',
      'Perfect for parties',
      'Elegant finger patterns'
    ],
    category: 'Arabic',
    popular: true,
    icon: 'FaStar'
  },
  {
    title: 'Traditional Fusion',
    description: 'Contemporary fusion designs blending traditional Indian patterns with modern aesthetics.',
    minPrice: 3000,
    maxPrice: 8000,
    duration: '2-3 hours',
    features: [
      'Fusion designs',
      'Contemporary patterns',
      'Unique style combinations',
      'Instagram-worthy designs',
      'Customizable patterns'
    ],
    category: 'Traditional',
    popular: false,
    icon: 'FaHeart'
  },
  {
    title: 'Party Mehndi',
    description: 'Simple yet elegant designs perfect for parties, festivals, and casual occasions. Quick and affordable.',
    minPrice: 1500,
    maxPrice: 3000,
    duration: '30min - 1 hour',
    features: [
      'Simple elegant designs',
      'Quick service',
      'Group bookings available',
      'Affordable rates',
      'Festival specials'
    ],
    category: 'Party',
    popular: false,
    icon: 'FaGift'
  }
]

const galleryItems = [
  {
    title: 'Elegant Bridal Design 1',
    category: 'Bridal',
    description: 'Intricate bridal mehndi with traditional motifs',
    filename: 'bridal-1.jpg',
    originalName: 'bridal-design-1.jpg',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
    size: 1024000,
    mimetype: 'image/jpeg',
    featured: true,
    tags: ['bridal', 'traditional', 'intricate']
  },
  {
    title: 'Modern Arabic Pattern',
    category: 'Arabic',
    description: 'Bold Arabic design with contemporary elements',
    filename: 'arabic-1.jpg',
    originalName: 'arabic-pattern-1.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop',
    size: 856000,
    mimetype: 'image/jpeg',
    featured: true,
    tags: ['arabic', 'modern', 'bold']
  },
  {
    title: 'Fusion Style Design',
    category: 'Traditional',
    description: 'Beautiful fusion of Indian and Western patterns',
    filename: 'fusion-1.jpg',
    originalName: 'fusion-design-1.jpg',
    url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop',
    size: 945000,
    mimetype: 'image/jpeg',
    featured: false,
    tags: ['fusion', 'contemporary', 'unique']
  },
  {
    title: 'Party Special Design',
    category: 'Party',
    description: 'Simple yet elegant party mehndi',
    filename: 'party-1.jpg',
    originalName: 'party-design-1.jpg',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop',
    size: 678000,
    mimetype: 'image/jpeg',
    featured: false,
    tags: ['party', 'simple', 'elegant']
  },
  {
    title: 'Traditional Bridal Design',
    category: 'Bridal',
    description: 'Classic bridal patterns with peacock motifs',
    filename: 'bridal-2.jpg',
    originalName: 'bridal-design-2.jpg',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&crop=entropy&cs=tinysrgb',
    size: 1124000,
    mimetype: 'image/jpeg',
    featured: true,
    tags: ['bridal', 'peacock', 'traditional']
  },
  {
    title: 'Minimalist Arabic',
    category: 'Arabic',
    description: 'Clean and simple Arabic patterns',
    filename: 'arabic-2.jpg',
    originalName: 'arabic-pattern-2.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&crop=entropy&cs=tinysrgb',
    size: 756000,
    mimetype: 'image/jpeg',
    featured: false,
    tags: ['arabic', 'minimalist', 'clean']
  },
  {
    title: 'Contemporary Fusion',
    category: 'Traditional',
    description: 'Modern geometric patterns with traditional elements',
    filename: 'fusion-2.jpg',
    originalName: 'fusion-design-2.jpg',
    url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop&crop=entropy&cs=tinysrgb',
    size: 845000,
    mimetype: 'image/jpeg',
    featured: true,
    tags: ['fusion', 'geometric', 'modern']
  },
  {
    title: 'Festival Special',
    category: 'Party',
    description: 'Perfect for festivals and celebrations',
    filename: 'party-2.jpg',
    originalName: 'party-design-2.jpg',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop&crop=entropy&cs=tinysrgb',
    size: 578000,
    mimetype: 'image/jpeg',
    featured: false,
    tags: ['party', 'festival', 'celebration']
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vikram-mehndi')
    console.log('✅ Connected to MongoDB')
    
    await Service.deleteMany({})
    await Gallery.deleteMany({})
    await PageContent.deleteMany({})
    
    await Service.insertMany(services)
    await Gallery.insertMany(galleryItems)
    
    // Seed pages
    const pages = [
      {
        slug: 'home',
        title: 'Homepage',
        sections: [
          {
            type: 'hero',
            title: 'Hero Section',
            data: {
              tagline: 'Artistry in Every Detail',
              mainHeading: 'Elegant',
              subHeading: 'Mehndi Designs',
              description: 'Transform your celebrations with intricate, breathtaking mehndi artistry.',
              buttonText: 'Book Your Session',
              showFloatingShapes: true
            },
            visible: true,
            order: 1
          }
        ],
        status: 'published'
      },
      {
        slug: 'about',
        title: 'About Page',
        heroTitle: 'About Me',
        heroSubtitle: 'Vikram Mehndi',
        heroDescription: 'Passionate mehndi artist with over 8 years of experience',
        status: 'published'
      }
    ]
    
    await PageContent.insertMany(pages)
    
    console.log('✅ Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()