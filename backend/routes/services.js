import express from 'express'
import Service from '../models/Service.js'
import { authenticate as auth } from '../middleware/auth.js'

const router = express.Router()

// Get all services
router.get('/', async (req, res) => {
  try {
    const { category, active, popular, page = 1, limit = 10, search } = req.query
    const filter = {}
    
    if (category && category !== 'All') filter.category = category
    if (active !== undefined) filter.active = active === 'true'
    if (popular !== undefined) filter.popular = popular === 'true'
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { features: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    const skip = (page - 1) * limit
    
    const services = await Service.find(filter)
      .sort({ sortOrder: 1, popular: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Service.countDocuments(filter)
    
    res.json({
      services,
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

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new service
router.post('/', auth, async (req, res) => {
  try {
    const {
      title, description, minPrice, maxPrice, duration, features,
      category, popular, active, image, icon, sortOrder, seo
    } = req.body
    
    const service = new Service({
      title,
      description,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      duration,
      features: Array.isArray(features) ? features : features?.split(',').map(f => f.trim()) || [],
      category,
      popular: popular === 'true' || popular === true,
      active: active !== 'false',
      image,
      icon,
      sortOrder: parseInt(sortOrder) || 0,
      seo: seo || {}
    })
    
    await service.save()
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update service
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title, description, minPrice, maxPrice, duration, features,
      category, popular, active, image, icon, sortOrder, seo
    } = req.body
    
    const updateData = {
      title,
      description,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      duration,
      features: Array.isArray(features) ? features : features?.split(',').map(f => f.trim()) || [],
      category,
      popular: popular === 'true' || popular === true,
      active: active !== 'false',
      image,
      icon,
      sortOrder: parseInt(sortOrder) || 0,
      seo: seo || {}
    }
    
    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true })
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete service
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json({ message: 'Service deleted successfully' })
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
        await Service.deleteMany({ _id: { $in: ids } })
        break
      case 'update':
        await Service.updateMany({ _id: { $in: ids } }, data)
        break
      case 'activate':
        await Service.updateMany({ _id: { $in: ids } }, { active: true })
        break
      case 'deactivate':
        await Service.updateMany({ _id: { $in: ids } }, { active: false })
        break
      default:
        return res.status(400).json({ error: 'Invalid action' })
    }
    
    res.json({ message: `Bulk ${action} completed successfully` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get service stats
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          popular: { $sum: { $cond: ['$popular', 1, 0] } },
          active: { $sum: { $cond: ['$active', 1, 0] } },
          avgMinPrice: { $avg: '$minPrice' },
          avgMaxPrice: { $avg: '$maxPrice' }
        }
      },
      { $sort: { count: -1 } }
    ])
    
    const total = await Service.countDocuments()
    const activeCount = await Service.countDocuments({ active: true })
    const popularCount = await Service.countDocuments({ popular: true })
    
    res.json({
      stats,
      summary: {
        total,
        active: activeCount,
        popular: popularCount,
        inactive: total - activeCount
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router