'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Phone, Star, Heart } from 'lucide-react'
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

export default function GoatsForSale() {
  const [goats, setGoats] = useState<Goat[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [showImageGallery, setShowImageGallery] = useState(false)

  useEffect(() => {
    const fetchGoats = async () => {
      try {
        const response = await fetch('/api/products')
        
        if (!response.ok) {
          throw new Error('Failed to fetch goats')
        }
        
        const data = await response.json()
        setGoats(data)
      } catch (error) {
        console.error('Error fetching goats:', error)
        // No fallback data - only show what's in the database
        setGoats([])
      } finally {
        setLoading(false)
      }
    }

    fetchGoats()
  }, [])

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

  const getGoatImages = (goat: Goat): string[] => {
    const images: string[] = []
    
    // Add imageUrls array if it exists (for future use)
    if (goat.imageUrls && Array.isArray(goat.imageUrls)) {
      images.push(...goat.imageUrls.filter((url: string) => url && url.trim() !== ''))
    }
    
    // Add main imageUrl if it exists
    if (goat.imageUrl && !images.includes(goat.imageUrl)) {
      images.push(goat.imageUrl)
    }
    
    // Parse additional images from description (temporary solution)
    if (goat.description) {
      try {
        const parsed = JSON.parse(goat.description)
        
        // Handle new format: all images in additionalImages array
        if (parsed.additionalImages && Array.isArray(parsed.additionalImages)) {
          images.push(...parsed.additionalImages.filter((url: string) => url && url.trim() !== ''))
        }
        
        // Handle alternative format: images array
        if (parsed.images && Array.isArray(parsed.images)) {
          images.push(...parsed.images.filter((url: string) => url && url.trim() !== ''))
        }
        
        // Handle single image in parsed object
        if (parsed.imageUrl && typeof parsed.imageUrl === 'string') {
          images.push(parsed.imageUrl)
        }
      } catch (e) {
        // Description is not JSON, check if it's a direct image URL
        if (goat.description.startsWith('http') && (goat.description.includes('imgur') || goat.description.includes('cloudinary') || goat.description.includes('data:image'))) {
          images.push(goat.description)
        }
      }
    }
    
    // Remove duplicates and filter valid URLs
    const uniqueImages = [...new Set(images)].filter((url: string) => url && url.trim() !== '')
    
    // Debug logging
    console.log(`Goat ${goat.name} images:`, uniqueImages, 'imageUrl:', goat.imageUrl, 'description:', goat.description?.substring(0, 100) + '...')
    
    return uniqueImages
  }

  const openImageGallery = (goat: Goat) => {
    const images = getGoatImages(goat)
    setSelectedImages(images)
    setShowImageGallery(true)
  }

  const closeImageGallery = () => {
    setShowImageGallery(false)
    setSelectedImages([])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-cyan-100 to-yellow-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading goats...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-cyan-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center text-cyan-600 hover:text-yellow-600 mb-6 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">Eid ul Azha</span> Goats
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium quality goats for your Eid sacrifice. All goats are healthy, well-fed, 
              and meet Islamic requirements for Qurbani.
            </p>
          </div>
        </div>
      </section>

      {/* Goats Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {goats.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🐐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Goats Available</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We don't have any goats listed for Eid ul Azha at the moment. 
                Please check back later or contact us for availability.
              </p>
              <Link 
                href="/contact" 
                className="bg-gradient-to-r from-yellow-500 to-cyan-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us for Availability
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goats.map((goat) => (
              <div key={goat.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  {(() => {
                    const images = getGoatImages(goat)
                    const firstImage = images[0]
                    
                    return firstImage && (firstImage.startsWith('http') || firstImage.startsWith('/') || firstImage.startsWith('data:image/')) ? (
                      <>
                    <Image
                          src={firstImage}
                      alt={goat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                        {images.length > 1 && (
                          <button
                            onClick={() => openImageGallery(goat)}
                            className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors"
                          >
                            See more +{images.length - 1}
                          </button>
                        )}
                      </>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-yellow-200 via-cyan-200 to-yellow-300 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-6xl mb-2 block">🐐</span>
                        <span className="text-sm text-cyan-800 font-semibold">{goat.breed}</span>
                      </div>
                    </div>
                    )
                  })()}
                  {!goat.isAvailable && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sold
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {goat.breed}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {goat.gender} • {goat.age}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{goat.name}</h3>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 fill-current" />
                      <span className="text-sm text-gray-500 ml-1">Premium</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Weight:</span>
                      <span className="font-semibold ml-1">{goat.weight}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Color:</span>
                      <span className="font-semibold ml-1">{goat.color}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Health:</span>
                      <span className="font-semibold ml-1 bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">{goat.healthStatus}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Age:</span>
                      <span className="font-semibold ml-1">{goat.age}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{getGoatDescription(goat)}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">Premium Quality</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">
                      ₨{goat.price.toLocaleString()}
                    </div>
                    <button 
                      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                        goat.isAvailable 
                          ? 'bg-gradient-to-r from-yellow-500 to-cyan-500 hover:bg-green-700 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!goat.isAvailable}
                      onClick={() => {
                        if (goat.isAvailable) {
                          window.location.href = `tel:+92-322-450-7174`
                        }
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {goat.isAvailable ? 'Call to Book' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Breeds Filter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Breed</h2>
            <p className="text-lg text-gray-600">
              We offer various premium breeds suitable for Eid sacrifice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-100 via-cyan-100 to-yellow-200 p-8 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-6xl mb-4">🐐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Rajanpuri</h3>
              <p className="text-gray-600">Premium Pakistani breed, large size with excellent meat quality. Hardy and well-adapted to local climate, perfect for Eid sacrifice.</p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-100 via-yellow-100 to-cyan-200 p-8 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-6xl mb-4">🐐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Maaki Cheena</h3>
              <p className="text-gray-600">Beautiful breed with distinctive markings and gentle nature. Medium to large size, perfect for families and Eid celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Guidelines */}
      <section className="py-20 bg-gradient-to-br from-yellow-100 via-cyan-100 to-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Islamic Guidelines Compliance</h2>
            <p className="text-xl text-gray-600">
              All our goats meet the Islamic requirements for Eid sacrifice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proper Age</h3>
              <p className="text-gray-600">
                All goats are of proper age according to Islamic guidelines. Goats minimum 1 year, sheep minimum 6 months.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">♥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Healthy & Sound</h3>
              <p className="text-gray-600">
                No defects, diseases, or disabilities. All animals are healthy, well-fed, and in excellent condition.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🕌</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Halal Certified</h3>
              <p className="text-gray-600">
                Raised according to Islamic principles with proper feed and care. Suitable for sacred sacrifice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Book Your Eid Goat?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Call us now to reserve your goat or visit our farm to see them in person. 
            We're here to help make your Eid sacrifice meaningful and blessed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+92-322-450-7174"
              className="bg-white bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent hover:bg-green-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: 0322 450 7174
            </a>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent px-8 py-4 rounded-full text-lg font-semibold transition-colors">
              Visit Our Farm
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
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/about" className="hover:text-white">About Our Goats</Link></li>
                <li><Link href="/products" className="hover:text-white">Goats for Sale</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Goat Breeds</h4>
              <ul className="space-y-2 text-yellow-100">
                <li>Beetal Goats</li>
                <li>Kamori Goats</li>
                <li>Teddy Goats</li>
                <li>Dumba Sheep</li>
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
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-yellow-100">
            <p>&copy; 2026 Zohan Goat Farm. All rights reserved. | Eid ul Azha Mubarak!</p>
          </div>
        </div>
      </footer>

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Goat Images ({selectedImages.length})</h3>
              <button
                onClick={closeImageGallery}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedImages.map((imageUrl, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={imageUrl}
                      alt={`Goat image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}