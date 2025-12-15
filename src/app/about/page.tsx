import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Leaf, Users, Award } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-cyan-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent hover:bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About Our <span className="bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">Goats</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about our wonderful goats, their care, and why goat products are so beneficial for you and your family.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Zohan Goat Farm was founded in 2025 with a dedicated mission: to provide premium quality goats for Eid ul Azha while maintaining the highest standards of animal welfare and Islamic guidelines.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We specialize in raising healthy, well-fed goats that meet all Islamic requirements for Qurbani. Our commitment is to serve the Muslim community with trust, quality, and respect for the sacred tradition of Eid ul Azha.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">100+</div>
                  <div className="text-gray-600">Premium Goats</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">2025</div>
                  <div className="text-gray-600">Founded</div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Goats grazing in the field"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Goat Care */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Care for Our Goats</h2>
            <p className="text-xl text-gray-600">
              Our goats receive the best care possible, ensuring they live happy, healthy lives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Organic Feed</h3>
              <p className="text-gray-600">
                Our goats enjoy a diet of organic hay, fresh pasture grass, and specially formulated organic grain.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Regular Health Checks</h3>
              <p className="text-gray-600">
                Each goat receives regular veterinary care and health monitoring to ensure optimal wellbeing.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Environment</h3>
              <p className="text-gray-600">
                Goats are social animals, so we ensure they live in herds and have plenty of space to roam and play.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Organic</h3>
              <p className="text-gray-600">
                Our farm is certified organic, meaning no chemicals, hormones, or artificial additives are ever used.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goat Breeds */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Goat Breeds</h2>
            <p className="text-xl text-gray-600">
              We specialize in premium Pakistani goat breeds, perfect for Eid ul Azha sacrifice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-cyan-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🐐</div>
                <h3 className="text-2xl font-bold text-gray-900">Rajanpuri Goats</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Premium Rajanpuri goats known for their excellent meat quality and size. These goats are highly sought after for Eid sacrifice due to their robust build and superior taste.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>Large size:</strong> 40-60 kg average weight</li>
                <li>• <strong>Excellent meat quality:</strong> Tender and flavorful</li>
                <li>• <strong>Hardy breed:</strong> Adapted to Pakistani climate</li>
                <li>• <strong>Popular choice:</strong> Preferred for Eid sacrifice</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-yellow-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🐐</div>
                <h3 className="text-2xl font-bold text-gray-900">Maaki Cheena Goats</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Beautiful Maaki Cheena goats with distinctive markings and excellent build. Known for their good temperament and quality meat production.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>Distinctive appearance:</strong> Beautiful coat patterns</li>
                <li>• <strong>Good size:</strong> 35-50 kg average weight</li>
                <li>• <strong>Gentle nature:</strong> Easy to handle and manage</li>
                <li>• <strong>Quality meat:</strong> Perfect for family celebrations</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-yellow-100 to-cyan-100 p-6 rounded-xl inline-block">
              <p className="text-lg font-semibold text-gray-800 mb-2">🕌 All our goats meet Islamic requirements for Qurbani</p>
              <p className="text-gray-600">Proper age, health, and quality standards maintained according to Shariah guidelines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Goats for Eid */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Goats for Eid</h2>
            <p className="text-xl text-gray-600">
              Discover what makes our goats perfect for your Eid ul Azha sacrifice and celebration.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Islamic Compliance</h3>
                    <p className="text-gray-600">
                      All our goats meet strict Islamic requirements for Qurbani - proper age, health, and quality standards according to Shariah guidelines.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality Meat</h3>
                    <p className="text-gray-600">
                      Our goats are well-fed with organic feed, resulting in tender, flavorful meat that's perfect for your Eid feast and sharing with family.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Healthy & Active</h3>
                    <p className="text-gray-600">
                      Regular veterinary care and natural grazing ensure our goats are healthy, active, and free from diseases or defects.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted by Families</h3>
                    <p className="text-gray-600">
                      Families across Lahore trust us for their Eid sacrifice. We provide transparent service and support throughout your purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-200 via-cyan-200 to-yellow-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🐐</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium Eid Goats</h3>
                  <p className="text-gray-700 text-lg">Healthy • Halal • High Quality</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <span className="text-4xl">🕌</span>
                    <span className="text-4xl">✨</span>
                    <span className="text-4xl">🎉</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Try Our Products?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Experience the difference that happy, healthy goats make in every product we create.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent hover:bg-green-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
              Shop Our Products
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent px-8 py-4 rounded-full text-lg font-semibold transition-colors">
              Visit Our Farm
            </Link>
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
              <h4 className="font-semibold mb-4">Goat Breeds</h4>
              <ul className="space-y-2 text-green-200">
                <li>Rajanpuri Goats</li>
                <li>Maaki Cheena Goats</li>
                <li>Premium Quality</li>
                <li>Eid Ready</li>
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
