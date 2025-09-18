export const optimizeImageUrl = (url, width = 400, height = 400, quality = 75) => {
  if (!url || !url.includes('unsplash.com')) return url
  
  const params = new URLSearchParams({
    w: width,
    h: height,
    fit: 'crop',
    q: quality,
    auto: 'format'
  })
  
  return `${url.split('?')[0]}?${params.toString()}`
}

export const getResponsiveImageSizes = (baseWidth) => ({
  mobile: optimizeImageUrl(baseWidth, 300, 300, 70),
  tablet: optimizeImageUrl(baseWidth, 500, 500, 75),
  desktop: optimizeImageUrl(baseWidth, 800, 800, 80)
})