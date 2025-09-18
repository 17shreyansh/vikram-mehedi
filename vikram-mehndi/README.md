# Vikram Mehndi - Premium Mehndi Design Website

A luxury, production-ready mehndi design website built with modern technologies featuring an integrated admin panel for complete business management.

## 🚀 Tech Stack

### Frontend
- **React 18** with **Vite** for blazing fast development
- **Chakra UI** for elegant, responsive components
- **Framer Motion** for smooth animations
- **React Slick** for image carousels
- **React Image Gallery** for immersive photo viewing
- **React Icons** for beautiful iconography
- **Ant Design** for admin panel components

### Backend
- **Express.js** with ES6 modules
- **MongoDB** with Mongoose ODM
- **Sharp** for image optimization
- **Multer** for file uploads
- **Express Validator** for data validation
- **Helmet** for security headers
- **Compression** for response optimization

## 🎨 Design Features

### Typography System
- **Headings**: Playfair Display (elegant serif)
- **Body Text**: Poppins (clean sans-serif)
- **Accent Text**: Great Vibes (decorative cursive)

### Color Palette
- **Primary**: Deep Maroon (#6B1D1D)
- **Accent**: Rich Gold (#C5A572)
- **Backgrounds**: Ivory (#FDFBF7) / Off White (#FAF8F4)
- **Text**: Charcoal Gray (#333333)

### Premium Design Elements
- Mandala-inspired background patterns
- Floral border decorations
- Smooth parallax scrolling
- Elegant hover animations
- Custom scrollbar styling
- Gradient overlays

## 📱 Features

### Frontend Features
- **Immersive Hero Section** with image slider
- **Filterable Gallery** with modal viewer
- **Service Packages** with detailed pricing
- **Artist Portfolio** with achievements
- **Client Testimonials** with ratings
- **Contact Form** with WhatsApp integration
- **Responsive Design** for all devices
- **SEO Optimized** with proper meta tags

### Admin Panel Features
- **Dashboard** with analytics and statistics
- **Gallery Management** with bulk upload
- **Booking Management** with status tracking
- **Service Management** with pricing control
- **Contact Management** with reply system
- **Real-time Statistics** and reporting

### Backend API Features
- **RESTful APIs** for all operations
- **Image Processing** with Sharp optimization
- **Data Validation** with comprehensive rules
- **Error Handling** with proper responses
- **File Upload** with security validation
- **Database Indexing** for performance

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database Seeding
```bash
cd backend
node utils/seedData.js
```

## 📁 Project Structure

```
vikram-mehndi/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   ├── uploads/         # Image storage
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   │   ├── common/  # Shared components
│   │   │   ├── gallery/ # Gallery components
│   │   │   ├── services/# Service components
│   │   │   └── testimonials/
│   │   ├── pages/       # Page components
│   │   ├── admin/       # Admin panel
│   │   │   ├── components/
│   │   │   └── pages/
│   │   ├── utils/       # Helper functions
│   │   └── hooks/       # Custom hooks
│   ├── public/          # Static assets
│   └── index.html       # HTML template
└── README.md
```

## 🔧 API Endpoints

### Gallery
- `GET /api/gallery` - Get all images with filtering
- `POST /api/gallery` - Upload single image
- `POST /api/gallery/bulk` - Upload multiple images
- `PUT /api/gallery/:id` - Update image details
- `DELETE /api/gallery/:id` - Delete image

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `PATCH /api/bookings/:id/status` - Update status
- `DELETE /api/bookings/:id` - Delete booking

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Contact
- `GET /api/contact` - Get all messages
- `POST /api/contact` - Send new message
- `POST /api/contact/:id/reply` - Reply to message
- `PATCH /api/contact/:id/status` - Update status

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy with your preferred platform
```

### Environment Variables
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_url
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## 🎯 Performance Optimizations

- **Image Optimization** with Sharp (WebP format)
- **Code Splitting** with Vite
- **Lazy Loading** for images
- **Compression** middleware
- **Database Indexing** for queries
- **Caching** strategies
- **Minification** in production

## 🔒 Security Features

- **Helmet** for security headers
- **Rate Limiting** for API protection
- **Input Validation** with express-validator
- **File Upload** security checks
- **CORS** configuration
- **Environment Variables** for secrets

## 📊 Analytics & Monitoring

- **Booking Statistics** with trends
- **Revenue Tracking** and reporting
- **Service Popularity** metrics
- **Gallery Performance** analytics
- **Contact Form** conversion tracking

## 🎨 Customization

The website is fully customizable with:
- **Theme Configuration** in `src/theme.js`
- **Component Variants** for different styles
- **Color Palette** easily adjustable
- **Typography System** configurable
- **Animation Settings** customizable

## 📞 Support

For support and customization requests, contact the development team.

## 📄 License

Private project for Vikram Mehndi services. All rights reserved.