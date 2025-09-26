import express from 'express'
import Gallery from '../models/Gallery.js'
import Booking from '../models/Booking.js'
import Service from '../models/Service.js'
import Contact from '../models/Contact.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Apply authentication middleware to all admin routes
router.use(authenticate)

// Dashboard overview
router.get('/dashboard', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments()
    const totalGalleryImages = await Gallery.countDocuments()
    const totalServices = await Service.countDocuments({ active: true })
    const totalMessages = await Contact.countDocuments()

    const revenueData = await Booking.aggregate([
      { $match: { status: 'Completed', amount: { $exists: true, $gt: 0 } } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ])

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('bookingId name service date status amount')
      .lean()

    res.json({
      success: true,
      data: {
        overview: {
          totalBookings,
          totalGalleryImages,
          totalServices,
          totalMessages,
          totalRevenue: revenueData[0]?.totalRevenue || 0
        },
        recentBookings
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router