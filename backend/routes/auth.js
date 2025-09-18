import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ 
      $or: [{ username }, { email: username }],
      isActive: true 
    })

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    admin.lastLogin = new Date()
    await admin.save()

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    )

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get current admin
router.get('/me', authenticate, async (req, res) => {
  res.json({
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
      role: req.admin.role
    }
  })
})

// Logout
router.post('/logout', authenticate, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

export default router