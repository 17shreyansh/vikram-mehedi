import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Gallery from '../models/Gallery.js'
import { authenticate as auth } from '../middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Ensure upload directory exists
const uploadDir = 'uploads/gallery/'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'))
    }
  }
})

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { category, featured, status, page = 1, limit = 12, search } = req.query
    const filter = {}
    
    if (category && category !== 'All') filter.category = category
    if (featured !== undefined) filter.featured = featured === 'true'
    if (status) filter.status = status
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    const skip = (page - 1) * limit
    
    const items = await Gallery.find(filter)
      .sort({ sortOrder: 1, featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Gallery.countDocuments(filter)
    
    res.json({
      items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single gallery item
router.get('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Upload new gallery item
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }
    
    const { title, category, description, tags, featured, alt, sortOrder, status } = req.body
    
    const galleryItem = new Gallery({
      title,
      category,
      description,
      alt: alt || title,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      featured: featured === 'true',
      sortOrder: parseInt(sortOrder) || 0,
      status: status || 'active',
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: `/uploads/gallery/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype
    })
    
    await galleryItem.save()
    res.status(201).json(galleryItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update gallery item
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, category, description, tags, featured, alt, sortOrder, status } = req.body
    
    const updateData = {
      title,
      category,
      description,
      alt,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : [],
      featured: featured === 'true' || featured === true,
      sortOrder: parseInt(sortOrder) || 0,
      status: status || 'active'
    }
    
    const item = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true })
    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete gallery item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', 'uploads', 'gallery', item.filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    
    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Bulk operations
router.post('/bulk', auth, async (req, res) => {
  try {
    const { action, ids, data } = req.body
    
    switch (action) {
      case 'delete':
        const items = await Gallery.find({ _id: { $in: ids } })
        for (const item of items) {
          const filePath = path.join(__dirname, '..', 'uploads', 'gallery', item.filename)
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        }
        await Gallery.deleteMany({ _id: { $in: ids } })
        break
      case 'update':
        await Gallery.updateMany({ _id: { $in: ids } }, data)
        break
      default:
        return res.status(400).json({ error: 'Invalid action' })
    }
    
    res.json({ message: `Bulk ${action} completed successfully` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get category stats
router.get('/stats/categories', async (req, res) => {
  try {
    const stats = await Gallery.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          featured: { $sum: { $cond: ['$featured', 1, 0] } },
          active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } }
        }
      },
      { $sort: { count: -1 } }
    ])
    
    const total = await Gallery.countDocuments()
    
    res.json({ stats, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router