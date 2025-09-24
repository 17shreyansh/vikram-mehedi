import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import galleryRoutes from './routes/gallery.js'
import bookingRoutes from './routes/bookings.js'
import serviceRoutes from './routes/services.js'
import contactRoutes from './routes/contact.js'
import adminRoutes from './routes/admin.js'
import blogRoutes from './routes/blogs.js'
import authRoutes from './routes/auth.js'
import pageRoutes from './routes/pages.js'
import uploadRoutes from './routes/upload.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Security & Performance
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }))
const allowedOrigins = [
  'https://vikrammehdi.com',
  'https://www.vikrammehdi.com',
  'http://localhost:3000',
  'http://localhost:5173'
]

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(compression())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vikram-mehndi')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// Routes
app.use('/api/gallery', galleryRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/pages', pageRoutes)
app.use('/api/upload', uploadRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Error:', error)
  res.status(error.status || 500).json({ error: error.message || 'Internal server error' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})