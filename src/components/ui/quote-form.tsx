'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface QuoteFormProps {
  isOpen: boolean
  onClose: () => void
}

export function QuoteForm({ isOpen, onClose }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/xnnjvnlq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          message: ''
        })
        // Close modal after 1.5 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 1500)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0B1120] rounded-lg shadow-2xl border border-gray-800">
        {/* Close Button */}
        <button
  onClick={onClose}
  className="absolute right-3 top-3 flex items-center justify-center text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
>
  <X className="w-4 h-4" />
</button>

        <div className="p-5">
          <h2 className="text-xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            Request a Quote
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm"
                placeholder="Your Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  required
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 text-sm"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                >
                  <option value="">Select type</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="design">UI/UX Design</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                  Budget Range *
                </label>
                <select
                  id="budget"
                  required
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 text-sm"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="">Select range</option>
                  <option value="small">$5k - $10k</option>
                  <option value="medium">$10k - $25k</option>
                  <option value="large">$25k - $50k</option>
                  <option value="enterprise">$50k+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Project Details *
              </label>
              <textarea
                id="message"
                required
                rows={3}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500 text-sm"
                placeholder="Let&apos;s discuss your project requirements"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-md hover:opacity-90 transition-all duration-300 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : submitStatus === 'success' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submitted!
                </span>
              ) : submitStatus === 'error' ? (
                "Try Again"
              ) : (
                "Submit Request"
              )}
            </button>

            {submitStatus === 'error' && (
              <p className="text-red-500 text-sm text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
} 