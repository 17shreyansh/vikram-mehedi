import express from 'express'
import Booking from '../models/Booking.js'
import { validateBooking } from '../middleware/validation.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const { status, service, date, limit = 20, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = req.query
    const filter = {}
    
    if (status) filter.status = status
    if (service) filter.service = service
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      filter.date = { $gte: startDate, $lt: endDate }
    }

    const skip = (page - 1) * limit
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 }

    const bookings = await Booking.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .lean()

    const total = await Booking.countDocuments(filter)

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create new booking
router.post('/', validateBooking, async (req, res) => {
  try {
    const bookingId = `BK${Date.now().toString().slice(-6)}`
    
    const booking = new Booking({
      bookingId,
      ...req.body
    })

    await booking.save()
    
    res.status(201).json({ 
      success: true,
      message: 'Booking created successfully', 
      data: booking
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' })
    }
    res.json({ success: true, message: 'Booking updated successfully', data: booking })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' })
    }
    res.json({ success: true, message: 'Booking deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get booking statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments()
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' })
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' })
    const completedBookings = await Booking.countDocuments({ status: 'Completed' })
    
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'Completed', amount: { $exists: true } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])

    res.json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router