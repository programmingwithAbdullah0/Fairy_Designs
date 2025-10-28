
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

interface Product {
  _id: string
  name: string
  title: string
  slug: string
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  priceMin: number
  priceMax: number
  description: string
  category?: {
    name: string
    slug: string
  }
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("fairydesigns@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const defaultContact = {
    discord: "https://discord.com",
    instagram: "https://instagram.com", 
    tiktok: "https://tiktok.com",
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Main Content - Proper Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Product Image */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              {product.image && (
                <Image
                  src={urlFor(product.image).width(800).height(800).fit("crop").url()}
                  alt={product.name || "Product image"}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Product Info Box */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Product Information</h3>
              
              {/* Product Name */}
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">Product Name</p>
                <p className="text-sm font-semibold text-slate-900">
                  {product.name || "Untitled Product"}
                </p>
              </div>

              {/* Slug */}
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">Slug</p>
                <p className="text-sm font-mono text-slate-900 bg-white px-2 py-1 rounded border">
                  {product.slug || "No slug"}
                </p>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs text-slate-500 mb-1">Category</p>
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {product.category?.name || "Uncategorized"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col gap-6">
            {/* Title & Description */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                {product.name || "Untitled Product"}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description || "No description available"}
              </p>
            </div>

            {/* PRICE SECTION */}
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <p className="text-xs text-slate-500 font-semibold mb-1">PRICE RANGE</p>
              <p className="text-2xl font-bold text-blue-600">
                {product.priceMin && product.priceMax ? 
                  `$${product.priceMin} - $${product.priceMax}` : 
                  "Price not available"
                }
              </p>
              <p className="text-xs text-slate-500 mt-1">All prices in US Dollars</p>
            </div>


            {/* ABOUT SECTION */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-2 uppercase">About This Design</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Contact Links */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-3 uppercase">Contact Us</p>
              <div className="grid grid-cols-2 gap-3">
                {/* Discord */}
                <a
                  href={defaultContact.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.08.08 0 00.087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 00-.008-.128 10.713 10.713 0 00.372-.294.075.075 0 00.03-.066V8.07a.075.075 0 00-.036-.066s-5.38-4.167-5.659-4.342a.075.075 0 00-.03-.066c-.124-.098-.248-.196-.372-.294a.077.077 0 00.008-.128c.588-.35 1.255-.636 1.872-.892a.076.076 0 00.042-.106c-.353-.699-.765-1.364-1.226-1.994a.08.08 0 00-.087-.027 19.9 19.9 0 00-5.993 3.03.082.082 0 00-.031.057c.423 4.477-.429 8.846-1.818 13.114a.07.07 0 00.032.027z" />
                  </svg>
                  Discord
                </a>

                {/* Instagram */}
                <a
                  href={defaultContact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                  </svg>
                  Instagram
                </a>

                {/* TikTok */}
                <a
                  href={defaultContact.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-950 text-white text-xs font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 11-4.8-2.4A2.4 2.4 0 009.10 13.46V9.37a8.08 8.08 0 00-7.02 4.11v3.81a4.84 4.84 0 007.68 4.42v-3.68a4.83 4.83 0 003.77 4.25h3.68V6.69z" />
                  </svg>
                  TikTok
                </a>

                {/* Email */}
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-3 px-4 rounded-lg transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Email Display */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Email Address</p>
              <p className="text-sm font-mono font-semibold text-slate-900">
                fairydesigns@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}