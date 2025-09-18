import express from 'express'
import Blog from '../models/Blog.js'

const router = express.Router()

// Get all blogs with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      published = 'true',
      limit = 12, 
      page = 1,
      search 
    } = req.query

    const filter = {}
    if (category && category !== 'All') filter.category = category
    if (featured === 'true') filter.featured = true
    if (published !== 'all') filter.published = published === 'true'
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    const skip = (page - 1) * limit
    
    const blogs = await Blog.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean()

    const total = await Blog.countDocuments(filter)
    
    res.json({
      success: true,
      data: {
        blogs,
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

// Get single blog by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params
    let blog
    
    // Check if identifier is ObjectId or slug
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(identifier)
    } else {
      blog = await Blog.findOne({ slug: identifier, published: true })
      if (blog) {
        // Increment views only for public access
        await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } })
      }
    }
    
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' })
    }
    
    res.json({ success: true, data: blog })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create new blog
router.post('/', async (req, res) => {
  try {
    let slug = req.body.slug
    if (!slug && req.body.title) {
      slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const blog = new Blog({
      ...req.body,
      slug
    })

    await blog.save()
    res.status(201).json({ success: true, message: 'Blog created successfully', data: blog })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Update blog
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' })
    }

    res.json({ success: true, message: 'Blog updated successfully', data: blog })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Delete blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' })
    }
    res.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get featured blogs
router.get('/featured/list', async (req, res) => {
  try {
    const blogs = await Blog.find({ 
      featured: true, 
      published: true 
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()

    res.json({ success: true, data: blogs })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get blog categories with counts
router.get('/stats/categories', async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      { $match: { published: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ])
    res.json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router