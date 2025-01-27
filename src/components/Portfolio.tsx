'use client'

import Image from 'next/image'

const Portfolio = () => {
  const projects = [
    {
      title: 'Web Development',
      description: 'Modern web applications',
      image: '/placeholder.jpg',
    },
    {
      title: 'Mobile Apps',
      description: 'Cross-platform solutions',
      image: '/placeholder.jpg',
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered designs',
      image: '/placeholder.jpg',
    },
  ]

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio 