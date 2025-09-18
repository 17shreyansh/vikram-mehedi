import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Bridal Tips', 'Mehndi Care', 'Design Trends', 'Occasions', 'Traditional Art', 'Modern Fusion', 'DIY Tips', 'Cultural Significance']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    name: {
      type: String,
      default: 'Vikram Mehndi'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  publishDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

blogSchema.index({ category: 1, published: 1 })
blogSchema.index({ featured: -1, createdAt: -1 })

export default mongoose.model('Blog', blogSchema)