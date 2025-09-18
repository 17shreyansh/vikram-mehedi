import express from 'express'
import PageContent from '../models/PageContent.js'
import { authenticate as auth } from '../middleware/auth.js'

const router = express.Router()

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await PageContent.find().sort({ updatedAt: -1 })
    res.json(pages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await PageContent.findOne({ slug: req.params.slug })
    if (!page) {
      return res.status(404).json({ error: 'Page not found' })
    }
    res.json(page)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new page
router.post('/', auth, async (req, res) => {
  try {
    const page = new PageContent(req.body)
    await page.save()
    res.status(201).json(page)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update page
router.put('/:slug', auth, async (req, res) => {
  try {
    const page = await PageContent.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, upsert: true }
    )
    res.json(page)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete page
router.delete('/:slug', auth, async (req, res) => {
  try {
    const page = await PageContent.findOneAndDelete({ slug: req.params.slug })
    if (!page) {
      return res.status(404).json({ error: 'Page not found' })
    }
    res.json({ message: 'Page deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router