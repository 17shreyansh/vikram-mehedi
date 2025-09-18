import express from 'express'
import Contact from '../models/Contact.js'
import { validateContact } from '../middleware/validation.js'

const router = express.Router()

// Get all contact messages
router.get('/', async (req, res) => {
  try {
    const { status, limit = 20, page = 1 } = req.query
    const filter = {}
    
    if (status) filter.status = status

    const skip = (page - 1) * limit
    const messages = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean()

    const total = await Contact.countDocuments(filter)

    res.json({
      success: true,
      data: {
        messages,
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

// Create new contact message
router.post('/', validateContact, async (req, res) => {
  try {
    const message = new Contact(req.body)
    await message.save()
    
    res.status(201).json({ 
      success: true,
      message: 'Message sent successfully', 
      data: message 
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Update message status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    
    if (!['New', 'Read', 'Replied', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' })
    }

    const message = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' })
    }

    res.json({ success: true, message: 'Status updated successfully', data: message })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router