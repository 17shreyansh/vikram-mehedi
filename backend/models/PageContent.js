import mongoose from 'mongoose'

const pageContentSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  // About page specific fields
  heroTitle: String,
  heroSubtitle: String,
  heroDescription: String,
  storyTitle: String,
  storyContent: String,
  storyContent2: String,
  storyContent3: String,
  storyContent4: String,
  artistImage: String,
  showAchievements: {
    type: Boolean,
    default: true
  },
  achievements: [{
    icon: String,
    number: String,
    label: String,
    color: String
  }],
  // Generic sections for other pages
  sections: [{
    type: {
      type: String,
      required: true,
      enum: ['hero', 'about', 'services', 'gallery', 'testimonials', 'contact', 'custom']
    },
    title: String,
    content: String,
    image: String,
    data: mongoose.Schema.Types.Mixed,
    order: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: true
    }
  }],
  seo: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, {
  timestamps: true
})

pageContentSchema.index({ slug: 1 })

// Pre-save middleware to set default title if not provided
pageContentSchema.pre('save', function(next) {
  if (!this.title && this.slug) {
    this.title = this.slug.charAt(0).toUpperCase() + this.slug.slice(1) + ' Page'
  }
  next()
})

export default mongoose.model('PageContent', pageContentSchema)