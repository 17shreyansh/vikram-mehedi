import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)
  
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, WebP) are allowed'))
  }
}

export const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5
  },
  fileFilter: fileFilter
})

export const processImage = async (req, res, next) => {
  if (!req.file) return next()

  try {
    const filename = `${uuidv4()}-${Date.now()}.webp`
    const filepath = path.join(__dirname, '../uploads', filename)

    await sharp(req.file.buffer)
      .resize(1200, 1200, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 85 })
      .toFile(filepath)

    // Create thumbnail
    const thumbnailName = `thumb-${filename}`
    const thumbnailPath = path.join(__dirname, '../uploads', thumbnailName)
    
    await sharp(req.file.buffer)
      .resize(400, 400, { 
        fit: 'cover' 
      })
      .webp({ quality: 80 })
      .toFile(thumbnailPath)

    req.file.filename = filename
    req.file.thumbnailName = thumbnailName
    req.file.path = filepath
    req.file.url = `/uploads/${filename}`
    req.file.thumbnailUrl = `/uploads/${thumbnailName}`

    next()
  } catch (error) {
    next(error)
  }
}

export const processMultipleImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next()

  try {
    const processedFiles = []

    for (const file of req.files) {
      const filename = `${uuidv4()}-${Date.now()}.webp`
      const filepath = path.join(__dirname, '../uploads', filename)

      await sharp(file.buffer)
        .resize(1200, 1200, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: 85 })
        .toFile(filepath)

      const thumbnailName = `thumb-${filename}`
      const thumbnailPath = path.join(__dirname, '../uploads', thumbnailName)
      
      await sharp(file.buffer)
        .resize(400, 400, { 
          fit: 'cover' 
        })
        .webp({ quality: 80 })
        .toFile(thumbnailPath)

      processedFiles.push({
        ...file,
        filename,
        thumbnailName,
        path: filepath,
        url: `/uploads/${filename}`,
        thumbnailUrl: `/uploads/${thumbnailName}`
      })
    }

    req.processedFiles = processedFiles
    next()
  } catch (error) {
    next(error)
  }
}