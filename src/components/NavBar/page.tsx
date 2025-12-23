"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { Category } from '@/types';

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
  logo: '✨',
  thumbnail: '🖼️',
  banner: '🎯',
  other: '🎨',
};

export function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch categories from admin panel
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories', {
          cache: 'no-store', // Force fresh data
          headers: {
            'Cache-Control': 'no-cache',
          }
        });
        const data = await response.json();
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    // Fetch on mount
    fetchCategories();

    // Auto-refresh categories every 3 seconds for real-time updates
    const interval = setInterval(() => {
      fetchCategories();
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  // Get emoji for category
  const getCategoryEmoji = (categoryName: string) => {
    const key = categoryName.toLowerCase();
    return categoryEmojis[key] || '🎨';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products_sanity?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 border-b-2 border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left - Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight group-hover:text-pink-600 transition-colors duration-300">
                Fairy
              </span>
              <span className="text-3xl font-extrabold text-pink-600 ml-1.5 group-hover:text-pink-700 transition-colors duration-300">
                Designs
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
              >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProductsOpen && (
                <div
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <Link
                    href="/products_sanity"
                    className="flex items-center px-5 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                  >
                    <span className="text-lg mr-3">🎨</span>
                    All Products
                  </Link>

                  {categoriesLoading ? (
                    <div className="px-5 py-3 text-sm text-gray-500">Loading...</div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/products_sanity?category=${category.slug}`}
                        className="flex items-center px-5 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 capitalize"
                      >
                        <span className="text-lg mr-3">{getCategoryEmoji(category.name)}</span>
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-5 py-3 text-sm text-gray-500">No categories yet</div>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/services"
              className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
            >
              Services
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right - Search Bar */}
          <div className="hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search designs..."
                className="w-72 pl-11 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm font-medium transition-all duration-200 hover:border-gray-300"
              />
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </div>

          {/* Mobile Menu Button - Hamburger Icon */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-sidebar-menu"
              className="text-gray-700 hover:text-pink-600 p-2 rounded-lg hover:bg-pink-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" aria-hidden="true" />
              ) : (
                <Menu className="w-7 h-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Smooth Fade In/Out */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Full-Screen Drawer - 100vw x 100vh from Left */}
      <aside
        id="mobile-sidebar-menu"
        aria-label="Mobile navigation menu"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed top-0 left-0 w-screen h-screen bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center">
              <span className="text-3xl font-extrabold text-gray-900">Fairy</span>
              <span className="text-3xl font-extrabold text-pink-600 ml-1.5">Designs</span>
            </Link>
            <button
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="p-2.5 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <X className="w-7 h-7" aria-hidden="true" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-6 py-8 space-y-3">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block px-5 py-4 text-lg font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200"
            >
              Home
            </Link>

            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                aria-expanded={isProductsOpen}
                aria-controls="mobile-products-submenu"
                className="w-full flex items-center justify-between px-5 py-4 text-lg font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Products
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {isProductsOpen && (
                <div
                  id="mobile-products-submenu"
                  className="mt-2 ml-4 space-y-2 animate-in slide-in-from-top duration-200"
                >
                  <Link
                    href="/products_sanity"
                    onClick={closeMobileMenu}
                    className="flex items-center px-5 py-3 text-base font-medium text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
                  >
                    <span className="text-xl mr-3">🎨</span>
                    All Products
                  </Link>

                  {categoriesLoading ? (
                    <div className="px-5 py-3 text-base text-gray-500">Loading...</div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/products_sanity?category=${category.slug}`}
                        onClick={closeMobileMenu}
                        className="flex items-center px-5 py-3 text-base font-medium text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 capitalize"
                      >
                        <span className="text-xl mr-3">{getCategoryEmoji(category.name)}</span>
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-5 py-3 text-base text-gray-500">No categories yet</div>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/services"
              onClick={closeMobileMenu}
              className="block px-5 py-4 text-lg font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200"
            >
              Services
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block px-5 py-4 text-lg font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block px-5 py-4 text-lg font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200"
            >
              Contact
            </Link>

            {/* Mobile Search Bar */}
            <div className="pt-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search designs..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base font-medium"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>
            </div>
          </div>
        </div>
      </aside>
    </nav>
  );
}
