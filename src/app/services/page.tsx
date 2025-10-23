"use client"

import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Logo Design",
      description: "Custom, professional logo designs tailored to your brand identity",
      features: [
        "Unlimited revisions",
        "Multiple concepts",
        "High-resolution files",
        "Source files included",
        "Commercial rights",
      ],
      price: "$40 - $80",
      icon: "🎨",
    },
    {
      id: 2,
      title: "Banner Design",
      description: "Eye-catching banners for web, social media, and print",
      features: [
        "Custom dimensions",
        "Multiple design options",
        "Fast turnaround",
        "Print-ready files",
        "Social media optimized",
      ],
      price: "$30 - $60",
      icon: "🖼️",
    },
    {
      id: 3,
      title: "Brand Identity",
      description: "Complete branding package including logo, colors, and guidelines",
      features: ["Logo design", "Color palette", "Typography guide", "Brand guidelines", "Social media templates"],
      price: "$150 - $300",
      icon: "✨",
    },
    {
      id: 4,
      title: "Social Media Graphics",
      description: "Engaging graphics for Instagram, TikTok, Facebook, and more",
      features: [
        "Platform-specific sizes",
        "Consistent branding",
        "Monthly packages",
        "Quick revisions",
        "Trending designs",
      ],
      price: "$50 - $100",
      icon: "📱",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your vision, requirements, and brand identity",
    },
    {
      step: "02",
      title: "Concept Development",
      description: "Our designers create multiple design concepts for your review",
    },
    {
      step: "03",
      title: "Refinement",
      description: "We refine the design based on your feedback and suggestions",
    },
    {
      step: "04",
      title: "Delivery",
      description: "Final files delivered in all required formats and resolutions",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Professional Design Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Elevate your brand with custom logo and banner designs crafted by our talented team of designers
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-pink-600 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-300 pt-4 mb-4">
                <p className="text-2xl font-bold text-pink-600">{service.price}</p>
              </div>

              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto bg-gray-50 rounded-lg my-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Our Design Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-pink-600 text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
              {idx < process.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-20 w-full h-0.5 bg-pink-200 -ml-4"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Turnaround</h3>
            <p className="text-gray-600">
              Quick delivery without compromising on quality. Most projects completed within 3-5 days.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Solutions</h3>
            <p className="text-gray-600">
              Every design is tailored to your unique brand identity and business requirements.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
            <p className="text-gray-600">Professional designers with years of experience ensuring top-notch results.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
            Let&apos; create something amazing together. Contact us today to discuss your design needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-pink-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
