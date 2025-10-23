"use client"

import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Crafting Digital Excellence
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We are a team of passionate designers dedicated to creating stunning logos and banners that elevate your
              brand identity. With years of experience and a commitment to quality, we transform your vision into
              reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center"
              >
                Explore Our Work
              </Link>
              <Link
                href="#contact"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-gray-600 font-semibold">Creative Design Studio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600 font-semibold">Designs Created</p>
              <p className="text-gray-500 text-sm mt-1">Logos, banners, and more</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">300+</div>
              <p className="text-gray-600 font-semibold">Happy Clients</p>
              <p className="text-gray-500 text-sm mt-1">Worldwide satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">8+</div>
              <p className="text-gray-600 font-semibold">Years Experience</p>
              <p className="text-gray-500 text-sm mt-1">Industry expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo Design */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
            <div className="text-5xl mb-4">🏷️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Logo Design</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Create memorable brand identities with our professional logo design services. From minimalist to complex
              designs, we craft logos that represent your brand perfectly.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Custom logo concepts</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Multiple revisions included</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>All file formats provided</span>
              </li>
            </ul>
          </div>

          {/* Banner Design */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Banner Design</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Eye-catching banners that grab attention and drive engagement. Perfect for social media, websites, and
              marketing campaigns.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Social media optimized</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Multiple size variations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Fast turnaround time</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-blue-100">Quick turnaround without compromising quality</p>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Creative Team</h3>
              <p className="text-blue-100">Talented designers with diverse expertise</p>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-blue-100">Premium designs that exceed expectations</p>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Client Support</h3>
              <p className="text-blue-100">24/7 support and unlimited revisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Consultation", desc: "Understand your vision and requirements" },
            { step: "02", title: "Concept", desc: "Create initial design concepts" },
            { step: "03", title: "Refinement", desc: "Revise based on your feedback" },
            { step: "04", title: "Delivery", desc: "Final files in all formats" },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="text-2xl text-blue-300">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Let&apos;s collaborate and create something amazing together. Contact us today to discuss your design needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View Our Portfolio
            </Link>
            <a
              href="mailto:contact@example.com"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Send us an Email
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <a href="mailto:contact@example.com" className="text-gray-300 hover:text-white transition">
                contact@example.com
              </a>
            </div>
            <div>
              <h3 className="font-bold mb-2">Follow Us</h3>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Instagram
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Discord
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  TikTok
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">Response Time</h3>
              <p className="text-gray-300">Usually within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
