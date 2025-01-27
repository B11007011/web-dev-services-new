const fs = require('fs')
const path = require('path')

// Create portfolio directory if it doesn't exist
const portfolioDir = path.join(process.cwd(), 'public', 'portfolio')
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true })
}

// List of placeholder images to create
const images = [
  'web1.jpg',
  'mobile1.jpg',
  'design1.jpg',
  'ecommerce1.jpg',
  'cloud1.jpg',
  'marketing1.jpg',
  'seo1.jpg',
  'content1.jpg',
  'analytics1.jpg',
  'security1.jpg',
  'api1.jpg',
  'performance1.jpg',
  'devops1.jpg',
  'support1.jpg',
  'consulting1.jpg'
]

// Create a simple SVG placeholder for each image
images.forEach((imageName) => {
  const svgContent = `
    <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#1E293B"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">
        ${imageName.replace('.jpg', '')}
      </text>
    </svg>
  `
  
  fs.writeFileSync(
    path.join(portfolioDir, imageName),
    svgContent
  )
})

console.log('Placeholder images generated successfully!') 