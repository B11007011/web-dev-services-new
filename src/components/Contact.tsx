'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: 'web-development'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-blue-50/50" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Have a project in mind? Let's discuss how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  123 Business Street, Suite 100<br />
                  New York, NY 10001
                </p>
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-600" />
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  contact@example.com
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                      required
                      autoComplete="name"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                      required
                      autoComplete="email"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                    required
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                    required
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <Send className="w-5 h-5 inline-block mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 