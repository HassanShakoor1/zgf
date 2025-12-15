'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Shield, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'

interface Goat {
  id: number
  name: string
  breed: string
  age: string
  weight: string
  price: number
  description: string | null
  imageUrl: string | null
  imageUrls: string[] | null
  isAvailable: boolean
  gender: string
  color: string | null
  healthStatus: string
}

export default function Home() {
  const [featuredGoats, setFeaturedGoats] = useState<Goat[]>([])
  const [loading, setLoading] = useState(true)

  const getGoatDescription = (goat: Goat): string => {
    if (!goat.description) return `Premium ${goat.breed} goat, ${goat.age}, ${goat.weight}. Perfect for Eid sacrifice.`
    
    try {
      // Try to parse as JSON (if it contains additional images)
      const parsed = JSON.parse(goat.description)
      return parsed.description || `Premium ${goat.breed} goat, ${goat.age}, ${goat.weight}. Perfect for Eid sacrifice.`
    } catch (e) {
      // Not JSON, return as is
      return goat.description
    }
  }

  useEffect(() => {
    const fetchFeaturedGoats = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          // Show only first 3 available goats as featured
          setFeaturedGoats(data.filter((goat: Goat) => goat.isAvailable).slice(0, 3))
        }
      } catch (error) {
        console.error('Error fetching goats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedGoats()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-cyan-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/80 via-cyan-600/70 to-yellow-500/80 z-10"></div>
        <div className="absolute inset-0">
        <Image
            src="/main.jpg"
            alt="Goat farm landscape"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-yellow-300">Eid ul Azha</span><br />
            Premium Goats<br />
            <span className="text-cyan-300">2026</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-yellow-100">
            Healthy, premium quality goats for your Eid sacrifice. Trusted by families since our founding in 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-gradient-to-r from-yellow-500 to-cyan-500 hover:from-yellow-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center shadow-lg">
              Browse Our Goats
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              Visit Our Farm
            </Link>
          </div>
        </div>
      </section>

      {/* Eid Message Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-50 via-yellow-50 to-cyan-50 border-y-4 border-gradient-to-r from-yellow-400 to-cyan-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-6xl mb-6">🕌</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Eid ul Azha Mubarak</h2>
          <p className="text-xl text-gray-700 mb-6">
            May Allah accept your sacrifice and bless you with happiness, peace, and prosperity. 
            We are honored to provide healthy, premium goats for your sacred ritual.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-lg inline-block">
            <p className="text-lg font-semibold bg-gradient-to-r from-yellow-700 to-cyan-700 bg-clip-text text-transparent">
              "And for every nation We have appointed a rite [of sacrifice]" - Quran 22:34
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Goats?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure the highest quality goats that meet all Islamic requirements for Eid sacrifice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthy & Well-Fed</h3>
              <p className="text-gray-600">
                All our goats are regularly checked by veterinarians and fed with premium organic feed. 
                They are healthy, active, and meet all sacrifice requirements.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Islamic Compliance</h3>
              <p className="text-gray-600">
                Our goats meet all Islamic requirements for Eid sacrifice. Proper age, health, 
                and quality standards are maintained according to Shariah guidelines.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Breeds</h3>
              <p className="text-gray-600">
                We specialize in premium Pakistani breeds including Rajanpuri and Maaki Cheena goats. 
                Each goat is carefully selected for quality, size, and Islamic compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Goats Preview */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Goats for Eid 2024</h2>
            <p className="text-xl text-gray-600">
              Premium quality goats available for Eid ul Azha sacrifice
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading featured goats...</p>
            </div>
          ) : featuredGoats.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🐐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Goats Available Yet</h3>
              <p className="text-gray-600 mb-8">
                We're preparing our premium goats for Eid ul Azha. Please check back soon!
              </p>
              <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Us for Updates
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredGoats.map((goat) => (
                <div key={goat.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                    {(() => {
                      const images = []
                      
                      // Add imageUrls array if it exists
                      if (goat.imageUrls && Array.isArray(goat.imageUrls)) {
                        images.push(...goat.imageUrls.filter((url: string) => url && url.trim() !== ''))
                      }
                      
                      // Add main imageUrl if it exists
                      if (goat.imageUrl && !images.includes(goat.imageUrl)) {
                        images.unshift(goat.imageUrl)
                      }
                      
                      // Parse images from description (for new uploads)
                      if (goat.description) {
                        try {
                          const parsed = JSON.parse(goat.description)
                          if (parsed.additionalImages && Array.isArray(parsed.additionalImages)) {
                            images.push(...parsed.additionalImages.filter((url: string) => url && url.trim() !== ''))
                          }
                          if (parsed.images && Array.isArray(parsed.images)) {
                            images.push(...parsed.images.filter((url: string) => url && url.trim() !== ''))
                          }
                        } catch (e) {
                          // Check if description is a direct image URL
                          if (goat.description.startsWith('http') && (goat.description.includes('imgur') || goat.description.includes('cloudinary') || goat.description.includes('data:image'))) {
                            images.push(goat.description)
                          }
                        }
                      }
                      
                      const firstImage = images[0]
                      
                      return firstImage && (firstImage.startsWith('http') || firstImage.startsWith('/')) ? (
                        <Image
                          src={firstImage}
                          alt={goat.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-yellow-200 via-cyan-200 to-yellow-300 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-6xl mb-2 block">🐐</span>
                            <span className="text-sm text-cyan-800 font-semibold">{goat.breed}</span>
                          </div>
                        </div>
                      )
                    })()}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {goat.breed}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{goat.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {getGoatDescription(goat)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">₨{goat.price.toLocaleString()}</div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        goat.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {goat.isAvailable ? 'Available' : 'Sold'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors inline-flex items-center">
              View All Available Goats
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Complete Eid sacrifice solutions for your convenience</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all">
              <div className="text-6xl mb-6">🚚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Home Delivery</h3>
              <p className="text-gray-600">Free delivery within city limits for your convenience. We bring your selected goat right to your doorstep.</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-yellow-50 rounded-xl hover:shadow-lg transition-all">
              <div className="text-6xl mb-6">📞</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support during Eid season. Call us anytime for assistance or inquiries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Book Your Eid Goat Today
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Don't wait until the last minute. Reserve your premium goat now for Eid ul Azha 2024.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-cyan-600 hover:bg-yellow-50 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              Browse Available Goats
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              Call Now: 0322 450 7174
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-yellow-600 via-cyan-600 to-yellow-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🐐 Zohan Goat Farm</h3>
              <p className="text-yellow-100">
                Your trusted source for premium Eid goats since 2025. Serving the community with quality and integrity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-yellow-100">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Our Goats</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Goats for Sale</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Goat Breeds</h4>
              <ul className="space-y-2 text-cyan-100">
                <li>Rajanpuri Goats</li>
                <li>Maaki Cheena Goats</li>
                <li>Premium Quality</li>
                <li>Eid Ready</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="text-yellow-100 space-y-2">
                <p>📍 Lahore, Pakistan</p>
                <p>📞 0322 450 7174</p>
                <p>📞 0311 44 53396</p>
                <p>🕐 Open: 6 AM - 8 PM Daily</p>
              </div>
            </div>
          </div>
          <div className="border-t border-yellow-400/30 mt-8 pt-8 text-center text-yellow-100">
            <p>&copy; 2026 Zohan Goat Farm. All rights reserved. | Eid ul Azha Mubarak!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}