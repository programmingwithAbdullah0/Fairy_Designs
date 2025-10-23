export default function HeroSection() {
  return (
    <section className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Custom Logo & Banner Design
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Professional design services tailored to your brand. From modern tech logos to eye-catching banners, we
                create designs that make your brand stand out.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4"> 
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Explore Designs 
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                Get Started
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-600">Designs Created</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">100+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support Available</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center border border-gray-200">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .267M7 21H5m12 0h2m0-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Design Excellence</h3>
                <p className="text-gray-600">Crafted with precision and creativity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
