// Import all numbered images from assets
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
import img4 from '../assets/4.jpg'
import img5 from '../assets/5.jpg'
import img6 from '../assets/6.jpg'
import img7 from '../assets/7.jpg'
import img8 from '../assets/8.jpg'
import img9 from '../assets/9.jpg'
import img10 from '../assets/10.jpg'
import img11 from '../assets/11.jpg'
import img12 from '../assets/12.jpg'
import img13 from '../assets/13.jpg'
import img14 from '../assets/14.jpg'
import img15 from '../assets/15.jpg'
import img16 from '../assets/16.jpg'
import img17 from '../assets/17.jpg'
import img18 from '../assets/18.jpg'
import img19 from '../assets/19.jpg'
import img20 from '../assets/20.jpg'
import img21 from '../assets/21.jpg'
import img22 from '../assets/22.jpg'
import img23 from '../assets/23.jpg'
import img24 from '../assets/24.jpg'
import img25 from '../assets/25.jpg'
import img26 from '../assets/26.jpg'
import img27 from '../assets/27.jpg'
import img28 from '../assets/28.jpg'
import img29 from '../assets/29.jpg'
import img30 from '../assets/30.jpg'
import img31 from '../assets/31.jpg'
import img32 from '../assets/32.jpg'
import img33 from '../assets/33.jpg'
import img34 from '../assets/34.jpg'
import img35 from '../assets/35.jpg'
import img36 from '../assets/36.jpg'
import img37 from '../assets/37.jpg'

// Fallback images array
export const fallbackImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
  img31, img32, img33, img34, img35, img36, img37
]

// Fallback gallery data
export const fallbackGalleryData = fallbackImages.map((img, index) => ({
  _id: `fallback-${index + 1}`,
  id: index + 1,
  title: `Mehndi Artistry ${index + 1}`,
  description: `Exquisite artistry in traditional mehndi patterns ${index + 1}`,
  image: img,
  category: index % 5 === 0 ? 'Bridal' : index % 5 === 1 ? 'Arabic' : index % 5 === 2 ? 'Indo-Western' : index % 5 === 3 ? 'Party' : 'Traditional'
}))

// Fallback services data
export const fallbackServicesData = [
  {
    id: 1,
    title: 'Bridal Mehndi Artistry',
    image: img1,
    price: '₹5,000 - ₹15,000',
    duration: '3-4 hours',
    popular: true,
    description: 'Exquisite bridal mehndi artistry that makes your special day unforgettable with intricate patterns and premium henna.',
    features: ['Intricate bridal designs', 'Premium quality henna', 'Touch-up service', 'Complimentary consultation', 'Bridal trial session']
  },
  {
    id: 2,
    title: 'Arabic Mehndi Artistry',
    image: img2,
    price: '₹1,500 - ₹5,000',
    duration: '1-2 hours',
    description: 'Bold and beautiful Arabic artistry patterns perfect for any celebration with quick application and stunning results.',
    features: ['Bold Arabic patterns', 'Quick application', 'Modern designs', 'Perfect for parties', 'Geometric patterns']
  },
  {
    id: 3,
    title: 'Party Mehndi Artistry',
    image: img3,
    price: '₹800 - ₹3,000',
    duration: '30-60 mins',
    description: 'Simple yet elegant artistry designs perfect for parties and casual events with quick-dry formula.',
    features: ['Simple elegant designs', 'Quick dry formula', 'Trendy patterns', 'Group bookings available', 'Fast application']
  },
  {
    id: 4,
    title: 'Traditional Mehndi Artistry',
    image: img4,
    price: '₹2,000 - ₹8,000',
    duration: '2-3 hours',
    description: 'Classic traditional artistry designs with cultural significance and timeless beauty.',
    features: ['Traditional motifs', 'Cultural designs', 'Detailed patterns', 'Festival special', 'Heritage styles']
  },
  {
    id: 5,
    title: 'Corporate Events Artistry',
    image: img5,
    price: '₹500 - ₹2,000 per person',
    duration: '15-30 mins per person',
    description: 'Professional mehndi artistry services for corporate events, festivals, and team celebrations.',
    features: ['Quick designs', 'Professional service', 'Group packages', 'Event coordination', 'Flexible timing']
  },
  {
    id: 6,
    title: 'Kids Mehndi Artistry',
    image: img6,
    price: '₹300 - ₹1,500',
    duration: '15-45 mins',
    description: 'Fun and safe mehndi artistry designs specially created for children with natural, skin-friendly henna.',
    features: ['Child-safe henna', 'Fun cartoon designs', 'Quick application', 'Washable options', 'Colorful patterns']
  }
]

// Get random image from fallback
export const getRandomFallbackImage = () => {
  const randomIndex = Math.floor(Math.random() * fallbackImages.length)
  return fallbackImages[randomIndex]
}

// Get specific fallback image by index
export const getFallbackImage = (index) => {
  return fallbackImages[index % fallbackImages.length]
}

// Check if server is online
export const checkServerStatus = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/health`, {
      method: 'GET',
      timeout: 5000
    })
    return response.ok
  } catch (error) {
    return false
  }
}