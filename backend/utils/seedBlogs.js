import mongoose from 'mongoose'
import Blog from '../models/Blog.js'
import dotenv from 'dotenv'

dotenv.config()

const sampleBlogs = [
  {
    title: 'Essential Bridal Mehndi Tips for Your Perfect Wedding Day',
    slug: 'essential-bridal-mehndi-tips-perfect-wedding-day',
    excerpt: 'Discover expert tips to ensure your bridal mehndi looks stunning and lasts longer on your special day.',
    content: `<p>Your wedding day is one of the most important days of your life, and your bridal mehndi plays a crucial role in completing your bridal look. Here are some essential tips to ensure your mehndi turns out perfect.</p>

<h2>Pre-Application Preparation</h2>
<p>Start preparing your hands and feet at least a week before your mehndi ceremony. Exfoliate regularly to remove dead skin cells and moisturize daily to keep your skin soft and supple.</p>

<h2>Choosing the Right Design</h2>
<p>Select designs that complement your outfit and jewelry. Traditional motifs like paisleys, flowers, and intricate patterns work beautifully for bridal mehndi.</p>

<h2>Day of Application</h2>
<p>Ensure your hands are clean and free from any oils or lotions. This helps the henna paste adhere better and results in a darker stain.</p>

<h2>Aftercare Tips</h2>
<p>Keep the mehndi on for at least 6-8 hours. Apply a mixture of lemon juice and sugar to keep it moist and enhance the color development.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    category: 'Bridal Tips',
    tags: ['bridal', 'wedding', 'tips', 'preparation'],
    published: true,
    featured: true,
    readTime: 5,
    views: 245,
    likes: 18
  },
  {
    title: 'How to Care for Your Mehndi: A Complete Guide',
    slug: 'how-to-care-for-your-mehndi-complete-guide',
    excerpt: 'Learn the best practices for mehndi aftercare to ensure long-lasting, beautiful color that stays vibrant.',
    content: `<p>Proper mehndi care is essential for achieving the deep, rich color that makes your designs truly stand out. Follow this comprehensive guide for the best results.</p>

<h2>Immediate Aftercare</h2>
<p>Once your mehndi is applied, avoid touching or moving the area for at least 30 minutes to allow the paste to set properly.</p>

<h2>Keeping It Moist</h2>
<p>Apply a mixture of lemon juice and sugar every 2-3 hours to keep the paste moist and help it penetrate deeper into the skin.</p>

<h2>Removal Process</h2>
<p>Never wash off mehndi with water immediately. Instead, scrape off the dried paste gently with a blunt knife or your fingernails.</p>

<h2>Long-term Care</h2>
<p>Avoid excessive water contact for the first 24 hours. Apply coconut oil or mustard oil to protect the design and enhance its longevity.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop',
    category: 'Mehndi Care',
    tags: ['care', 'aftercare', 'maintenance', 'tips'],
    published: true,
    featured: false,
    readTime: 4,
    views: 189,
    likes: 12
  },
  {
    title: 'Latest Mehndi Design Trends for 2024',
    slug: 'latest-mehndi-design-trends-2024',
    excerpt: 'Stay updated with the hottest mehndi design trends that are taking the fashion world by storm this year.',
    content: `<p>Mehndi designs continue to evolve, blending traditional artistry with contemporary aesthetics. Here are the top trends dominating 2024.</p>

<h2>Minimalist Designs</h2>
<p>Simple, elegant patterns with clean lines and negative space are gaining popularity among modern brides and fashion enthusiasts.</p>

<h2>Geometric Patterns</h2>
<p>Bold geometric shapes combined with traditional motifs create striking contemporary designs that appeal to younger generations.</p>

<h2>Floral Fusion</h2>
<p>Realistic floral patterns mixed with abstract elements offer a fresh take on classic mehndi artistry.</p>

<h2>Finger Detailing</h2>
<p>Intricate finger patterns and ring-style designs are becoming increasingly popular for their delicate beauty and versatility.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop',
    category: 'Design Trends',
    tags: ['trends', '2024', 'modern', 'contemporary'],
    published: true,
    featured: true,
    readTime: 6,
    views: 312,
    likes: 25
  },
  {
    title: 'Choosing the Perfect Mehndi for Different Occasions',
    slug: 'choosing-perfect-mehndi-different-occasions',
    excerpt: 'Discover which mehndi styles work best for various celebrations and events throughout the year.',
    content: `<p>Different occasions call for different mehndi styles. Understanding which designs work best for specific events helps you make the perfect choice.</p>

<h2>Wedding Ceremonies</h2>
<p>Elaborate, intricate designs with traditional motifs like paisleys, peacocks, and mandala patterns are ideal for weddings.</p>

<h2>Festival Celebrations</h2>
<p>Medium-complexity designs with cultural symbols and festive elements work perfectly for religious and cultural celebrations.</p>

<h2>Casual Gatherings</h2>
<p>Simple, elegant patterns that are quick to apply and easy to maintain are perfect for casual social events.</p>

<h2>Corporate Events</h2>
<p>Subtle, professional designs that complement formal attire while adding a touch of cultural elegance.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
    category: 'Occasions',
    tags: ['occasions', 'events', 'selection', 'guide'],
    published: true,
    featured: false,
    readTime: 4,
    views: 156,
    likes: 9
  }
]

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vikram-mehndi')
    console.log('Connected to MongoDB')
    
    await Blog.deleteMany({})
    await Blog.insertMany(sampleBlogs)
    
    console.log('✅ Blogs seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding blogs:', error)
    process.exit(1)
  }
}

seedBlogs()