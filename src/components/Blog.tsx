'use client'

import Image from 'next/image'
import Link from 'next/link'

const Blog = () => {
  const posts = [
    {
      title: 'The Future of Web Development',
      excerpt: 'Exploring upcoming trends in web development and how they will shape the digital landscape.',
      image: '/placeholder-blog1.jpg',
      author: {
        name: 'John Smith',
        avatar: '/placeholder-team1.jpg'
      },
      date: 'Mar 15, 2024',
      readTime: '5 min read',
      category: 'Technology'
    },
    {
      title: 'Optimizing Website Performance',
      excerpt: 'Best practices and techniques for improving your website\'s speed and user experience.',
      image: '/placeholder-blog2.jpg',
      author: {
        name: 'Sarah Johnson',
        avatar: '/placeholder-team2.jpg'
      },
      date: 'Mar 12, 2024',
      readTime: '8 min read',
      category: 'Performance'
    },
    {
      title: 'UI/UX Design Principles',
      excerpt: 'Essential design principles that every modern website should follow for better user engagement.',
      image: '/placeholder-blog3.jpg',
      author: {
        name: 'Michael Chen',
        avatar: '/placeholder-team3.jpg'
      },
      date: 'Mar 10, 2024',
      readTime: '6 min read',
      category: 'Design'
    }
  ]

  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-600">
            Stay updated with our latest thoughts and discoveries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link href="#" className="block">
                <div className="relative h-48 md:h-64">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 mr-3">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blog 