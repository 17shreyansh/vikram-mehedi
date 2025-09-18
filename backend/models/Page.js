import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: {
    hero: {
      title: String,
      subtitle: String,
      description: String,
      backgroundImage: String,
      ctaText: String,
      ctaLink: String
    },
    sections: [{
      type: { type: String, enum: ['text', 'image', 'gallery', 'testimonials', 'contact', 'services'] },
      title: String,
      content: String,
      images: [String],
      order: Number
    }]
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isActive: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('Page', pageSchema)