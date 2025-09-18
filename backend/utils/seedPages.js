import PageContent from '../models/PageContent.js'

const seedPages = async () => {
  try {
    // Check if about page exists, if not create it
    const aboutPage = await PageContent.findOne({ slug: 'about' })
    if (aboutPage) {
      console.log('About page already exists, updating with new structure')
      await PageContent.findOneAndUpdate(
        { slug: 'about' },
        {
          heroTitle: 'About Me',
          heroSubtitle: 'Vikram Mehndi',
          heroDescription: 'Creating beautiful memories through the art of mehndi for over 8 years',
          storyTitle: 'The Artist Behind the Art',
          storyContent: 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.',
          storyContent2: 'Specializing in bridal mehndi, Arabic patterns, and contemporary fusion designs, combining traditional techniques with modern aesthetics to create unique artwork that tells your story.',
          storyContent3: 'Every design is crafted with premium quality henna, ensuring deep, long-lasting color that enhances the beauty of your special occasions. From intimate gatherings to grand celebrations, each piece is a work of art.',
          storyContent4: 'My passion lies in understanding your vision and bringing it to life through personalized designs that reflect your personality and the significance of your celebration.',
          artistImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop',
          showAchievements: true
        },
        { upsert: true }
      )
      return
    }

    // Check if other pages already exist
    const existingPages = await PageContent.countDocuments()
    if (existingPages > 0) {
      console.log('Other pages already exist, skipping seed')
      return
    }

    const pages = [
      {
        slug: 'home',
        title: 'Homepage',
        sections: [
          {
            type: 'hero',
            title: 'Hero Section',
            data: {
              tagline: 'Artistry in Every Detail',
              mainHeading: 'Elegant',
              subHeading: 'Mehndi Designs',
              description: 'Transform your celebrations with intricate, breathtaking mehndi artistry. Each creation tells your unique story through timeless patterns and contemporary elegance.',
              buttonText: 'Book Your Session',
              buttonLink: '#contact',
              backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
              showFloatingShapes: true,
              showScrollIndicator: true
            },
            visible: true,
            order: 1
          },
          {
            type: 'gallery',
            title: 'Gallery Section',
            data: {
              sectionTitle: 'Gallery',
              description: 'Discover our stunning collection of mehndi artistry',
              showCategories: true,
              defaultCategory: 'All',
              itemsPerPage: 12
            },
            visible: true,
            order: 2
          },
          {
            type: 'services',
            title: 'Services Section',
            data: {
              sectionTitle: 'Services',
              description: 'Choose from our range of professional mehndi services',
              showPricing: true,
              showFeatures: true,
              layout: 'expandable'
            },
            visible: true,
            order: 3
          }
        ],
        seo: {
          title: 'Vikram Mehndi - Professional Mehndi Artist',
          description: 'Transform your special moments with intricate, beautiful mehndi designs crafted by expert artist Vikram.',
          keywords: ['mehndi', 'henna', 'bridal', 'mumbai', 'artist']
        },
        status: 'published'
      },
      {
        slug: 'about',
        title: 'About Page',
        heroTitle: 'About Me',
        heroSubtitle: 'Vikram Mehndi',
        heroDescription: 'Creating beautiful memories through the art of mehndi for over 8 years',
        storyTitle: 'The Artist Behind the Art',
        storyContent: 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.',
        storyContent2: 'Specializing in bridal mehndi, Arabic patterns, and contemporary fusion designs, combining traditional techniques with modern aesthetics to create unique artwork that tells your story.',
        storyContent3: 'Every design is crafted with premium quality henna, ensuring deep, long-lasting color that enhances the beauty of your special occasions. From intimate gatherings to grand celebrations, each piece is a work of art.',
        storyContent4: 'My passion lies in understanding your vision and bringing it to life through personalized designs that reflect your personality and the significance of your celebration.',
        artistImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop',
        showAchievements: true,
        sections: [],
        seo: {
          title: 'About Vikram Mehndi - Professional Mehndi Artist',
          description: 'Learn about Vikram, a professional mehndi artist with 8+ years of experience creating stunning, intricate designs.',
          keywords: ['about', 'mehndi artist', 'experience', 'professional', 'bridal mehndi', 'henna artist']
        },
        status: 'published'
      }
    ]

    await PageContent.insertMany(pages)
    console.log('✅ Pages seeded successfully')
    
    // Ensure about page has the correct structure
    await PageContent.findOneAndUpdate(
      { slug: 'about' },
      {
        $set: {
          heroTitle: 'About Me',
          heroSubtitle: 'Vikram Mehndi',
          heroDescription: 'Creating beautiful memories through the art of mehndi for over 8 years',
          storyTitle: 'The Artist Behind the Art',
          storyContent: 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.',
          storyContent2: 'Specializing in bridal mehndi, Arabic patterns, and contemporary fusion designs, combining traditional techniques with modern aesthetics to create unique artwork that tells your story.',
          storyContent3: 'Every design is crafted with premium quality henna, ensuring deep, long-lasting color that enhances the beauty of your special occasions. From intimate gatherings to grand celebrations, each piece is a work of art.',
          storyContent4: 'My passion lies in understanding your vision and bringing it to life through personalized designs that reflect your personality and the significance of your celebration.',
          artistImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop',
          showAchievements: true
        }
      },
      { upsert: true }
    )
    console.log('✅ About page structure updated')
  } catch (error) {
    console.error('❌ Error seeding pages:', error)
    throw error
  }
}

export default seedPages