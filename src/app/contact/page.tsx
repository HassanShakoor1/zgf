'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { useState } from 'react'
import Navigation from '@/components/Navigation'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // This will connect to your API later
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-cyan-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent hover:bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact <span className="bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you! Whether you have questions about our products, want to visit our farm, 
              or need help with an order, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitMessage && (
                <div className={`p-4 rounded-lg mb-6 ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-100 bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-cyan-500 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-yellow-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Visit Our Farm</h4>
                      <p className="text-gray-600">
                        Zohan Goat Farm<br />
                        Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-yellow-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                      <p className="text-gray-600">
                        Phone: 0322 450 7174<br />
                        Phone: 0311 44 53396
                      </p>
                    </div>
                  </div>
                  
                  
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-yellow-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Farm Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 4:00 PM<br />
                        Sunday: 10:00 AM - 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Farm Image */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                    alt="Zohan Goat Farm entrance"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Farm Tours Available</h3>
                  <p className="text-gray-600 mb-4">
                    Come visit our farm and meet our goats! We offer guided tours every Saturday at 2:00 PM. 
                    Perfect for families and anyone interested in learning about sustainable farming.
                  </p>
                  <p className="text-sm bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
                    Call ahead to reserve your spot!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">
              Located in Lahore, Pakistan - serving the community with premium goats for Eid ul Azha.
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Interactive Map Coming Soon</p>
              <p className="text-gray-500">Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-cyan-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our farm and products.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer farm tours?</h3>
              <p className="text-gray-600">
                Yes! We offer guided farm tours every Saturday at 2:00 PM. Tours last about 1 hour and include 
                meeting our goats, learning about our farming practices, and sampling our products. Please call ahead to reserve.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you deliver products?</h3>
              <p className="text-gray-600">
                We offer local delivery within 25 miles of our farm for orders over $50. We also ship nationwide 
                for non-perishable items like soap and lotion. Fresh dairy products are available for local pickup only.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Are your products organic?</h3>
              <p className="text-gray-600">
                Yes, all our products are certified organic. Our goats are fed organic feed, graze on organic pastures, 
                and we never use artificial hormones, antibiotics, or chemical additives in our products.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I buy products directly from the farm?</h3>
              <p className="text-gray-600">
                Absolutely! Our farm store is open during regular hours, and we always have fresh products available. 
                You can also call ahead to ensure specific items are in stock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🐐 Zohan Goat Farm</h3>
              <p className="text-green-200">
                Your trusted source for premium Eid goats since 2025. Serving the community with quality and integrity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-green-200">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/about" className="hover:text-white">About Goats</Link></li>
                <li><Link href="/products" className="hover:text-white">Products</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-green-200">
                <li>Fresh Goat Cheese</li>
                <li>Pure Goat Milk</li>
                <li>Goat Milk Soap</li>
                <li>Organic Yogurt</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="text-green-200 space-y-2">
                <p>📍 Lahore, Pakistan</p>
                <p>📞 0322 450 7174</p>
                <p>📞 0311 44 53396</p>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>&copy; 2026 Zohan Goat Farm. All rights reserved. | Eid ul Azha Mubarak!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
